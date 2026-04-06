import styles from "./SimpleFooter.module.css";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgolhybek';
const cld = (path: string) => `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/dwam-website${path}`;

export default function SimpleFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <span className={styles.copyright}>جميع الحقوق محفوظة</span>
          
          <span className={styles.separator}>|</span>
          
          <div className={styles.brandSection}>
            <span className={styles.text}>لشركة</span>
            <a href="/" className={styles.logoLink}>
              <img 
                src="/ثوابت-02.webp"
                alt="دوام" 
                className={styles.logo}
              />
            </a>
            <span className={styles.text}>للبرمجيات والأعمال التقنية ( ش.ذ.م.م)</span>
            <span className={styles.registered}>®</span>
          </div>
          
          <span className={styles.separator}>|</span>
          
          <span className={styles.companyType}>شركة ذات مسئولية محدودة</span>
          
          <span className={styles.separator}>|</span>
          
          <div className={styles.links}>
            <a href="/" className={styles.link}>التوظيف</a>
            <span className={styles.separator}>|</span>
            <a href="/privacy-policy" className={styles.link}>سياسة الخصوصية</a>
            <span className={styles.separator}>|</span>
            <a href="/terms-conditions" className={styles.link}>الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
