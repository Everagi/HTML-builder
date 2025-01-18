const fs = require('fs/promises');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.mkdir(targetDir, { recursive: true });
    const files = await fs.readdir(sourceDir, { withFileTypes: true });
  } catch (error) {
    console.error('Error copying:', error);
  }
}
