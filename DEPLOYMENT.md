# Deployment Guide

## Issue Resolved: Static Deployment Build Output Structure

### Problem
The deployment was failing because:
- Vite builds output to `dist/public/` directory structure
- Replit static deployment expects `index.html` directly in `dist/` directory  
- Configuration files cannot be modified due to environment constraints

### Solution Implemented
Custom build scripts that automatically restructure the build output:

1. **Post-build script** (`scripts/post-build.js`): Moves files from `dist/public` to `dist`
2. **Build wrapper** (`scripts/build.js`): Complete build process with automatic file moving
3. **Shell script** (`build.sh`): Alternative bash-based build process

### Manual Build Process
To manually build with correct deployment structure:

```bash
# Method 1: Standard build + post-processing
npm run build
node scripts/post-build.js

# Method 2: Using custom build script  
node scripts/build.js

# Method 3: Using shell script
./build.sh
```

### Deployment Configuration
The deployment is configured in `.replit` with:
- Build command: `["npm", "run", "build"]`
- Public directory: `"dist"`
- Deployment target: `"static"`

### Automated Deployment
The current setup requires manual intervention because the standard `npm run build` doesn't automatically run the post-build script.

**For successful deployment, you have two options:**

#### Option A: Modify Deployment Build Command (Recommended)
If you can modify the deployment settings in Replit UI:
1. Change build command from `["npm", "run", "build"]` to `["./build.sh"]`
2. This will automatically handle the file restructuring

#### Option B: Manual Post-Build Step
If you cannot modify the deployment command:
1. Run the deployment with current settings
2. If it fails, manually run: `node scripts/post-build.js`
3. Then retry the deployment

### Verification
After any build process, verify the structure is correct:
```bash
ls -la dist/
# Should show: index.html, assets/, images/, index.js
```

The `index.html` file must be directly in `dist/` (not in `dist/public/`) for deployment to succeed.

### Files Created
- `scripts/post-build.js` - Node.js script to move files from dist/public to dist
- `scripts/build.js` - Complete build wrapper with post-processing  
- `build.sh` - Shell script for full build process
- `DEPLOYMENT.md` - This deployment guide

### Build Output Structure
```
Before post-build:
dist/
├── public/
│   ├── index.html
│   ├── assets/
│   └── images/
└── index.js

After post-build:
dist/
├── index.html      ← Moved from dist/public/
├── assets/         ← Moved from dist/public/
├── images/         ← Moved from dist/public/
└── index.js        ← Backend bundle (already in correct location)
```

This structure matches Replit's static deployment requirements where `index.html` must be directly accessible in the configured public directory (`dist`).