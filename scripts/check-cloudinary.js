const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function check() {
  // List subfolders inside dwam-website
  const result = await cloudinary.api.sub_folders('dwam-website');
  console.log('\n📁 Subfolders inside dwam-website:');
  result.folders.forEach(f => console.log(' -', f.name, '→', f.path));
}

check().catch(console.error);
