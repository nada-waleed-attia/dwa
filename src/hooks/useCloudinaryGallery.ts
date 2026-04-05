"use client";

import { useState, useEffect } from 'react';

interface CloudinaryImage {
  id: string;
  url: string;
  width: number;
  height: number;
  format: string;
  thumbnail: string;
}

interface UseCloudinaryGalleryOptions {
  folder: string;
  maxResults?: number;
  autoLoad?: boolean;
}

export function useCloudinaryGallery({
  folder,
  maxResults = 50,
  autoLoad = false,
}: UseCloudinaryGalleryOptions) {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const loadImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/gallery?folder=${encodeURIComponent(folder)}&max=${maxResults}`
      );
      
      const data = await response.json();

      if (data.success) {
        setImages(data.images);
        setTotal(data.total);
      } else {
        setError(data.error || 'Failed to load images');
      }
    } catch (err) {
      setError('Network error');
      console.error('Gallery load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      loadImages();
    }
  }, [folder, maxResults, autoLoad]);

  return {
    images,
    loading,
    error,
    total,
    loadImages,
  };
}
