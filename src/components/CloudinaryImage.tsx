"use client";

import Image from 'next/image';
import { useState } from 'react';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: string | 'auto';
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  fill?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export default function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  quality = 'auto',
  format = 'auto',
  className,
  sizes,
  priority = false,
  loading = 'lazy',
  fill = false,
  onError,
}: CloudinaryImageProps) {
  const [error, setError] = useState(false);
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgolhybek';
  
  // Build Cloudinary URL with transformations
  const getCloudinaryUrl = (w?: number, h?: number) => {
    let transformations = `q_${quality},f_${format}`;
    
    if (w || h) {
      transformations += ',c_fill';
      if (w) transformations += `,w_${w}`;
      if (h) transformations += `,h_${h}`;
    }
    
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setError(true);
    if (onError) onError(e);
  };

  // Fallback to local image if Cloudinary fails
  if (error) {
    const fallbackProps: any = {
      src: `/${publicId}`,
      alt,
      className,
      sizes,
      fill,
    };

    if (!fill) {
      fallbackProps.width = width;
      fallbackProps.height = height;
    }

    if (priority) {
      fallbackProps.priority = true;
    } else {
      fallbackProps.loading = loading;
    }

    return <Image {...fallbackProps} />;
  }

  const imageUrl = getCloudinaryUrl(width, height);

  // If priority is true, don't use loading prop (Next.js will handle it)
  const imageProps: any = {
    src: imageUrl,
    alt,
    className,
    sizes,
    fill,
    onError: handleError,
  };

  if (!fill) {
    imageProps.width = width;
    imageProps.height = height;
  }

  if (priority) {
    imageProps.priority = true;
  } else {
    imageProps.loading = loading;
  }

  return <Image {...imageProps} />;
}
