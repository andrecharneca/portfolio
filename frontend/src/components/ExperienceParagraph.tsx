"use client";

import { useEffect, useRef, useState } from "react";
import { animate, delay, stagger } from "motion";
import { splitText } from "motion-plus";

export interface ExperienceProps {
  title: string;
  subtitle: string;
  bullets: string[];
}

export default function ExperienceParagraph({ title, subtitle, bullets }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    document.fonts.ready.then(() => {
      if (titleRef.current) {
        const { words } = splitText(titleRef.current);
        animate(words, { opacity: [0, 1], y: [10, 0] }, {
          duration: 0.4,
          delay: stagger(0.05),
        });
      }

      if (subtitleRef.current) {
        const { words } = splitText(subtitleRef.current);
        animate(words, { opacity: [0, 1], y: [10, 0] }, {
          duration: 0.4,
          delay: stagger(0.05),
        });
      }

      if (listRef.current) {
        const items = Array.from(listRef.current.querySelectorAll("li"));
        animate(items, { opacity: [0, 1], y: [10, 0] }, {
          duration: 0.4,
          delay: stagger(0.05, {startDelay: 0.3}),
        });
      }
    });
  }, [isVisible]);

  return (
    <div ref={containerRef} className="mb-12">
      <h3 ref={titleRef} className="prose prose-xl dark:prose-xl-invert max-w-none text-gray-600 dark:text-gray-400 font-semibold mb-1 split-target ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}">{title}</h3>
      <h4 ref={subtitleRef} className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 mb-2 split-target ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}">{subtitle}</h4>
      <ul ref={listRef} className="list-disc list-inside prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-1 split-target">
        {bullets.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
      <style>{`
        .split-word {
          display: inline-block;
          margin-right: 0.25ch;
          will-change: opacity, transform;
        }
      `}</style>
    </div>
  );
}
