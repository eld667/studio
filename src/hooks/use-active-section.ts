
"use client";

import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds: string[], options?: IntersectionObserverInit, enabled: boolean = true) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const intersectingSections = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection(null);
        return;
      }

      let bestMatch = { id: '', ratio: 0, top: 10000 };

      intersectingSections.current.forEach((entry, id) => {
        if (entry.isIntersecting) {
          // A higher ratio is better
          if (entry.intersectionRatio > bestMatch.ratio) {
            bestMatch = { id: id, ratio: entry.intersectionRatio, top: entry.boundingClientRect.top };
          }
          // If ratios are the same, prefer the one closer to the top of the viewport
          else if (entry.intersectionRatio === bestMatch.ratio && entry.boundingClientRect.top < bestMatch.top) {
            bestMatch = { id: id, ratio: entry.intersectionRatio, top: entry.boundingClientRect.top };
          }
        }
      });

      if (bestMatch.id) {
        setActiveSection(bestMatch.id);
      }
    };


    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        intersectingSections.current.set(entry.target.id, entry);
      });
      handleScroll();
    };

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(observerCallback, {
      threshold: Array.from(Array(101).keys(), i => i / 100), // fine-grained threshold
      ...options,
    });

    const { current: currentObserver } = observer;

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        currentObserver.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      currentObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, options, enabled]);

  return enabled ? activeSection : null;
}
