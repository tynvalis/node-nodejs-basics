import { promises as fs } from 'fs';
import path from 'path';

const copy = async () => {
  const src = path.join(process.cwd(), 'files');
  const dest = path.join(process.cwd(), 'files_copy');

  try {
    await fs.access(src);
    await fs.access(dest);
    throw new Error('FS operation failed');
  } catch {
    try {
      await fs.cp(src, dest, { recursive: true, errorOnExist: true });
    } catch {
      throw new Error('FS operation failed');
    }
  }
};

await copy();
