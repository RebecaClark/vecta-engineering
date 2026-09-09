'use client';

import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(true);
  const [hoverState, setHoverState] = useState<'default' | 'view' | 'drag'>('default');
  const [hoverText, setHoverText] = useState('');

  const mouse = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target as HTMLElement;
      
      const draggable = target.closest('[data-cursor="drag"]');
      const clickable = target.closest('a, button, [data-cursor="view"]');

      let nextState: 'default' | 'view' | 'drag' = 'default';
      let nextText = '';

      if (draggable) {
        nextState = 'drag';
        nextText = '360°';
      } else if (clickable) {
        nextState = 'view';
        nextText = clickable.getAttribute('data-cursor-text') || '';
      }

      setHoverState((prev) => (prev !== nextState ? nextState : prev));
      setHoverText((prev) => (prev !== nextText ? nextText : prev));
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    
    const render = () => {
      dot.current.x = mouse.current.x;
      dot.current.y = mouse.current.y;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center w-[40px] h-[40px]"
      >
        <div 
          className={`flex items-center justify-center rounded-full border border-[#c5a880]/60 transition-all duration-300 ease-out w-full h-full
          ${hoverState === 'view' ? 'bg-[#c5a880]/10 scale-150' : ''}
          ${hoverState === 'drag' ? 'bg-[#c5a880]/20 scale-[2]' : ''}`}
        >
          <span 
            className={`text-[8px] font-mono text-[#c5a880] text-center whitespace-nowrap transition-opacity duration-300
            ${hoverText ? 'opacity-100' : 'opacity-0'}`}
          >
            {hoverText}
          </span>
        </div>
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center w-[6px] h-[6px]"
      >
        <div className="w-full h-full bg-[#c5a880] rounded-full mix-blend-difference" />
      </div>
    </>
  );
};
