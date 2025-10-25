import { promises as fs } from 'fs';
import path from 'path';

const list = async () => {
  const dir = path.join(process.cwd(), 'files');

  try {
    const files = await fs.readdir(dir);
    console.log(files);
  } catch {
    throw new Error('FS operation failed');
  }
};

await list();
