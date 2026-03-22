import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else if (e.name.endsWith('.tsx')) files.push(full);
  }
  return files;
}

const cardsDir = path.join(__dirname, 'src/components/cards');
const files = walk(cardsDir);

for (const fp of files) {
  let content = fs.readFileSync(fp, 'utf8');
  const match = content.match(/require\("([^"]+)"\)/);
  if (!match) continue;

  const reqPath = match[1];
  const base = path.basename(reqPath, path.extname(reqPath));
  const parts = base.split('-');
  const varName = parts[0] + parts.slice(1).map(p => p[0].toUpperCase() + p.slice(1)).join('') + 'Img';

  const importStmt = `import ${varName} from "${reqPath}";`;
  content = content.replace("import CardItem from '../../CardItem';", importStmt + "\nimport CardItem from '../../CardItem';");
  content = content.replace(`require("${reqPath}")`, varName);

  fs.writeFileSync(fp, content);
  console.log('Updated:', path.basename(fp));
}
console.log('Done! Updated card files.');
