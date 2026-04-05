"use client";
import { useState } from "react";
import styles from "./DwamStoreSection.module.css";
import dynamic from "next/dynamic";

// Lazy load icons
const FaShoppingBag = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaShoppingBag })), { ssr: false });
const FaBook = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaBook })), { ssr: false });
const FaArrowLeft = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaArrowLeft })), { ssr: false });
const FaStar = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaStar })), { ssr: false });
const FaFire = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaFire })), { ssr: false });
const FaTags = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaTags })), { ssr: false });

export default function DwamStoreSection() {
  const [hoveredSide, setHoveredSide] = useState<string | null>(null);

  return (
    <section id="dwam-store" className={styles.wrap}>
      <div className={styles.container}>
        {/* مجلة دوام - النصف الأيسر */}
        <div 
          className={`${styles.side} ${styles.magazineSide} ${hoveredSide === 'magazine' ? styles.expanded : ''} ${hoveredSide && hoveredSide !== 'magazine' ? styles.shrunk : ''}`}
          onMouseEnter={() => setHoveredSide('magazine')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className={styles.bgOverlay}></div>
          <div className={styles.floatingIcons}>
            <div className={styles.floatIcon1}><FaBook /></div>
            <div className={styles.floatIcon2}><FaStar /></div>
            <div className={styles.floatIcon3}><FaFire /></div>
          </div>

          <div className={styles.content}>
            <div className={styles.iconBox}>
              <FaBook />
            </div>
            <h2 className={styles.title}>مجلة دوام</h2>
            <p className={styles.description}>
              محتوى تقني حصري، مقالات متخصصة، وأحدث الاتجاهات في عالم التكنولوجيا
            </p>
            
            {/* <div className={styles.features}>
              <div className={styles.feature}>
                <FaStar />
                <span>مقالات حصرية</span>
              </div>
              <div className={styles.feature}>
                <FaFire />
                <span>محتوى أسبوعي</span>
              </div>
              <div className={styles.feature}>
                <FaBook />
                <span>خبراء التقنية</span>
              </div>
            </div> */}

            <a href="https://wa.me/201555855857" className={styles.ctaBtn}>
              <span>تصفح المجلة</span>
              <FaArrowLeft />
            </a>
          </div>
        </div>

        {/* متجر دوام - النصف الأيمن */}
        <div 
          className={`${styles.side} ${styles.storeSide} ${hoveredSide === 'store' ? styles.expanded : ''} ${hoveredSide && hoveredSide !== 'store' ? styles.shrunk : ''}`}
          onMouseEnter={() => setHoveredSide('store')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className={styles.bgOverlay}></div>
          <div className={styles.floatingIcons}>
            <div className={styles.floatIcon1}><FaShoppingBag /></div>
            <div className={styles.floatIcon2}><FaTags /></div>
            <div className={styles.floatIcon3}><FaStar /></div>
          </div>

          <div className={styles.content}>
            <div className={styles.iconBox}>
              <FaShoppingBag />
            </div>
            <h2 className={styles.title}>متجر دوام</h2>
            <p className={styles.description}>
              تسوق الان أبرز المنتجات الإلكترونية
            </p>
            
            {/* <div className={styles.features}>
              <div className={styles.feature}>
                <FaShoppingBag />
                <span>منتجات رقمية</span>
              </div>
              <div className={styles.feature}>
                <FaTags />
                <span>عروض حصرية</span>
              </div>
              <div className={styles.feature}>
                <FaStar />
                <span>جودة عالية</span>
              </div>
            </div> */}

            <a href="https://wa.me/201555855857" className={styles.ctaBtn}>
              <span>تسوق الآن</span>
              <FaArrowLeft />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
