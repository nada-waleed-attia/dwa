/**
 * Cloudinary Image Loader for Next.js
 * يوفر تحسين تلقائي للصور مع دعم WebP و AVIF
 */

interface CloudinaryLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export const cloudinaryLoader = ({ src, width, quality }: CloudinaryLoaderParams): string => {
  // إذا كانت الصورة من مصدر خارجي، استخدمها مباشرة
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  // إذا لم يكن Cloudinary مفعّل، استخدم الصورة المحلية
  if (!cloudName) {
    return src;
  }

  // إزالة / من بداية المسار
  const imagePath = src.startsWith('/') ? src.slice(1) : src;

  const params = [
    'f_auto', // تحويل تلقائي للصيغة (WebP, AVIF)
    'c_limit', // الحفاظ على النسبة
    `w_${width}`,
    `q_${quality || 'auto:good'}`, // جودة تلقائية محسّنة
    'dpr_auto' // دعم Retina displays
  ];

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${imagePath}`;
};

/**
 * Generate blur placeholder for images
 */
export const getBlurDataURL = (src: string): string => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName || src.startsWith('http')) {
    // Fallback blur placeholder
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQAAA//9k=';
  }

  const imagePath = src.startsWith('/') ? src.slice(1) : src;
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_10,q_10,f_auto,e_blur:1000/${imagePath}`;
};

/**
 * Cloudinary video loader
 */
export const cloudinaryVideoLoader = (src: string, options?: {
  width?: number;
  quality?: string;
}): string => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName || src.startsWith('http')) {
    return src;
  }

  const videoPath = src.startsWith('/') ? src.slice(1) : src;
  const params = [
    'f_auto', // تحويل تلقائي
    options?.width ? `w_${options.width}` : '',
    options?.quality ? `q_${options.quality}` : 'q_auto',
  ].filter(Boolean);

  return `https://res.cloudinary.com/${cloudName}/video/upload/${params.join(',')}/${videoPath}`;
};
