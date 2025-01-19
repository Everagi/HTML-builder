const fs = require('fs/promises');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles'); 
const distDir = path.join(__dirname, 'project-dist'); 
const outputFile = path.join(distDir, 'bundle.css'); 

async function readStylesDir() {
    try {
        const files = await fs.readdir(stylesDir, { withFileTypes: true });
        return files;
    }catch (error) {
        console.error('Error reading folder styles:', error);
        throw error; // Пробрасываем ошибку
    }   
}

async function checkup() {
    try {
      const files = await readStylesDir();
      console.log('Содержимое папки styles:', files);
    } catch (error) {
      console.error('Ошибка процессе:', error);
    }
  }
  
  checkup();