import { Worker } from 'node:worker_threads';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const performCalculations = async () => {
  const numCPUs = os.cpus().length;
  console.log(`Initializing calculations on ${numCPUs} CPU cores.`);

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const workerPath = path.join(__dirname, 'worker.js');

  const workerPromises = [];
  const startingNum = 10;

  for (let i = 0; i < numCPUs; i++) {
    const workerPromise = new Promise((resolve) => {
      const worker = new Worker(workerPath);
      const dataToSend = startingNum + i;

      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });

      worker.postMessage(dataToSend);
    });

    workerPromises.push(workerPromise);
  }

  const results = await Promise.all(workerPromises);
  console.log(results);
};

await performCalculations();
