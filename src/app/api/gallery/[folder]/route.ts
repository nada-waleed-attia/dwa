import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary-server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ folder: string }> }
) {
  const { folder } = await params;

  try {
    const result = await cloudinary.search
      .expression(`folder="dwam-website/${folder}"`)
      .sort_by('public_id', 'asc')
      .max_results(500)
      .execute();

    const images = result.resources.map((item: any) => ({
      id: item.asset_id,
      publicId: item.public_id,
      width: item.width,
      height: item.height,
      format: item.format,
      secureUrl: item.secure_url,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Cloudinary error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
