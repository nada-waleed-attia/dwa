"use client";
import { useState } from "react";
import styles from "./SolutionsSection.module.css";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgolhybek';
const cld = (path: string) => `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/dwam-website${path}`;

export default function SolutionsSection() {
  const [laptopIndex, setLaptopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [tabletIndex, setTabletIndex] = useState(0);
  
  const [laptopDirection, setLaptopDirection] = useState<'left' | 'right'>('right');
  const [mobileDirection, setMobileDirection] = useState<'left' | 'right'>('right');
  const [tabletDirection, setTabletDirection] = useState<'left' | 'right'>('right');

  const laptopProjects = [
    { img: cld("/binqasim.sa.webp"), title: "وقف   بن القاسم ", url: "https://binqasim.sa/" },
    { img: cld("/www.ofuq.academy.webp"), title: "منصة أفق التعليمية", url: "https://www.ofuq.academy/" },
    { img: cld("/madarek.webp"), title: "مجلة مدارك", url: "https://mdarek.net/" },
    { img: cld("/asmaa-allah.webp"), title: " الله أنيس المحبين", url: "http://allah-names.com" },
    { img: cld("/makkah.webp"), title: "معالم مكة السياحية", url: "http://touristmecca.sa" },
  ];

  const mobileProjects = [
    { img: cld("/nasmaser.webp"), title: "تطبيق ناس مصر", url: "https://play.google.com/store/apps/details?id=com.nasmasr.app" },
    { img: cld("/joly.webp"), title: "تطبيق جولي تاكسي", url: "" },
    { img: cld("/dubi.webp"), title: "DubiSale App", url: "" },
  ];

  const tabletProjects = [
    { img: cld("/dewalls.webp"), title: "Dewalls Decorations", url: "http://dewalls.sa" },
    { img: cld("/kittaan.com.webp"), title: "Kitaan Boutique", url: "https://kittaan.com/" },
    { img: cld("/kittanhome.com.webp"), title: "Kittan Home", url: "https://kittanhome.com/" },
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
        <img src={cld("/icons8-source-code-48.webp")} alt="" className={`${styles.floatIcon} ${styles.i1}`} />
        <img src={cld("/ui-ux-icon.webp")} alt="" className={`${styles.floatIcon} ${styles.i2}`} />
        <img src={cld("/auth-icon.webp")} alt="" className={`${styles.floatIcon} ${styles.i3}`} />
        <img src={cld("/icons8-settings-64.webp")} alt="" className={`${styles.floatIcon} ${styles.i4}`} />
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
                <img src={cld("/laptop-frame.webp")} alt="إطار لابتوب" className={styles.laptopImg} />
                <div className={styles.screen}>
                  <div className={styles.scrollableContent}>
                    <a 
                      href={laptopProjects[laptopIndex].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <img 
                        src={laptopProjects[laptopIndex].img} 
                        alt={laptopProjects[laptopIndex].title} 
                        className={styles.projectImg} 
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
                <img
                  src={cld("/realistic-front-view-smartphone-mockup-mobile-iphone-purple-frame-with-blank-white-display-vector.webp")}
                  alt="إطار موبايل"
                  className={styles.mobileImg}
                />
                <div className={styles.mobileScreen}>
                  <div className={styles.scrollableContent}>
                    <a 
                      href={mobileProjects[mobileIndex].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <img 
                        src={mobileProjects[mobileIndex].img} 
                        alt={mobileProjects[mobileIndex].title} 
                        className={styles.projectImgMobile} 
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
                <img src={cld("/digital-device-mockup.webp")} alt="إطار تابلت" className={styles.tabletImg} />
                <div className={styles.tabletScreen}>
                  <div className={styles.scrollableContent}>
                    <a 
                      href={tabletProjects[tabletIndex].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <img 
                        src={tabletProjects[tabletIndex].img} 
                        alt={tabletProjects[tabletIndex].title} 
                        className={styles.projectImgTablet} 
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
