"use client";

import { useEffect, useState } from "react";
import styles from "./CloudHostingSection.module.css";

export default function CloudHostingSection() {
  // Progressive loading states
  const [layer2Loaded, setLayer2Loaded] = useState(false); // Services list
  const [layer3Loaded, setLayer3Loaded] = useState(false); // CTA + Visual area
  
  useEffect(() => {
    const timer2 = setTimeout(() => setLayer2Loaded(true), 400);
    const timer3 = setTimeout(() => setLayer3Loaded(true), 800);
    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section id="cloud-hosting" className={styles.section}>
      {/* Background Image Parallax/Fixed */}
      <div className={styles.backgroundImage}></div>

      {/* Overlay for contrast */}
      <div className={styles.overlay}></div>

      {/* Decoration: Preserved Floating Icons */}
      <div className={styles.decoration} aria-hidden="true">
        <div className={`${styles.floatingIcon} ${styles.cloud1}`}>
          <i className="fas fa-cloud"></i>
        </div>
        <div className={`${styles.floatingIcon} ${styles.cloud2}`}>
          <i className="fas fa-server"></i>
        </div>
        <div className={`${styles.floatingIcon} ${styles.cloud3}`}>
          <i className="fas fa-database"></i>
        </div>
        <div className={styles.glowingOrbHelper}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.headerContent} data-aos="fade-down">
          <h2 className={styles.title}>
            السيرفر والاستضافة <span className={styles.gradientText}>السحابية</span>
          </h2>
          <p className={styles.subtitle}>
            حلول تقنية متقدمة تضمن أداءً عالياً وأماناً موثوقاً لأعمالك
          </p>
        </div>

        <div className={styles.contentGrid}>
          {/* Left Side: Services Grid */}
          <div className={styles.servicesArea} data-aos="fade-right">
            <div className={styles.glassCard}>
              <h3 className={styles.cardHeading}>خدماتنا المميزة</h3>
              {layer2Loaded && (
                <div className={styles.servicesList}>
                  <ServiceItem icon="fas fa-server" text="خــدمـــات الإســتــضــافــة" />
                  <ServiceItem icon="fas fa-hdd" text="ســـــيــــــرفــــــرات & VPS" />
                  <ServiceItem icon="fas fa-shield-alt" text="الحماية والنسخ الاحتـياطي" />
                  <ServiceItem icon="fas fa-cloud" text="الــحــوســبــة الـسـحـابـيـة" />
                  <ServiceItem icon="fas fa-envelope" text="الإيــمــيــلات الــرســمــيــة" />
                  <ServiceItem icon="fas fa-globe" text="حجز الـنـطـاقات ( الدوميـن )" />
                  <ServiceItem icon="fas fa-user-shield" text="الأمـــن الــســـيـــبـــرانــــي" />
                  <ServiceItem icon="fas fa-lock" text="شــــهــــادات الأمـــــان SSL" />
                </div>
              )}
              {layer3Loaded && (
                <div className={styles.ctaWrapper}>
                  <a href="https://wa.me/201555855857" className={styles.primaryBtn} target="_blank" rel="noopener noreferrer">
                    <span>المزيد</span>
                    <i className="fas fa-arrow-left"></i>
                  </a>
                </div>
              )}
            </div>
          </div>

        {/* Right Side: Visual Showcase with Floating Elements */}
          {layer3Loaded && (
            <div className={styles.visualArea} data-aos="fade-left">
              <div className={styles.mainVisualContainer}>
                {/* Central Server Graphic/Icon instead of the old image for a cleaner look, or re-use the image in a circle */}
                <div className={styles.pulseCircle}>
                  <img
                    src="/download (13).webp"
                    alt="Cloud Server"
                    className={styles.centerImage}
                  />
                </div>

                {/* Orbiting Feature Cards */}
                <div className={`${styles.floatCard} ${styles.float1}`}>
                  <i className="fas fa-bolt"></i>
                  <span>أداء عالي</span>
                </div>
                <div className={`${styles.floatCard} ${styles.float2}`}>
                  <i className="fas fa-shield-virus"></i>
                  <span>حماية قصوى</span>
                </div>
                <div className={`${styles.floatCard} ${styles.float3}`}>
                  <i className="fas fa-history"></i>
                  <span>uptime 99.9%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {layer3Loaded && (
        <div className={styles.scrollDownArrow}>
          <a href="#digital-marketing" aria-label="الانتقال إلى قسم التسويق الإلكتروني">
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      )}
    </section>
  );
}

function ServiceItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className={styles.serviceItem}>
      <div className={styles.iconBox}>
        <i className={icon}></i>
      </div>
      <span className={styles.serviceText}>{text}</span>
    </div>
  );
}
