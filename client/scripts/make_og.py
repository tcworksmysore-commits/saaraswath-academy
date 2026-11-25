# Makes 1200x630 WhatsApp/Facebook share images (public/images/og/*.jpg), favicon.ico and the touch icon.
# Run from client/:  python scripts/make_og.py
from PIL import Image, ImageDraw, ImageFilter, ImageFont

FR = 'node_modules/@fontsource/fraunces/files/fraunces-latin-600-normal.woff2'
JK = 'node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-{}-normal.woff2'
NAVY, GOLD, INK, MUTED, CREAM = (16, 38, 79), (217, 154, 11), (154, 106, 0), (85, 104, 138), (251, 248, 241)
W, H = 1200, 630

PAGES = {  # file: (line 1, line 2, photo key)
    'home': ('IAS & KAS coaching', 'in Mysuru', 'academy-front'),
    'ias': ('IAS coaching', 'in Mysuru', 'reading-hall'),
    'kas': ('KAS coaching', 'in Mysuru', 'classroom-a'),
    'psi': ('PSI & PC coaching', 'in Mysuru', 'study-hall'),
    'foundation': ('IAS/KAS foundation', 'for degree students', 'classroom-b'),
    'optional': ('Kannada Literature', 'optional coaching', 'seminar'),
}


def font(path, size):
    return ImageFont.truetype(path, size)


def card(name):
    img = Image.new('RGB', (W, H), CREAM)
    d = ImageDraw.Draw(img)
    # soft warm glow top-right, cool glow bottom-left
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    g.ellipse((760, -260, 1400, 300), fill=(255, 236, 190, 150))
    g.ellipse((-260, 380, 300, 900), fill=(220, 232, 252, 160))
    img.paste(glow.filter(ImageFilter.GaussianBlur(80)), (0, 0), glow.filter(ImageFilter.GaussianBlur(80)))
    return img, d


def make(key, l1, l2, photo):
    img, d = card(key)
    # framed straight photo on the right with a soft shadow
    ph = Image.open(f'public/images/web/{photo}-720.webp').convert('RGB')
    pw, phh = 540, 405
    ph = ph.resize((pw, int(ph.height * pw / ph.width)), Image.LANCZOS)
    top = (ph.height - phh) // 2
    ph = ph.crop((0, top, pw, top + phh))
    x, y = 612, (H - phh) // 2 - 4
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle((x - 2, y + 18, x + pw + 22, y + phh + 40), 26, fill=(16, 38, 79, 70))
    sh = sh.filter(ImageFilter.GaussianBlur(22))
    img.paste(sh, (0, 0), sh)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((x - 10, y - 10, x + pw + 10, y + phh + 10), 22, fill=(255, 255, 255))
    mask = Image.new('L', (pw, phh), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, pw, phh), 16, fill=255)
    img.paste(ph, (x, y), mask)
    # text block
    lx = 64
    d.rounded_rectangle((lx, 110, lx + 300, 150), 20, fill=(255, 255, 255), outline=(240, 220, 165), width=2)
    d.ellipse((lx + 16, 124, lx + 28, 136), fill=(24, 169, 87))
    d.text((lx + 38, 130), 'Kuvempunagar, Mysuru', font=font(JK.format(700), 19), fill=INK, anchor='lm')
    size = 58
    f1 = font(FR, size)
    while max(d.textlength(l1, font=f1), d.textlength(l2, font=f1)) > 510:
        size -= 2
        f1 = font(FR, size)
    d.text((lx, 190), l1, font=f1, fill=NAVY)
    d.text((lx, 190 + int(size * 1.15)), l2, font=f1, fill=INK)
    yb = 190 + int(size * 2.35) + 26
    d.rounded_rectangle((lx, yb, lx + 64, yb + 5), 3, fill=GOLD)
    d.text((lx, yb + 26), 'Saaraswath IAS/KAS Academy', font=font(JK.format(700), 27), fill=NAVY)
    d.text((lx, yb + 66), 'Free call with a mentor · 76194 15566', font=font(JK.format(500), 22), fill=MUTED)
    img.save(f'public/images/og/{key}.jpg', quality=84, optimize=True, progressive=True)


import os
os.makedirs('public/images/og', exist_ok=True)
for k, (a, b, p) in PAGES.items():
    make(k, a, b, p)

# favicon (16/32/48) + 180px touch icon from the tight logo, centred on white
logo = Image.open('public/images/logo/academy-logo-tight.webp').convert('RGBA')
side = max(logo.size)
sq = Image.new('RGBA', (side, side), (255, 255, 255, 0))
sq.paste(logo, ((side - logo.width) // 2, (side - logo.height) // 2), logo)
sq.resize((48, 48), Image.LANCZOS).save('public/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
touch = Image.new('RGB', (180, 180), (255, 255, 255))
t = sq.resize((156, 156), Image.LANCZOS)
touch.paste(t, (12, 12), t)
touch.save('public/apple-touch-icon.png', optimize=True)
print('done')
