"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";

export interface PublicationsProps {
  title: string;
  authors: string;
  venue: string;
  bullets: string[];
  link: string;
}

export default function PublicationsParagraph({ title, authors, venue, bullets, link }: PublicationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const venueRef = useRef<HTMLHeadingElement>(null);
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

      if (venueRef.current) {
        const { words } = splitText(venueRef.current);
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
      <h3 ref={titleRef} className="prose-lg dark:prose-lg-invert max-w-none font-medium mb-1 split-target ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}">
        <em>{title}</em>
      </h3>
      <h3 ref={titleRef} className="prose dark:prose-invert font-medium mb-1 split-target ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}">
        {authors}
      </h3>
      <h4 ref={venueRef} className="text-lg  text-gray-600 dark:text-gray-400 mb-2 split-target ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}">
        {venue}
      </h4>
      <p className="text-lg text-blue-500 mb-2 split-target ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}"><a href={link} target="_blank">Link to paper</a></p>
      <ul ref={listRef} className="list-disc list-inside text-md text-gray-700 dark:text-gray-300 space-y-1 split-target ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}">
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
