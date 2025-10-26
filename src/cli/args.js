export const parseArgs = () => {
  const args = process.argv.slice(2);

  const formatted = [];
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1];
    formatted.push(`${key} is ${value}`);
  }

  console.log(formatted.join(', '));
};

parseArgs();
