import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || '';
    const maxResults = parseInt(searchParams.get('max') || '50');

    // Search for images in specific folder
    const result = await cloudinary.search
      .expression(`folder:${folder}/*`)
      .sort_by('created_at', 'desc')
      .max_results(maxResults)
      .execute();

    // Transform results to simpler format
    const images = result.resources.map((resource: any) => ({
      id: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      thumbnail: cloudinary.url(resource.public_id, {
        width: 400,
        height: 300,
        crop: 'fill',
        quality: 'auto',
        format: 'auto',
      }),
    }));

    return NextResponse.json({
      success: true,
      images,
      total: result.total_count,
    });
  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
