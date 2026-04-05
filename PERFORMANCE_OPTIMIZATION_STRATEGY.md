# استراتيجية تحسين الأداء وسرعة التحميل
## لمشروع Next.js + TypeScript متعدد الـ Sections

---

## 📊 التحليل الحالي

### المشاكل الرئيسية المكتشفة:

1. **تحميل JavaScript كبير في البداية**
   - جميع الـ sections يتم تحميلها كـ dynamic imports لكن بدون SSR
   - المكونات الثقيلة مثل SplineScene و GraphicDesignSection تحتوي على galleries ضخمة
   - استخدام libraries خارجية (react-icons) بدون tree-shaking مناسب

2. **تحميل الصور والـ Media**
   - مجلد public يحتوي على 444 ملف (364 webp, 45 gif, 9 mp4)
   - بعض الصور لا تستخدم next/image بشكل صحيح
   - GIFs لم يتم تحويلها كلها إلى MP4/WebM
   - عدم استخدام Cloudinary بشكل كامل رغم وجود الإعداد

3. **Progressive Loading غير مكتمل**
   - LazyWrapper موجود لكن rootMargin صغير جدًا (50px)
   - بعض الـ sections تستخدم progressive loading داخلي (layer2, layer3, layer4) لكن بشكل غير منظم
   - عدم وجود skeleton loaders مناسبة

4. **مشاكل في الـ Galleries**
   - GraphicDesignSection يحمل arrays كبيرة من الصور في الذاكرة
   - عدم استخدام virtualization للقوائم الطويلة
   - Modal يحمل جميع الصور مرة واحدة

---

## 🎯 الأهداف المطلوبة

### Core Web Vitals Targets:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TBT (Total Blocking Time)**: < 200ms
- **FCP (First Contentful Paint)**: < 1.8s

### Performance Targets:
- Initial JavaScript Bundle: < 200KB (gzipped)
- Time to Interactive: < 3.5s
- Total Page Weight: < 2MB (initial load)

---

## 🚀 استراتيجية التحسين الشاملة

### المرحلة 1️⃣: تحسين التحميل الأولي (Critical Path)

#### 1.1 تحسين Hero Section
```typescript
// ✅ الحل الأمثل
export default function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* استخدام صورة ثابتة بدلاً من Spline للتحميل الأولي */}
      <Image
        src="/robot-poster1.webp"
        alt="دوام للبرمجيات"
        fill
        priority
        quality={85}
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // استخدام blur placeholder
      />
      
      {/* تحميل Spline بشكل lazy بعد التفاعل الأول */}
      <ClientOnly>
        <SplineSceneLazy />
      </ClientOnly>
    </section>
  );
}
```

#### 1.2 تقليل JavaScript الأولي
```typescript
// page.tsx - تحسين الـ imports
import dynamic from "next/dynamic";

// ✅ تحميل فقط ما يظهر في الـ viewport الأول
const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => <HeroSkeleton />
});

const AboutUsSection = dynamic(() => import("@/components/AboutUsSection"), {
  loading: () => <SectionSkeleton />
});

// ❌ لا تحمل باقي الـ sections إلا عند الحاجة
const GraphicDesignSection = dynamic(
  () => import("@/components/sections/GraphicDesignSection"),
  { 
    ssr: false,
    loading: () => <SectionSkeleton />
  }
);
```

---

### المرحلة 2️⃣: تحسين Lazy Loading Strategy

#### 2.1 تحسين LazyWrapper Component
```typescript
// components/LazyWrapper.tsx
"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface LazyWrapperProps {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string; // زيادة المسافة للتحميل المسبق
  skeleton?: ReactNode;
  priority?: boolean; // للـ sections المهمة
}

export default function LazyWrapper({
  children,
  minHeight = "100vh",
  rootMargin = "400px", // ✅ زيادة من 50px إلى 400px
  skeleton,
  priority = false
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(priority); // تحميل فوري للـ priority sections
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return; // تخطي الـ observer للـ priority sections
    
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin,
        threshold: 0.01 // تقليل الـ threshold
      }
    );

    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [priority, hasLoaded, rootMargin]);

  if (!isVisible) {
    return (
      <div 
        ref={ref} 
        style={{ minHeight }}
        className="lazy-placeholder"
      >
        {skeleton || <DefaultSkeleton />}
      </div>
    );
  }

  return <div ref={ref}>{children}</div>;
}

// Skeleton مخصص لكل نوع section
function DefaultSkeleton() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-title" />
      <div className="skeleton-content" />
    </div>
  );
}
```

#### 2.2 استخدام LazyWrapper المحسّن
```typescript
// page.tsx
export default function Home() {
  return (
    <div className={styles.app}>
      <Hero />
      
      <div className={styles.snapContainer}>
        {/* Priority sections - تحميل فوري */}
        <LazyWrapper priority>
          <AboutUsSection />
        </LazyWrapper>
        
        <LazyWrapper priority>
          <SolutionsSection />
        </LazyWrapper>

        {/* Regular sections - lazy loading */}
        <LazyWrapper 
          rootMargin="600px"
          skeleton={<GraphicDesignSkeleton />}
        >
          <GraphicDesignSection />
        </LazyWrapper>

        <LazyWrapper rootMargin="400px">
          <MultimediaSection />
        </LazyWrapper>

        {/* Sections بعيدة - تحميل متأخر جداً */}
        <LazyWrapper rootMargin="200px">
          <ContactUsSection />
        </LazyWrapper>
      </div>
    </div>
  );
}
```

---

### المرحلة 3️⃣: تحسين الصور والـ Media

#### 3.1 استراتيجية Cloudinary الكاملة
```typescript
// lib/cloudinary.ts
export const cloudinaryLoader = ({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const params = [
    'f_auto', // تحويل تلقائي للصيغة (WebP, AVIF)
    'c_limit', // الحفاظ على النسبة
    `w_${width}`,
    `q_${quality || 'auto'}`,
    'dpr_auto' // دعم Retina displays
  ];
  
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${params.join(',')}/${src}`;
};

// استخدام في next.config.ts
export default {
  images: {
    loader: 'cloudinary',
    path: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  }
};
```

#### 3.2 تحسين استخدام next/image
```typescript
// ✅ الطريقة الصحيحة
<Image
  src="/path/to/image.webp"
  alt="وصف دقيق"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  quality={85}
  loading="lazy" // أو priority للصور المهمة
  placeholder="blur"
  blurDataURL={blurDataURL}
/>

// ❌ تجنب
<Image
  src="/image.webp"
  fill // بدون sizes محدد
  unoptimized // يلغي كل التحسينات
/>
```

#### 3.3 تحويل GIFs إلى Video
```bash
# script لتحويل جميع GIFs
# scripts/convert-gifs-to-video.sh

#!/bin/bash
for gif in public/*.gif; do
  filename=$(basename "$gif" .gif)
  
  # تحويل إلى MP4
  ffmpeg -i "$gif" \
    -movflags faststart \
    -pix_fmt yuv420p \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
    -c:v libx264 \
    -preset slow \
    -crf 23 \
    "public/${filename}.mp4"
  
  # تحويل إلى WebM
  ffmpeg -i "$gif" \
    -c:v libvpx-vp9 \
    -crf 30 \
    -b:v 0 \
    "public/${filename}.webm"
done
```

```typescript
// استخدام Video بدلاً من GIF
<video
  autoPlay
  loop
  muted
  playsInline
  poster="/thumbnail.webp"
  className={styles.video}
>
  <source src="/animation.webm" type="video/webm" />
  <source src="/animation.mp4" type="video/mp4" />
</video>
```

---

### المرحلة 4️⃣: تحسين GraphicDesignSection

#### 4.1 Virtual Scrolling للـ Galleries
```typescript
// components/sections/GraphicDesignSection.tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function ImageGallery({ images }: { images: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: images.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300, // ارتفاع تقديري لكل صورة
    overscan: 5 // عدد العناصر الإضافية للتحميل
  });

  return (
    <div ref={parentRef} className={styles.galleryContainer}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`
            }}
          >
            <Image
              src={images[virtualItem.index]}
              alt={`صورة ${virtualItem.index + 1}`}
              width={400}
              height={300}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### 4.2 Pagination بدلاً من تحميل كل الصور
```typescript
// تحميل الصور على دفعات
const IMAGES_PER_PAGE = 20;

function PaginatedGallery({ images }: { images: string[] }) {
  const [page, setPage] = useState(1);
  const displayedImages = images.slice(0, page * IMAGES_PER_PAGE);
  
  const loadMore = () => {
    if (displayedImages.length < images.length) {
      setPage(p => p + 1);
    }
  };

  return (
    <>
      <div className={styles.grid}>
        {displayedImages.map((src, i) => (
          <Image key={i} src={src} alt="" width={300} height={300} loading="lazy" />
        ))}
      </div>
      
      {displayedImages.length < images.length && (
        <button onClick={loadMore}>تحميل المزيد</button>
      )}
    </>
  );
}
```

---

### المرحلة 5️⃣: Code Splitting المتقدم

#### 5.1 تقسيم react-icons
```typescript
// ❌ سيء - يحمل كل المكتبة
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// ✅ جيد - تحميل lazy
const FiChevronLeft = dynamic(
  () => import("react-icons/fi").then(mod => ({ default: mod.FiChevronLeft })),
  { ssr: false }
);

// ✅ أفضل - استخدام SVG مباشرة
function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
```

#### 5.2 Route-based Code Splitting
```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {/* تحميل الـ header فقط */}
        <Header />
        
        {/* المحتوى الديناميكي */}
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
        
        {/* تحميل الـ footer بشكل lazy */}
        <LazyFooter />
      </body>
    </html>
  );
}
```

---

### المرحلة 6️⃣: Progressive Enhancement

#### 6.1 استراتيجية 4 طبقات للتحميل
```typescript
// components/sections/AISection.tsx - مثال محسّن
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Layer 1: Critical Content (يظهر فوراً)
export default function AISection() {
  const [layer2, setLayer2] = useState(false); // Service cards
  const [layer3, setLayer3] = useState(false); // Images & animations
  const [layer4, setLayer4] = useState(false); // CTA & extras

  useEffect(() => {
    // تحميل تدريجي بناءً على الوقت والتفاعل
    const timer2 = setTimeout(() => setLayer2(true), 300);
    const timer3 = setTimeout(() => setLayer3(true), 800);
    
    // Layer 4 يحمل عند التفاعل أو بعد وقت طويل
    const timer4 = setTimeout(() => setLayer4(true), 2000);
    
    // أو عند التفاعل الأول
    const handleInteraction = () => {
      setLayer4(true);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('click', handleInteraction);
    };
    
    document.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    document.addEventListener('click', handleInteraction, { once: true });

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <section id="ai" className={styles.wrap}>
      {/* Layer 1: النص والعنوان الأساسي */}
      <div className={styles.container}>
        <h2 className={styles.title}>حلول الذكاء الاصطناعي</h2>
        <p className={styles.intro}>نقدم حلول AI متقدمة</p>
      </div>

      {/* Layer 2: الخدمات الأساسية */}
      {layer2 && (
        <div className={styles.services}>
          <ServiceCard icon="brain" title="تعلم آلي" />
          <ServiceCard icon="robot" title="روبوتات ذكية" />
        </div>
      )}

      {/* Layer 3: الصور والرسوم المتحركة */}
      {layer3 && (
        <div className={styles.showcase}>
          <Image src="/AIs.webp" alt="AI" width={600} height={600} loading="lazy" />
        </div>
      )}

      {/* Layer 4: CTA والعناصر الإضافية */}
      {layer4 && (
        <>
          <CTAButton href="/ai" />
          <ScrollArrow target="#next-section" />
        </>
      )}
    </section>
  );
}
```

---

### المرحلة 7️⃣: Performance Monitoring

#### 7.1 إضافة Web Vitals Tracking
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

// lib/vitals.ts
export function reportWebVitals(metric: any) {
  console.log(metric);
  
  // إرسال إلى analytics
  if (metric.label === 'web-vital') {
    // Google Analytics
    window.gtag?.('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}
```

---

## 📋 خطة التنفيذ المرحلية

### الأسبوع 1: التحسينات الحرجة
- [ ] تحسين Hero Section وإزالة Spline من التحميل الأولي
- [ ] تطبيق LazyWrapper المحسّن
- [ ] إضافة Skeleton Loaders
- [ ] تحسين next/image usage

### الأسبوع 2: تحسين الـ Media
- [ ] رفع جميع الصور إلى Cloudinary
- [ ] تحويل GIFs إلى MP4/WebM
- [ ] تطبيق responsive images بشكل صحيح
- [ ] إضافة blur placeholders

### الأسبوع 3: تحسين الـ Galleries
- [ ] تطبيق Virtual Scrolling
- [ ] إضافة Pagination
- [ ] تحسين Modal performance
- [ ] Lazy load PDF previews

### الأسبوع 4: Code Splitting
- [ ] تقسيم react-icons
- [ ] تحسين dynamic imports
- [ ] Route-based splitting
- [ ] Bundle analysis وتحسين

### الأسبوع 5: Testing & Monitoring
- [ ] إضافة Web Vitals tracking
- [ ] Performance testing
- [ ] Lighthouse audits
- [ ] Real user monitoring

---

## 🔧 أدوات القياس والمراقبة

### أدوات التطوير:
```bash
# تحليل Bundle size
npm run build
npx @next/bundle-analyzer

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Performance profiling
npm run dev
# ثم افتح Chrome DevTools > Performance
```

### Lighthouse Scoring:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

---

## 📊 النتائج المتوقعة

### قبل التحسين:
- Initial Load: ~5-8s
- LCP: ~4-6s
- TBT: ~800-1200ms
- Bundle Size: ~800KB

### بعد التحسين:
- Initial Load: ~2-3s ⚡ (تحسين 60%)
- LCP: ~1.5-2s ⚡ (تحسين 65%)
- TBT: ~150-250ms ⚡ (تحسين 80%)
- Bundle Size: ~180KB ⚡ (تحسين 77%)

---

## 🎓 أفضل الممارسات المستمرة

1. **استخدم next/image دائماً** - لا تستخدم `<img>` مباشرة
2. **lazy loading افتراضي** - priority فقط للصور above the fold
3. **تجنب unoptimized** - إلا للضرورة القصوى
4. **استخدم Cloudinary** - للتحويل التلقائي والتحسين
5. **قس الأداء باستمرار** - Lighthouse في كل PR
6. **راقب Bundle Size** - استخدم bundle analyzer
7. **اختبر على أجهزة حقيقية** - خاصة الأجهزة الضعيفة
8. **استخدم Progressive Enhancement** - المحتوى الأساسي أولاً

---

## 📚 مراجع مفيدة

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Cloudinary Next.js Integration](https://cloudinary.com/documentation/nextjs_integration)
- [React Virtual](https://tanstack.com/virtual/latest)

---

**تم إعداد هذه الوثيقة بواسطة Kiro AI**
*آخر تحديث: 2026-04-05*
