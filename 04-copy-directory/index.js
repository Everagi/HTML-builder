const fs = require('fs/promises');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.mkdir(targetDir, { recursive: true });
    const files = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const file of files) {
      const sourceFilePath = path.join(sourceDir, file.name);
      const targetFilePath = path.join(targetDir, file.name);

      if (file.isFile()) {
        await fs.copyFile(sourceFilePath, targetFilePath);
        console.log(`File copied: ${file.name}`);
      }
    }
    console.log('Copying complete!');
  } catch (error) {
    console.error('Error copying:', error);
  }
}

copyDir();
