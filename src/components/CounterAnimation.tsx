'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterAnimationProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: React.CSSProperties;
}

export default function CounterAnimation({
  value,
  duration = 1.2,
  prefix = '',
  suffix = '',
  decimals = 0,
  style,
}: CounterAnimationProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * value);
            setDisplay(current);
            if (progress < 1) {
              animRef.current = requestAnimationFrame(animate);
            }
          };
          startTime;
          animRef.current = requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(animRef.current);
      observer.unobserve(el);
    };
  }, [value, duration]);

  return (
    <span ref={ref} style={style}>
      {prefix}{display.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}
