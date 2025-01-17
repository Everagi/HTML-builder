const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const writeStream = fs.createWriteStream('filePath', { flags: 'a' });

console.log('Enter the text to write to the file. To exit, type "exit" or press Ctrl+C.');

const handleInput = (input) => {
  if (input.toLowerCase() === 'exit') {
      console.log('Goodluck!Have a nice day!');
      writeStream.end();
      rl.close();
      process.exit(0);
  } else {
      writeStream.write(input + '\n');
      console.log('The text is recorded. Enter more text or "exit" to exit.');
  }
};

rl.on('line', handleInput);

rl.on('SIGINT', () => {
  console.log('До свидания! Процесс завершен.');
  writeStream.end();
  rl.close();
  process.exit(0);
});