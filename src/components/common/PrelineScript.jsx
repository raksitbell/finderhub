"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    import("preline/preline");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        if (!window.$hsOverlayCollection) {
          window.$hsOverlayCollection = [];
        }
        if (window.HSStaticMethods) {
          window.HSStaticMethods.autoInit();
        }
      }
    }, 100);
  }, [path]);

  return null;
}
