const fs = require('fs/promises');
const path = require('path');

// Пути
const projectDistDir = path.join(__dirname, 'project-dist');
const templateFilePath = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const outputHtmlFile = path.join(projectDistDir, 'index.html');
const outputCssFile = path.join(projectDistDir, 'style.css');
const outputAssetsDir = path.join(projectDistDir, 'assets');


async function createProjectDistDir() {
  try {
    await fs.mkdir(projectDistDir, { recursive: true });
    console.log('Folder project-dist created successfully!');
  } catch (error) {
    console.error('Error creating project-dist folder:', error);
  }
}

async function readTemplate() {
  try {
    const templateContent = await fs.readFile(templateFilePath, 'utf-8');
    return templateContent;
  } catch (error) {
    console.error('Error reading template file:', error);
    return '';
  }
}

async function test() {
  const test = await readTemplate();
  console.log(test);
}

test();