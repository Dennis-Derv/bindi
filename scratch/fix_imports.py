import glob
import re

files = glob.glob('server/src/**/*.ts', recursive=True)
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    new_content = re.sub(r'(from\s+[\'"][^\'"]+)\.js([\'"])', r'\1\2', content)
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f'Updated imports in {f}')
print('Done!')
