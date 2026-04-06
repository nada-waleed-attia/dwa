"use client";
import { useState, useEffect } from "react";
import styles from "./TrainingCoursesSection.module.css";
import dynamic from "next/dynamic";
import { cld } from "@/lib/cloudinary";

// Lazy load icons
const FaGraduationCap = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaGraduationCap })), { ssr: false });
const FaCertificate = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaCertificate })), { ssr: false });
const FaUsers = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaUsers })), { ssr: false });
const FaClock = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaClock })), { ssr: false });
const FaChartLine = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaChartLine })), { ssr: false });
const FaLaptopCode = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaLaptopCode })), { ssr: false });
const FaArrowLeft = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaArrowLeft })), { ssr: false });
const FaArrowRight = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaArrowRight })), { ssr: false });

export default function TrainingCoursesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: "/courses/1.webp", title: "دورة تدريبية 1" },
    { image: "/courses/2.webp", title: "دورة تدريبية 2" },
    { image: "/courses/3.webp", title: "دورة تدريبية 3" },
    { image: "/courses/4.webp", title: "دورة تدريبية 4" },
    { image: "/courses/5.webp", title: "دورة تدريبية 5" },
    { image: "/courses/6.jpeg", title: "دورة تدريبية 6" },
    { image: "/courses/7.webp", title: "دورة تدريبية 7" },
    { image: "/courses/8.webp", title: "دورة تدريبية 8" },
    { image: "/courses/9.jpeg", title: "دورة تدريبية 9" },
    { image: "/courses/10.webp", title: "دورة تدريبية 10" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const features = [
    { icon: <FaGraduationCap />, title: "مدربون محترفون", desc: "خبراء في مجالاتهم" },
    { icon: <FaCertificate />, title: "شهادات معتمدة", desc: "شهادة إتمام موثقة" },
    { icon: <FaUsers />, title: "تدريب تفاعلي", desc: "ورش عمل عملية" },
  ];

  return (
    <section id="training-courses" className={styles.wrap}>
      <div className={styles.bgOverlay}></div>

      {/* Floating Icons */}
      <div className={styles.floatingIcons} aria-hidden="true">
        <div className={styles.floatIcon1}>
          <FaGraduationCap />
        </div>
        <div className={styles.floatIcon2}>
          <FaCertificate />
        </div>
        <div className={styles.floatIcon3}>
          <FaLaptopCode />
        </div>
        <div className={styles.floatIcon4}>
          <FaChartLine />
        </div>
        <div className={styles.floatIcon5}>
          <FaUsers />
        </div>
        <div className={styles.floatIcon6}>
          <FaClock />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.mainLayout}>
          {/* Right Side - Content */}
          <div className={styles.contentSection}>
            <div className={styles.logoWrapper}>
              <img src={cld("/dwam-acadmy.webp", 200)} alt="دوام أكاديمي" className={styles.logo} />
            </div>

            <div className={styles.description}>
              <p>
                <span className={styles.highlight}>&quot;دوام أكاديمي&quot;:</span> وجهتكم لاحتراف البرمجة وتقنيات التحول الرقمي. 
                ندمج بين خبرتنا البرمجية العميقة والتطبيق العملي، لنقدم لكم مسارات تعليمية مرنة عبر منصتنا الذكية 
                <span className={styles.highlight}>&quot;أونلاين&quot;</span>
                أو من خلال 
                <span className={styles.highlight}>&quot;دوراتنا الحضورية&quot;</span>. 
                سواء كنت تطور مؤسستك أو تبني مسارك المهني، نحن نؤهلك لقيادة المستقبل التقني بثقة واحترافية.
              </p>
            </div>

            <div className={styles.featuresGrid}>
              {features.map((feature, idx) => (
                <div key={idx} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureText}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDesc}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.ctaWrapper}>
              <a href="https://wa.me/201555855857" className={styles.ctaBtn}>
                انضم لمنصة دوام أكاديمي
                <FaArrowLeft className={styles.ctaIcon} />
              </a>
            </div>
          </div>

          {/* Left Side - Slideshow */}
          <div className={styles.slideshowSection}>
            <div className={styles.slideshowContainer}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ''}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={styles.slideMedia}
                  />
                  <div className={styles.slideOverlay}></div>
                </div>
              ))}
              
              <button className={styles.slideBtn} onClick={prevSlide} style={{ right: '20px' }}>
                <FaArrowRight />
              </button>
              <button className={styles.slideBtn} onClick={nextSlide} style={{ left: '20px' }}>
                <FaArrowLeft />
              </button>

              <div className={styles.slideDots}>
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.scrollDownArrow}>
          <a href="#tech-consulting" aria-label="الانتقال إلى قسم الاستشارات التقنية">
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
