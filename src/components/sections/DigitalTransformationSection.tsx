import styles from "./DigitalTransformationSection.module.css";

export default function DigitalTransformationSection() {
  return (
    <section id="digital-transformation" className={styles.section}>
      {/* Background Video */}
      <div className={styles.videoBgContainer}>
        <div className={styles.overlay}></div>
        <video
          className={styles.bgVideo}
          autoPlay
          loop
          muted
          playsInline
          poster="/digital-transformation.webp"
        >
          <source src="/Digital-Transformation_2.webm" type="video/mp4" />
        </video>
      </div>

      {/* Header Section (Outside Container) */}
      <div className={styles.header} data-aos="fade-down">
        <h2 className={styles.title}>
          خدمات التحول <span className={styles.gradientText}>الرقمي</span>
        </h2>
      </div>

      <div className={styles.container}>

        {/* Featured Image with Effect */}
        <div className={styles.featuredImageWrapper} data-aos="zoom-in">
          <div className={styles.imageFrame}>
            <img
              src="/digital-transformation.webp"
              alt="Digital Transformation"
              className={styles.featuredImg}
            />
            <div className={styles.scanline}></div>
            <div className={styles.cornerDecor}></div>
          </div>
        </div>

        {/* Services Grid (Tabs) */}
        <div className={styles.servicesRow}>
          <div className={styles.smartGrid}>
            <SmartTile icon="fas fa-search-plus" text="استشارات التحول" delay={100} />
            <SmartTile icon="fas fa-chart-line" text="ذكاء الأعمال" delay={150} />
            <SmartTile icon="fas fa-chess-board" text="الاستراتيجية الرقمية" delay={200} />
            <SmartTile icon="fas fa-laptop-code" text="الرقمنة الشاملة" delay={250} />
            <SmartTile icon="fas fa-robot" text="الأنظمة الذكية" delay={300} />
            <SmartTile icon="fas fa-project-diagram" text="تكامل الأنظمة" delay={350} />
            <SmartTile icon="fas fa-cloud" text="الحوسبة السحابية" delay={400} />
            <SmartTile icon="fas fa-server" text="البنية الرقمية" delay={450} />
            <SmartTile icon="fas fa-brain" text="حلول الذكاء الاصطناعي" delay={500} />
            <SmartTile icon="fas fa-balance-scale" text="الحوكمة التقنية" delay={550} />
          </div>

          <div className={styles.ctaWrapper} data-aos="fade-up" data-aos-delay="600">
            <a href="/digital-transformation" className={styles.ctaBtn} target="_blank" rel="noopener noreferrer">
              <span>ابدأ رحلة التحول الرقمي</span>
              <i className="fas fa-arrow-left"></i>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function SmartTile({ icon, text, delay }: { icon: string; text: string; delay: number }) {
  return (
    <div className={styles.smartTile} data-aos="fade-up" data-aos-delay={delay}>
      <div className={styles.tileIcon}>
        <i className={icon}></i>
      </div>
      <p className={styles.tileText}>{text}</p>
    </div>
  );
}
