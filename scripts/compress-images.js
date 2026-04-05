const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const QUALITY = 80; // Quality for compression (0-100)

async function compressImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    
    // Skip if not an image or already optimized
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return;
    }

    const outputPath = filePath.replace(ext, '.webp');
    
    // Skip if webp already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${path.basename(filePath)} (webp exists)`);
      return;
    }

    console.log(`🔄 Compressing ${path.basename(filePath)}...`);
    
    await sharp(filePath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(filePath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const savings = ((1 - compressedSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ Saved ${savings}% - ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error compressing ${filePath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else {
      await compressImage(filePath);
    }
  }
}

console.log('🚀 Starting image compression...\n');
processDirectory(PUBLIC_DIR)
  .then(() => {
    console.log('\n✨ Image compression complete!');
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
