 "use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/types";

interface StatBarProps {
  stats: Stat[];
}

export default function StatBar({ stats }: StatBarProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [displayValues, setDisplayValues] = useState<string[]>(stats.map(() => "0"));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1500;
    const start = performance.now();
    let rafId = 0;

    const parsed = stats.map((stat) => {
      const raw = stat.value;
      const suffix = raw.endsWith("%") ? "%" : raw.endsWith("+") ? "+" : "";
      const value = Number.parseInt(raw.replace(/[^\d]/g, ""), 10) || 0;
      return { suffix, value };
    });

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOut(progress);

      const nextValues = parsed.map((item) => {
        const current = Math.round(item.value * eased);
        const formatted = new Intl.NumberFormat("fr-FR").format(current);
        return `${formatted}${item.suffix}`;
      });

      setDisplayValues(nextValues);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [hasStarted, stats]);

  return (
    <section ref={sectionRef} className="bg-[#e8f1fa] py-10">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className={`text-center ${index < 3 ? "md:border-r md:border-[#c9d9ea]" : ""}`}
            >
              <p className="text-4xl font-semibold text-blue-900">{displayValues[index] ?? "0"}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
