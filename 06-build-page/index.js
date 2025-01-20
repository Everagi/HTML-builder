const fs = require('fs/promises');
const path = require('path');

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

async function replaceTemplateTags(templateContent) {
  const tagRegex = /\{\{([^{}]+)\}\}/g;
  let result = templateContent;

  const matches = [...templateContent.matchAll(tagRegex)];
  for (const match of matches) {
    const tagName = match[1].trim();
    const componentFilePath = path.join(componentsDir, `${tagName}.html`);

    try {
      const componentContent = await fs.readFile(componentFilePath, 'utf-8');
      result = result.replace(match[0], componentContent);
    } catch (error) {
      console.error(`Error reading component file ${tagName}:`, error);
    }
  }
  return result;
}

async function writeHtmlFile(content) {
  try {
    await fs.writeFile(outputHtmlFile, content, 'utf-8');
    console.log('File index.html created successfully!');
  } catch (error) {
    console.error('Error writing index.html file:', error);
  }
}

async function compileStyles() {
  try {
    const files = await fs.readdir(stylesDir, { withFileTypes: true });
    const cssFiles = files.filter(file => file.isFile() && path.extname(file.name) === '.css');
    const styles = await Promise.all(
      cssFiles.map(file => fs.readFile(path.join(stylesDir, file.name), 'utf-8'))
    );
    const bundleContent = styles.join('\n');
    await fs.writeFile(outputCssFile, bundleContent, 'utf-8');
    console.log('File style.css created successfully!');
  } catch (error) {
    console.error('Error compiling styles:', error);
  }
}

async function copyAssets() {
  try {
    await fs.mkdir(outputAssetsDir, { recursive: true });
    const assets = await fs.readdir(assetsDir, { withFileTypes: true });

    for (const asset of assets) {
      const sourcePath = path.join(assetsDir, asset.name);
      const targetPath = path.join(outputAssetsDir, asset.name);

      if (asset.isFile()) {
        await fs.copyFile(sourcePath, targetPath);
      } else if (asset.isDirectory()) {
        await copyAssetsRecursive(sourcePath, targetPath);
      }
    }
    console.log('Assets copied successfully!');
  } catch (error) {
    console.error('Error copying assets:', error);
  }
}

async function copyAssetsRecursive(source, target) {
  await fs.mkdir(target, { recursive: true });
  const items = await fs.readdir(source, { withFileTypes: true });

  for (const item of items) {
    const sourcePath = path.join(source, item.name);
    const targetPath = path.join(target, item.name);

    if (item.isFile()) {
      await fs.copyFile(sourcePath, targetPath);
    } else if (item.isDirectory()) {
      await copyAssetsRecursive(sourcePath, targetPath);
    }
  }
}

async function buildProject() {
  await createProjectDistDir();
  const templateContent = await readTemplate();
  const htmlContent = await replaceTemplateTags(templateContent);
  await writeHtmlFile(htmlContent);
  await compileStyles();
  await copyAssets();
}

buildProject();