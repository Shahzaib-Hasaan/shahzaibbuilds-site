'use client';

import { useEffect, useRef } from 'react';

export interface MagneticOptions {
  strength?: number;
  radius?: number;
  scale?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(opts: MagneticOptions = {}) {
  const { strength = 0.35, radius = 120, scale = 1.06 } = opts;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 768px)');
    if (mq.matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let sc = 1;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        tx = 0; ty = 0; sc = 1;
      } else {
        const k = 1 - dist / radius;
        tx = dx * strength * k;
        ty = dy * strength * k;
        sc = 1 + (scale - 1) * k;
      }
      if (!raf) {
        raf = requestAnimationFrame(apply);
      }
    };
    const onLeave = () => {
      tx = 0; ty = 0; sc = 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${sc.toFixed(3)})`;
      raf = 0;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [strength, radius, scale]);

  return ref;
}
