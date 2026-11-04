#!/usr/bin/env python3
"""Genera la textura de azulejo y optimiza las fotos del restaurante en WebP.

Uso: uv run --with pillow --with numpy python herramientas/preparar_imagenes.py
ORIGEN es la carpeta con las fotos recibidas. Para añadir una foto, súmala a
FOTOS y apúntala desde assets/js/config.js.
"""
import pathlib

import numpy as np
from PIL import Image, ImageFilter, ImageOps

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "assets" / "img"

ORIGEN = pathlib.Path("/Users/chobo/Desktop/Cuchara de baco")

# archivo recibido -> nombre en la web
FOTOS = {
    "caption.jpg": "local-entrada",
    "la-cuchara-de-baco.jpg": "local-comedor",
    "la-cuchara-de-bacoo.jpg": "local-fachada",
    "ccc.jpg": "plato-pasta",
    "dcd.jpg": "plato-carpaccio",
    "ddd.jpg": "plato-vino",
    "f.jpg": "plato-patatas",
    "img-20210328-wa0000-largejpg.jpg": "plato-pulpo",
    "jjj.jpg": "plato-tomate",
    "oo.jpg": "plato-carne",
    "vvvv.jpg": "plato-gyozas",
    "xcxc.jpg": "plato-pescado",
    "cm.jpg": "postre-pizarra",
    "c.jpg": "plato-brotes",
    "zxzx.jpg": "plato-pescado-oval",
    "vv.jpg": "plato-ensalada",
}
ANCHOS = (640, 1200)

# Fondo de la portada, en orden de aparición.
FONDO = ["caption.jpg", "la-cuchara-de-baco.jpg", "f.jpg", "ccc.jpg"]
FONDO_MOVIL = {2: "oo.jpg", 4: "vvvv.jpg"}  # las otras dos son fondo-1 y fondo-2


def azulejo(cols=8, filas=4, ancho=150, alto=110, junta=2.4, semilla=7):
    """Azulejo blanco cortado a mano, repetible en horizontal y vertical."""
    w, h = cols * ancho, filas * alto
    azar = np.random.default_rng(semilla)
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)

    # Ondulación periódica: los cantos no son rectos, como en la pared real.
    def onda(a, b):
        return sum(
            amp * np.sin(2 * np.pi * (fx * a / w + fy * b / h) + fase)
            for amp, fx, fy, fase in zip(
                azar.uniform(0.12, 0.4, 5),
                azar.integers(1, 7, 5),
                azar.integers(1, 5, 5),
                azar.uniform(0, 6.28, 5),
            )
        )

    xd, yd = x + onda(x, y), y + onda(y, x)
    u, v = np.mod(xd, ancho), np.mod(yd, alto)
    borde = np.minimum.reduce([u, ancho - u, v, alto - v])
    col = np.mod(np.floor(xd / ancho), cols).astype(int)
    fila = np.mod(np.floor(yd / alto), filas).astype(int)

    tono = azar.uniform(-4.5, 3.5, (filas, cols))[fila, col]
    base = np.array([240.0, 241.0, 236.0])
    img = np.ones((h, w, 3), np.float32) * base + tono[..., None]

    # Biselado del esmalte y brillo diagonal suave en cada pieza.
    bisel = np.clip(borde / 14.0, 0, 1) ** 0.6
    img *= (0.93 + 0.07 * bisel)[..., None]
    fase = azar.uniform(0, 1, (filas, cols))[fila, col]
    brillo = np.exp(-(((u / ancho + v / alto) / 2 - 0.3 - 0.4 * fase) ** 2) / 0.012)
    img += (brillo * bisel * 8.0)[..., None]

    # Junta.
    mezcla = np.clip((borde - junta / 2) / 1.2, 0, 1)[..., None]
    img = img * mezcla + np.array([172.0, 177.0, 167.0]) * (1 - mezcla)
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).filter(
        ImageFilter.GaussianBlur(0.5)
    )


def foto(archivo, nombre):
    original = ImageOps.exif_transpose(Image.open(ORIGEN / archivo)).convert("RGB")
    for ancho in ANCHOS:
        copia = original.copy()
        copia.thumbnail((ancho, ancho * 2))
        copia.save(SALIDA / f"{nombre}-{ancho}.webp", quality=76, method=6)
    print(nombre, original.size)


def fondo(archivo, nombre, ancho):
    original = ImageOps.exif_transpose(Image.open(ORIGEN / archivo)).convert("RGB")
    if original.width < ancho:
        escala = ancho / original.width
        original = original.resize((ancho, round(original.height * escala)), Image.LANCZOS)
        original = original.filter(ImageFilter.UnsharpMask(radius=2, percent=70, threshold=2))
    original.save(SALIDA / f"{nombre}.webp", quality=80, method=6)
    print(nombre, original.size)


if __name__ == "__main__":
    SALIDA.mkdir(parents=True, exist_ok=True)
    azulejo().save(SALIDA / "azulejo.webp", quality=84, method=6)
    for archivo, nombre in FOTOS.items():
        foto(archivo, nombre)
    for i, archivo in enumerate(FONDO, 1):
        fondo(archivo, f"fondo-{i}", 1400)
    for i, archivo in FONDO_MOVIL.items():
        fondo(archivo, f"fondo-movil-{i}", 1100)
