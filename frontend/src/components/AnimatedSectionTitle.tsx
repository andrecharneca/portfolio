"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedSectionTitle({
  children,
  className = "",
}: AnimatedSectionTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset animation by triggering reflow
          ref.current?.classList.remove("animate-pop-in");
          void ref.current?.offsetWidth; // Force reflow
          ref.current?.classList.add("animate-pop-in");
          setShouldAnimate(true);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <h2 ref={ref} className={`text-5xl font-extrabold mb-4 ${className}`}>
      {children}
    </h2>
  );
}
