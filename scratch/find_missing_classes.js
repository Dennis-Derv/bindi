const fs = require('fs');
const path = require('path');

const classes = new Set();

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) scan(full);
    else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const code = fs.readFileSync(full, 'utf8');
      const matches = code.matchAll(/className=["']([^"']+)["']/g);
      for (const m of matches) {
        for (const p of m[1].split(/\s+/)) {
          if (p.trim() && !p.includes('${')) classes.add(p.trim());
        }
      }
    }
  }
}

scan('src');
console.log('TOTAL UNIQUE CLASSES:', classes.size);
const css = fs.readFileSync('src/app/globals.css', 'utf8');
const missing = [];
for (const c of classes) {
  if (!css.includes(c)) {
    missing.push(c);
  }
}
console.log('POTENTIALLY MISSING CLASSES (' + missing.length + '):');
console.log(JSON.stringify(missing, null, 2));
