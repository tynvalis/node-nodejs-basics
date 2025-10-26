import path from 'node:path';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';


const a = await import('./files/a.json', { with: { type: 'json' } })
  .then(m => m.default)
  .catch(async () => (await import('./files/a.json')).default);

const b = await import('./files/b.json', { with: { type: 'json' } })
  .then(m => m.default)
  .catch(async () => (await import('./files/b.json')).default);


await import(pathToFileURL('./files/c.cjs').href);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const unknownObject = Math.random() > 0.5 ? a : b;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

export const createMyServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});
