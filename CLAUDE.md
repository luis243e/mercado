# Mercado — brief para Claude Code

> Lee este archivo completo al empezar cada sesión. Después lee `docs/README.md` (si existe) para saber dónde quedó la última sesión, y revisa la sección **Estado actual** al final de este archivo.

---

## 1. Qué es Mercado

Un comparador de precios de supermercados colombianos. Cada mañana un scraper en Python recoge los precios de las tiendas en línea (Éxito primero; luego Jumbo, Olímpica y D1), los guarda con su historial y una app web muestra:

- dónde sale más barato cada producto hoy,
- cómo ha cambiado su precio (historial por tienda),
- un plan de compra para una lista ("mi canasta") repartida en 1, 2 o 3 tiendas,
- alertas cuando un producto baja de un precio objetivo (Telegram y correo).

Concepto de diseño: **"la canasta cotiza en bolsa"**. Los precios del mercado se presentan como cotizaciones diarias, con estética de terminal de bolsa mezclada con carteles de oferta de supermercado.

**Para qué existe el proyecto:** es un proyecto de **aprendizaje y portafolio**. El objetivo principal de Luis es **aprender web scraping** y, de paso, bases de datos, tareas programadas y despliegue. Entender cada pieza importa más que avanzar rápido. **No hay fecha límite.**

## 2. Quién es Luis (el dueño)

- Estudiante de Ingeniería de Sistemas en Cartagena, Colombia. Busca prácticas o un puesto junior full-stack; le interesan la ciberseguridad y la arquitectura de software.
- **Se siente cómodo con:** HTML/CSS, TypeScript, Next.js (su proyecto Ember usa Next.js + Prisma + Supabase y está desplegado en Vercel), Git a nivel estándar (ramas, revertir, resolver conflictos).
- **Es principiante en:** backend, bases de datos, Docker, despliegue y web scraping. Asume que no conoce el concepto hasta que lo demuestre.
- Trabaja en **Windows con PowerShell** y VS Code. Da los comandos en sintaxis de PowerShell.
- Habla español. Explícale siempre en español.
- Repositorio: `github.com/luis243e/mercado` (público). Git ya está configurado con su correo noreply de GitHub; no lo cambies.

## 3. Cómo trabajamos (el flujo)

**Modo: Claude Code escribe el código y le explica a Luis.**

En cada paso:

1. **Plan corto.** Antes de escribir, dile en 3–5 líneas qué vas a hacer y por qué. En cambios grandes (una fase nueva, cambios de estructura o de base de datos) usa el modo plan y espera su visto bueno.
2. **Pasos pequeños.** Un archivo o una función a la vez, no una fase entera de golpe. Cada paso debe poder correrse y verse funcionar.
3. **Explicación línea por línea.** Después de escribir un archivo, explícalo completo, bloque por bloque y línea por línea cuando haga falta, incluyendo los conceptos nuevos (qué es un selector CSS, una migración, un cron, una variable de entorno, etc.). Hazlo en español sencillo, con ejemplos.
4. **Que Luis lo corra.** Dale el comando exacto para PowerShell y qué resultado debe esperar. Si algo falla, explica el error antes de arreglarlo.
5. **Documenta al cerrar.** Al terminar un paso importante, una fase, o antes de un commit de cierre, usa la skill **`documentar-sesion`** para registrar en `docs/` las decisiones, los archivos explicados línea por línea, los errores y lecciones, las pruebas y los pendientes, y para mantener al día `docs/README.md`.
6. **Actualiza la sección "Estado actual"** de este archivo cuando cambie algo.

Reglas del flujo:

- **No avances de fase sin que Luis lo diga.** No agregues funciones de fases futuras "de una vez".
- **Antes de agregar una dependencia nueva**, explica qué es, para qué sirve y por qué esa y no otra. Prefiere librerías conocidas y mantenidas. Luis desconfía de paquetes y skills de terceros poco conocidos (riesgo de cadena de suministro), así que no instales nada sin explicarlo.
- **No cambies el stack** ni las decisiones de la sección 4 sin preguntar.
- Si algo es ambiguo o hay dos caminos razonables, pregunta en lugar de suponer.

## 4. Decisiones tomadas

| Tema | Decisión |
|---|---|
| Lenguaje del scraper | Python 3.12+ con entorno virtual (`venv`) y `requirements.txt` |
| Librerías de scraping | `httpx` para peticiones; `beautifulsoup4` para leer HTML; **Playwright solo si** una página necesita JavaScript para mostrar los datos (se decide con Luis) |
| Base de datos | PostgreSQL en **Supabase**. El diseño de tablas es propio, con **migraciones SQL versionadas** en el repo. Supabase se usa como base de datos, no como "backend mágico": ese es el punto que diferencia este proyecto de Ember |
| Ejecución diaria | **GitHub Actions** con `schedule` (cron). Las 6:00 a. m. de Colombia son `0 11 * * *` en UTC |
| Frontend (Fase 4) | **Next.js + TypeScript**, desplegado en **Vercel** |
| Alertas (Fase 5) | Telegram y correo |
| Repositorio | **Monorepo** (estructura en la sección 6) |
| Idioma | **Código en inglés** (variables, funciones, archivos, tablas, mensajes de commit). **Comentarios, `docs/` y explicaciones en español** |
| Pruebas | `pytest`. Los parsers se prueban con **HTML guardado** en `tests/fixtures/`, nunca contra la tienda en vivo |
| Ciudad inicial | Cartagena. Otras ciudades después |

Pendiente de decidir: otras ciudades, otras cadenas además de las cuatro, modelo de negocio.

## 5. Reglas de scraping (no negociables)

Este proyecto existe para aprender a hacer scraping **bien**. Estas reglas valen en todo momento:

1. **Leer y respetar el `robots.txt`** de cada tienda antes de pedir cualquier URL, y verificarlo en código (`urllib.robotparser`).
   - En el robots.txt de exito.com (revisado en oct. 2026): se permiten las páginas normales y la paginación (`?page=`); están prohibidos `/api/`, la búsqueda interna (`/s?`), las facetas, el ordenamiento, `/account/`, `/login` y `/checkout/`; publica sitemaps. **No uses su API interna aunque aparezca en la pestaña Network.**
2. **Ir despacio:** mínimo 2–5 segundos entre peticiones a la misma tienda y un `timeout` en cada petición.
3. **User-Agent honesto** que identifique al bot (por ejemplo `MercadoBot/0.1 (proyecto de aprendizaje)`). Nunca hacerse pasar por un navegador para esquivar bloqueos.
4. **Nada de evasión:** no usar proxies rotativos ni resolver captchas, no saltar protecciones anti-bot y no entrar a zonas con login.
5. **Si una tienda responde 403 o 429, o bloquea las IPs de GitHub Actions: parar** y decidir con Luis. No se esquiva.
6. **Caché en desarrollo:** guarda el HTML descargado para no pedir la misma página mil veces mientras se prueba.
7. **Uso personal y de aprendizaje.** No se revenden ni se publican los datos crudos de las tiendas.
8. **Cifras de ejemplo:** todos los precios, porcentajes, el índice ($187.430) y los ahorros de las maquetas son inventados. Nunca los presentes como reales. No inventes usuarios, testimonios ni prensa.
9. El aviso **"sin afiliación con ninguna cadena"** debe estar siempre visible en la app.

Al explicar estas reglas, conecta el tema con ciberseguridad cuando venga al caso: lo que un servidor ve de un bot abusivo es lo mismo que ve de un atacante.

## 6. Estructura del repositorio (objetivo)

```
mercado/
├── CLAUDE.md                  ← este archivo
├── README.md                  ← presentación pública del proyecto
├── PRODUCT.md                 ← contexto de producto (local, está en .gitignore)
├── DESIGN.md                  ← sistema de diseño (si existe; generado con Impeccable)
├── diseno/                    ← maquetas HTML de referencia (estáticas)
│   ├── index.html  producto.html  canasta.html  alertas.html
│   └── styles.css
├── scraper/
│   ├── practice/              ← Fase 0: ejercicios (scraper_libros.py, en español; se deja tal cual)
│   ├── src/mercado_scraper/   ← código del scraper real
│   ├── tests/
│   │   └── fixtures/          ← HTML guardado de cada tienda para las pruebas
│   └── requirements.txt
├── supabase/migrations/       ← Fase 2: migraciones SQL
├── web/                       ← Fase 4: app Next.js
├── .github/workflows/         ← Fase 2: scrape.yml (cron diario)
└── docs/                      ← documentación de sesiones (skill documentar-sesion)
```

Hoy las maquetas están en la raíz del repo. **La primera tarea** es moverlas a `diseno/` con `git mv` (así Git conserva su historial) y crear la estructura base.

## 7. Plan por fases

### Fase 0 — Fundamentos (practicar en un sitio hecho para eso)
- Sitio: `books.toscrape.com` (libros falsos, pensado para aprender scraping).
- `scraper/practice/scraper_libros.py` ya existe. Recorre 3 páginas y guarda título, precio, estrellas y enlace en `libros.csv`. Revisa el robots.txt, usa un User-Agent honesto y espera 2 s entre páginas.
- Pasos: (1) Luis lo corre y abre el CSV; (2) reto: guardar también la disponibilidad (`p.instock`); (3) escribir una primera prueba con `pytest` usando una página guardada como fixture.
- Conceptos que Luis debe entender al terminar: petición y respuesta HTTP, códigos de estado, Ctrl+U frente a "Inspeccionar", selectores CSS, paginación, `urljoin`, limpieza de datos, CSV.

### Fase 1 — Una tienda real: Éxito, una categoría (arroz)
- **Primero investigar, sin escribir código:** con Luis, revisar en el navegador si el precio aparece en el HTML (Ctrl+U), si hay JSON-LD (`<script type="application/ld+json">`) con nombre y precio, cómo funciona la paginación de la categoría y si **el precio depende de la ciudad o la tienda elegida** (lo más probable en tiendas VTEX).
- Extraer el nombre, el precio, la presentación (gramos o litros), la URL y la marca de tiempo; guardar en CSV.
- ⚠️ **Precios colombianos:** el punto separa miles. `"$4.290"` → `4290` (entero; los pesos no tienen centavos).
- Guardar fixtures y escribir pruebas del parser.

### Fase 2 — Base de datos e historial
- Diseñar las tablas con Luis, explicando cada decisión. Propuesta inicial, para discutir:
  - `stores` (tiendas)
  - `store_listings` (un producto tal como aparece en una tienda: nombre crudo, URL, presentación)
  - `price_snapshots` (precio de un listing en una fecha: el historial)
  - `products` (producto "canónico" que agrupa listings equivalentes; se llena en la Fase 3)
- Migraciones SQL en `supabase/migrations/`. El scraper escribe directo a PostgreSQL.
- Secretos en `.env` (nunca en Git) más un `.env.example`. En GitHub Actions van como *secrets*.
- Workflow `.github/workflows/scrape.yml` con cron diario a las 6:00 a. m. de Colombia, más `workflow_dispatch` para correrlo a mano.

### Fase 3 — Segunda tienda y normalización
- Agregar Jumbo, que usa la misma plataforma (VTEX) que el Éxito y debería parecerse.
- **Normalización:** reconocer que "ARROZ DIANA X 1000G", "Arroz Diana 1kg" y "Arroz Diana 1.000 g" son el mismo producto. Extraer cantidad y unidad y comparar por **precio por kilo o por litro**. Empezar con reglas simples y explicables.
- Después: Olímpica y D1 (estructuras distintas, buen reto).

### Fase 4 — La app web
- Next.js + TypeScript en `web/`, desplegada en Vercel.
- Seguir el diseño de `diseno/` y de `DESIGN.md`. Para pulir el diseño se puede usar la skill **Impeccable** (`/impeccable critique`, `/impeccable polish`), manteniendo la dirección visual: bolsa de valores + carteles de supermercado, fondo oscuro, Anton / Archivo / Space Mono y acento amarillo `#FFE14D`.
- Pantallas: Inicio (cinta de precios, índice canasta, lo que bajó y subió, ranking de tiendas), Producto (historial por tienda, dónde está más barato hoy, "¿compro ya o espero?"), Mi canasta (lista y tirilla de ahorro) y Alertas (móvil).
- Lectura de datos con permisos de solo lectura (políticas RLS en Supabase); la llave con permisos de administrador nunca va al frontend.

### Fase 5 — Alertas
- Precio objetivo por producto; avisos por Telegram (bot) y correo cuando se cumple, revisados después de cada corrida del scraper.

## 8. Git y seguridad

- Una rama por fase o tarea (`phase-1-exito`, `feat/price-normalizer`) y commits pequeños con mensajes en inglés (`feat: parse Exito category page`).
- **Nunca hagas push, merge ni nada irreversible sin que Luis lo pida.**
- **Nunca subas** `.env`, credenciales, tokens, `node_modules`, `.venv` ni el HTML cacheado de las tiendas. Revisa el `.gitignore` antes de cada commit.
- Si una credencial llega a un commit por error: avisa de inmediato. Hay que rotarla; borrarla en otro commit no basta.
- Nada de rutas personales (`C:\Users\...`) en archivos que se suben.

## 9. Estado actual

_Actualiza esta sección al cerrar cada sesión._

- [x] Idea y concepto definidos ("la canasta cotiza en bolsa")
- [x] Maquetas HTML de las 4 pantallas (hoy en la raíz del repo; pasan a `diseno/`)
- [x] `PRODUCT.md` creado con Impeccable (local)
- [ ] `DESIGN.md` (`/impeccable document`)
- [ ] Mover las maquetas a `diseno/` y crear la estructura del monorepo
- [ ] **Fase 0:** correr `scraper_libros.py` ← **siguiente paso**
- [ ] Fase 0: reto de disponibilidad y primera prueba con pytest
- [ ] Fase 1 · [ ] Fase 2 · [ ] Fase 3 · [ ] Fase 4 · [ ] Fase 5
