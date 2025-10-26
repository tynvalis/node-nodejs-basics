import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const read = async () => {

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
   
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        const readableStream = createReadStream(filePath, { encoding: 'utf8' });

    
        readableStream.pipe(process.stdout);

    
        readableStream.on('error', (err) => {
            console.error('Error reading the file:', err);
        });

    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
};

await read();