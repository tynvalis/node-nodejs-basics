import { promises as fs } from 'fs';
import path from 'path';

const read = async () => {
  const file = path.join(process.cwd(), 'files', 'fileToRead.txt');

  try {
    const content = await fs.readFile(file, 'utf-8');
    console.log(content);
  } catch {
    throw new Error('FS operation failed');
  }
};

await read();
