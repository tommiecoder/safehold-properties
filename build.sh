#!/usr/bin/env bash

set -e

echo "🏗️  Starting custom build process for deployment..."

# Run the original npm build command
echo "📦 Running npm build..."
npm run build

# Run the post-build script to move files to correct structure
echo "📁 Moving files to deployment structure..."
node scripts/post-build.js

echo "✅ Build complete! Static files are ready for deployment in dist/"