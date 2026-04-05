import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

// Optimize font loading - only load weights we actually use
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "600", "700"], // Reduced from 6 weights to 3
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "شركة دوام للبرمجيات والأعمال التقنية | تقنية بلا حدود",
  description: "منصة خدمات وحلول برمجية وإبداعية باحترافية وعصرية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="//prod.spline.design" />
        
        {/* Preload Spline scene for faster robot loading */}
        <link 
          rel="preload" 
          href="https://prod.spline.design/AZKtIJgbI3wnee-5/scene.splinecode" 
          as="fetch" 
          crossOrigin="anonymous"
        />
        
        {/* Load Font Awesome normally */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className={`${cairo.variable}`}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
