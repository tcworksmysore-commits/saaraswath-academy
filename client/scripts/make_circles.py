"""Make 320px face-centred square crops for the Home teacher circles: public/images/web/tc-<name>.webp.
Usage (from client/): python scripts/make_circles.py [contact_sheet.jpg]
Crop = square of side S*width centred at (CX*width, CY*height); tune per photo in FIX after looking at the sheet."""
import glob, os, sys
from PIL import Image

SRC, OUT, SIZE = 'public/images/faculty', 'public/images/web', 320
DEFAULT = (0.5, 0.36, 0.86)  # cx, cy, side (fractions)
FIX = {
    'sri-akash.webp': (0.5, 0.5, 1.0), 'sri-rachana.webp': (0.5, 0.5, 1.0), 'sri-sandhya-g-s.webp': (0.5, 0.45, 1.0),
    'sri-raghu-m-raj.webp': (0.505, 0.325, 0.5), 'sri-ashwini.webp': (0.5, 0.33, 0.76),
}
done = []
for p in sorted(glob.glob(f'{SRC}/*.webp')):
    name = os.path.basename(p)
    if name.startswith('p7_'):
        continue
    im = Image.open(p).convert('RGB')
    w, h = im.size
    fx, fy, fs = FIX.get(name, DEFAULT)
    side = min(fs * w, w, h)
    l = min(max(fx * w - side / 2, 0), w - side)
    t = min(max(fy * h - side / 2, 0), h - side)
    c = im.crop((round(l), round(t), round(l + side), round(t + side))).resize((SIZE, SIZE), Image.LANCZOS)
    c.save(f'{OUT}/tc-{name}', 'WEBP', quality=84, method=6)
    done.append((name, c))
if len(sys.argv) > 1:
    sheet = Image.new('RGB', (160 * len(done), 160), 'white')
    for i, (_, c) in enumerate(done):
        sheet.paste(c.resize((160, 160)), (160 * i, 0))
    sheet.save(sys.argv[1], quality=80)
print([n for n, _ in done])
