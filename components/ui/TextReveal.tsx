"use client";

import React, { useEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = "",
  as = "p",
  delay = 0,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const Component = as;

  useEffect(() => {
    const { gsap } = getGSAP();
    const container = containerRef.current;

    if (!container) return;

    const words = container.querySelectorAll(".word-inner");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.035,
          duration: 0.6,
          ease: "power3.out",
          delay: delay,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [delay]);

  const words = children.split(" ");

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className="contents">
      <Component className={className}>
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ marginRight: "0.25em" }}
          >
            <span className="word-inner inline-block">{word}</span>
          </span>
        ))}
      </Component>
    </div>
  );
};
