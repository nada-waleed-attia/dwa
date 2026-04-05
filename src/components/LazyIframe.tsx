"use client";

import { useState, useEffect, useRef, IframeHTMLAttributes } from "react";

/**
 * LazyIframe Component
 * 
 * يحمّل iframe (YouTube, Maps, etc) فقط عندما يدخل viewport
 * يوفر استهلاك الموارد بشكل كبير
 */

interface LazyIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  rootMargin?: string;
  placeholder?: React.ReactNode;
  thumbnailUrl?: string; // للـ YouTube videos
}

export default function LazyIframe({
  rootMargin = "300px",
  placeholder,
  thumbnailUrl,
  ...iframeProps
}: LazyIframeProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
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
    <div 
      ref={containerRef} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        minHeight: '200px'
      }}
    >
      {shouldLoad ? (
        <iframe
          {...iframeProps}
          onLoad={() => setIsLoaded(true)}
          style={{
            ...iframeProps.style,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      ) : (
        placeholder || (
          <div style={{
            width: '100%',
            height: '100%',
            background: thumbnailUrl 
              ? `url(${thumbnailUrl}) center/cover no-repeat`
              : 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
            backgroundSize: thumbnailUrl ? 'cover' : '200% 100%',
            animation: thumbnailUrl ? 'none' : 'shimmer 2s infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            {/* Play button overlay for YouTube */}
            {thumbnailUrl && (
              <div style={{
                width: '68px',
                height: '48px',
                background: 'rgba(255, 0, 0, 0.8)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5V19L19 12L8 5Z" fill="white" />
                </svg>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

/**
 * مثال الاستخدام:
 * 
 * // YouTube Video
 * <LazyIframe
 *   src="https://www.youtube.com/embed/VIDEO_ID"
 *   title="Video Title"
 *   thumbnailUrl="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
 *   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 *   allowFullScreen
 * />
 * 
 * // Google Maps
 * <LazyIframe
 *   src="https://www.google.com/maps/embed?pb=..."
 *   title="Location"
 *   rootMargin="400px"
 * />
 */
