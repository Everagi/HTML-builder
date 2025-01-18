const fs = require('fs/promises');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');

async function displayFilesInfo() {
  try {
    const files = await fs.readdir(secretFolder, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(secretFolder, file.name);
        const stats = await fs.stat(filePath);
        const fileName = path.parse(file.name).name;
        const fileExt = path.extname(file.name).slice(1);
        const fileSize = stats.size;
        const fileSizeKB = fileSize / 1024;
        console.log(`${fileName} - ${fileExt} - ${fileSize}`);
      }
    }
  } catch (error) {
    console.error('Error reading folder:', error);
  }
}

displayFilesInfo();
