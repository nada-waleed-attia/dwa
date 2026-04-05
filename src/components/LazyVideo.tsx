"use client";

import { useState, useEffect, useRef, VideoHTMLAttributes } from "react";

/**
 * LazyVideo Component
 * 
 * يحمّل الفيديو فقط عندما يدخل viewport
 * يوقف التشغيل عند الخروج من viewport (اختياري)
 */

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  rootMargin?: string;
  pauseOnExit?: boolean;
  placeholder?: React.ReactNode;
}

export default function LazyVideo({
  rootMargin = "200px",
  pauseOnExit = true,
  placeholder,
  ...videoProps
}: LazyVideoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShouldLoad(true);
          
          // Auto play if video has autoplay attribute
          if (videoProps.autoPlay && videoRef.current) {
            videoRef.current.play().catch(() => {
              // Ignore autoplay errors
            });
          }
        } else if (pauseOnExit && videoRef.current) {
          // Pause when out of viewport
          videoRef.current.pause();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [rootMargin, pauseOnExit, videoProps.autoPlay]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          {...videoProps}
          style={{
            ...videoProps.style,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          {videoProps.children}
        </video>
      ) : (
        placeholder || (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>
        )
      )}
    </div>
  );
}
