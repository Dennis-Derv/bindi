import urllib.request
import re

res = urllib.request.urlopen('http://localhost:3000')
html = res.read().decode('utf-8')
print('HTML length:', len(html))

matches = re.findall(r'href="(/_next/static/css/[^"]+)"', html)
print('CSS links matched:', matches)

for m in matches:
    css_res = urllib.request.urlopen('http://localhost:3000' + m)
    css_text = css_res.read().decode('utf-8')
    print('Stylesheet URL:', m)
    print('Stylesheet size:', len(css_text), 'bytes')
    print('Has .bkc-header:', '.bkc-header' in css_text)
    print('Has .hero-main-image-card:', '.hero-main-image-card' in css_text)
    print('Has .nav-links-desktop:', '.nav-links-desktop' in css_text)
    print('Has .btn-primary:', '.btn-primary' in css_text)
