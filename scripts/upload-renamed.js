const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const files = [
  { local: 'public/02.webp', cloudName: 'dwam-website/02' },
  { local: 'public/dwam-acadmy.webp', cloudName: 'dwam-website/dwam-acadmy' },
  { local: 'public/digital-transformation.webp', cloudName: 'dwam-website/digital-transformation' },
  { local: 'public/images(1).webp', cloudName: 'dwam-website/images(1)' },
  { local: 'public/itida.webp', cloudName: 'dwam-website/itida' },
  { local: 'public/iti.webp', cloudName: 'dwam-website/iti' },
];

async function upload() {
  for (const file of files) {
    try {
      const result = await cloudinary.uploader.upload(
        path.join(__dirname, '..', file.local),
        { public_id: file.cloudName, overwrite: true, resource_type: 'image' }
      );
      console.log(`✅ ${file.local} → ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ ${file.local}:`, err.message);
    }
  }
}

upload();
