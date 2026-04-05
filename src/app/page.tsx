"use client";

import { Suspense } from "react";
import styles from "./page.module.css";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

// ============================================
// LAYER 1: Critical - First Viewport (SSR)
// ============================================
// تحميل فوري مع SSR للمحتوى الأساسي
import AboutUsSection from "@/components/AboutUsSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import InquiryBanner from "@/components/InquiryBanner";

// ============================================
// LAYER 2: High Priority - Near Viewport
// ============================================
// تحميل مبكر بدون SSR لكن مع preload
const GraphicDesignSection = dynamic(() => import("@/components/sections/GraphicDesignSection"), { 
  ssr: false,
  loading: () => <SectionSkeleton />
});
const MultimediaSection = dynamic(() => import("@/components/sections/MultimediaSection"), { 
  ssr: false,
  loading: () => <SectionSkeleton />
});
const AISection = dynamic(() => import("@/components/sections/AISection"), { 
  ssr: false,
  loading: () => <SectionSkeleton />
});

// ============================================
// LAYER 3: Medium Priority - Below Fold
// ============================================
// تحميل متوسط عند الاقتراب
const ContentCreationSection = dynamic(() => import("@/components/sections/ContentCreationSection"), { ssr: false });
const CloudHostingSection = dynamic(() => import("@/components/sections/CloudHostingSection"), { ssr: false });
const DigitalMarketingSection = dynamic(() => import("@/components/sections/DigitalMarketingSection"), { ssr: false });
const EdTechSection = dynamic(() => import("@/components/sections/EdTechSection"), { ssr: false });
const TechConsultingSection = dynamic(() => import("@/components/sections/TechConsultingSection"), { ssr: false });
const TrainingCoursesSection = dynamic(() => import("@/components/sections/TrainingCoursesSection"), { ssr: false });

// ============================================
// LAYER 4: Low Priority - Far Below
// ============================================
// تحميل متأخر جداً
const DwamProductsSection = dynamic(() => import("@/components/sections/DwamProductsSection"), { ssr: false });
const DwamStoreSection = dynamic(() => import("@/components/sections/DwamStoreSection"), { ssr: false });
const InternationalAgentsSection = dynamic(() => import("@/components/sections/InternationalAgentsSection"), { ssr: false });
const PartnersSection = dynamic(() => import("@/components/PartnersSection"), { ssr: false });
const LocationSection = dynamic(() => import("@/components/LocationSection"), { ssr: false });
const ContactUsSection = dynamic(() => import("@/components/sections/ContactUsSection"), { ssr: false });
const SocialMediaSection = dynamic(() => import("@/components/sections/SocialMediaSection"), { ssr: false });
const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: false });
const SimpleFooter = dynamic(() => import("@/components/SimpleFooter"), { ssr: false });

// Import the optimized LazyWrapper
import LazyWrapper from "@/components/LazyWrapper";

// Skeleton Loader Component
function SectionSkeleton() {
  return (
    <div className={styles.sectionSkeleton}>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonText} />
        <div className={styles.skeletonText} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.app}>
      {/* ============================================ */}
      {/* LAYER 1: Critical Content - First Viewport */}
      {/* ============================================ */}
      <Hero />
      
      <div className={styles.snapContainer}>
        {/* المحتوى الأساسي - يحمل فوراً مع SSR */}
        <AboutUsSection />
        <SolutionsSection />
        <InquiryBanner />

        {/* ============================================ */}
        {/* LAYER 2: High Priority - Near Viewport */}
        {/* ============================================ */}
        {/* تحميل مبكر - 1200px قبل الظهور */}
        <Suspense fallback={<SectionSkeleton />}>
          <LazyWrapper rootMargin="1200px">
            <GraphicDesignSection />
            <InquiryBanner />
          </LazyWrapper>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <LazyWrapper rootMargin="1200px">
            <MultimediaSection />
            <InquiryBanner />
          </LazyWrapper>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <LazyWrapper rootMargin="1200px">
            <AISection />
            <InquiryBanner />
          </LazyWrapper>
        </Suspense>

        {/* ============================================ */}
        {/* LAYER 3: Medium Priority - Below Fold */}
        {/* ============================================ */}
        {/* تحميل متوسط - 1000px قبل الظهور */}
        <LazyWrapper rootMargin="1000px">
          <ContentCreationSection />
          <InquiryBanner />
        </LazyWrapper>

        <LazyWrapper rootMargin="1000px">
          <CloudHostingSection />
          <InquiryBanner />
        </LazyWrapper>

        <LazyWrapper rootMargin="1000px">
          <DigitalMarketingSection />
          <InquiryBanner />
        </LazyWrapper>

        <LazyWrapper rootMargin="800px">
          <EdTechSection />
          <InquiryBanner />
        </LazyWrapper>

        <LazyWrapper rootMargin="800px">
          <TechConsultingSection />
          <InquiryBanner />
        </LazyWrapper>

        <LazyWrapper rootMargin="800px">
          <TrainingCoursesSection />
          <InquiryBanner />
        </LazyWrapper>

        {/* ============================================ */}
        {/* LAYER 4: Low Priority - Far Below */}
        {/* ============================================ */}
        {/* تحميل متأخر - 600px قبل الظهور */}
        <LazyWrapper rootMargin="600px">
          <DwamProductsSection />
          <InquiryBanner />
        </LazyWrapper>

        <LazyWrapper rootMargin="600px">
          <DwamStoreSection />
          <InquiryBanner />
        </LazyWrapper>

        <LazyWrapper rootMargin="600px">
          <InternationalAgentsSection />
          <InquiryBanner />
        </LazyWrapper>

        <LazyWrapper rootMargin="600px" minHeight="80vh">
          <PartnersSection />
          <InquiryBanner />
        </LazyWrapper>

        {/* ============================================ */}
        {/* LAYER 5: Lowest Priority - Footer Area */}
        {/* ============================================ */}
        {/* تحميل عند الوصول تقريباً */}
        <LazyWrapper rootMargin="400px" minHeight="60vh">
          <LocationSection />
        </LazyWrapper>

        <LazyWrapper rootMargin="400px" minHeight="80vh">
          <ContactUsSection />
        </LazyWrapper>

        <LazyWrapper rootMargin="300px" minHeight="40vh">
          <SocialMediaSection />
        </LazyWrapper>

        <LazyWrapper rootMargin="300px" minHeight="50vh">
          <CTASection />
        </LazyWrapper>

        <LazyWrapper rootMargin="200px" minHeight="30vh">
          <SimpleFooter />
        </LazyWrapper>
      </div>
    </div>
  );
}
