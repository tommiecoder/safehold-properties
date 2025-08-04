#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function runCommand(command, args, cwd = rootDir) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });
    
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function build() {
  try {
    console.log('🏗️  Starting build process...');
    
    // Run the original build command
    console.log('📦 Building frontend and backend...');
    await runCommand('npm', ['run', 'build']);
    
    // Run the post-build script to move files
    console.log('📁 Moving files to correct deployment structure...');
    await runCommand('node', ['scripts/post-build.js']);
    
    console.log('✅ Build complete! Files are ready for deployment in dist/');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();