"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function useIncrementalList<T>(items: T[], pageSize = 10, rootMargin = "0px 0px 200px 0px") {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visibleCount >= items.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisibleCount((count) => Math.min(count + pageSize, items.length));
      },
      { rootMargin }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [items.length, pageSize, rootMargin, visibleCount]);

  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);

  return {
    visibleItems,
    sentinelRef,
    hasMore: visibleCount < items.length,
    visibleCount: Math.min(visibleCount, items.length),
    totalCount: items.length
  };
}
