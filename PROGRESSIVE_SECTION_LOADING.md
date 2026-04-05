# استراتيجية التحميل التدريجي داخل الـ Section 📦

## المبدأ الأساسي

كل Section لا يُحمّل "كله مرة واحدة". داخل كل section توجد أولويات للمحتوى يجب احترامها.

---

## 🎯 الطبقات الأربع داخل كل Section

### LAYER 1: الهيكل الأساسي (فوري) ⚡

**ما يُحمّل:**
- ✅ العنوان الرئيسي (h2/h3)
- ✅ الوصف المختصر (paragraph)
- ✅ الـ Layout / Container
- ✅ Background الأساسي
- ✅ Skeleton placeholders

**لماذا؟**
- المستخدم يحتاج أن يفهم القسم فوراً
- عرض Layout ثابت يعطي انطباع بالاستجابة
- تحسين Perceived Performance

**مثال:**
```typescript
// Layer 1 - يظهر فوراً
<section id="ai" className={styles.wrap}>
  <div className={styles.background}>
    {/* Background pattern */}
  </div>
  
  <div className={styles.container}>
    <h2 className={styles.title}>
      حلول الذكاء الاصطناعي
    </h2>
    <p className={styles.intro}>
      نقدم حلول AI متقدمة لتحويل أعمالك رقمياً
    </p>
  </div>
</section>
```

**الوقت:** 0ms (فوري)

---

### LAYER 2: المحتوى الأساسي (بعد 200ms) 📝

**ما يُحمّل:**
- ✅ قائمة الخدمات / Features
- ✅ Cards الأساسية
- ✅ النصوص التفصيلية
- ✅ Icons الأساسية

**لماذا؟**
- المحتوى النصي خفيف وسريع
- المستخدم يريد قراءة التفاصيل
- لا يحتاج موارد كثيرة

**مثال:**
```typescript
// Layer 2 - بعد 200ms
{layer2Loaded ? (
  <div className={styles.servicesList}>
    <div className={styles.servicesGrid}>
      <div className={styles.serviceItem}>
        <div className={styles.serviceIcon}>
          <i className="fas fa-code"></i>
        </div>
        <p>دمج الذكاء الإصطناعي في أعمالك</p>
      </div>
      {/* المزيد من الخدمات */}
    </div>
  </div>
) : (
  // Skeleton loader
  <div className={styles.servicesListSkeleton}>
    <div className={styles.skeletonGrid}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className={styles.skeletonCard} />
      ))}
    </div>
  </div>
)}
```

**الوقت:** 200ms

---

### LAYER 3: الصور والعناصر الثقيلة (بعد 600ms) 🖼️

**ما يُحمّل:**
- ✅ الصور الرئيسية
- ✅ الرسوم المتحركة
- ✅ الفيديوهات
- ✅ Galleries
- ✅ العناصر التفاعلية الثقيلة

**لماذا؟**
- الصور تحتاج وقت للتحميل
- لا تمنع المستخدم من قراءة المحتوى
- تحسين LCP (Largest Contentful Paint)

**مثال:**
```typescript
// Layer 3 - بعد 600ms
{layer3Loaded && (
  <div className={styles.showcase}>
    <div className={styles.mainImage}>
      <Image
        src="/AIs.webp"
        alt="AI illustration"
        width={600}
        height={600}
        loading="lazy"
        className={styles.mainImg}
      />
    </div>
    
    {/* عناصر تفاعلية إضافية */}
    <div className={styles.aiElement}>
      <i className="fas fa-brain"></i>
      <p>تعلم آلي</p>
    </div>
  </div>
)}
```

**الوقت:** 600ms

---

### LAYER 4: CTA والعناصر الإضافية (بعد 1000ms) 🎯

**ما يُحمّل:**
- ✅ أزرار CTA (Call To Action)
- ✅ أسهم التنقل
- ✅ روابط "المزيد"
- ✅ عناصر تفاعلية ثانوية
- ✅ Social sharing buttons

**لماذا؟**
- المستخدم يحتاج وقت لقراءة المحتوى أولاً
- CTA يكون أكثر فعالية بعد فهم المحتوى
- تقليل الضغط على التحميل الأولي

**مثال:**
```typescript
// Layer 4 - بعد 1000ms
{layer4Loaded && (
  <>
    <div className={styles.moreBtnWrapper}>
      <a 
        href="https://wa.me/201555855857" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.moreBtn}
      >
        <span>المزيد</span>
      </a>
    </div>
    
    <div className={styles.scrollDownArrow}>
      <a href="#next-section">
        <i className="fas fa-chevron-down"></i>
      </a>
    </div>
  </>
)}
```

**الوقت:** 1000ms

---

## 📊 جدول التوقيت المقترح

| الطبقة | المحتوى | التوقيت | الحجم التقريبي |
|--------|---------|---------|----------------|
| Layer 1 | العنوان + الوصف | 0ms (فوري) | ~2KB |
| Layer 2 | الخدمات + Cards | 200ms | ~10KB |
| Layer 3 | الصور + Animations | 600ms | ~50-200KB |
| Layer 4 | CTA + Extras | 1000ms | ~5KB |

---

## 🛠️ التطبيق العملي

### الطريقة 1: Manual (يدوي)

```typescript
"use client";

import { useState, useEffect } from "react";

export default function MySection() {
  const [layer2, setLayer2] = useState(false);
  const [layer3, setLayer3] = useState(false);
  const [layer4, setLayer4] = useState(false);

  useEffect(() => {
    const timer2 = setTimeout(() => setLayer2(true), 200);
    const timer3 = setTimeout(() => setLayer3(true), 600);
    const timer4 = setTimeout(() => setLayer4(true), 1000);
    
    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <section>
      {/* Layer 1 */}
      <h2>العنوان</h2>
      
      {/* Layer 2 */}
      {layer2 && <Services />}
      
      {/* Layer 3 */}
      {layer3 && <Images />}
      
      {/* Layer 4 */}
      {layer4 && <CTA />}
    </section>
  );
}
```

### الطريقة 2: باستخدام ProgressiveSection Component

```typescript
import ProgressiveSection from "@/components/ProgressiveSection";

export default function MySection() {
  return (
    <ProgressiveSection>
      {({ layer1, layer2, layer3, layer4 }) => (
        <section>
          {/* Layer 1 - دائماً موجود */}
          <h2>العنوان</h2>
          <p>الوصف</p>
          
          {/* Layer 2 - بعد 200ms */}
          {layer2 && (
            <div className="services">
              <ServiceCard />
              <ServiceCard />
            </div>
          )}
          
          {/* Layer 3 - بعد 600ms */}
          {layer3 && (
            <Image src="/hero.jpg" width={800} height={600} />
          )}
          
          {/* Layer 4 - بعد 1000ms */}
          {layer4 && (
            <button>اتصل بنا</button>
          )}
        </section>
      )}
    </ProgressiveSection>
  );
}
```

---

## 🎨 Skeleton Loaders

### متى تُستخدم؟
- عند تأخير Layer 2 (الخدمات/Cards)
- عند تأخير Layer 3 (الصور الكبيرة)

### التصميم:
```css
.servicesListSkeleton {
  margin-top: 2rem;
}

.skeletonGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skeletonCard {
  height: 120px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 12px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

---

## 📈 الفوائد المتوقعة

### قبل التطبيق:
```
Section Load Time: 2-3s
User sees content: بعد 2-3s
Perceived Performance: بطيء
LCP: 3-4s
```

### بعد التطبيق:
```
Section Load Time: 1s (Layer 1+2)
User sees content: فوراً ⚡
Perceived Performance: سريع جداً ⚡
LCP: 1.5-2s ⚡ (تحسين 50%)
```

---

## 🎯 أمثلة تطبيقية

### مثال 1: Section بسيط (نصوص فقط)

```typescript
<ProgressiveSection delay1={100} delay2={300} delay3={500}>
  {({ layer1, layer2, layer3, layer4 }) => (
    <section>
      {/* Layer 1: العنوان */}
      <h2>خدماتنا</h2>
      
      {/* Layer 2: القائمة */}
      {layer2 && (
        <ul>
          <li>خدمة 1</li>
          <li>خدمة 2</li>
        </ul>
      )}
      
      {/* Layer 4: CTA */}
      {layer4 && <button>اتصل بنا</button>}
    </section>
  )}
</ProgressiveSection>
```

**التوقيت:** أسرع لأن لا توجد صور

---

### مثال 2: Section ثقيل (صور + gallery)

```typescript
<ProgressiveSection delay1={300} delay2={800} delay3={1200}>
  {({ layer1, layer2, layer3, layer4 }) => (
    <section>
      {/* Layer 1: العنوان */}
      <h2>معرض الأعمال</h2>
      
      {/* Layer 2: الوصف */}
      {layer2 ? (
        <p>شاهد أعمالنا المميزة</p>
      ) : (
        <div className="skeleton-text" />
      )}
      
      {/* Layer 3: Gallery */}
      {layer3 ? (
        <ImageGallery images={images} />
      ) : (
        <div className="skeleton-gallery">
          {[1,2,3,4].map(i => <div key={i} className="skeleton-image" />)}
        </div>
      )}
      
      {/* Layer 4: CTA */}
      {layer4 && <button>عرض المزيد</button>}
    </section>
  )}
</ProgressiveSection>
```

**التوقيت:** أبطأ لأن Gallery ثقيل

---

## 🔧 تخصيص التوقيت

### حسب نوع المحتوى:

| نوع Section | delay1 | delay2 | delay3 |
|------------|--------|--------|--------|
| نصوص فقط | 100ms | 300ms | 500ms |
| نصوص + صور قليلة | 200ms | 600ms | 1000ms |
| Gallery ثقيل | 300ms | 800ms | 1200ms |
| Video + Interactive | 400ms | 1000ms | 1500ms |

---

## 📝 Checklist للتطبيق

### لكل Section:

- [ ] تحديد الطبقات الأربع
- [ ] Layer 1: العنوان + الوصف فقط
- [ ] Layer 2: المحتوى النصي الأساسي
- [ ] Layer 3: الصور والعناصر الثقيلة
- [ ] Layer 4: CTA والعناصر الإضافية
- [ ] إضافة Skeleton loaders للطبقات 2 و 3
- [ ] اختبار التوقيت المناسب
- [ ] قياس الأداء قبل وبعد

---

## 🚫 الأخطاء الشائعة

### ❌ خطأ 1: تحميل كل شيء في Layer 1
```typescript
// سيء
<section>
  <h2>العنوان</h2>
  <Services />
  <Images />
  <CTA />
</section>
```

### ✅ الصحيح:
```typescript
// جيد
<section>
  <h2>العنوان</h2>
  {layer2 && <Services />}
  {layer3 && <Images />}
  {layer4 && <CTA />}
</section>
```

---

### ❌ خطأ 2: توقيت غير مناسب
```typescript
// سيء - بطيء جداً
delay1={2000} // المستخدم ينتظر كثيراً
```

### ✅ الصحيح:
```typescript
// جيد - توقيت معقول
delay1={200} // سريع لكن سلس
```

---

### ❌ خطأ 3: عدم استخدام Skeleton
```typescript
// سيء - شاشة فارغة
{layer2 && <Services />}
```

### ✅ الصحيح:
```typescript
// جيد - skeleton أثناء التحميل
{layer2 ? (
  <Services />
) : (
  <ServicesSkeleton />
)}
```

---

## 📚 المراجع

- [React Suspense](https://react.dev/reference/react/Suspense)
- [Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
- [Perceived Performance](https://web.dev/rail/)
- [Skeleton Screens](https://www.lukew.com/ff/entry.asp?1797)

---

**تم التطبيق على:** AISection  
**التاريخ:** 2026-04-05  
**التحسين المتوقع:** 50% في Perceived Performance
