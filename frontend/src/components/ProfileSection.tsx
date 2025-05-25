"use client";

import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";
import * as motion from "motion/react-client";

export type Profile = {
  name: string;
  position: string;
  location: string;
  description: string;
};

interface ProfileProps {
  profile: Profile | null;
}

export default function ProfileSection({ profile }: ProfileProps) {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const positionRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  function animateProfile() {
    if (imgRef.current) {
      animate(imgRef.current, { opacity: [0, 1], y: [10, 0] }, {
          type: "spring",
          duration: 0.8,
          delay: 0.3,
      });
    }

    if (nameRef.current) {
      const { words } = splitText(nameRef.current);
      animate(words, { opacity: [0, 1], y: [10, 0] }, {
        type: "spring",
        duration: 1.5,
        delay: stagger(0),
      });
    }

    if (positionRef.current) {
      const { words } = splitText(positionRef.current);
      animate(words, { opacity: [0, 1], y: [10, 0] }, {
        type: "spring",
        duration: 1.5,
        delay: stagger(0, { startDelay: 0.4 }),
      });
    }

    if (locationRef.current) {
      const { words } = splitText(locationRef.current);
      animate(words, { opacity: [0, 1], y: [10, 0] }, {
        type: "spring",
        duration: 1.5,
        delay: stagger(0, { startDelay: 0.6 }),
      });
    }

    if (descriptionRef.current) {
      const { words } = splitText(descriptionRef.current);
      animate(words, { opacity: [0, 1], y: [10, 0] }, {
        type: "spring",
        duration: 1.5,
        delay: stagger(0.05, { startDelay: 0.8 }),
      });
    }
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.fonts.ready.then(animateProfile);
          }
        });
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!profile) return null;

  return (
    <section
      ref={containerRef}
      // className="p-4 min-h-[30vh] flex items-center justify-center pt-24 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}">
      className="sticky top-0 pt-20 px-4 sm:px-6 space-y-12 min-h-dvh flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-200 dark:from-violet-600 dark:to-indigo-800">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img
          ref={imgRef}
          src="/profile.webp"
          alt="André Charneca"
          className="size-60 md:size-80 rounded-full shadow-xl animate-pop-in"
        />
        <div>
          <h2 ref={nameRef} className="py-4 text-2xl md:text-4xl sm:text-xs font-semibold">
            {profile.name}
          </h2>
          <p ref={positionRef} className="text-xl md:text-xl text-gray-600 dark:text-gray-300">
            {profile.position}
          </p>
          <p ref={locationRef} className="text-lg md:text-xl mt-1  text-gray-600 dark:text-gray-300">
            {profile.location}
          </p>
          <p ref={descriptionRef} className="text-base md:text-base">
            {profile.description}
          </p>
        </div>
      </div>

      <style>{`
        .split-word {
          will-change: transform, opacity;
          display: inline-block;
          margin-right: 0.25ch;
        }
      `}</style>
    </section>
  );
}
