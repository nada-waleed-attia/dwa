# استراتيجية التحميل الطبقي (Layered Loading Strategy) 🎯

## المبدأ الأساسي

الصفحة لا تُعامل كـ "كتلة واحدة" من 22 section، بل تُقسّم إلى **5 طبقات تحميل** حسب الأولوية والموقع من viewport المستخدم.

---

## 🏗️ الطبقات الخمس

### LAYER 1: Critical Content (First Viewport) ⚡
**ما هو:** المحتوى الذي يجب أن يظهر فوراً في أول viewport

**التقنية:**
- ✅ SSR enabled (Server-Side Rendering)
- ✅ تحميل فوري بدون lazy loading
- ✅ لا يوجد dynamic import

**المكونات:**
```typescript
// تحميل مباشر مع SSR
import AboutUsSection from "@/components/AboutUsSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import InquiryBanner from "@/components/InquiryBanner";

// في الـ JSX
<Hero />
<AboutUsSection />
<SolutionsSection />
<InquiryBanner />
```

**النتيجة:**
- LCP (Largest Contentful Paint): < 2s
- FCP (First Contentful Paint): < 1s
- المستخدم يرى محتوى فوراً

---

### LAYER 2: High Priority (Near Viewport) 🔥
**ما هو:** Sections القريبة من الشاشة والمهمة للتجربة

**التقنية:**
- ✅ Dynamic import مع `ssr: false`
- ✅ Suspense boundary مع skeleton loader
- ✅ LazyWrapper مع `rootMargin="600px"`

**المكونات:**
```typescript
// Dynamic import
const GraphicDesignSection = dynamic(
  () => import("@/components/sections/GraphicDesignSection"), 
  { 
    ssr: false,
    loading: () => <SectionSkeleton />
  }
);

// في الـ JSX
<Suspense fallback={<SectionSkeleton />}>
  <LazyWrapper rootMargin="600px">
    <GraphicDesignSection />
  </LazyWrapper>
</Suspense>
```

**Sections في هذه الطبقة:**
- GraphicDesignSection
- MultimediaSection
- AISection

**rootMargin: 600px** = يبدأ التحميل قبل 600px من ظهور الـ section

---

### LAYER 3: Medium Priority (Below Fold) 📦
**ما هو:** Sections تحت الـ fold لكن مهمة

**التقنية:**
- ✅ Dynamic import مع `ssr: false`
- ✅ LazyWrapper مع `rootMargin="300-400px"`
- ⚠️ بدون Suspense (تحميل أخف)

**المكونات:**
```typescript
const ContentCreationSection = dynamic(
  () => import("@/components/sections/ContentCreationSection"), 
  { ssr: false }
);

// في الـ JSX
<LazyWrapper rootMargin="400px">
  <ContentCreationSection />
</LazyWrapper>
```

**Sections في هذه الطبقة:**
- ContentCreationSection (400px)
- CloudHostingSection (400px)
- DigitalMarketingSection (400px)
- EdTechSection (300px)
- TechConsultingSection (300px)
- TrainingCoursesSection (300px)

---

### LAYER 4: Low Priority (Far Below) 📄
**ما هو:** Sections بعيدة عن الشاشة

**التقنية:**
- ✅ Dynamic import مع `ssr: false`
- ✅ LazyWrapper مع `rootMargin="200px"`
- ✅ تحميل متأخر

**المكونات:**
```typescript
<LazyWrapper rootMargin="200px">
  <DwamProductsSection />
</LazyWrapper>
```

**Sections في هذه الطبقة:**
- DwamProductsSection
- DwamStoreSection
- InternationalAgentsSection
- PartnersSection

**rootMargin: 200px** = يبدأ التحميل قبل 200px فقط

---

### LAYER 5: Lowest Priority (Footer Area) 🦶
**ما هو:** Footer والمحتوى في نهاية الصفحة

**التقنية:**
- ✅ Dynamic import مع `ssr: false`
- ✅ LazyWrapper مع `rootMargin="0-100px"`
- ✅ تحميل عند الوصول تقريباً

**المكونات:**
```typescript
<LazyWrapper rootMargin="50px">
  <CTASection />
</LazyWrapper>

<LazyWrapper rootMargin="0px">
  <SimpleFooter />
</LazyWrapper>
```

**Sections في هذه الطبقة:**
- LocationSection (100px)
- ContactUsSection (100px)
- SocialMediaSection (50px)
- CTASection (50px)
- SimpleFooter (0px)

---

## 📊 مقارنة الطبقات

| الطبقة | rootMargin | SSR | Suspense | التحميل | الاستخدام |
|--------|-----------|-----|----------|---------|-----------|
| Layer 1 | N/A | ✅ Yes | ❌ No | فوري | First viewport |
| Layer 2 | 600px | ❌ No | ✅ Yes | مبكر جداً | Near viewport |
| Layer 3 | 300-400px | ❌ No | ❌ No | متوسط | Below fold |
| Layer 4 | 200px | ❌ No | ❌ No | متأخر | Far below |
| Layer 5 | 0-100px | ❌ No | ❌ No | عند الوصول | Footer |

---

## 🎨 Skeleton Loaders

### متى تُستخدم؟
- Layer 2 فقط (High Priority sections)
- عند استخدام Suspense boundary

### التصميم:
```css
.sectionSkeleton {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 100%);
  backdrop-filter: blur(10px);
}

.skeletonTitle {
  animation: shimmer 2s infinite;
}
```

### الفائدة:
- ✅ تحسين Perceived Performance
- ✅ المستخدم يعرف أن المحتوى قادم
- ✅ تجربة أفضل من الشاشة الفارغة

---

## 🚀 النتائج المتوقعة

### قبل التطبيق:
```
Initial Bundle: ~800KB
Sections Loaded: 22 (كلهم مرة واحدة)
LCP: 4-6s
TBT: 800-1200ms
Memory: High
```

### بعد التطبيق:
```
Initial Bundle: ~200KB ⚡ (75% تحسين)
Sections Loaded: 3 فقط في البداية
LCP: 1.5-2.5s ⚡ (60% تحسين)
TBT: 200-400ms ⚡ (70% تحسين)
Memory: Low-Medium ⚡ (60% تحسين)
```

---

## 🔍 كيف يعمل LazyWrapper؟

### المبدأ:
```typescript
// 1. يراقب متى الـ section يقترب من viewport
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true); // يحمّل المحتوى
    }
  },
  { rootMargin: "400px" } // يبدأ قبل 400px
);

// 2. قبل التحميل: يعرض placeholder
if (!isVisible) {
  return <div className="placeholder">⏳</div>;
}

// 3. بعد التحميل: يعرض المحتوى الفعلي
return <div>{children}</div>;
```

### الفوائد:
- ✅ تحميل تدريجي ذكي
- ✅ تقليل JavaScript الأولي
- ✅ تقليل استهلاك الذاكرة
- ✅ تحسين الأداء العام

---

## 📝 أفضل الممارسات

### 1. تحديد الأولويات بدقة
```typescript
// ✅ جيد - محتوى أساسي بدون lazy
<AboutUsSection />

// ❌ سيء - محتوى أساسي مع lazy
<LazyWrapper>
  <AboutUsSection />
</LazyWrapper>
```

### 2. استخدام rootMargin المناسب
```typescript
// ✅ جيد - sections مهمة
<LazyWrapper rootMargin="600px">

// ✅ جيد - sections عادية
<LazyWrapper rootMargin="300px">

// ✅ جيد - footer
<LazyWrapper rootMargin="0px">
```

### 3. Suspense للـ sections الثقيلة فقط
```typescript
// ✅ جيد - section ثقيل مع galleries
<Suspense fallback={<SectionSkeleton />}>
  <LazyWrapper rootMargin="600px">
    <GraphicDesignSection />
  </LazyWrapper>
</Suspense>

// ❌ مبالغة - section خفيف
<Suspense fallback={<SectionSkeleton />}>
  <LazyWrapper rootMargin="300px">
    <SimpleTextSection />
  </LazyWrapper>
</Suspense>
```

### 4. تجنب Hydration Mismatch
```typescript
// ✅ جيد - SSR للمحتوى الأساسي
import AboutUsSection from "@/components/AboutUsSection";

// ✅ جيد - dynamic للباقي
const GraphicDesignSection = dynamic(
  () => import("@/components/sections/GraphicDesignSection"),
  { ssr: false }
);
```

---

## 🎯 متى تستخدم كل تقنية؟

### SSR (Server-Side Rendering)
**متى:** First viewport content فقط
**لماذا:** SEO + سرعة ظهور المحتوى الأساسي

### Dynamic Import
**متى:** كل الـ sections ما عدا الأساسية
**لماذا:** Code splitting + تقليل bundle size

### Suspense
**متى:** Sections ثقيلة قريبة من viewport
**لماذا:** Skeleton loader + تجربة أفضل

### LazyWrapper
**متى:** كل الـ sections ما عدا الأساسية
**لماذا:** Intersection Observer + تحميل عند الحاجة

---

## 🧪 اختبار الاستراتيجية

### 1. Chrome DevTools
```
1. افتح DevTools (F12)
2. اذهب لـ Network tab
3. اختر "Disable cache"
4. Reload الصفحة
5. لاحظ:
   - Initial bundle size
   - عدد الـ chunks المحملة
   - توقيت كل chunk
```

### 2. Lighthouse
```
1. افتح DevTools > Lighthouse
2. اختر Performance
3. Generate report
4. تحقق من:
   - LCP < 2.5s ✅
   - TBT < 300ms ✅
   - FCP < 1.8s ✅
```

### 3. React DevTools Profiler
```
1. ثبّت React DevTools
2. افتح Profiler tab
3. سجّل session
4. scroll للأسفل
5. لاحظ متى كل section يتم render
```

---

## 📚 المراجع

- [Next.js Dynamic Imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
- [React Suspense](https://react.dev/reference/react/Suspense)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Web Vitals](https://web.dev/vitals/)

---

**تم التطبيق:** 2026-04-05  
**الاستراتيجية:** 5 طبقات تحميل  
**التحسين المتوقع:** 60-75% في الأداء العام
