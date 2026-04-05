"use client";

import { useEffect, useState } from "react";
import styles from "./ContentCreationSection.module.css";

export default function ContentCreationSection() {
  // Progressive loading states
  const [layer2Loaded, setLayer2Loaded] = useState(false); // Services chips
  const [layer3Loaded, setLayer3Loaded] = useState(false); // CTA + Arrow
  
  useEffect(() => {
    const timer2 = setTimeout(() => setLayer2Loaded(true), 400);
    const timer3 = setTimeout(() => setLayer3Loaded(true), 800);
    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section id="content-creation" className={styles.wrap}>
      <div className={styles.videoLayer} aria-hidden="true">
        <video
          className={styles.videoBg}
          src="/content2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      </div>
      <div className={styles.backdrop}>
        <div className={`${styles.blob} ${styles.b1}`} aria-hidden="true"></div>
        <div className={`${styles.blob} ${styles.b2}`} aria-hidden="true"></div>
        <div className={`${styles.ring} ${styles.r1}`} aria-hidden="true"></div>
        <div className={`${styles.ring} ${styles.r2}`} aria-hidden="true"></div>
      </div>

      <div className={styles.grid}>
        <div className={styles.left} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.leftDecor} aria-hidden="true">
            <div className={`${styles.icon} ${styles.icon1}`}><i className="fas fa-pen-fancy"></i></div>
            <div className={`${styles.icon} ${styles.icon2}`}><i className="fas fa-book-open"></i></div>
            <div className={`${styles.icon} ${styles.icon3}`}><i className="fas fa-feather-alt"></i></div>
            <div className={`${styles.icon} ${styles.icon4}`}><i className="fas fa-hashtag"></i></div>
          </div>
          <h2 className={styles.title}>
            صناعة المحتوى الرقمي
            <span className={styles.titleLine}></span>
          </h2>
         

          <h3 className={styles.subheading}>
            <i className={`fas fa-feather-alt ${styles.subheadingIcon}`}></i>
            خدماتنا
          </h3>

          {layer2Loaded && (
            <ul className={styles.chips}>
              <li className={styles.chip} data-aos="fade-up" data-aos-delay="80">
                <i className="fas fa-archive"></i>
                <span>الأرشــفــة الإلـكـــتـــرونــيـــة</span>
              </li>
              <li className={styles.chip} data-aos="fade-up" data-aos-delay="160">
                <i className="fas fa-spell-check"></i>
                <span>الــتــــدقــــيــــق الــلــغــــوي</span>
              </li>
              <li className={styles.chip} data-aos="fade-up" data-aos-delay="240">
                <i className="fas fa-newspaper"></i>
                <span>صـــنـــاعـــة الــــمـــقـــــالات</span>
              </li>
              <li className={styles.chip} data-aos="fade-up" data-aos-delay="320">
                <i className="fas fa-scroll"></i>
                <span>تـحـقـيـق الــمــخــطــوطـــات</span>
              </li>
              <li className={styles.chip} data-aos="fade-up" data-aos-delay="400">
                <i className="fas fa-language"></i>
                <span>صناعة الـمـحـتـوى الـمـترجـم</span>
              </li>
              <li className={styles.chip} data-aos="fade-up" data-aos-delay="480">
                <i className="fas fa-hashtag"></i>
                <span>إبداع المنـشـورات والـتـغريدات</span>
              </li>
            </ul>
          )}
          
          {layer3Loaded && (
            <a href="https://wa.me/201555855857" className={styles.cta} target="_blank" rel="noopener noreferrer">
              <i className={`fas fa-pen-nib ${styles.ctaIcon}`}></i>
              <span>المزيد</span>
            </a>
          )}
        </div>

        <div className={styles.right} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.hero}>
            <img
              src="/Transform Your Brand with Creative Content.webp"
              alt="صناعة المحتوى"
              className={styles.heroImg}
              loading="lazy"
            />
            {layer2Loaded && (
              <>
                <div className={`${styles.badge} ${styles.badge1}`}>
                  <div className={styles.badgeIcon}><i className="fas fa-bullhorn"></i></div>
                  <div className={styles.badgeText}>محتوى تسويقي</div>
                </div>
                <div className={`${styles.badge} ${styles.badge2}`}>
                  <div className={styles.badgeIcon}><i className="fas fa-graduation-cap"></i></div>
                  <div className={styles.badgeText}>محتوى تعليمي</div>
                </div>
                <div className={`${styles.badge} ${styles.badge3}`}>
                  <div className={styles.badgeIcon}><i className="fas fa-heart"></i></div>
                  <div className={styles.badgeText}>محتوى دعوي</div>
                </div>
              </>
            )}
          </div>
          {layer2Loaded && (
            <div className={styles.neon}>
              <div className={styles.typingBox}>
                <span className={styles.typingText}>الكلمة_تصنع_الفرق</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {layer3Loaded && (
        <div className={styles.scrollDownArrow}>
          <a href="#cloud-hosting" aria-label="الانتقال إلى قسم السيرفر والاستضافة">
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      )}
    </section>
  );
}
