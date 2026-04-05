"use client";

import { useEffect, useState } from 'react';
import styles from './SplineScene.module.css';

interface SplineSceneProps {
  scene?: string;
  className?: string;
}

const DEFAULT_SCENE = 'https://prod.spline.design/AZKtIJgbI3wnee-5/scene.splinecode';

export default function SplineScene({ scene = DEFAULT_SCENE, className }: SplineSceneProps) {
  const [Spline, setSpline] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Spline only on client side
    import('@splinetool/react-spline')
      .then((mod) => {
        setSpline(() => mod.default);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load Spline:', err);
        setIsLoading(false);
      });
  }, []);

  const containerClassName = className
    ? `${styles.splineScene} ${className}`
    : styles.splineScene;

  if (isLoading || !Spline) {
    return (
      <div className={containerClassName}>
        <div className={styles.splineLoading}>Loading 3D Robot...</div>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <Spline scene={scene} />
    </div>
  );
}
