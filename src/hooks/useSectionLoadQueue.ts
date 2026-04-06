"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface SectionConfig {
  id: string;
  priority: number;
  heavy: boolean;
}

const MAX_CONCURRENT = 2;

export function useSectionLoadQueue(sections: SectionConfig[]) {
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());
  const [activeSections, setActiveSections] = useState<Set<string>>(new Set());
  const queueRef = useRef<string[]>([]);
  const loadingCountRef = useRef(0);

  // Check if deep-link targets a specific section
  const getDeepLinkSection = useCallback(() => {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash.replace("#", "");
    return hash || null;
  }, []);

  // Process queue - load next sections
  const processQueue = useCallback(() => {
    while (
      loadingCountRef.current < MAX_CONCURRENT &&
      queueRef.current.length > 0
    ) {
      const nextId = queueRef.current.shift();
      if (!nextId) break;

      loadingCountRef.current++;
      setActiveSections((prev) => new Set([...prev, nextId]));

      // Simulate section load completion
      setTimeout(() => {
        setLoadedSections((prev) => new Set([...prev, nextId]));
        setActiveSections((prev) => {
          const next = new Set(prev);
          next.delete(nextId);
          return next;
        });
        loadingCountRef.current--;
        processQueue();
      }, 100);
    }
  }, []);

  // Add section to queue with priority
  const queueSection = useCallback(
    (id: string) => {
      if (loadedSections.has(id) || activeSections.has(id)) return;
      if (queueRef.current.includes(id)) return;

      const deepLink = getDeepLinkSection();
      const section = sections.find((s) => s.id === id);

      // Deep-link section gets highest priority
      if (deepLink && id === deepLink) {
        queueRef.current.unshift(id);
      } else if (section?.priority === 1) {
        // Critical sections go to front
        queueRef.current.unshift(id);
      } else {
        queueRef.current.push(id);
      }

      processQueue();
    },
    [loadedSections, activeSections, sections, getDeepLinkSection, processQueue]
  );

  // Auto-queue critical sections on mount
  useEffect(() => {
    const deepLink = getDeepLinkSection();

    // Sort by priority, but put deep-link section first
    const sorted = [...sections].sort((a, b) => {
      if (deepLink) {
        if (a.id === deepLink) return -1;
        if (b.id === deepLink) return 1;
      }
      return a.priority - b.priority;
    });

    // Queue critical sections immediately
    sorted
      .filter((s) => s.priority <= 2)
      .forEach((s) => queueSection(s.id));
  }, []);

  const isSectionLoaded = useCallback(
    (id: string) => loadedSections.has(id),
    [loadedSections]
  );

  const isSectionActive = useCallback(
    (id: string) => activeSections.has(id),
    [activeSections]
  );

  return {
    queueSection,
    isSectionLoaded,
    isSectionActive,
    loadedSections,
  };
}
