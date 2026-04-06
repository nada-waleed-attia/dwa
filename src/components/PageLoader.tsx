"use client";

import { useEffect, useState } from "react";
import styles from "./PageLoader.module.css";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide loader after page loads
    const hide = () => {
      setTimeout(() => setVisible(false), 500);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
      // Fallback - hide after 3 seconds max
      const fallback = setTimeout(() => setVisible(false), 3000);
      return () => {
        window.removeEventListener("load", hide);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.loader}>
      <div className={styles.logoWrap}>
        <img
          src="/02.webp"
          alt="دوام"
          className={styles.logo}
        />
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
