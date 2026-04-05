# دليل إعداد Cloudinary

## الخطوة 1: إنشاء حساب Cloudinary

1. اذهب إلى: https://cloudinary.com/users/register_free
2. سجل حساب مجاني (يدعم حتى 25 GB و 25,000 تحويل شهرياً)
3. بعد التسجيل، ستجد في Dashboard:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## الخطوة 2: إعداد المتغيرات البيئية

افتح ملف `.env.local` وضع بياناتك:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

⚠️ **مهم:** لا ترفع ملف `.env.local` على Git!

## الخطوة 3: رفع الصور إلى Cloudinary

```bash
npm run upload-cloudinary
```

هذا السكريبت سيرفع كل الصور من مجلد `public/` إلى Cloudinary.

## الخطوة 4: استخدام الصور في الكود

### طريقة 1: استخدام Hook جاهز

```tsx
import { useCloudinaryGallery } from '@/hooks/useCloudinaryGallery';

function MyGallery() {
  const { images, loading, loadImages } = useCloudinaryGallery({
    folder: 'dwam-website/graphic-design',
    autoLoad: false, // Load on demand
  });

  return (
    <button onClick={loadImages}>
      عرض المعرض ({images.length} صورة)
    </button>
  );
}
```

### طريقة 2: استخدام Helper Functions

```tsx
import { getCloudinaryUrl } from '@/lib/cloudinary';
import Image from 'next/image';

function MyImage() {
  const imageUrl = getCloudinaryUrl('dwam-website/logo', {
    width: 800,
    quality: 'auto',
    format: 'auto',
  });

  return <Image src={imageUrl} alt="Logo" width={800} height={600} />;
}
```

## المميزات

### 1. تحسين تلقائي
```tsx
// Cloudinary يحول الصورة تلقائياً لـ WebP/AVIF حسب المتصفح
getCloudinaryUrl('image', { format: 'auto' })
```

### 2. Responsive Images
```tsx
// صور مختلفة لأحجام شاشات مختلفة
getCloudinaryUrl('image', { width: 400 }) // Mobile
getCloudinaryUrl('image', { width: 1200 }) // Desktop
```

### 3. Lazy Loading
```tsx
// الصور تحمل فقط عند الحاجة
const { loadImages } = useCloudinaryGallery({
  folder: 'gallery',
  autoLoad: false,
});
```

### 4. CDN عالمي
- الصور تتوزع على CDN عالمي
- تحميل أسرع من أي مكان في العالم

## هيكل المجلدات المقترح

```
dwam-website/
├── graphic-design/
│   ├── project1.jpg
│   ├── project2.jpg
├── multimedia/
│   ├── video1.mp4
│   ├── video2.mp4
├── ai/
│   ├── demo1.jpg
├── logos/
│   ├── logo.png
└── ...
```

## API Routes

### GET /api/gallery?folder=dwam-website/graphic-design

يرجع قائمة بالصور في المجلد المحدد:

```json
{
  "success": true,
  "images": [
    {
      "id": "dwam-website/graphic-design/project1",
      "url": "https://res.cloudinary.com/...",
      "thumbnail": "https://res.cloudinary.com/.../w_400,h_300...",
      "width": 1920,
      "height": 1080
    }
  ],
  "total": 25
}
```

## نصائح للأداء

1. **استخدم `format: 'auto'`** - Cloudinary يختار أفضل صيغة
2. **استخدم `quality: 'auto'`** - تحسين تلقائي للجودة
3. **حدد الأبعاد** - لا ترسل صور أكبر من اللازم
4. **استخدم Thumbnails** - للمعارض، استخدم صور مصغرة
5. **Lazy Load** - حمل الصور عند الحاجة فقط

## التكلفة

الخطة المجانية تشمل:
- ✅ 25 GB تخزين
- ✅ 25,000 تحويل شهرياً
- ✅ 25 GB Bandwidth
- ✅ CDN عالمي

كافية لمعظم المشاريع الصغيرة والمتوسطة!
