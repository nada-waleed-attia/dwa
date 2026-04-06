export interface GalleryImage {
  id: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  secureUrl: string;
}

export async function getGallery(folder: string): Promise<GalleryImage[]> {
  const res = await fetch(`/api/gallery/${folder}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to load gallery');
  }

  const data = await res.json();
  return data.images;
}
