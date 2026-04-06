import styles from "./SimpleFooter.module.css";
import { cld } from "@/lib/cloudinary";

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
                src={cld("/02.webp", 120)}
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
