import styles from "./TechConsultingSection.module.css";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgolhybek';
const cld = (path: string) => `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/dwam-website${path}`;

export default function TechConsultingSection() {
  return (
    <section id="tech-consulting" className={styles.section}>
      {/* Video Background */}
      <div className={styles.videoBgContainer}>
        <div className={styles.videoOverlay}></div>
        <video
          className={styles.bgVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          <source src="/server.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Animated Background */}
      <div className={styles.bgAnimated}>
        <div className={styles.gradientOverlay}></div>
      </div>

      {/* Main Container */}
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header} data-aos="fade-down">

          <h2 className={styles.title}>
            استشارات <span className={styles.highlight}>التحول</span> الرقمي
          </h2>
          <p className={styles.subtitle}>
استشارات تقنية متخصصة للشركات والمؤسسات لتمكينهم من التحول الرقمي
          </p>
        </div>

        {/* Dual Images Layout */}
        <div className={styles.imagesGrid}>
          {/* Left Image Card */}
          <div className={styles.imageCard} data-aos="fade-right" data-aos-delay="100">
            <div className={styles.imageWrapper}>
              <img
                src={cld("/1.webp")}
                alt="استشارات تقنية"
                className={styles.image}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <i className="fas fa-users-cog"></i>
                  <h3>فريق خبراء</h3>
                  <p>متخصصون في التقنيات الحديثة</p>
                </div>
              </div>
              <div className={styles.glowEffect}></div>
            </div>
          </div>

          {/* Center Content */}
          <div className={styles.centerContent} data-aos="zoom-in" data-aos-delay="200">
            <div className={styles.servicesBox}>
              <ServiceItem
                icon="fas fa-search"
                title="تحليل البنية الرقمية للمؤسسات"
                // description="دراسة شاملة للبنية التحتية"
                delay={250}
              />
              <ServiceItem
                icon="fas fa-lightbulb"
                title="تــقــديــم الـتـوصـيـات الـرقـمـيـة"
                // description="استشارات متخصصة ومخصصة"
                delay={300}
              />
              <ServiceItem
                icon="fas fa-cogs"
                title="تـنـفـيـذ إجراءات التحول الرقمي"
                // description="تطبيق عملي للحلول"
                delay={350}
              />
              <ServiceItem
                icon="fas fa-robot"
                title="توفير الأنظمة و الأتمتة الذكيـة"
                // description="حلول ذكية متطورة"
                delay={400}
              />
              <ServiceItem
                icon="fas fa-shield-alt"
                title="فحص الثغرات والأمن السيبراني"
                // description="حماية شاملة للبيانات"
                delay={450}
              />
              <ServiceItem
                icon="fas fa-certificate"
                title="شــهــادة اعـتـمــاد الــرقـمــنــة"
                // description="توثيق التحول الرقمي"
                delay={500}
              />
            </div>
          </div>

          {/* Right Image Card */}
          <div className={styles.imageCard} data-aos="fade-left" data-aos-delay="100">
            <div className={styles.imageWrapper}>
              <img
                src={cld("/Can digital stock set off new revolution in the capital market_.webp")}
                alt="الثورة الرقمية"
                className={styles.image}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <i className="fas fa-rocket"></i>
                  <h3>حلول مبتكرة</h3>
                  <p>قيادة الثورة الرقمية</p>
                </div>
              </div>
              <div className={styles.glowEffect}></div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={styles.ctaWrapper} data-aos="fade-up" data-aos-delay="600">
          <a href="https://wa.me/201555855857" className={styles.ctaBtn} target="_blank" rel="noopener noreferrer">
            <span>احجز استشارتك الان</span>
            <i className="fas fa-arrow-left"></i>
          </a>
        </div>
        <div className={styles.scrollDownArrow}>
          <a href="#dwam-products" aria-label="الانتقال إلى قسم منتجات دوام">
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

// Service Item Component
function ServiceItem({ icon, title, delay }: {
  icon: string;
  title: string;
  // description: string;
  delay: number;
}) {
  return (
    <div className={styles.serviceItem} data-aos="fade-up" data-aos-delay={delay}>
      <div className={styles.serviceIcon}>
        <i className={icon}></i>
      </div>
      <div className={styles.serviceText}>
        <h4>{title}</h4>
        {/* <p>{description}</p> */}
      </div>
    </div>
  );
}
