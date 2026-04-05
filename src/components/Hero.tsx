import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./Hero.module.css";

// Lazy load Spline only after user interaction
const SplineScene = dynamic(() => import("@/components/spline/SplineScene"), {
  ssr: false,
  loading: () => null
});

interface HeroProps {
  title?: string;
}

export default function Hero({ title = "للبرمجيات والأعمال التقنية" }: HeroProps) {
  const heroSceneUrl = "https://prod.spline.design/AZKtIJgbI3wnee-5/scene.splinecode";
  
  // Only load Spline after user interaction (optional enhancement)
  // const [loadSpline, setLoadSpline] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => setLoadSpline(true), 3000);
  //   return () => clearTimeout(timer);
  // }, []);
  
  const leftServices = [
    { icon: "fas fa-laptop-code", label: "حــلــول بــرمــجــيـــة", href: "#solutions" },
    { icon: "fas fa-film", label: "الــمـالــتــيــمــيــديـــا", href: "#multimedia" },
    { icon: "fas fa-pen-fancy", label: "صـنـاعـة المــحــتــوى", href: "#content-creation" },
    { icon: "fas fa-bullhorn", label: "التسويـق الإلكتـروني", href: "#digital-marketing" },
    { icon: "fas fa-graduation-cap", label: "دورات تـــدريـــبــيـــة", href: "#training-courses" },
    { icon: "fas fa-shopping-cart", label: "مـــتــــجــــــــــر دوام", href: "#dwam-store" },
  ];

  const rightServices = [
    { icon: "fas fa-paint-brush", label: "تــصــمــيــم الــجــرافـــيــك", href: "#graphic-design" },
    { icon: "fas fa-brain", label: "الـــذكــاء الإصـــطــنــاعــي", href: "#ai" },
    { icon: "fa fa-cloud", label: "الإسـتـضـافـة الـسـحـابـيـة", href: "#cloud-hosting" },
    { icon: "fas fa-chalkboard-teacher", label: "تـكـنـولـوجـيـا الــتـعـلـيــم", href: "#edtech" },
    { icon: "fas fa-comments", label: "اســـتــشــارات رقـــمــيــة", href: "#tech-consulting" },
    { icon: "fas fa-shop", label: "مــنـتـجـات دوام الخــاصـة", href: "#dwam-products" },
  ];

  return (
    <section className={styles.heroSection}>
      <Image
        src="/robot-poster1.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.heroFallback}
        aria-hidden="true"
      />
      {/* Spline Robot 3D */}
      <div className={styles.heroSpline} aria-hidden="true">
        <SplineScene scene={heroSceneUrl} />
      </div>
      <div className={styles.heroOverlay}></div>
      
      <div className={styles.heroContainer}>
        {/* Left Services */}
        <div className={styles.servicesLeft}>
          {leftServices.map((service, index) => (
            <a 
              key={index} 
              href={service.href} 
              className={styles.serviceCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <i className={service.icon} style={{ color: "#ff8400" }}></i>
              <span>{service.label}</span>
            </a>
          ))}
        </div>

        {/* Center Logo */}
        <div className={styles.centerContent}>
          <a href="/" className={styles.logoWrapper}>
            <Image
              src="/ثوابت-02.webp"
              alt="شعار دوام للأعمال التقنية"
              width={300}
              height={300}
              priority={true}
              className={styles.logo}
            />
          </a>
          <h1 className={styles.mainTitle}>{title}</h1>
        </div>

        {/* Right Services */}
        <div className={styles.servicesRight}>
          {rightServices.map((service, index) => (
            <a 
              key={index} 
              href={service.href} 
              className={styles.serviceCard}
              style={{ animationDelay: `${(index + 6) * 0.1}s` }}
            >
              <i className={service.icon} style={{ color: "#ff8400" }}></i>
              <span>{service.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.scrollDownArrow}>
        <a href="#about" aria-label="الانتقال إلى قسم الحلول البرمجية">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
}
