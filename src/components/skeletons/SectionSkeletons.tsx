"use client";
import styles from "./SectionSkeletons.module.css";

// Generic shimmer animation base
function Shimmer({ className }: { className?: string }) {
  return <div className={`${styles.shimmer} ${className || ""}`} />;
}

// Hero Skeleton
export function HeroSkeleton() {
  return (
    <div className={styles.heroSkeleton}>
      <Shimmer className={styles.heroImg} />
      <div className={styles.heroContent}>
        <Shimmer className={styles.heroTitle} />
        <Shimmer className={styles.heroSubtitle} />
      </div>
    </div>
  );
}

// Section with title + image (AboutUs, AI, CloudHosting, etc.)
export function TitleImageSkeleton() {
  return (
    <div className={styles.titleImageSkeleton}>
      <div className={styles.textCol}>
        <Shimmer className={styles.title} />
        <Shimmer className={styles.text} />
        <Shimmer className={styles.text} />
        <Shimmer className={styles.textShort} />
        <Shimmer className={styles.btn} />
      </div>
      <div className={styles.imageCol}>
        <Shimmer className={styles.image} />
      </div>
    </div>
  );
}

// Gallery Section (GraphicDesign)
export function GallerySkeleton() {
  return (
    <div className={styles.gallerySkeleton}>
      <div className={styles.textCol}>
        <Shimmer className={styles.title} />
        <Shimmer className={styles.text} />
        <div className={styles.tilesGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Shimmer key={i} className={styles.tile} />
          ))}
        </div>
      </div>
      <Shimmer className={styles.devicePreview} />
    </div>
  );
}

// Cards Grid (Solutions, Services)
export function CardsSkeleton() {
  return (
    <div className={styles.cardsSkeleton}>
      <Shimmer className={styles.title} />
      <div className={styles.cardsGrid}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Shimmer key={i} className={styles.card} />
        ))}
      </div>
    </div>
  );
}

// Generic Section Skeleton (default)
export function GenericSkeleton() {
  return (
    <div className={styles.genericSkeleton}>
      <Shimmer className={styles.title} />
      <Shimmer className={styles.text} />
      <Shimmer className={styles.text} />
    </div>
  );
}
