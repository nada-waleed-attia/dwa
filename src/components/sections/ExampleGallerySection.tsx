"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ExampleGallerySection.module.css";

export default function ExampleGallerySection() {
  // State للتحكم في عرض المزيد
  const [showAll, setShowAll] = useState(false);
  
  // كل الصور (مثال)
  const allImages = [
    "/image1.webp",
    "/image2.webp",
    "/image3.webp",
    "/image4.webp",
    "/image5.webp",
    "/image6.webp",
    "/image7.webp",
    "/image8.webp",
    "/image9.webp",
    "/image10.webp",
  ];

  // أول 4 صور فقط
  const initialImages = allImages.slice(0, 4);
  // باقي الصور
  const remainingImages = allImages.slice(4);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ✅ Layer 1: يظهر فوراً */}
        <div className={styles.header}>
          <h2 className={styles.title}>معرض الأعمال</h2>
          <p className={styles.description}>
            مجموعة مختارة من أفضل أعمالنا في التصميم والإبداع
          </p>
        </div>

        {/* ✅ Layer 1: أول 4 صور فقط */}
        <div className={styles.gallery}>
          {initialImages.map((src, index) => (
            <div key={index} className={styles.imageCard}>
              <Image
                src={src}
                alt={`عمل ${index + 1}`}
                width={400}
                height={300}
                loading="lazy"
                className={styles.image}
              />
            </div>
          ))}
        </div>

        {/* ✅ زر "عرض المزيد" */}
        {!showAll && (
          <div className={styles.buttonWrapper}>
            <button 
              className={styles.showMoreBtn}
              onClick={() => setShowAll(true)}
            >
              عرض المزيد ({remainingImages.length} صورة إضافية)
            </button>
          </div>
        )}

        {/* ❌ Layer 2: باقي الصور - تحمل فقط عند الضغط */}
        {showAll && (
          <div className={styles.gallery}>
            {remainingImages.map((src, index) => (
              <div key={index + 4} className={styles.imageCard}>
                <Image
                  src={src}
                  alt={`عمل ${index + 5}`}
                  width={400}
                  height={300}
                  loading="lazy"
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        )}

        {/* ❌ Layer 3: Lightbox - يحمل فقط عند الحاجة */}
        {/* يمكن إضافة lightbox هنا لاحقاً */}
      </div>
    </section>
  );
}
