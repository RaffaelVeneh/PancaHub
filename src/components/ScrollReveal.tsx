'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
}

const directionMap = {
  up:    { y: 30, x: 0 },
  down:  { y: -30, x: 0 },
  left:  { x: 30, y: 0 },
  right: { x: -30, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  className,
  style,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [once]);

  const offsets = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offsets.x, y: offsets.y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offsets.x, y: offsets.y }}
      transition={{ duration, delay, ease: [0.25, 0, 0.15, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
