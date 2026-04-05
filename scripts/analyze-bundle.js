#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * يحلل حجم الـ bundle ويعرض تقرير مفصل
 */

const fs = require('fs');
const path = require('path');

const NEXT_DIR = path.join(__dirname, '..', '.next');
const BUILD_MANIFEST = path.join(NEXT_DIR, 'build-manifest.json');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeBundle() {
  console.log('\n📊 تحليل Bundle Size...\n');

  if (!fs.existsSync(BUILD_MANIFEST)) {
    console.error('❌ لم يتم العثور على build manifest. قم بتشغيل npm run build أولاً');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST, 'utf8'));
  
  let totalSize = 0;
  const files = [];

  // تحليل الملفات
  for (const [page, chunks] of Object.entries(manifest.pages)) {
    for (const chunk of chunks) {
      const filePath = path.join(NEXT_DIR, chunk);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        totalSize += stats.size;
        files.push({
          page,
          file: chunk,
          size: stats.size
        });
      }
    }
  }

  // ترتيب حسب الحجم
  files.sort((a, b) => b.size - a.size);

  console.log('📦 أكبر 10 ملفات:\n');
  files.slice(0, 10).forEach((file, i) => {
    console.log(`${i + 1}. ${formatBytes(file.size).padEnd(12)} - ${file.file}`);
  });

  console.log(`\n📊 إجمالي الحجم: ${formatBytes(totalSize)}`);
  
  // تحذيرات
  if (totalSize > 500 * 1024) {
    console.log('\n⚠️  تحذير: حجم الـ bundle أكبر من 500KB');
  } else {
    console.log('\n✅ حجم الـ bundle مقبول');
  }

  console.log('\n💡 نصائح للتحسين:');
  console.log('   - استخدم dynamic imports للمكونات الكبيرة');
  console.log('   - تأكد من tree-shaking للمكتبات');
  console.log('   - استخدم next/image للصور');
  console.log('   - قلل استخدام المكتبات الخارجية\n');
}

analyzeBundle();
