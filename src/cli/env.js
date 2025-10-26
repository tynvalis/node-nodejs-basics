export const parseEnv = () => {
  let output = [];

  for (const key in process.env) {
    if (key.startsWith('RSS_')) {
      output.push(`${key}=${process.env[key]}`);
    }
  }

  if (output.length) {
    console.log(output.join('; '));
  }
};

parseEnv();
