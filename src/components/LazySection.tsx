"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  prefetch?: boolean; // Enable prefetching for next section
}

export default function LazySection({ 
  children, 
  threshold = 0.1,
  rootMargin = "200px",
  prefetch = true
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPrefetched, setIsPrefetched] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, rootMargin]);

  // Prefetch: Load content earlier for smoother experience
  useEffect(() => {
    if (!prefetch) return;
    
    const prefetchObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPrefetched) {
          setIsPrefetched(true);
        }
      },
      {
        threshold: 0,
        rootMargin: "800px", // Start loading 800px before visible
      }
    );

    if (sectionRef.current) {
      prefetchObserver.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        prefetchObserver.unobserve(sectionRef.current);
      }
    };
  }, [prefetch, isPrefetched]);

  return (
    <div ref={sectionRef} style={{ minHeight: isVisible ? "auto" : "100vh" }}>
      {(isVisible || isPrefetched) ? children : null}
    </div>
  );
}
