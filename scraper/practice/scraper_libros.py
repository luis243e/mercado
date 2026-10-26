"""
Fase 0 — Práctica de scraping en books.toscrape.com

Recorre las primeras 3 páginas del catálogo y guarda en libros.csv
el título, el precio, las estrellas y el enlace de cada libro.

Reglas que sigue (las mismas que usaremos con las tiendas reales):
- Revisa el robots.txt antes de pedir cada página.
- Se identifica con un User-Agent honesto.
- Espera 2 segundos entre páginas y usa un timeout en cada petición.
"""

import csv
import time
from urllib.parse import urljoin
from urllib.robotparser import RobotFileParser

import httpx
from bs4 import BeautifulSoup

URL_BASE = "http://books.toscrape.com/"
URL_INICIO = urljoin(URL_BASE, "catalogue/page-1.html")
USER_AGENT = "MercadoBot/0.1 (proyecto de aprendizaje)"
PAGINAS_MAXIMAS = 3
PAUSA_SEGUNDOS = 2
ARCHIVO_SALIDA = "libros.csv"

# El sitio escribe las estrellas como palabra en una clase CSS ("star-rating Three")
ESTRELLAS = {"One": 1, "Two": 2, "Three": 3, "Four": 4, "Five": 5}


def cargar_robots(cliente):
    """Descarga y lee el robots.txt del sitio."""
    robots = RobotFileParser()
    respuesta = cliente.get(urljoin(URL_BASE, "robots.txt"))
    if respuesta.status_code == 200:
        robots.parse(respuesta.text.splitlines())
    else:
        # Sin robots.txt (por ejemplo, 404) se entiende que todo está permitido
        robots.parse([])
    return robots


def limpiar_precio(texto):
    """Convierte '£51.77' en 51.77 (float)."""
    solo_numero = "".join(c for c in texto if c.isdigit() or c == ".")
    return float(solo_numero)


def extraer_libros(html, url_pagina):
    """Lee el HTML de una página del catálogo y devuelve una lista de libros."""
    sopa = BeautifulSoup(html, "html.parser")
    libros = []

    for tarjeta in sopa.select("article.product_pod"):
        enlace = tarjeta.select_one("h3 a")
        precio = tarjeta.select_one("p.price_color")
        estrellas = tarjeta.select_one("p.star-rating")

        # La clase trae dos palabras: ["star-rating", "Three"]; nos sirve la segunda
        palabra_estrellas = [c for c in estrellas["class"] if c != "star-rating"][0]

        libros.append({
            "titulo": enlace["title"],
            "precio": limpiar_precio(precio.get_text()),
            "estrellas": ESTRELLAS.get(palabra_estrellas, 0),
            # El href es relativo ("a-light-in-the-attic_1000/index.html"); urljoin lo vuelve absoluto
            "enlace": urljoin(url_pagina, enlace["href"]),
        })

    # Busca el botón "next" para saber si hay otra página
    siguiente = sopa.select_one("li.next a")
    url_siguiente = urljoin(url_pagina, siguiente["href"]) if siguiente else None

    return libros, url_siguiente


def guardar_csv(libros, ruta):
    """Escribe la lista de libros en un archivo CSV."""
    columnas = ["titulo", "precio", "estrellas", "enlace"]
    # utf-8-sig hace que Excel muestre bien las tildes y símbolos
    with open(ruta, "w", newline="", encoding="utf-8-sig") as archivo:
        escritor = csv.DictWriter(archivo, fieldnames=columnas)
        escritor.writeheader()
        escritor.writerows(libros)


def main():
    todos_los_libros = []
    encabezados = {"User-Agent": USER_AGENT}

    with httpx.Client(headers=encabezados, timeout=10) as cliente:
        robots = cargar_robots(cliente)
        url = URL_INICIO

        for numero in range(1, PAGINAS_MAXIMAS + 1):
            if url is None:
                print("No hay más páginas.")
                break

            if not robots.can_fetch(USER_AGENT, url):
                print(f"robots.txt no permite pedir {url}. Me detengo.")
                break

            print(f"Página {numero}: {url}")
            respuesta = cliente.get(url)

            if respuesta.status_code != 200:
                print(f"El servidor respondió {respuesta.status_code}. Me detengo.")
                break

            libros, url = extraer_libros(respuesta.text, str(respuesta.url))
            todos_los_libros.extend(libros)
            print(f"  {len(libros)} libros encontrados")

            # Pausa entre páginas para no cargar el servidor (no hace falta después de la última)
            if numero < PAGINAS_MAXIMAS and url is not None:
                time.sleep(PAUSA_SEGUNDOS)

    guardar_csv(todos_los_libros, ARCHIVO_SALIDA)
    print(f"Listo: {len(todos_los_libros)} libros guardados en {ARCHIVO_SALIDA}")


if __name__ == "__main__":
    main()
