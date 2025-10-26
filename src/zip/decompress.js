import { createGunzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const decompress = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const sourceFilePath = path.join(__dirname, 'files', 'archive.gz');

  const destinationFilePath = path.join(
    __dirname,
    'files',
    'fileToCompress.txt'
  );

  try {
    console.log('Starting decompression...');

    const sourceStream = createReadStream(sourceFilePath);
    const gunzipStream = createGunzip();
    const destinationStream = createWriteStream(destinationFilePath);

    await pipeline(sourceStream, gunzipStream, destinationStream);

    console.log('File decompressed successfully!');
    console.log(`Output: ${destinationFilePath}`);
  } catch (error) {
    console.error('An error occurred during decompression:', error);
  }
};

await decompress();
