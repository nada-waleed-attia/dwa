"use client";

import { useEffect, useState } from "react";
import styles from "./PageLoader.module.css";

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hide = () => setTimeout(() => setHidden(true), 200);

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
      const fallback = setTimeout(() => setHidden(true), 800);
      return () => {
        window.removeEventListener("load", hide);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (hidden) return null;

  return (
    <div className={styles.loader}>
      <div className={styles.logoWrap}>
        <img src="/02.webp" alt="دوام" className={styles.logo} />
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
