const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function check() {
  // List all files in root of dwam-website (no subfolders)
  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'dwam-website/',
    max_results: 50,
  });
  console.log('\n📁 Files in dwam-website root:');
  result.resources.forEach((r) => console.log(' -', r.public_id));
}

check().catch(console.error);
