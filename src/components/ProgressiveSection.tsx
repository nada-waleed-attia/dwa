"use client";

import { useState, useEffect, ReactNode } from "react";

/**
 * ProgressiveSection Component
 * 
 * يدير التحميل التدريجي داخل الـ Section نفسه
 * يقسم المحتوى إلى 4 طبقات:
 * - Layer 1: الهيكل الأساسي (فوري)
 * - Layer 2: المحتوى الأساسي (بعد delay1)
 * - Layer 3: الصور والعناصر الثقيلة (بعد delay2)
 * - Layer 4: CTA والعناصر الإضافية (بعد delay3)
 */

interface ProgressiveSectionProps {
  children: (layers: {
    layer1: boolean;
    layer2: boolean;
    layer3: boolean;
    layer4: boolean;
  }) => ReactNode;
  delay1?: number; // Layer 2 delay
  delay2?: number; // Layer 3 delay
  delay3?: number; // Layer 4 delay
}

export default function ProgressiveSection({
  children,
  delay1 = 200,
  delay2 = 600,
  delay3 = 1000
}: ProgressiveSectionProps) {
  const [layer2, setLayer2] = useState(false);
  const [layer3, setLayer3] = useState(false);
  const [layer4, setLayer4] = useState(false);

  useEffect(() => {
    const timer2 = setTimeout(() => setLayer2(true), delay1);
    const timer3 = setTimeout(() => setLayer3(true), delay2);
    const timer4 = setTimeout(() => setLayer4(true), delay3);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [delay1, delay2, delay3]);

  return (
    <>
      {children({
        layer1: true, // دائماً true
        layer2,
        layer3,
        layer4
      })}
    </>
  );
}

/**
 * مثال على الاستخدام:
 * 
 * <ProgressiveSection>
 *   {({ layer1, layer2, layer3, layer4 }) => (
 *     <section>
 *       {/* Layer 1: الهيكل الأساسي *\/}
 *       <h2>العنوان</h2>
 *       <p>الوصف</p>
 *       
 *       {/* Layer 2: المحتوى الأساسي *\/}
 *       {layer2 && (
 *         <div className="services">
 *           <ServiceCard />
 *           <ServiceCard />
 *         </div>
 *       )}
 *       
 *       {/* Layer 3: الصور *\/}
 *       {layer3 && (
 *         <Image src="/hero.jpg" />
 *       )}
 *       
 *       {/* Layer 4: CTA *\/}
 *       {layer4 && (
 *         <button>اتصل بنا</button>
 *       )}
 *     </section>
 *   )}
 * </ProgressiveSection>
 */
