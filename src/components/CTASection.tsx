import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <video autoPlay muted loop playsInline preload="none" className={styles.ctaVideo}>
        <source src="/server.mp4" type="video/mp4" />
      </video>
      
      <div className={styles.ctaOverlay}></div>

      <div className={styles.container}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>هل حان وقت الانطلاق؟</h2>
          <p className={styles.ctaText}>
            لا تتردد في تحويل فكرتك أو مؤسستك إلى كيان رقمي حيّ يجذب الانتباه
            ويحقق أهدافك
            <br />
            احجز الآن استشارتك المجانية، أو تواصل معنا وسنكون معك خطوة بخطوة
          </p>
          <div className={styles.ctaButtonWrap}>
            <a
              href="https://wa.me/201555855857"
              className={styles.ctaButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>احجز الآن</span>
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
