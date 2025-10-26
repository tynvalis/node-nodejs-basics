import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const compress = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const destinationFilePath = path.join(__dirname, 'files', 'archive.gz');

  try {
    console.log('Starting compression...');

    const sourceStream = createReadStream(sourceFilePath);
    const gzipStream = createGzip();
    const destinationStream = createWriteStream(destinationFilePath);

    await pipeline(sourceStream, gzipStream, destinationStream);

    console.log('File compressed successfully!');
    console.log(`Output: ${destinationFilePath}`);
  } catch (error) {
    console.error('An error occurred during compression:', error);
  }
};

await compress();
