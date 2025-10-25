import { promises as fs } from 'fs';
import path from 'path';

const remove = async () => {
  const target = path.join(process.cwd(), 'files', 'fileToRemove.txt');

  try {
    await fs.access(target);
    await fs.unlink(target);
  } catch {
    throw new Error('FS operation failed');
  }
};

await remove();
