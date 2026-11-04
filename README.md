# La Cuchara de Baco: web

Web estática de cuatro páginas (HTML, CSS y JavaScript, sin framework ni compilación) para el restaurante de Av. Portugal, 5, Logroño. Se sube tal cual a cualquier alojamiento.

```
index.html              Página principal
menus.html              Los dos menús y la carta, con sus platos y precios
galeria.html            Fotos por secciones, con visor a pantalla completa
encuentranos.html       Dirección, teléfono, fachada, horario, mapa y formulario de reserva
aviso-legal.html        Página legal provisional
privacidad.html         Página legal provisional
assets/js/config.js     ← TODOS los datos editables: menús, precios, horario, enlaces y fotos
assets/js/main.js       Pinta config.js en la página. No hace falta tocarlo
assets/css/styles.css   Estilos
assets/img/             Azulejo (generado) y fotos del restaurante
assets/fonts/           League Gothic y Alegreya, alojadas aquí (sin llamadas a Google)
herramientas/           Script que genera el azulejo y optimiza las fotos
PENDIENTES.md           Lo que hay que confirmar antes de publicar. No subir al servidor
```

## Actualizar la web

Todo se edita en `assets/js/config.js`, que tiene instrucciones dentro.

- **Menús:** rellena `precio` y los `platos` de cada curso, y pon `aviso: null` cuando sean los vigentes. El espacio provisional desaparece solo.
- **Carta en imagen:** rellena `imagen`. Aparece en la hoja del menú, ampliable y descargable.
- **Fotos:** están en `galeria`, por secciones. Añádelas a `preparar_imagenes.py` y a `config.js`.
- **Fondo de la portada:** son las cuatro fotos de `fondo` en `config.js`.
- **Opiniones:** están en `valoracion` y `opiniones`. Solo citas reales.
- **Horario:** cambia `horario` y `horarioDatos` a la vez.
- **Reservas online:** el formulario es solo de vista y no envía nada. Con un sistema real, pon su URL en `enlaces.reservas` o conecta el formulario.

## Dirección de arte

El fondo de la portada es un pase lento de cuatro fotos reales a pantalla completa, con fundidos y un zoom suave, hecho solo con CSS. Solo se ve en la portada: las secciones siguientes van seguidas, sin huecos, sobre grafito, el color de la fachada. En pantallas horizontales alterna el local con platos colocados a la derecha, para que el título no los tape; en vertical usa encuadres propios. Si se ha pedido reducir el movimiento o está activo el ahorro de datos, se queda la primera foto. La letra alta y condensada recoge el carácter del logotipo actual.

La portada abre con un telón de menos de un segundo, solo la primera vez en cada sesión. Se salta con un clic o una tecla, y no aparece si se ha pedido reducir el movimiento. Las fotos entran suavemente al bajar por la página. Al cambiar de página hay una transición breve, y cada página empieza arriba, salvo los enlaces a un punto concreto como Reservar.

La galería va por secciones: «El local» y «Postres y vinos» tienen composición propia, y «Platos» se ordena en columnas sin recortar las fotos. Todas se amplían en un visor con botones y flechas del teclado.

En `menus.html` cada menú es una hoja de carta impresa sobre la pared: cursos centrados, nombre del plato en negrita y detalle en cursiva.

## Dónde está publicada

GitHub Pages, desde la rama `main`: https://crsdigitalizacion.github.io/la-cuchara-de-baco/ . Es una dirección provisional, con `noindex` para que no salga en Google. Al pasar a su dominio, quita el `noindex` de las cuatro páginas principales.

## Antes de publicar

Sigue `PENDIENTES.md`. Con el dominio definitivo, añade además `<link rel="canonical">`, `og:url`, `og:image` y un `sitemap.xml`, y rellena `dominio` en `config.js`.

## Volver a generar las imágenes

```bash
uv run --with pillow --with numpy python herramientas/preparar_imagenes.py
```
