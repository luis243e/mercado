---
name: Mercado
description: La canasta cotiza en bolsa. Pizarra de cotizaciones con el lenguaje del supermercado colombiano.
colors:
  pizarra: "#0E0F12"
  pizarra-franja: "#121318"
  pizarra-panel: "#141519"
  pizarra-campo: "#17191E"
  tiza: "#F3F1EA"
  tiza-media: "#C9CDD4"
  tiza-tenue: "#A3A8B2"
  raya: "#2A2D35"
  borde-control: "#646A75"
  gris-barra: "#8E939C"
  amarillo-etiqueta: "#FFE14D"
  verde-rebaja: "#45E77A"
  naranja-alza: "#FF6A2B"
  rosa-error: "#FF7A8A"
  gris-igual: "#A3A8B2"
  papel-tirilla: "#FBFAF6"
  tinta-tirilla: "#17191E"
  tinta-tirilla-tenue: "#4A4E57"
  fondo-vista-previa: "#07080A"
  oliva-sobre-amarillo: "#4A4316"
  borde-sobre-amarillo: "#6E6326"
  rojo-error-sobre-amarillo: "#8A1C00"
typography:
  display:
    fontFamily: "Anton, Archivo, sans-serif"
    fontSize: "clamp(52px, 8vw, 96px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.5px"
  headline:
    fontFamily: "Anton, Archivo, sans-serif"
    fontSize: "clamp(34px, 4.5vw, 48px)"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "Anton, Archivo, sans-serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.05
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "1px"
  data:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "17px"
    fontWeight: 700
    fontFeature: "tnum"
rounded:
  none: "0px"
  pill: "999px"
  fab: "50%"
spacing:
  gutter-desktop: "40px"
  gutter-mobile: "16px"
  tap: "44px"
  section: "72px"
  panel: "28px"
components:
  button-primary:
    backgroundColor: "{colors.amarillo-etiqueta}"
    textColor: "{colors.pizarra}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0 28px 0 40px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.tiza}"
    textColor: "{colors.pizarra}"
  button-primary-on-yellow:
    backgroundColor: "{colors.pizarra}"
    textColor: "{colors.amarillo-etiqueta}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.tiza}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.tiza}"
    textColor: "{colors.pizarra}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.tiza}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "44px"
  input:
    backgroundColor: "{colors.pizarra-campo}"
    textColor: "{colors.tiza}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "56px"
  delta-baja:
    backgroundColor: "{colors.verde-rebaja}"
    textColor: "{colors.pizarra}"
    typography: "{typography.data}"
    padding: "5px 10px"
  delta-sube:
    backgroundColor: "{colors.naranja-alza}"
    textColor: "{colors.pizarra}"
    typography: "{typography.data}"
    padding: "5px 10px"
  toast:
    backgroundColor: "{colors.tiza}"
    textColor: "{colors.pizarra}"
    rounded: "{rounded.none}"
    padding: "4px 6px 4px 18px"
  city-pill:
    backgroundColor: "transparent"
    textColor: "{colors.tiza}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  panel:
    backgroundColor: "{colors.pizarra-panel}"
    rounded: "{rounded.none}"
    padding: "28px"
---

# Design System: Mercado

## Overview

**Creative North Star: "La pizarra de la plaza"**

Mercado es un tablero de cotizaciones de bolsa pintado con el lenguaje del supermercado colombiano. De la bolsa toma la cinta de precios que corre, el índice con su gráfico, los símbolos de producto (ARZ·1K) y los cambios ▲▼ en porcentaje. Del supermercado toma la estrella amarilla de oferta, la etiqueta de precio que cuelga, la tirilla de papel con código de barras y la voz que tutea. La combinación es la idea: los precios de la comida se miran con la seriedad de una cotización, pero se cuentan con el humor de la plaza.

El tono es seguro, directo y con humor. Las cifras grandes afirman, los textos cortos deciden ("Compra ya.", "Te ahorras $6.520") y el guiño va en los detalles: la estrella inclinada, la etiqueta que se balancea, "Gracias por no pagar de más". La pizarra es oscura porque se lee como tablero, y deja que el amarillo y las señales de precio lleven toda la atención. La densidad es media: los números van en monoespaciada y alineados, con aire entre bloques.

**Key Characteristics:**
- Fondo de pizarra casi negra, tinta clara cálida, un solo amarillo de marca.
- Titulares en Anton, todo en mayúsculas, condensados y enormes; datos en Space Mono con números tabulares; el texto corrido en Archivo.
- Señales de precio con significado fijo: verde = bajó, naranja = subió, gris = igual. Siempre acompañadas de ▼ ▲ = o de texto.
- Formas rectas, sin sombras: profundidad por tono de superficie y por bordes.
- Objetos del supermercado como componentes: estrella de oferta, etiqueta de precio, tirilla.

## Colors

Una pizarra neutra y oscura donde solo tres colores hablan, y cada uno dice una sola cosa.

### Primary
- **Amarillo etiqueta** (amarillo-etiqueta): la marca y "lo mejor". Logo, botón principal, "La más barata", "MEJOR", la línea de la tienda más barata en los gráficos, la estrella de oferta, el anillo de foco y la selección de texto.

### Secondary
- **Verde rebaja** (verde-rebaja): el precio bajó, bueno para quien compra. Badges ▼, la línea del índice cuando baja, el veredicto "Compra ya", alerta cumplida.
- **Naranja alza** (naranja-alza): el precio subió, malo para quien compra. Badges ▲, el veredicto "Espera", la tendencia "subiendo", acciones destructivas en menús.
- **Rosa error** (rosa-error): solo fallos del sistema ("No pudimos crear la alerta"), siempre con ícono y texto. Nunca aparece junto a una señal de precio. Las confirmaciones y los avisos informativos son neutros: borde de tiza e ícono en tiza.

### Neutral
- **Pizarra** (pizarra): fondo de página.
- **Pizarra franja / panel / campo** (pizarra-franja, pizarra-panel, pizarra-campo): tres escalones de elevación tonal. La franja va en la cinta y en las bandas de sección, el panel en tarjetas de datos y el campo en entradas y pistas de barras.
- **Tiza / tiza media / tiza tenue** (tiza, tiza-media, tiza-tenue): texto principal, texto de apoyo y etiquetas o metadatos. La tiza tenue tiene 7,4:1 o más sobre todas las superficies.
- **Raya** (raya): separadores y retículas decorativas.
- **Gris barra** (gris-barra): las barras de las tiendas que no son la más barata en el ranking, la raya punteada de subtotal en la tirilla y el texto de ejemplo de los campos.
- **Borde de control** (borde-control): el contorno de cualquier cosa que se toca. Tiene 3,2:1 o más contra todas las superficies.
- **Papel, tinta y tinta tenue de tirilla**: el único fondo claro, reservado a la tirilla de ahorro.
- **Fondo de vista previa** (fondo-vista-previa): solo alrededor del teléfono de 390 px cuando Alertas se mira en escritorio. No es parte del producto.
- **Borde sobre amarillo** (borde-sobre-amarillo): el contorno de los controles dentro de superficies amarillas, como las opciones de canal de la alerta (4,6:1).
- **Oliva sobre amarillo / rojo error sobre amarillo**: texto secundario y mensajes de error dentro de superficies amarillas (7,7:1 y 7,2:1).

### Named Rules
**The One Job Rule.** Cada color tiene un solo trabajo. El amarillo nunca significa "bajó", el verde nunca identifica una tienda y el naranja nunca adorna.

**The Stores Are Words Rule.** Las tiendas no tienen color propio. Se nombran con texto y, en los gráficos, se distinguen por grosor y tipo de línea: la más barata va en amarillo y gruesa, las demás en tiza, continua, discontinua o punteada.

**The Never Alone Rule.** Ningún significado depende solo del color. Cada señal lleva ▼ ▲ = o una palabra ("Cumplida", "Faltan $290"), y el lector de pantalla oye "bajó" o "subió".

**The Accent Guard Rule.** Si se cambia el acento de marca, no puede ser verde, naranja ni rosa.

**The Where And When Rule.** Ningún precio aparece sin ciudad y hora. El selector de ciudad del encabezado dice "Cartagena · hoy 6:00 a. m." en todas las pantallas de escritorio; en la vista móvil de Alertas la ciudad abre el subtítulo, y la tirilla la repite.

**The One Source Rule.** Todos los números de ejemplo salen de un mismo conjunto de datos: el gráfico, el rango del veredicto, la ayuda de la alerta y la tirilla tienen que poder comprobarse entre sí.

## Typography

**Display Font:** Anton (con Archivo y sans-serif de respaldo)
**Body Font:** Archivo (con system-ui)
**Label/Mono Font:** Space Mono (con ui-monospace)

**Character:** Anton es el titular de cartel de plaza: condensado, en mayúsculas, que grita el precio. Space Mono es la cinta de la bolsa, la registradora y la tirilla: todo lo que es dato o medida. Archivo es la voz que explica, neutra y legible.

### Hierarchy
- **Display** (400, clamp(52px, 8vw, 96px), 0.95, mayúsculas): un solo titular por pantalla (h1) y la respuesta del veredicto. En Producto el h1 baja a clamp(40px, 5vw, 60px) y el precio a clamp(48px, 5.5vw, 64px), para que "COMPRA YA." sea lo más grande.
- **Headline** (400, clamp(34px, 4.5vw, 48px), 1, mayúsculas): títulos de sección en Hoy y en Estados.
- **Title** (400, 28px, 1.05, mayúsculas): títulos de paneles ("Dónde está hoy", "Avísame cuando baje") y el texto del botón principal.
- **Body** (400, 16px, 1.5): explicaciones, con un máximo de 46 a 70 caracteres por línea según el bloque.
- **Lead** (400, 19px, 1.5, 58ch máx.): el párrafo de entrada debajo del h1.
- **Label** (Space Mono 13px, +1px de espaciado, mayúsculas): nombres de campos, encabezados de datos y la fecha de la tirilla.
- **Data** (Space Mono 700, números tabulares, mínimo 13 px): precios, porcentajes y cantidades.

### Named Rules
**The Mono Means Measured Rule.** Space Mono se usa solo para lo que es dato, medida o registro: precios, porcentajes, fechas, códigos y etiquetas de campo. Nunca para texto corrido: notas de sección, líneas de fecha y explicaciones van en Archivo. Las cifras en Space Mono no bajan de 13 px.

**The No Kicker Rule.** No va una etiqueta pequeña encima de un titular. Si hace falta contexto, va debajo del titular como línea de apoyo, o el titular lo dice solo.

## Layout

Contenedor de 1320 px de ancho máximo, con márgenes laterales de 40 px en escritorio y 16 px desde 760 px hacia abajo. Las composiciones usan flex con `flex-wrap` y bases grandes (por ejemplo `999 1 560px` frente a `1 1 380px`), así que las columnas se apilan solas sin necesidad de una retícula fija. Las secciones se separan con 72 px; dentro de un panel el relleno es de 28 px en escritorio y de 16 a 20 px en móvil.

En 760 px o menos ocurre lo siguiente:
- La navegación superior se esconde y aparece una barra inferior fija de cuatro pestañas (Hoy, Productos, Mi canasta, Alertas), con los mismos nombres que en escritorio.
- Las filas de datos se reorganizan en dos líneas.
- El ranking de tiendas se apila: tienda y total arriba, barra abajo.
- Los gráficos cambian a una versión dibujada para pantalla angosta, con etiquetas a tamaño real.
- En Mi canasta, una barra fija con el total y el ahorro queda encima de las pestañas.

La pantalla de Alertas se previsualiza en escritorio como un teléfono de 390 px sobre fondo-vista-previa, y ocupa toda la pantalla en un teléfono real (480 px o menos).

**The Tap Floor Rule.** Todo lo que se toca mide al menos 44 px de alto.

## Elevation & Depth

Mercado es plano. La profundidad sale de la escalera tonal (pizarra, franja, panel, campo) y de bordes de 1 px. La única sombra del sistema (`0 12px 28px rgba(0,0,0,0.45)`) es para lo que flota sobre el contenido: el menú "…" de cada alerta, el panel de nueva alerta y los avisos flotantes.

**The Flat Board Rule.** Nada proyecta sombra en reposo. Las tarjetas se distinguen por superficie y borde, nunca por sombra, y nunca con sombras duras desplazadas.

## Shapes

Todo es recto: los paneles, las entradas, los badges y los botones tienen 0 px de radio. Las únicas curvas son las de objetos que también son redondos en la vida real: los chips de búsqueda y el botón de ciudad (999 px, como etiquetas de góndola) y el botón flotante "Nueva alerta" (círculo).

Las siluetas propias del sistema vienen del supermercado:
- la estrella de oferta, un polígono de 40 puntas;
- la etiqueta de precio, con punta a la izquierda y orificio;
- el borde dentado de la tirilla.

Las inclinaciones son pequeñas y escasas: −4° en la etiqueta del logo, −6° a −8° en la estrella y 1,5° en la tirilla, esta solo desde 1100 px.

## Components

### Buttons
- **Shape:** Rectos (0 px), salvo el principal, que tiene forma de etiqueta de precio.
- **Primary (etiqueta de precio):** amarillo con texto de pizarra, Anton en mayúsculas, 56 px de alto. La forma tiene punta a la izquierda (`clip-path`) y un orificio de 9 px del color del fondo. Se dibuja en `::before`, de modo que el anillo de foco rodea el botón completo.
  - **Hover:** se balancea −2,5° desde el orificio, como una etiqueta colgada (260 ms, ease-out exponencial), y pasa a tiza.
  - **Active:** se endereza y se hunde al 97 %.
  - **Movimiento reducido:** sin balanceo.
- **Sobre amarillo:** la misma etiqueta, invertida: pizarra con texto amarillo y orificio amarillo.
- **Secundario:** contorno de 1 px en tiza y texto en tiza. Al pasar el cursor se invierte a fondo tiza.
- **Pasos numerados:** cuando un orden importa ("Así funciona"), el número va en una etiqueta de precio amarilla pequeña con punta y orificio, no en numerales contorneados.
- **Íconos (agregar):** cuadro de 44 px con borde de control. Al pasar el cursor se llena de amarillo. En el "+" de Mi canasta y en el de "Nueva alerta", la cruz gira 90° al pasar el cursor; el de "Nueva alerta" queda girado 45° (una ×) mientras su panel está abierto.

### Chips
- **Style:** píldora con contorno de control, texto en tiza y 44 px de alto. Al pasar el cursor el borde se vuelve amarillo.

### Cards / Containers
- **Corner Style:** recto (0 px).
- **Background:** pizarra-panel, con borde de 1 px en raya.
- **Shadow Strategy:** ninguna (ver Elevation & Depth).
- **Internal Padding:** 28 px, o 16 a 24 px en filas.
- **Variante con señal:** las columnas "Bajaron" y "Subieron" llevan un borde superior de 6 px en verde o naranja.

### Inputs / Fields
- **Style:** fondo pizarra-campo, borde de 2 px en tiza y 56 a 64 px de alto. La etiqueta va arriba, en Space Mono y mayúsculas.
- **Dinero:** el "$" es un prefijo fijo fuera del valor y el campo acepta solo números (`inputmode="numeric"`).
- **Focus:** anillo amarillo de 3 px separado 3 px; sobre amarillo o papel, el anillo es de pizarra.
- **Error:** contorno de 3 px separado 3 px del campo (sobre amarillo, en rojo-error-sobre-amarillo), con un mensaje debajo que dice qué escribir ("Escribe solo el número, por ejemplo 4.000."). La validación es propia (`novalidate`): nunca la burbuja del navegador. Un campo vacío se avisa al enviar, no mientras se escribe.

### Navigation
- **Selector de ciudad:** píldora a la derecha del encabezado en todas las pantallas, con pin, el nombre de la ciudad y la hora de los precios separada por una raya ("Cartagena | hoy 6:00 a. m."). En móvil, cuando comparte fila con el buscador, muestra solo la ciudad.
- **Escritorio:** Archivo 600 a 15 px, en tiza tenue, con 44 px de alto. La página activa va en tiza con un subrayado amarillo de 3 px.
- **Móvil:** barra inferior fija con ícono más etiqueta. La pestaña activa va en amarillo.
- **Saltar al contenido:** primer elemento enfocable de cada pantalla.

### Controles segmentados
Son radios nativos con forma de botón: periodo del gráfico, marca, número de tiendas. La opción elegida va rellena en tiza. Se usan siempre que haya que escoger una sola opción entre varias, en lugar de botones con `aria-pressed`.

### Avisos flotantes
Barra en tiza con texto en pizarra que aparece abajo, centrada, después de una acción: "Agregaste 1 × … a tu canasta · Ver canasta", "Sacaste… de la lista · Deshacer", "Borraste la alerta… · Deshacer". En móvil se ubica sobre la barra de pestañas; en la vista previa de Alertas, dentro del teléfono.
- **Accesible:** la región con `role="status"` existe desde que carga la página. Dura 10 segundos y se pausa solo cuando la persona pone el cursor o el foco encima (el foco que mueve el código no la pausa); Escape la cierra. Oculta, no se puede enfocar. Tab desde el aviso vuelve a la lista, nunca se escapa al final de la página.
- **Deshacer:** toda acción que borra algo ofrece "Deshacer" en lugar de pedir confirmación antes. El foco va al botón "Deshacer"; si el aviso se cierra solo, el foco pasa a la fila siguiente (o al título de la lista), nunca al inicio de la página.

### Menús y paneles desplegables
El menú "…" de cada alerta y el panel "Nueva alerta" son `<details>` nativos: solo uno abierto a la vez, y se cierran con Escape (devolviendo el foco a su botón), con un clic afuera o cuando el foco sale. El botón "+" de nueva alerta gira a "×" mientras el panel está abierto.

### Selector de plan (Mi canasta)
Tres tarjetas de radio nativo (1, 2 o 3 tiendas) que muestran su resultado antes de elegir: la tienda y el total del plan de 1, y el ahorro de los planes de 2 y 3. Si una tienda más ahorra menos que un pasaje, la tarjeta lo advierte en naranja y dice el supuesto ("solo $550 más que con 2: menos que un pasaje ($3.000)").

**The Complete Store Rule.** El ahorro se mide contra la tienda más barata entre las que tienen TODA la lista, y se dice por qué: "Olímpica, la única que tiene todo. D1 sería más barata, pero no tiene café". Si la persona cambia la lista, la tienda de comparación se recalcula. Elegir un plan reorganiza la lista por tienda, la tirilla y la barra del total, y lo anuncia al lector de pantalla.

### Equivalentes por kilo
Cuando se comparan marcas distintas, se dice: "4 productos equivalentes de 3 marcas", la marca va en cada fila de "Dónde está hoy" y el emparejamiento se titula "Equivalentes por kilo", nunca "producto único". "Cualquier marca" es lo predeterminado y "Solo [marca]" está siempre a un toque.

### Cinta de cotizaciones (signature)
Franja de ancho completo que se desplaza en 60 s, con el mejor precio de hoy por producto:
- **Rótulo fijo a la izquierda:** "MEJOR PRECIO · CAMBIO VS. AYER" (en móvil, solo "MEJOR PRECIO").
- **Contenido de cada producto:** nombre, precio, tienda y cambio ▲▼ con texto oculto para lector de pantalla.
- **Botón de pausa:** obligatorio, de 44 px; su estado lo dice `aria-pressed`.
- **Copia de la cinta:** se duplica para que el ciclo no tenga corte, y la copia lleva `aria-hidden`.
- **Movimiento reducido:** la cinta se detiene, queda con scroll manual y oculta la copia.

### Estrella de oferta (signature)
Polígono amarillo inclinado que solo anuncia que un precio bajó: "LA QUE MÁS BAJÓ" en Hoy (siempre la mayor bajada del día) y "¡BAJÓ!" en Alertas cuando se cumple una meta. Es más chica que el buscador para que la acción principal de Hoy sea buscar. Lleva el porcentaje o la palabra en Anton y el precio en Space Mono. Al pasar el cursor gira 6°.

### Veredicto (signature)
Bloque con borde de 2 px que responde "¿Compro ya o espero?" con una de tres respuestas en Anton:
- **Compra ya:** verde.
- **Espera:** naranja.
- **Da igual:** tiza con borde de control.

En Producto, la respuesta del veredicto es lo más grande de la pantalla (hasta 96 px), por encima del nombre del producto (hasta 60 px) y del precio (hasta 64 px): el precio es su evidencia. En móvil, la etiqueta del promedio baja a una segunda fila para no pisar el máximo.

La regla es por posición del precio de hoy dentro de los últimos 90 días en la tienda más barata:
- **Compra ya:** hoy está más barato que al menos 3 de cada 4 días.
- **Espera:** hoy está más caro que al menos 3 de cada 4 días.
- **Da igual:** cualquier punto intermedio.

Debajo de la respuesta va el dato verificable en una frase ("Hoy está más barato que 88 de los últimos 90 días") y una barra de rango con mínimo, promedio (raya) y hoy (punto del color del veredicto). Cierra con el aviso "puede variar en tienda" y el desplegable "Cómo lo decidimos", que repite esta misma regla.

### Tirilla de ahorro (signature)
Recibo de papel claro con bordes dentados, todo en Space Mono. Como es lo que se comparte por WhatsApp y se lleva a la tienda, su encabezado lleva fecha, hora y ciudad ("20/10/2026 · 6:00 A. M. · CARTAGENA") y cierra con "Precios en línea de hoy a las 6:00 a. m. En la tienda pueden variar". Agrupa por tienda con subtotales y muestra el total, el precio tachado de comprar todo en una tienda y el bloque "TE AHORRAS" en pizarra con el número en amarillo. Debajo explica contra qué se compara el ahorro y cierra con el código de barras y "GRACIAS POR NO PAGAR DE MÁS".

## Do's and Don'ts

### Do:
- **Do** reservar el amarillo (#FFE14D) para marca, "lo mejor", foco y la acción principal de cada pantalla.
- **Do** acompañar cada verde o naranja con ▼ ▲ = o una palabra, y con texto oculto "bajó" o "subió" para el lector de pantalla.
- **Do** mostrar el precio por unidad ("$4.290 el kilo", "$530 cada uno") junto al precio de cada producto.
- **Do** poner junto a cada recomendación de qué hacer la hora del dato y el aviso "en tienda puede variar".
- **Do** usar Space Mono con números tabulares para todo número que se compare en columna.
- **Do** dibujar una versión móvil propia de cada gráfico en lugar de encoger el de escritorio.
- **Do** mantener "Proyecto independiente · sin afiliación con ninguna cadena" visible en el pie de cada pantalla.
- **Do** ofrecer "Deshacer" en un aviso flotante después de sacar o borrar algo.

### Don't:
- **Don't** dar a una tienda un color propio, ni usar verde o naranja para identificar tiendas.
- **Don't** usar la estrella de oferta como adorno: solo anuncia una bajada de precio.
- **Don't** poner etiquetas pequeñas en mayúsculas encima de un titular ni de un precio protagonista.
- **Don't** usar sombras en tarjetas, ni sombras duras desplazadas.
- **Don't** redondear paneles, entradas o botones rectangulares; las únicas curvas son chips, el botón de ciudad y el botón flotante.
- **Don't** pasar de 96 px en titulares de pantalla.
