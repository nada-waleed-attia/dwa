"use client";
import styles from "./PartnersSection.module.css";
import { useEffect, useRef } from "react";

export default function PartnersSection() {
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          } else {
            entry.target.classList.remove(styles.visible);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    logoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      logoRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const logos = [
    "/logos/17- جمعية تحفيظ القرآن بتيماء.webp",
    "/logos/هوية_المؤسسة.webp",
    "/logos/25- دي وولز ديكور.webp",
    "/logos/32- نورث هاوس.webp",
    "/logos/35- المعالم السياحية بمكة.jpg.webp",
    "/logos/45- جمعية رابية دنتاتا.webp",
    "/logos/46- فكرة رشاقة.webp",
    "/logos/50- مدرسة وائل بن حجر.webp",
    "/logos/ChatGPT Image 13 أغسطس 2025، 04_23_19 م.webp",
    "/logos/elsaleh logo.jpg.webp",
    "/logos/haer2.jpg.webp",
    "/logos/logoo (1).webp",
    "/logos/logos(1).webp",
    "/logos/logo arabic.jpg.webp",
    "/logos/logo tartel.jpg.webp",
    "/logos/tgrtrgrg.webp",
    "/logos/images-removebg-preview.webp",
    "/logos/logo455.jpg.webp",
    "/logos/sakhaa logo.jpg.webp",
    "/logos/sl clothing.jpg.webp",
    "/logos/الحرمين لتحفيظ القرآن.webp",
    "/logos/اللوجو شفاف.webp",
    "/logos/الهيئة العالمية للسنة النبوية.webp",
    "/logos/برنس.webp",
    "/logos/رابية.jpg.webp",
    "/logos/شعار قسم النفس.jpg.webp",
    "/logos/صورة واتساب بتاريخ 2025-05-14 في 18.55.02_29d89fbf.jpg.webp",
    "/logos/لوجو السادة للفكر والثقافة.jpg.webp",
    "/logos/لوجو هان زادة.jpg.webp",
    "/logos/لوجو وقاية1.jpg.webp",
    "/logos/لوجو وقف عبد الله بن قاسم.webp",
    "/logos/لوجو.jpg.webp",
    "/logos/محسن الانسانية.jpg.webp",
    "/logos/مداد العلم.jpg.webp",
    "/logos/مستر شريمبا.webp",
    "/logos/موحد.jpg.webp",
    "/logos/جمعية المستقبل الخيرية.webp",
    "/logos/مجمع السويدي الطبي.webp",
    "/logos/تكنوبيلد.webp",
    "/logos/فور ايفير.webp",
    "/logos/الجامعة الاسلامية مينيسوتا.webp",
    "/logos/مجمع اوان الطبي.webp",
    "/logos/هارونكو.webp",
    "/logos/مكتب التعليم جنوب مكة.webp",
  ];

  return (
    <section id="partners" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>شركاء النجاح والتميز</h2>
          <p className={styles.subtitle}>
            نفخر بشراكتنا مع أبرز المؤسسات والشركات الرائدة في مختلف المجالات
          </p>
        </div>
        <div className={styles.logosContainer}>
          <div className={styles.logosGrid}>
            {logos.map((logo, index) => (
              <div 
                key={index} 
                ref={(el) => { logoRefs.current[index] = el; }}
                className={styles.logoCard}
                style={{ 
                  transitionDelay: `${(index % 8) * 0.05}s`
                }}
              >
                <div className={styles.logoWrapper}>
                  <img 
                    src={logo} 
                    alt={`شريك ${index + 1}`}
                    className={styles.logoImage}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
