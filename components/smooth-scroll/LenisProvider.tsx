'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { getGSAP } from '@/lib/gsap';

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      duration: 0.85,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      syncTouch: false,
    });

    const { gsap, ScrollTrigger } = getGSAP();

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <div>{children}</div>;
};
