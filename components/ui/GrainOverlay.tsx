'use client';

import React, { useEffect, useState } from 'react';

export const GrainOverlay = () => {
  const [noiseUrl, setNoiseUrl] = useState<string | null>(null);

  useEffect(() => {
    // Generate a tiny 128x128 static noise canvas once to eliminate full-screen SVG filter repaints
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(128, 128);
    const buffer = new Uint32Array(imgData.data.buffer);
    for (let i = 0; i < buffer.length; i++) {
      const v = Math.floor(Math.random() * 255);
      // 0x00RRGGBB with low alpha
      buffer[i] = (25 << 24) | (v << 16) | (v << 8) | v;
    }
    ctx.putImageData(imgData, 0, 0);
    setNoiseUrl(canvas.toDataURL('image/png'));
  }, []);

  if (!noiseUrl) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-35"
      style={{
        backgroundImage: `url(${noiseUrl})`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};
