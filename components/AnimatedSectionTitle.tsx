"use client";

import type { ReactNode } from "react";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export default function AnimatedSectionTitle({ children }: { children: ReactNode }) {
  const ref = useFadeInOnScroll();

  return (
    <div ref={ref} className="translate-y-6 opacity-0 transition-all duration-700 ease-out">
      {children}
    </div>
  );
}
