// Client-safe helper function - NO cloudinary SDK import here
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgolhybek';

export const cld = (path: string, width?: number): string => {
  const w = width ? `,w_${width}` : '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto${w}/dwam-website${path}`;
};
