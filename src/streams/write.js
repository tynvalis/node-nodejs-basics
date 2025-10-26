import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const write = async () => {
   
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

    try {
        const writableStream = createWriteStream(filePath);

        console.log('Enter text to write to file. Press Ctrl+C to finish.');

 
        process.stdin.pipe(writableStream);

        writableStream.on('finish', () => {
            console.log('\nFile has been written successfully.');
        });

    } catch (error) {
        console.error('Error writing to file:', error.message);
    }
};

await write();