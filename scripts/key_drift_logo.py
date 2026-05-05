#!/usr/bin/env python3
"""
Chroma-key the black background out of DRIFT LOGO.png.

Strategy: per-pixel alpha = max(R, G, B). Black bg (0,0,0) becomes alpha=0;
the bright green/cyan strokes stay fully opaque. Apply a small floor + ceiling
so JPEG-ish near-black noise becomes clean transparent and bright pixels stay
crisp opaque, with a smooth band between for anti-aliased edges.
"""
from PIL import Image
import sys

src = '/Users/zakirjiwani/Downloads/DRIFT LOGO.png'
dst = '/Users/zakirjiwani/projects/piclone/public/drift-logo.png'

img = Image.open(src).convert('RGBA')
w, h = img.size
print(f'in:  {w}x{h}, mode={img.mode}', file=sys.stderr)

px = img.load()
floor, ceiling = 18, 200          # alpha thresholds
opaque_pixels = 0
for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        m = max(r, g, b)
        if m < floor:
            a = 0
        elif m > ceiling:
            a = 255
        else:
            # smooth ramp from floor → ceiling mapped to 0 → 255
            a = int((m - floor) * 255 / (ceiling - floor))
        if a > 0:
            opaque_pixels += 1
        px[x, y] = (r, g, b, a)

# Crop transparent padding around the logo (alpha-bbox crop)
bbox = img.getbbox()
if bbox:
    print(f'bbox: {bbox}  (cropping)', file=sys.stderr)
    img = img.crop(bbox)
    print(f'cropped: {img.size}', file=sys.stderr)

img.save(dst, optimize=True)
print(f'out: {dst}', file=sys.stderr)
print(f'opaque pixels: {opaque_pixels:,} ({100*opaque_pixels/(w*h):.1f}% of source)', file=sys.stderr)
