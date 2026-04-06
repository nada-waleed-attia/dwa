import Image from 'next/image';
import styles from "./DigitalMarketingSection.module.css";
import { cld } from "@/lib/cloudinary";

export default function DigitalMarketingSection() {
  return (
    <section id="digital-marketing" className={styles.section}>
      {/* Background with Overlay */}
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.overlay}></div>
        {/* Animated Background Shapes */}
        <div className={styles.shape} style={{ top: '10%', left: '10%', animationDelay: '0s' }}></div>
        <div className={styles.shape} style={{ bottom: '20%', right: '5%', animationDelay: '2s' }}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>

          {/* Content Side (Right in RTL) */}
          <div className={styles.textColumn} data-aos="fade-left">
            <div className={styles.glassCard}>
              <div className={styles.headerGroup}>
                <h2 className={styles.title}>
                  التسويق <span className={styles.gradientText}>الإلكتروني</span>
                </h2>
                <div className={styles.titleBar}></div>
              </div>

              <div className={styles.subContent}>
                <h3 className={styles.subheading}>
                  <i className={`fas fa-bullhorn ${styles.subIcon}`}></i>
                  ماذا نصنع؟
                </h3>

                <div className={styles.servicesGrid}>
                  <ServiceItem icon="fas fa-tasks" text="إعداد خطط إستراتيجية تسويقية" delay={100} />
                  <ServiceItem icon="fas fa-ad" text="إدارة الــحــمــلات الإعــلانــــيــة" delay={200} />
                  <ServiceItem icon="fas fa-chart-line" text="تـحـلـيـل الأداء ورفـع الـتـفـاعـل" delay={300} />
                  <ServiceItem icon="fas fa-bullhorn" text="حــــمـــــلات الــــبــــرانـــــدنــــج" delay={400} />
                  <ServiceItem icon="fas fa-search" text="تحـسـين مـحـركـات الـبـحـث SEO" delay={500} />
                  <ServiceItem icon="fas fa-pen-nib" text="التسـويـق بالمـحـتـوى الإبداعي" delay={600} />
                  <ServiceItem icon="fas fa-envelope-open-text" text="الـتـسـويـق بالـبـريد الإلـكـتـروني" delay={700} />
                  <ServiceItem icon="fas fa-file-alt" text="تـصـمـيــم صـفـحــات الــهـبــوط" delay={800} />
                </div>

                <div className={styles.ctaWrapper} data-aos="fade-up" data-aos-delay="900">
                  <a href="https://wa.me/201555855857" className={styles.ctaBtn} target="_blank" rel="noopener noreferrer">
                    <span>المزيد</span>
                    <i className={`fas fa-rocket ${styles.ctaIcon}`}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Side (Left in RTL) */}
          <div className={styles.visualColumn} data-aos="fade-right">
            <div className={styles.orbitContainer}>
              {/* Central Core */}
              <div className={styles.centralCore}>
                <div className={styles.coreGlow}></div>
                <Image
                  src={cld("/Boost_Your_Business_with_Fiverr_Pro.webp", 600)}
                  alt="Digital Marketing Core"
                  className={styles.coreImage}
                  width={500}
                  height={500}
                  loading="lazy"
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                />
              </div>

              {/* Orbiting Rings & Social Icons */}
              <div className={styles.orbitRingOuter}>
                <div className={`${styles.orbitItem} ${styles.socialFb}`}><i className="fab fa-facebook-f"></i></div>
                <div className={`${styles.orbitItem} ${styles.socialInsta}`}><i className="fab fa-instagram"></i></div>
                <div className={`${styles.orbitItem} ${styles.socialTw}`}><i className="fab fa-twitter"></i></div>
              </div>

              <div className={styles.orbitRingInner}>
                <div className={`${styles.orbitItem} ${styles.socialLi}`}><i className="fab fa-linkedin-in"></i></div>
                <div className={`${styles.orbitItem} ${styles.socialTk}`}><i className="fab fa-tiktok"></i></div>
                <div className={`${styles.orbitItem} ${styles.socialSn}`}><i className="fab fa-snapchat-ghost"></i></div>
                <div className={`${styles.orbitItem} ${styles.socialYt}`}><i className="fab fa-youtube"></i></div>
              </div>

              {/* Floating Stats */}
              <div className={`${styles.floatingStat} ${styles.stat1}`}>
                <i className="fas fa-chart-bar"></i>
                <div>
                  <strong>+200%</strong>
                  <span>زيادة المبيعات</span>
                </div>
              </div>

              <div className={`${styles.floatingStat} ${styles.stat2}`}>
                <i className="fas fa-users"></i>
                <div>
                  <strong>+350%</strong>
                  <span>نمو المتابعين</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className={styles.scrollDownArrow}>
          <a href="#edtech" aria-label="الانتقال إلى قسم تكنولوجيا التعليم">
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ icon, text, delay }: { icon: string; text: string; delay: number }) {
  return (
    <div className={styles.serviceItem} data-aos="fade-up" data-aos-delay={delay}>
      <div className={styles.iconBox}>
        <i className={icon}></i>
      </div>
      <p className={styles.serviceText}>{text}</p>
    </div>
  );
}
