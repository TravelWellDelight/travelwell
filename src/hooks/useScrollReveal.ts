"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollReveal(
  ref: React.RefObject<HTMLElement>,
  threshold = 0.12,
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // toggle on AND off — repeats every time
        setVisible(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return visible;
}
