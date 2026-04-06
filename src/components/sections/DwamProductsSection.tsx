"use client";
import Image from "next/image";
import styles from "./DwamProductsSection.module.css";
import { cld } from "@/lib/cloudinary";

import { 
  FaHandsHelping, 
  FaMosque, 
  FaShoppingCart, 
  FaFileAlt, 
  FaUsers, 
  FaGraduationCap,
  FaCertificate,
  FaNewspaper,
  FaCar,
  FaBuilding,
  FaUtensils,
  FaRobot,
  FaSmile,
  FaBriefcase,
  FaHeadset
} from "react-icons/fa";

export default function DwamProductsSection() {
  const products = [
    { id: 0, name: "منصة الجمعيات", icon: <FaHandsHelping />, color: "#ff6a00" },
    { id: 1, name: "منصة الأوقاف", icon: <FaMosque />, color: "#ff8400" },
    { id: 2, name: "متجر إلكتروني", icon: <FaShoppingCart />, color: "#ff9500" },
    { id: 3, name: "إدارة المحتوى CMS", icon: <FaFileAlt />, color: "#ffa600" },
    { id: 4, name: "إدارة العملاء CRM", icon: <FaUsers />, color: "#ffb700" },
    { id: 5, name: "منصة تعليمية", icon: <FaGraduationCap />, color: "#ffc800" },
    { id: 6, name: "إنتاج الشهادات", icon: <FaCertificate />, color: "#ff7700" },
    { id: 7, name: "المجلات الإلكترونية", icon: <FaNewspaper />, color: "#ff6600" },
    { id: 8, name: "رقمنة السيارات", icon: <FaCar />, color: "#ff5500" },
    { id: 9, name: "رقمنة العقارات", icon: <FaBuilding />, color: "#ff4400" },
    { id: 10, name: "رقمنة المطاعم", icon: <FaUtensils />, color: "#ff3300" },
    { id: 11, name: "المساعد الذكي Bot", icon: <FaRobot />, color: "#ff2200" },
  ];

  const stats = [
    { icon: <FaUsers />, value: "+300", label: "العملاء" },
    { icon: <FaSmile />, value: "96%", label: "رضا المستفيدين" },
    { icon: <FaBriefcase />, value: "1500", label: "الأعمال التقنية" },
    { icon: <FaHeadset />, value: "24/7", label: "الدعم الفني" },
  ];

  return (
    <section id="dwam-products" className={styles.wrap}>
      <div className={styles.bgImage}></div>
      <div className={styles.bgOverlay}></div>

      <div className={styles.floatingElements}>
        <div className={styles.floatBox1}></div>
        <div className={styles.floatBox2}></div>
        <div className={styles.floatBox3}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>منتجات دوام الخاصة</h2>
          <p className={styles.subtitle}>حلول برمجية مبتكرة صممت خصيصاً لتلبية احتياجات عملك</p>
        </div>

        <div className={styles.content}>
          {/* Left Side - Image */}
          <div className={styles.leftSection}>
            <div className={styles.showcaseImage}>
              <Image src={cld("/ai-nuclear-energy-background-future-innovation-disruptive-technology.webp", 600)} alt="منتجات دوام" width={600} height={400} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>

          {/* Right Side - Products Tabs */}
          <div className={styles.rightSection}>
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={styles.productTab}
                  style={{
                    "--product-color": product.color,
                  } as React.CSSProperties}
                >
                  <div className={styles.tabIcon}>{product.icon}</div>
                  <div className={styles.tabName}>{product.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={styles.statsSection}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className={styles.moreButtonWrapper}>
          <a href="https://wa.me/201555855857" target="_blank" rel="noopener noreferrer" className={styles.moreButton}>
            <span>المزيد</span>
            <i className="fas fa-arrow-left"></i>
          </a>
        </div>
        <div className={styles.scrollDownArrow}>
          <a href="#dwam-store" aria-label="الانتقال إلى قسم متجر دوام">
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
