"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

// Dynamic imports for all sections
const AboutUsSection = dynamic(() => import("@/components/AboutUsSection"));
const SolutionsSection = dynamic(() => import("@/components/sections/SolutionsSection"));
const InquiryBanner = dynamic(() => import("@/components/InquiryBanner"));
const GraphicDesignSection = dynamic(() => import("@/components/sections/GraphicDesignSection"));
const MultimediaSection = dynamic(() => import("@/components/sections/MultimediaSection"));
const AISection = dynamic(() => import("@/components/sections/AISection"));
const ContentCreationSection = dynamic(() => import("@/components/sections/ContentCreationSection"));
const CloudHostingSection = dynamic(() => import("@/components/sections/CloudHostingSection"));
const DigitalMarketingSection = dynamic(() => import("@/components/sections/DigitalMarketingSection"));
const EdTechSection = dynamic(() => import("@/components/sections/EdTechSection"));
const TechConsultingSection = dynamic(() => import("@/components/sections/TechConsultingSection"));
const TrainingCoursesSection = dynamic(() => import("@/components/sections/TrainingCoursesSection"));
const DwamProductsSection = dynamic(() => import("@/components/sections/DwamProductsSection"));
const DwamStoreSection = dynamic(() => import("@/components/sections/DwamStoreSection"));
const InternationalAgentsSection = dynamic(() => import("@/components/sections/InternationalAgentsSection"));
const ContactUsSection = dynamic(() => import("@/components/sections/ContactUsSection"));
const SocialMediaSection = dynamic(() => import("@/components/sections/SocialMediaSection"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const PartnersSection = dynamic(() => import("@/components/PartnersSection"));
const LocationSection = dynamic(() => import("@/components/LocationSection"));
const SimpleFooter = dynamic(() => import("@/components/SimpleFooter"));

export default function Home() {
  // Simple batch loading - 2 sections every 300ms
  const [batch1, setBatch1] = useState(true);  // Hero + About + Solutions (immediate)
  const [batch2, setBatch2] = useState(false); // GraphicDesign + Multimedia
  const [batch3, setBatch3] = useState(false); // AI + ContentCreation
  const [batch4, setBatch4] = useState(false); // CloudHosting + DigitalMarketing
  const [batch5, setBatch5] = useState(false); // EdTech + TechConsulting
  const [batch6, setBatch6] = useState(false); // Training + DwamProducts
  const [batch7, setBatch7] = useState(false); // DwamStore + International
  const [batch8, setBatch8] = useState(false); // Partners + Location + Contact + Social + CTA + Footer

  useEffect(() => {
    // Load all batches faster for better UX
    const timer2 = setTimeout(() => setBatch2(true), 100);
    const timer3 = setTimeout(() => setBatch3(true), 200);
    const timer4 = setTimeout(() => setBatch4(true), 300);
    const timer5 = setTimeout(() => setBatch5(true), 400);
    const timer6 = setTimeout(() => setBatch6(true), 500);
    const timer7 = setTimeout(() => setBatch7(true), 600);
    const timer8 = setTimeout(() => setBatch8(true), 700);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
      clearTimeout(timer8);
    };
  }, []);

  return (
    <div className={styles.app}>
      <Hero />
      <div className={styles.snapContainer}>
        {/* Batch 1: Load immediately */}
        {batch1 && (
          <>
            <AboutUsSection />
            <SolutionsSection />
            <InquiryBanner />
          </>
        )}

        {/* Batch 2: Load after 100ms */}
        {batch2 && (
          <>
            <GraphicDesignSection />
            <InquiryBanner />
            <MultimediaSection />
            <InquiryBanner />
          </>
        )}

        {/* Batch 3: Load after 200ms */}
        {batch3 && (
          <>
            <AISection />
            <InquiryBanner />
            <ContentCreationSection />
            <InquiryBanner />
          </>
        )}

        {/* Batch 4: Load after 300ms */}
        {batch4 && (
          <>
            <CloudHostingSection />
            <InquiryBanner />
            <DigitalMarketingSection />
            <InquiryBanner />
          </>
        )}

        {/* Batch 5: Load after 400ms */}
        {batch5 && (
          <>
            <EdTechSection />
            <InquiryBanner />
            <TechConsultingSection />
            <InquiryBanner />
          </>
        )}

        {/* Batch 6: Load after 500ms */}
        {batch6 && (
          <>
            <TrainingCoursesSection />
            <InquiryBanner />
            <DwamProductsSection />
            <InquiryBanner />
          </>
        )}

        {/* Batch 7: Load after 600ms */}
        {batch7 && (
          <>
            <DwamStoreSection />
            <InquiryBanner />
            <InternationalAgentsSection />
            <InquiryBanner />
          </>
        )}

        {/* Batch 8: Load after 700ms */}
        {batch8 && (
          <>
            <PartnersSection />
            <InquiryBanner />
            <LocationSection />
            <ContactUsSection />
            <SocialMediaSection />
            <CTASection />
            <SimpleFooter />
          </>
        )}
      </div>
    </div>
  );
}
