import styles from "./LocationSection.module.css";
import dynamic from "next/dynamic";

// Lazy load icons
const FaMapMarkerAlt = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaMapMarkerAlt })), { ssr: false });
const FaPhone = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaPhone })), { ssr: false });
const FaEnvelope = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaEnvelope })), { ssr: false });
const FaClock = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaClock })), { ssr: false });

export default function LocationSection() {
  const address = "جمهورية مصر العربية - محافظة الإسماعيلية – حي الزهور – المنطقة التاسعة ب – عمارة 4 مدخل أ";
  const coordinates = { lat: 30.6127315, lng: 32.2903164 };
  const mapUrl = `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = "https://www.google.com/maps/place/شركة+دوام+للأعمال+التقنية‭/@30.612736,32.2951873,17z/data=!3m1!4b1!4m6!3m5!1s0x14583930c85a0f87:0xd673ba25da96893a!8m2!3d30.6127315!4d32.2903164!16s%2Fg%2F11qn07ss09";

  return (
    <section id="location" className={styles.section}>
      <div className={styles.bgPattern}></div>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>أين تجدنا</h2>
          {/* <p className={styles.subtitle}>نحن هنا لخدمتك في أي وقت</p> */}
        </div>

        <div className={styles.content}>
          <div className={styles.mapSection}>
            <div className={styles.mapWrap}>
              <iframe
                title="الموقع على الخريطة - شركة دوام للأعمال التقنية"
                className={styles.map}
                src={mapUrl}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <FaMapMarkerAlt />
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>العنوان</h3>
                <p className={styles.infoText}>{address}</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <FaPhone />
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>الهاتف</h3>
                <p className={styles.infoText} style={{ direction: 'ltr', textAlign: 'right' }}>+20 155 585 5857</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <FaClock />
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>ساعات العمل</h3>
                <p className={styles.infoText}>السبت - الاربعاء: 9 صباحاً - 11 مساءً</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <FaEnvelope />
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>الإستشارات</h3>
                <p className={styles.infoText}>الـخـمـيـس : من الساعة 12 م إلي 8 م</p>
              </div>
            </div>

            

            <a href={directionsUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className={styles.directionBtn}>
              <FaMapMarkerAlt />
              <span>اللوكيشن</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

