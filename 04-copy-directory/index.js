const fs = require('fs/promises');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    
    await fs.mkdir(targetDir, { recursive: true });

 
    const sourceFiles = await fs.readdir(sourceDir, { withFileTypes: true });
    const targetFiles = await fs.readdir(targetDir, { withFileTypes: true });

    const sourceFileNames = sourceFiles.map(file => file.name);
    const targetFileNames = targetFiles.map(file => file.name);


    for (const file of sourceFiles) {
      const sourceFilePath = path.join(sourceDir, file.name);
      const targetFilePath = path.join(targetDir, file.name);

      if (file.isFile()) {
        await fs.copyFile(sourceFilePath, targetFilePath);
        console.log(`File copied: ${file.name}`);
      }
    }

  
    for (const fileName of targetFileNames) {
      if (!sourceFileNames.includes(fileName)) {
        const targetFilePath = path.join(targetDir, fileName);
        await fs.rm(targetFilePath);
      }
    }

    console.log('Sync complete!');
  } catch (error) {
    console.error('Error during synchronization:', error);
  }
}

copyDir();
