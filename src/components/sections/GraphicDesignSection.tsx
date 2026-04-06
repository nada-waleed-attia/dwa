"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./GraphicDesignSection.module.css";
import LazyIframe from "@/components/LazyIframe";
import { getGallery, GalleryImage } from "@/lib/gallery";
import { cld } from "@/lib/cloudinary";

// Lazy load icons only when needed
import dynamic from "next/dynamic";
const FiChevronLeft = dynamic(() => import("react-icons/fi").then(mod => ({ default: mod.FiChevronLeft })), { ssr: false });
const FiChevronRight = dynamic(() => import("react-icons/fi").then(mod => ({ default: mod.FiChevronRight })), { ssr: false });

type PdfItem = {
  title: string;
  file: string;
};

// Cloudinary folder mapping
const CLOUDINARY_FOLDERS: Record<string, string> = {
  social: 'socialmedia',
  banners: 'banners',
  flyers: 'flyers',
  books: '3d',
};

export default function GraphicDesignSection() {
  // Progressive loading states
  const [layer2Loaded, setLayer2Loaded] = useState(false);
  const [layer3Loaded, setLayer3Loaded] = useState(false);
  
  // Cloudinary gallery state
  const [cloudinaryImages, setCloudinaryImages] = useState<Record<string, string[]>>({});
  const [loadingGallery, setLoadingGallery] = useState(false);

  const galleries = useMemo(
    () => ({
      identity: [
        { title: "هوية جمعية تحفيظ القرأن الكريم", file: "/Full_identity/1.pdf" },
        { title: "هوية فضاء جدة", file: "/Full_identity/2.pdf" },
        { title: "هوية فكرة رشاقة", file: "/Full_identity/3.pdf" },
        { title: "هوية جمعية المعالم السياحية بمكة المكرمة", file: "/Full_identity/4.pdf" },
        { title: "هوية وقف الصالح الخيري", file: "/Full_identity/5.pdf" },
      ] as PdfItem[],
      social: [] as string[],
      brochure: [
        { title: "بروشور تعريفي للشركة", file: "/brushor-reports/9.pdf" },
        { title: "بروفايل الخدمات", file: "/brushor-reports/10.pdf" },
        { title: "دليل الهوية البصرية", file: "/brushor-reports/11.pdf" },
        { title: "عرض الأعمال المختصر", file: "/brushor-reports/12.pdf" },
        { title: "بروشور الحلول الرقمية", file: "/brushor-reports/13.pdf" },
        { title: "ملف باقات الخدمات", file: "/brushor-reports/14.pdf" },
        { title: "كتيب المشاريع المنفذة", file: "/brushor-reports/15.pdf" },
        { title: "ملف أعمال السوشيال ميديا", file: "/brushor-reports/16.pdf" },
        { title: "عرض الحملات التسويقية", file: "/brushor-reports/17.pdf" },
        { title: "دليل التواصل والاتصال", file: "/brushor-reports/18.pdf" },
        { title: "بروشور الشراكات والنجاحات", file: "/brushor-reports/19.pdf" },
      ] as PdfItem[],
      reports: [] as string[],
      banners: [] as string[],
      flyers: [] as string[],
      books: [] as string[],
      logoAnimation: "PLKB9gdK4mtM0yLslxgOCPMPmEB5GvUUMm",
    }),
    []
  );

  const youtubePlaylists: Record<keyof typeof galleries, string | null> = {
    identity: "PLKB9gdK4mtM0yLslxgOCPMPmEB5GvUUMm",
    social: "PLKB9gdK4mtM0yLslxgOCPMPmEB5GvUUMm",
    brochure: "PLKB9gdK4mtM0yLslxgOCPMPmEB5GvUUMm",
    reports: "PLKB9gdK4mtM0yLslxgOCPMPmEB5GvUUMm",
    banners: "PLKB9gdK4mtM0yLslxgOCPMPmEB5GvUUMm",
    flyers: "PLKB9gdK4mtM0yLslxgOCPMPmEB5GvUUMm",
    books: "PLKB9gdK4mtM0yLslxgOCPMPmEB5GvUUMm",
    logoAnimation: "PLKB9gdK4mtM0yLslxgOCPMPmEB5GvUUMm",
  };

  const titles: Record<keyof typeof galleries, string> = {
    identity: "تصميم الهوية الكاملة",
    social: "تصميمات السوشيال ميديا",
    brochure: "تقارير وبروشورات",
    reports: "تقارير مفصلة",
    banners: "لافتات وإعلانات",
    flyers: "فلايرز احترافية",
    books: "أغلفة كتب",
    logoAnimation: "إنتاج لوجو أنيميشن",
  };

  const [activeKey, setActiveKey] = useState<keyof typeof galleries | null>(null);
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  // Lazy load modal content only when opened
  const [modalMounted, setModalMounted] = useState(false);
  
  // Pagination for images - يحمل 10 صور في كل مرة
  const [currentPage, setCurrentPage] = useState(0);
  const IMAGES_PER_PAGE = 10;
  
  // Device preview animation
  const [deviceSlideIndex, setDeviceSlideIndex] = useState(0);

  // Progressive loading timers
  useEffect(() => {
    const timer2 = setTimeout(() => setLayer2Loaded(true), 400);
    const timer3 = setTimeout(() => setLayer3Loaded(true), 800);
    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  
  // Device preview slides - تحمل من Cloudinary عند تحميل الـ section
  const socialSlides = useMemo(() => {
    const cloudSocial = cloudinaryImages['social'] || [];
    if (cloudSocial.length > 0) return cloudSocial.slice(0, 10);
    return [];
  }, [cloudinaryImages]);

  // تحميل صور السوشيال ميديا للـ device preview عند تحميل الـ section
  useEffect(() => {
    if (cloudinaryImages['social']) return; // مش محتاج تحمل تاني
    getGallery('socialmedia').then((images: GalleryImage[]) => {
      setCloudinaryImages(prev => ({
        ...prev,
        social: images.map((img: GalleryImage) => img.secureUrl)
      }));
    }).catch(() => {});
  }, []);
  
  // Animate device preview
  useEffect(() => {
    if (socialSlides.length === 0) return;
    const timer = setInterval(() => {
      setDeviceSlideIndex((prev) => (prev + 1) % socialSlides.length);
    }, 3000); // كل 3 ثواني
    return () => clearInterval(timer);
  }, [socialSlides.length]);

  const currentData = activeKey ? galleries[activeKey] : [];
  const isBrochureReportsView = activeKey === "brochure";
  const isIdentityView = activeKey === "identity";
  const isLogoAnimationView = activeKey === "logoAnimation";

  const isPDFView = isIdentityView || isBrochureReportsView;
  
  // استخدم الصور من Cloudinary لو موجودة، غير كده استخدم الـ static array
  const staticImages = isPDFView || isLogoAnimationView ? [] : (currentData as string[]);
  const cloudImages = activeKey ? (cloudinaryImages[activeKey as string] || []) : [];
  const allImages = cloudImages.length > 0 ? cloudImages : staticImages;
  
  // حساب الصور للصفحة الحالية
  const totalPages = Math.ceil(allImages.length / IMAGES_PER_PAGE);
  const startIndex = currentPage * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const images = allImages.slice(startIndex, endIndex);
  const hasNextPage = currentPage < totalPages - 1;
  const hasPrevPage = currentPage > 0;
  
  // Reset index when page changes
  useEffect(() => {
    setIndex(0);
  }, [currentPage]);

  useEffect(() => {
    if (!activeKey || images.length <= 1 || !autoPlay) return;
    const timer = setInterval(() => {
      setIndex((i) => {
        const nextIndex = i + 1;
        // لو وصل لآخر صورة في الصفحة الحالية
        if (nextIndex >= images.length) {
          // لو فيه صفحة تانية، روح عليها
          if (hasNextPage) {
            setCurrentPage(p => p + 1);
            setAutoPlay(false); // أوقف auto-play مؤقتاً
            setTimeout(() => setAutoPlay(true), 100); // أعد تشغيله
            return 0; // ابدأ من أول صورة في الصفحة الجديدة
          }
          // لو مفيش، ارجع للأول
          return 0;
        }
        return nextIndex;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [activeKey, images.length, autoPlay, hasNextPage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (!activeKey || images.length === 0) return;
      
      if (e.key === "ArrowRight") {
        const nextIndex = index + 1;
        if (nextIndex >= images.length) {
          if (hasNextPage) {
            setTimeout(() => {
              setIndex(0);
              setCurrentPage(p => p + 1);
            }, 0);
          } else {
            setIndex(0);
          }
        } else {
          setIndex(nextIndex);
        }
      }
      
      if (e.key === "ArrowLeft") {
        const prevIndex = index - 1;
        if (prevIndex < 0) {
          if (hasPrevPage) {
            setTimeout(() => {
              setIndex(IMAGES_PER_PAGE - 1);
              setCurrentPage(p => p - 1);
            }, 0);
          } else {
            setIndex(images.length - 1);
          }
        } else {
          setIndex(prevIndex);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeKey, images.length, hasNextPage, hasPrevPage, IMAGES_PER_PAGE, index]);

  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  const open = async (key: keyof typeof galleries) => {
    setActiveKey(key);
    setIndex(0);
    setAutoPlay(true);
    setModalMounted(true);
    setCurrentPage(0);
    document.body.style.overflow = "hidden";

    // جلب الصور من Cloudinary لو الـ key عنده folder
    const folder = CLOUDINARY_FOLDERS[key as string];
    if (folder && !cloudinaryImages[key as string]) {
      setLoadingGallery(true);
      try {
        const images = await getGallery(folder);
        setCloudinaryImages(prev => ({
          ...prev,
          [key]: images.map((img: GalleryImage) => img.secureUrl)
        }));
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoadingGallery(false);
      }
    }
  };

  const close = () => {
    setActiveKey(null);
    setAutoPlay(true);
    setShowPlaylist(false);
    document.body.style.overflow = "";
    // Keep modalMounted true to avoid re-mounting
  };

  const togglePlaylist = () => {
    setShowPlaylist((prev) => !prev);
  };

  const currentPlaylistId = activeKey ? youtubePlaylists[activeKey] : null;

  return (
    <section id="graphic-design" className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.side}>
            <div className={styles.headerShell}>
              <h2 className={styles.title}>{"تصميم الجرافيك"}</h2>
              <p className={styles.subtitle}>{"تصميم عصري، مختلف، ومعبر لهويتك"}</p>
              <p className={styles.sectionHint}>{"( اضغط لمشاهدة أعمالنا )"}</p>
            </div>

            <div className={styles.devicePaneMobile} aria-hidden="true">
              <div className={styles.device}>
                <div className={styles.deviceScreen}>
                  {socialSlides.length > 0 && (
                    <Image
                      src={socialSlides[deviceSlideIndex]}
                      alt="معاينة الأعمال"
                      fill
                      className={styles.deviceImage}
                      sizes="(max-width: 768px) 200px, 0px"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>

            {layer2Loaded && (
              <div className={styles.tiles}>
              <button type="button" className={`${styles.tile} ${styles.t1}`} onClick={() => open("identity")}>
                <Image src={cld("/icons/icon1.webp", 80)} alt={"تصميم الهوية"} className={styles.tileIcon} width={80} height={80} loading="lazy" />
                <h3 className={styles.tileTitle}>{"تصميم الهوية الكاملة"}</h3>
                <p className={styles.tileText}>{"بناء هوية متكاملة وشخصية قوية للعلامة."}</p>
              </button>

              <button type="button" className={`${styles.tile} ${styles.t2}`} onClick={() => open("social")}>
                <Image src={cld("/share_12550121.webp", 80)} alt={"سوشيال ميديا"} className={styles.tileIcon} width={80} height={80} loading="lazy" />
                <h3 className={styles.tileTitle}>{"تصميمات السوشيال ميديا"}</h3>
                <p className={styles.tileText}>{"قوالب ومحتوى بصري جذاب يعزز التفاعل."}</p>
              </button>

              <button type="button" className={`${styles.tile} ${styles.t3}`} onClick={() => open("brochure")}>
                <Image src={cld("/icons/icon3.webp", 80)} alt={"تقارير وبروشورات"} className={styles.tileIcon} width={80} height={80} loading="lazy" />
                <h3 className={styles.tileTitle}>{"تقارير وبروشورات"}</h3>
                <p className={styles.tileText}>{"إخراج احترافي للمطبوعات المؤسسية."}</p>
              </button>

              <button type="button" className={`${styles.tile} ${styles.t4}`} onClick={() => open("banners")}>
                <Image src={cld("/icons/icon4.webp", 80)} alt={"لافتات"} className={styles.tileIcon} width={80} height={80} loading="lazy" />
                <h3 className={styles.tileTitle}>{"لافتات وإعلانات"}</h3>
                <p className={styles.tileText}>{"تصميم لافتات عالية الوضوح والأثر."}</p>
              </button>

              <button type="button" className={`${styles.tile} ${styles.t5}`} onClick={() => open("flyers")}>
                <Image src={cld("/icons/icon5.webp", 80)} alt={"فلايرز"} className={styles.tileIcon} width={80} height={80} loading="lazy" />
                <h3 className={styles.tileTitle}>{"فلايرز احترافية"}</h3>
                <p className={styles.tileText}>{"مواد ترويجية مختصرة ومباشرة."}</p>
              </button>

              <button type="button" className={`${styles.tile} ${styles.t6}`} onClick={() => open("books")}>
                <Image src={cld("/book_5463282.webp", 80)} alt={"أغلفة كتب"} className={styles.tileIcon} width={80} height={80} loading="lazy" />
                <h3 className={styles.tileTitle}>{"أغلفة كتب"}</h3>
                <p className={styles.tileText}>{"أغلفة بصرية ملهمة ومعبرة عن المحتوى."}</p>
              </button>
            </div>
            )}

            {layer3Loaded && (
              <div className={styles.ctaWrap}>
              <a href="https://wa.me/201555855857" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>{"المزيد"}</a>
              <div className={styles.scrollDownArrow}>
                <a href="#multimedia" aria-label={"الانتقال إلى قسم المالتيميديا"}>
                  <i className="fas fa-chevron-down"></i>
                </a>
              </div>
            </div>
            )}
          </div>

          <div className={styles.devicePane} aria-hidden="true">
            <div className={styles.device}>
              <div className={styles.deviceScreen}>
                {socialSlides.length > 0 && (
                  <Image
                    src={socialSlides[deviceSlideIndex]}
                    alt="معاينة الأعمال"
                    fill
                    className={styles.deviceImage}
                    sizes="(min-width: 769px) 300px, 0px"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - يحمل فقط عند فتحه */}
      {activeKey && modalMounted && createPortal(
        <div className={styles.modalOverlay} onClick={close} role="dialog" aria-modal="true">
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h4 className={styles.modalTitle}>{titles[activeKey]}</h4>
              <div className={styles.modalHeaderActions}>
                {currentPlaylistId && false && (
                  <button
                    className={styles.playlistToggleBtn}
                    onClick={togglePlaylist}
                    aria-label={"عرض قائمة الفيديوهات"}
                    title={"عرض قائمة الفيديوهات"}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 7L16 12L23 17V7Z" fill="currentColor" />
                      <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                )}
                <button className={styles.modalClose} onClick={close} aria-label={"إغلاق"}>{"×"}</button>
              </div>
            </div>

            <div className={styles.modalContent}>
              {!isPDFView && !isLogoAnimationView && images.length === 0 ? (
                <div className={styles.emptyNotice}>
                  {loadingGallery ? "جاري تحميل الصور..." : "لا توجد أعمال لعرضها الآن"}
                </div>
              ) : isLogoAnimationView ? (
                <div className={styles.youtubePlaylistWrap}>
                  <LazyIframe
                    src={`https://www.youtube.com/embed/videoseries?list=${galleries.logoAnimation}`}
                    title={"قائمة تشغيل لوجو أنيميشن"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.youtubeEmbed}
                    rootMargin="400px"
                  />
                  <div className={styles.playlistInfo}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 7L16 12L23 17V7Z" fill="#ff6a00" />
                      <rect x="1" y="5" width="15" height="14" rx="2" stroke="#ff6a00" strokeWidth="2" />
                    </svg>
                    <span>{"قائمة تشغيل كاملة لأعمالنا في تحريك الشعارات"}</span>
                  </div>
                </div>
              ) : isPDFView ? (
                <div className={styles.reportsGrid}>
                  {(currentData as PdfItem[]).map((item, idx) => (
                    <a
                      key={idx}
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.reportCard}
                    >
                      <div className={styles.reportIcon}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className={styles.reportInfo}>
                        <h5 className={styles.reportTitle}>{item.title}</h5>
                        <span className={styles.reportBadge}>PDF</span>
                      </div>
                      <div className={styles.reportArrow}>{"←"}</div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className={styles.sliderWrap}>
                  <Image
                    src={images[index]}
                    alt={`${titles[activeKey]} - ${index + 1}`}
                    className={styles.sliderImg}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    unoptimized
                    onError={(e) => {
                      e.currentTarget.src = "/icons/icon1.webp";
                    }}
                  />

                  <button
                    className={`${styles.navBtn} ${styles.prev}`}
                    onClick={() => {
                      const prevIndex = index - 1;
                      if (prevIndex < 0) {
                        // وصل لأول صورة في الصفحة
                        if (hasPrevPage) {
                          setTimeout(() => {
                            setIndex(IMAGES_PER_PAGE - 1); // آخر صورة في الصفحة السابقة
                            setCurrentPage(p => p - 1);
                          }, 0);
                        } else {
                          setIndex(images.length - 1); // آخر صورة في الصفحة الحالية
                        }
                      } else {
                        setIndex(prevIndex);
                      }
                    }}
                    aria-label={"\u0627\u0644\u0633\u0627\u0628\u0642"}
                  >
                    <FiChevronRight size={22} aria-hidden="true" />
                  </button>
                  <button
                    className={`${styles.navBtn} ${styles.next}`}
                    onClick={() => {
                      const nextIndex = index + 1;
                      if (nextIndex >= images.length) {
                        // وصل لآخر صورة في الصفحة
                        if (hasNextPage) {
                          setTimeout(() => {
                            setIndex(0);
                            setCurrentPage(p => p + 1);
                          }, 0);
                        } else {
                          setIndex(0); // ارجع للأول
                        }
                      } else {
                        setIndex(nextIndex);
                      }
                    }}
                    aria-label={"\u0627\u0644\u062A\u0627\u0644\u064A"}
                  >
                    <FiChevronLeft size={22} aria-hidden="true" />
                  </button>

                  <button
                    className={styles.autoPlayBtn}
                    onClick={() => setAutoPlay((prev) => !prev)}
                    aria-label={
                      autoPlay
                        ? "إيقاف التشغيل التلقائي"
                        : "تشغيل التشغيل التلقائي"
                    }
                  >
                    {autoPlay ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1" />
                        <rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                      </svg>
                    )}
                  </button>

                  <div className={styles.dots}>
                    {images.map((_, i) => (
                      <button
                        key={i}
                        className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                        onClick={() => setIndex(i)}
                        aria-label={`${"الصورة"} ${i + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Page Navigation - Split into two parts */}
                  {totalPages > 1 && (
                    <>
                      {/* Right side - Previous button */}
                      <div className={styles.pageNavigationRight}>
                        <button 
                          className={styles.pageBtn}
                          onClick={() => {
                            if (hasPrevPage) {
                              setTimeout(() => {
                                setIndex(0);
                                setCurrentPage(p => p - 1);
                              }, 0);
                            }
                          }}
                          disabled={!hasPrevPage}
                        >
                          <i className="fas fa-chevron-right"></i>
                          <span>السابقة</span>
                        </button>
                      </div>
                      
                      {/* Left side - Info and Next button */}
                      <div className={styles.pageNavigationLeft}>
                        <span className={styles.imageCounter}>
                          صورة {startIndex + index + 1} / {allImages.length}
                        </span>
                        
                        <button 
                          className={styles.pageBtn}
                          onClick={() => {
                            if (hasNextPage) {
                              setTimeout(() => {
                                setIndex(0);
                                setCurrentPage(p => p + 1);
                              }, 0);
                            }
                          }}
                          disabled={!hasNextPage}
                        >
                          <span>التالية</span>
                          <i className="fas fa-chevron-left"></i>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {currentPlaylistId && (
              <div className={`${styles.playlistSidebar} ${showPlaylist ? styles.playlistSidebarOpen : ""}`}>
                <div className={styles.playlistHeader}>
                  <h5 className={styles.playlistTitle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 7L16 12L23 17V7Z" fill="currentColor" />
                      <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {"فيديوهات تعليمية"}
                  </h5>
                  <button className={styles.playlistCloseBtn} onClick={togglePlaylist} aria-label={"إغلاق القائمة"}>
                    {"×"}
                  </button>
                </div>
                <div className={styles.playlistContent}>
                  <LazyIframe
                    src={`https://www.youtube.com/embed/videoseries?list=${currentPlaylistId}`}
                    title={`${"فيديوهات"} ${titles[activeKey]}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.playlistEmbed}
                    rootMargin="400px"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      , document.body)}
    </section>
  );
}