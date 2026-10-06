"""Build brand logo assets for the site from lakshya-images/brand.

Source: lakshya-images/brand/comapny logo.jpeg (1448x1086, dark artwork on cream).

Outputs (into lakshya-deploy/public/):
  laksya-logo-brand.webp   full lockup (emblem + wordmark), transparent, 640w
  laksya-emblem.webp       square emblem only, transparent, 512px
  laksya-emblem-512.png    square emblem for apple-touch-icon (PNG, iOS)
"""
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "..", "lakshya-images", "brand", "comapny logo.jpeg")
OUT = os.path.join(HERE, "..", "public")

MATTE_SCALE = 150.0   # channel distance that counts as fully opaque ink


def build():
    im = Image.open(SRC).convert("RGB")
    w, h = im.size
    px = im.load()

    # background = median of the border ring
    ring = []
    for x in range(0, w, 4):
        ring += [px[x, 1], px[x, h - 2]]
    for y in range(0, h, 4):
        ring += [px[1, y], px[w - 2, y]]
    ring.sort(key=lambda c: sum(c))
    bg = ring[len(ring) // 2]
    print("background:", bg)

    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            d = max(abs(r - bg[0]), abs(g - bg[1]), abs(b - bg[2]))
            a = min(1.0, d / MATTE_SCALE)
            if a <= 0.02:
                continue
            # un-blend the cream matte so edges do not carry a halo
            fr = (r - bg[0] * (1 - a)) / a
            fg = (g - bg[1] * (1 - a)) / a
            fb = (b - bg[2] * (1 - a)) / a
            op[x, y] = (
                max(0, min(255, int(fr))),
                max(0, min(255, int(fg))),
                max(0, min(255, int(fb))),
                int(a * 255),
            )

    alpha = out.getchannel("A")

    # Boxes read off a gridded render of the fixed source file:
    #   emblem = circular monogram + its top-right ornament (x 490..1040, y 150..740)
    #   lockup = emblem + wordmark + tagline (content 146..1343, 150..913)
    EMBLEM_BOX = (462, 132, 1070, 740)   # square, includes the ornament
    LOCKUP_BOX = (118, 118, 1372, 926)

    # ---- full lockup (tight alpha trim + pad) ----
    lockup = out.crop(LOCKUP_BOX)
    bbox = lockup.getchannel("A").point(lambda a: 255 if a > 24 else 0).getbbox()
    pad = 10
    lockup = lockup.crop(
        (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(lockup.width, bbox[2] + pad),
            min(lockup.height, bbox[3] + pad),
        )
    )
    scale = 480.0 / lockup.width
    lockup = lockup.resize((480, max(1, round(lockup.height * scale))), Image.LANCZOS)
    lockup.save(os.path.join(OUT, "laksya-logo-brand.webp"), "WEBP", quality=80, method=6)
    print("lockup:", lockup.size, os.path.getsize(os.path.join(OUT, "laksya-logo-brand.webp")) // 1024, "KB")

    # ---- square emblem ----
    emblem = out.crop(EMBLEM_BOX)
    emblem = emblem.resize((512, 512), Image.LANCZOS)
    emblem.save(os.path.join(OUT, "laksya-emblem.webp"), "WEBP", quality=85, method=6)
    emblem.save(os.path.join(OUT, "laksya-emblem-512.png"), "PNG", optimize=True)
    print("emblem:", emblem.size, os.path.getsize(os.path.join(OUT, "laksya-emblem.webp")) // 1024, "KB webp")


if __name__ == "__main__":
    build()
