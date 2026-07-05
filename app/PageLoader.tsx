"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1800);
    const t2 = setTimeout(() => setVisible(false), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div className={`page-loader ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader-content">
        <div className="loader-logo-wrap">
          <Image
            src="/logo.png"
            alt="Shanthi Gold Covering"
            width={120}
            height={120}
            className="loader-logo"
            priority
          />
          <div className="loader-ring"></div>
          <div className="loader-ring loader-ring-2"></div>
        </div>
        <div className="loader-text">
          <div className="loader-brand">Shanthi Gold Covering</div>
          <div className="loader-sub">Impon Jwellery</div>
        </div>
        <div className="loader-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
}
