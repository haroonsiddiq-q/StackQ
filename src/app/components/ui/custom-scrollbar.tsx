"use client";

import { useEffect } from "react";

export function CustomScrollbar() {
  useEffect(() => {
    const el = document.documentElement;

    const updateScrollEdges = () => {
      const atTop = el.scrollTop <= 0;
      const atBottom =
        Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

      el.classList.toggle("at-top", atTop);
      el.classList.toggle("at-bottom", atBottom);
    };

    updateScrollEdges();
    window.addEventListener("scroll", updateScrollEdges);
    window.addEventListener("resize", updateScrollEdges);

    return () => {
      window.removeEventListener("scroll", updateScrollEdges);
      window.removeEventListener("resize", updateScrollEdges);
    };
  }, []);

  return null;
}