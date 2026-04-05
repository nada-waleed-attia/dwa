"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import styles from "./LazyWrapper.module.css";

interface LazyWrapperProps {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
  skeleton?: ReactNode;
}

export default function LazyWrapper({
  children,
  minHeight = "100vh",
  rootMargin = "800px", // زيادة للتحميل المسبق
  skeleton,
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
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
      { 
        rootMargin,
        threshold: 0.01
      }
    );

    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [rootMargin]);

  if (!isVisible) {
    return (
      <div 
        ref={ref} 
        style={{ minHeight }}
        className={styles.placeholder}
        suppressHydrationWarning
      >
        {skeleton || <DefaultSkeleton />}
      </div>
    );
  }

  return <div ref={ref}>{children}</div>;
}

function DefaultSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonPulse}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonContent} />
        <div className={styles.skeletonContent} />
      </div>
    </div>
  );
}
