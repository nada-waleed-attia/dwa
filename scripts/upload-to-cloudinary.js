const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a single file
async function uploadFile(filePath, folder) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto',
      use_filename: true,
      unique_filename: false,
    });
    
    console.log(`✅ Uploaded: ${path.basename(filePath)} -> ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

// Upload all files in a directory
async function uploadDirectory(dirPath, cloudinaryFolder) {
  const files = fs.readdirSync(dirPath);
  let uploaded = 0;
  let failed = 0;

  console.log(`\n📁 Uploading from: ${dirPath}`);
  console.log(`☁️  To Cloudinary folder: ${cloudinaryFolder}\n`);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively upload subdirectories
      const subFolder = `${cloudinaryFolder}/${file}`;
      await uploadDirectory(filePath, subFolder);
    } else if (stat.isFile()) {
      // Upload file
      const ext = path.extname(file).toLowerCase();
      const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const videoExts = ['.mp4', '.webm', '.mov'];

      if (imageExts.includes(ext) || videoExts.includes(ext)) {
        const result = await uploadFile(filePath, cloudinaryFolder);
        if (result) {
          uploaded++;
        } else {
          failed++;
        }
      }
    }
  }

  return { uploaded, failed };
}

// Main execution
async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  console.log('🚀 Starting Cloudinary upload...\n');
  console.log('📂 Source directory:', publicDir);
  
  const { uploaded, failed } = await uploadDirectory(publicDir, 'dwam-website');
  
  console.log('\n✨ Upload complete!');
  console.log(`✅ Uploaded: ${uploaded} files`);
  console.log(`❌ Failed: ${failed} files`);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { uploadFile, uploadDirectory };
