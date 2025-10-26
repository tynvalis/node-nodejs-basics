
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  try {

    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const hash = createHash('sha256');
    const input = createReadStream(filePath);

    input.pipe(hash);


    await new Promise((resolve, reject) => {
      hash.on('finish', resolve);
      input.on('error', reject); 
    });

    const hexHash = hash.digest('hex');
    console.log(hexHash);

  } catch (error) {
    console.error('Failed to calculate hash:', error);
  }
};

await calculateHash();