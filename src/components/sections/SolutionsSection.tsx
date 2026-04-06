"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./SolutionsSection.module.css";
import { cld } from "@/lib/cloudinary";

export default function SolutionsSection() {
  const [laptopIndex, setLaptopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [tabletIndex, setTabletIndex] = useState(0);
  
  const [laptopDirection, setLaptopDirection] = useState<'left' | 'right'>('right');
  const [mobileDirection, setMobileDirection] = useState<'left' | 'right'>('right');
  const [tabletDirection, setTabletDirection] = useState<'left' | 'right'>('right');

  const laptopProjects = [
    { img: cld("/binqasim.sa.webp", 800), title: "وقف   بن القاسم ", url: "https://binqasim.sa/" },
    { img: cld("/www.ofuq.academy.webp", 800), title: "منصة أفق التعليمية", url: "https://www.ofuq.academy/" },
    { img: cld("/madarek.webp", 800), title: "مجلة مدارك", url: "https://mdarek.net/" },
    { img: cld("/asmaa-allah.webp", 800), title: " الله أنيس المحبين", url: "http://allah-names.com" },
    { img: cld("/makkah.webp", 800), title: "معالم مكة السياحية", url: "http://touristmecca.sa" },
  ];

  const mobileProjects = [
    { img: cld("/nasmaser.webp", 400), title: "تطبيق ناس مصر", url: "https://play.google.com/store/apps/details?id=com.nasmasr.app" },
    { img: cld("/joly.webp", 400), title: "تطبيق جولي تاكسي", url: "" },
    { img: cld("/dubi.webp", 400), title: "DubiSale App", url: "" },
  ];

  const tabletProjects = [
    { img: cld("/dewalls.webp", 800), title: "Dewalls Decorations", url: "http://dewalls.sa" },
    { img: cld("/kittaan.com.webp", 800), title: "Kitaan Boutique", url: "https://kittaan.com/" },
    { img: cld("/kittanhome.com.webp", 800), title: "Kittan Home", url: "https://kittanhome.com/" },
  ];

  const nextLaptop = () => {
    setLaptopDirection('right');
    setLaptopIndex((prev) => (prev + 1) % laptopProjects.length);
  };
  const prevLaptop = () => {
    setLaptopDirection('left');
    setLaptopIndex((prev) => (prev - 1 + laptopProjects.length) % laptopProjects.length);
  };

  const nextMobile = () => {
    setMobileDirection('right');
    setMobileIndex((prev) => (prev + 1) % mobileProjects.length);
  };
  const prevMobile = () => {
    setMobileDirection('left');
    setMobileIndex((prev) => (prev - 1 + mobileProjects.length) % mobileProjects.length);
  };

  const nextTablet = () => {
    setTabletDirection('right');
    setTabletIndex((prev) => (prev + 1) % tabletProjects.length);
  };
  const prevTablet = () => {
    setTabletDirection('left');
    setTabletIndex((prev) => (prev - 1 + tabletProjects.length) % tabletProjects.length);
  };

  return (
    <section id="solutions" className={styles.wrap}>
      <div className={styles.floatingIcons} aria-hidden="true">
        <Image src={cld("/icons8-source-code-48.webp", 48)} alt="" className={`${styles.floatIcon} ${styles.i1}`} width={48} height={48} loading="lazy" sizes="48px" />
        <Image src={cld("/ui-ux-icon.webp", 48)} alt="" className={`${styles.floatIcon} ${styles.i2}`} width={48} height={48} loading="lazy" sizes="48px" />
        <Image src={cld("/auth-icon.webp", 48)} alt="" className={`${styles.floatIcon} ${styles.i3}`} width={48} height={48} loading="lazy" sizes="48px" />
        <Image src={cld("/icons8-settings-64.webp", 64)} alt="" className={`${styles.floatIcon} ${styles.i4}`} width={64} height={64} loading="lazy" sizes="64px" />
      </div>
      <div className={styles.inner}>
        <h2 className={styles.title}>حلول برمجية</h2>
        <div className={styles.columns}>
          {/* Laptop Card */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>مواقع الويب</h3>
            <p className={styles.cardText}>خبراء في تطوير المواقع الإلكترونية</p>
            <div className={styles.sliderContainer}>
              <button className={`${styles.arrowBtn} ${styles.arrowLeft}`} onClick={prevLaptop} aria-label="السابق">
                ›
              </button>
              <div className={`${styles.laptopWrap} ${styles[`slide-${laptopDirection}`]}`} key={laptopIndex}>
                <Image src={cld("/laptop-frame.webp")} alt="إطار لابتوب" className={styles.laptopImg} width={800} height={500} loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className={styles.screen}>
                  <div className={styles.scrollableContent}>
                    <a 
                      href={laptopProjects[laptopIndex].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <Image 
                        src={laptopProjects[laptopIndex].img} 
                        alt={laptopProjects[laptopIndex].title} 
                        className={styles.projectImg}
                        width={800}
                        height={500}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </a>
                  </div>
                </div>
                <div className={styles.deviceCaption}>{laptopProjects[laptopIndex].title}</div>
              </div>
              <button className={`${styles.arrowBtn} ${styles.arrowRight}`} onClick={nextLaptop} aria-label="التالي">
                ‹
              </button>
            </div>
            <div className={styles.dotsContainer}>
              {laptopProjects.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.dot} ${idx === laptopIndex ? styles.dotActive : ''}`}
                  onClick={() => {
                    setLaptopDirection(idx > laptopIndex ? 'right' : 'left');
                    setLaptopIndex(idx);
                  }}
                  aria-label={`الانتقال إلى ${idx + 1}`}
                />
              ))}
            </div>
            <div className={styles.scrollHint}>يمكن التمرير داخل الشاشة</div>
          </div>

          {/* Mobile Card */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>تطبيقات الموبايل</h3>
            <p className={styles.cardText}>فكرتك جاهزة للتطبيق</p>
            <div className={styles.sliderContainer}>
              <button className={`${styles.arrowBtn} ${styles.arrowLeft}`} onClick={prevMobile} aria-label="السابق">
                ›
              </button>
              <div className={`${styles.mobileWrap} ${styles[`slide-${mobileDirection}`]}`} key={mobileIndex}>
                <Image
                  src={cld("/realistic-front-view-smartphone-mockup-mobile-iphone-purple-frame-with-blank-white-display-vector.webp")}
                  alt="إطار موبايل"
                  className={styles.mobileImg}
                  width={400}
                  height={800}
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className={styles.mobileScreen}>
                  <div className={styles.scrollableContent}>
                    <a 
                      href={mobileProjects[mobileIndex].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <Image 
                        src={mobileProjects[mobileIndex].img} 
                        alt={mobileProjects[mobileIndex].title} 
                        className={styles.projectImgMobile}
                        width={400}
                        height={700}
                        loading="lazy"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </a>
                  </div>
                </div>
                <div className={styles.deviceCaption}>{mobileProjects[mobileIndex].title}</div>
              </div>
              <button className={`${styles.arrowBtn} ${styles.arrowRight}`} onClick={nextMobile} aria-label="التالي">
                ‹
              </button>
            </div>
            <div className={styles.dotsContainer}>
              {mobileProjects.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.dot} ${idx === mobileIndex ? styles.dotActive : ''}`}
                  onClick={() => {
                    setMobileDirection(idx > mobileIndex ? 'right' : 'left');
                    setMobileIndex(idx);
                  }}
                  aria-label={`الانتقال إلى ${idx + 1}`}
                />
              ))}
            </div>
            <div className={styles.scrollHint}>يمكن التمرير داخل الشاشة</div>
          </div>

          {/* Tablet Card */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>متاجر إلكترونية</h3>
            <p className={styles.cardText}>ابني تجارتك الإلكترونية الان</p>
            <div className={styles.sliderContainer}>
              <button className={`${styles.arrowBtn} ${styles.arrowLeft}`} onClick={prevTablet} aria-label="السابق">
                ›
              </button>
              <div className={`${styles.tabletWrap} ${styles[`slide-${tabletDirection}`]}`} key={tabletIndex}>
                <Image src={cld("/digital-device-mockup.webp")} alt="إطار تابلت" className={styles.tabletImg} width={800} height={600} loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className={styles.tabletScreen}>
                  <div className={styles.scrollableContent}>
                    <a 
                      href={tabletProjects[tabletIndex].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <Image 
                        src={tabletProjects[tabletIndex].img} 
                        alt={tabletProjects[tabletIndex].title} 
                        className={styles.projectImgTablet}
                        width={800}
                        height={600}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </a>
                  </div>
                </div>
                <div className={styles.deviceCaption}>{tabletProjects[tabletIndex].title}</div>
              </div>
              <button className={`${styles.arrowBtn} ${styles.arrowRight}`} onClick={nextTablet} aria-label="التالي">
                ‹
              </button>
            </div>
            <div className={styles.dotsContainer}>
              {tabletProjects.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.dot} ${idx === tabletIndex ? styles.dotActive : ''}`}
                  onClick={() => {
                    setTabletDirection(idx > tabletIndex ? 'right' : 'left');
                    setTabletIndex(idx);
                  }}
                  aria-label={`الانتقال إلى ${idx + 1}`}
                />
              ))}
            </div>
            <div className={styles.scrollHint}>يمكن التمرير داخل الشاشة</div>
          </div>
        </div>
        <div className={styles.moreWrap}>
          <a href="https://wa.me/201555855857" target="_blank" rel="noopener noreferrer" className={styles.moreBtn} aria-label="المزيد من الحلول">
            المزيد
          </a>
          <div className={styles.scrollDownArrow}>
            <a href="#graphic-design" aria-label="الانتقال إلى قسم تصميم الجرافيك">
              <i className="fas fa-chevron-down"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
