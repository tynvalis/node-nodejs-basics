import { Transform } from 'node:stream';

const transform = async () => {
    console.log('Enter text to reverse it. Press Ctrl+C to exit.');

  
    const reverseTransform = new Transform({
        transform(chunk, _encoding, callback) {
         
            const reversedText = chunk.toString().trim().split('').reverse().join('');
            this.push(reversedText + '\n');
            callback();
        }
    });

 
    process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();