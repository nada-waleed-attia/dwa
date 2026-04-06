"use client";
import { useEffect, useRef } from "react";
import styles from "./AboutUsSection.module.css";
import Link from "next/link";
import Image from "next/image";

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.2,
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
  }, []);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgolhybek';
  const cld = (path: string) => `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/dwam-website${path}`;

  const logos = [
    cld("/images.webp"),
    "/20231126120517!وزارة_الاتصالات_وتكنولوجيا_المعلومات.webp",
    cld("/logo.webp"),
    cld("/Logo_of_smart_village.webp"),
    cld("/logogfi.webp"),
    cld("/files73982c50-f2c0-11ef-8e6d-8710050d69b7.webp"),
    "/images (1).webp",
    cld("/oss_logo.webp"),
    "/هيئة_تنمية_صناعة_تكنولوجيا_المعلومات_(مصر).webp",
    cld("/duns-registered.webp"),
  ];

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✦</span>
              <span>من نحن</span>
              <span className={styles.badgeIcon}>✦</span>
            </div>
            <h2 className={styles.title}>شركة دوام للأعمال التقنية</h2>
            <p className={styles.description}>
              <span className={styles.desktopText}>
                شركة رائدة في مجال تكنولوجيا المعلومات، نعمل على تحقيق التحول الرقمي من خلال حلول ذكية وإبداع راقٍ وخبرة متميزة. 
                يضم فريق العمل نخبة من المتخصصين الذين تتجاوز خبراتهم 15 عاماً في مجالات التصميم والبرمجة وتطوير الأنظمة.
              </span>
              <span className={styles.mobileText}>
                شركة رائدة في مجال تكنولوجيا المعلومات، نعمل على تحقيق
                <br />
                التحول الرقمي من خلال حلول ذكية وإبداع راقٍ وخبرة متميزة.
                <br />
                يضم فريق العمل نخبة من المتخصصين الذين تتجاوز خبراتهم
                <br />
                15 عاماً في مجالات التصميم والبرمجة وتطوير الأنظمة.
              </span>
            </p>
            <a href="/about" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              <span>اعرفنا أكثر</span>
              <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <Image 
                src={cld("/diverse-team-it-engineering-experts-engaged-highlevel-meeting-about-digital-transformation-system-integration.webp")}
                alt="فريق دوام للأعمال التقنية"
                className={styles.mainImage}
                width={600}
                height={400}
                loading="lazy"
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>

        {/* Logos Slider */}
        <div className={styles.logosSection}>
          <div className={styles.logosTrack}>
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className={styles.logoItem}>
                <Image 
                  src={logo} 
                  alt={`شريك ${index + 1}`} 
                  className={styles.logoImage}
                  width={120}
                  height={60}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.scrollDownArrow}>
          <a href="#solutions" aria-label="الانتقال إلى قسم الحلول البرمجية">
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
