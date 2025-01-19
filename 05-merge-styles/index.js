const fs = require('fs/promises');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles'); 
const distDir = path.join(__dirname, 'project-dist'); 
const outputFile = path.join(distDir, 'bundle.css'); 

async function readStylesDir() {
  try {
    const files = await fs.readdir(stylesDir, { withFileTypes: true });
    return files;
  } catch (error) {
      console.error('Error reading folder styles:', error);
      throw error;
  }   
}

function isCssFile(file) {
  return file.isFile() && path.extname(file.name) === '.css';  // Проверка расширения
}

function mergeStyles(styles) {
  console.log('merge')
}

function writeBundle(content) {
  console.log('writw')
}

async function buildBundle() {
  try {
    const stylesArray = [];
    const files = await readStylesDir();
    const cssFiles = files.filter((file) => isCssFile(file));
    return cssFiles;
  } catch (error) {
    console.error('Error creating bundle.css: ', error);
  }
}


async function testBuildBundle() {
  const arr = await buildBundle();
  console.log(arr);  
}

testBuildBundle();
