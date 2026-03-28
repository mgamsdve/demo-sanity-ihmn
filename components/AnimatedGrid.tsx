import { Children } from "react";
import type { ReactNode } from "react";

export default function AnimatedGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          style={{
            isolation: "isolate",
            animationName: "fadeInUp",
            animationDuration: "0.5s",
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards",
            willChange: "transform",
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
