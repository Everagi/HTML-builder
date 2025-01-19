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
  return file.isFile() && path.extname(file.name) === '.css';
}

async function readCssFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
}

async function mergeStyles(styles) {
  return styles.join('\n');
}

async function writeBundle(content) {
  try {
    await fs.writeFile(outputFile, content, 'utf-8');
    console.log('File created successfully!');
  } catch (error) {
    console.error('Error writing file bundle.css:', error);
    throw error;
  }
}

async function buildBundle() {
  try {
    const files = await readStylesDir();
    const cssFiles = files.filter((file) => isCssFile(file));
    const styles = await Promise.all(
      cssFiles.map((file) => readCssFile(path.join(stylesDir, file.name))),
    );
    const bundleContent = mergeStyles(styles);
    await writeBundle(bundleContent);
  } catch (error) {
    console.error('Error creating bundle.css: ', error);
  }
}

async function testBuildBundle() {
  const arr = await buildBundle();
  console.log(arr);
}

testBuildBundle();
