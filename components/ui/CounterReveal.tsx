"use client";

import React, { useEffect, useRef, useState } from "react";
import { getGSAP } from "@/lib/gsap";

interface CounterRevealProps {
  value: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export const CounterReveal: React.FC<CounterRevealProps> = ({
  value,
  suffix = "",
  className = "",
  duration = 2,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState("");
  
  useEffect(() => {
    const match = value.match(/^([\d.,]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    
    let numStr = match[1];
    const postFix = match[2];
    
    const hasComma = numStr.includes(",");
    const parsedNum = parseFloat(numStr.replace(",", "."));
    
    if (isNaN(parsedNum)) {
      setDisplayValue(value);
      return;
    }
    
    const decimalPlaces = hasComma ? (numStr.split(",")[1]?.length || 0) : (numStr.split(".")[1]?.length || 0);
    
    let initialNum = (0).toFixed(decimalPlaces);
    if (hasComma) {
      initialNum = initialNum.replace(".", ",");
    }
    setDisplayValue(`${initialNum}${postFix}`);

    const { gsap, ScrollTrigger } = getGSAP();
    let rAF: number;
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          let startTime: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            
            const easeProgress = progress * (2 - progress);
            const currentNum = parsedNum * easeProgress;
            
            let formattedNum = currentNum.toFixed(decimalPlaces);
            if (hasComma) {
              formattedNum = formattedNum.replace(".", ",");
            }
            
            setDisplayValue(`${formattedNum}${postFix}`);
            
            if (progress < 1) {
              rAF = requestAnimationFrame(step);
            } else {
              setDisplayValue(value);
            }
          };
          
          rAF = requestAnimationFrame(step);
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, [value, duration]);

  return (
    <span ref={containerRef} className={`font-space font-mono ${className}`}>
      {displayValue || value}{suffix}
    </span>
  );
};
