import { promises as fs } from 'fs';
import path from 'path';

const rename = async () => {
  const folder = path.join(process.cwd(), 'files');
  const oldPath = path.join(folder, 'wrongFilename.txt');
  const newPath = path.join(folder, 'properFilename.md');

  try {
    await fs.access(oldPath);
    try {
      await fs.access(newPath);
      throw new Error('FS operation failed');
    } catch {
      await fs.rename(oldPath, newPath);
    }
  } catch {
    throw new Error('FS operation failed');
  }
};

await rename();
