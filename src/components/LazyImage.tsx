"use client";

import { useState, useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";

/**
 * LazyImage Component
 * 
 * يحمّل الصورة فقط عندما تدخل viewport
 * مفيد للـ galleries والصور الكثيرة
 */

interface LazyImageProps extends Omit<ImageProps, 'onLoad' | 'placeholder'> {
  rootMargin?: string;
  placeholder?: React.ReactNode;
}

export default function LazyImage({
  rootMargin = "200px",
  placeholder,
  ...imageProps
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {isVisible ? (
        <Image
          {...imageProps}
          onLoad={() => setIsLoaded(true)}
          style={{
            ...imageProps.style,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      ) : (
        placeholder || (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite'
          }} />
        )
      )}
    </div>
  );
}
