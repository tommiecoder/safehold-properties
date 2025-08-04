#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function moveFiles() {
  const sourcePath = path.join(rootDir, 'dist', 'public');
  const targetPath = path.join(rootDir, 'dist');
  
  console.log('Moving files from dist/public to dist...');
  
  if (!fs.existsSync(sourcePath)) {
    console.error('Source directory dist/public does not exist');
    return;
  }
  
  try {
    // Read all files in dist/public
    const files = fs.readdirSync(sourcePath);
    
    // Move each file to dist/
    for (const file of files) {
      const sourceFile = path.join(sourcePath, file);
      const targetFile = path.join(targetPath, file);
      
      if (fs.statSync(sourceFile).isDirectory()) {
        // If it's a directory, copy recursively
        copyDirectoryRecursive(sourceFile, targetFile);
      } else {
        // If it's a file, copy it
        fs.copyFileSync(sourceFile, targetFile);
      }
      console.log(`Moved: ${file}`);
    }
    
    // Remove the dist/public directory after copying
    fs.rmSync(sourcePath, { recursive: true, force: true });
    console.log('Removed dist/public directory');
    console.log('Build files successfully moved to dist/');
    
  } catch (error) {
    console.error('Error moving files:', error);
    process.exit(1);
  }
}

function copyDirectoryRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  
  for (const file of files) {
    const sourceFile = path.join(source, file);
    const targetFile = path.join(target, file);
    
    if (fs.statSync(sourceFile).isDirectory()) {
      copyDirectoryRecursive(sourceFile, targetFile);
    } else {
      fs.copyFileSync(sourceFile, targetFile);
    }
  }
}

moveFiles();