"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = "up" | "left" | "right";

export default function ScrollReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const elements = gsap.utils
        .toArray<HTMLElement>("[data-reveal]", root)
        .filter((element) => !element.closest("footer"));

      elements.forEach((element) => {
        const direction = (element.dataset.reveal as RevealDirection | undefined) ?? "up";
        const delay = Number.parseFloat(element.dataset.revealDelay ?? "0") || 0;
        const distance = Number.parseFloat(element.dataset.revealDistance ?? "24") || 24;
        const x = direction === "left" ? -distance : direction === "right" ? distance : 0;
        const y = direction === "up" ? distance : 0;

        gsap.fromTo(
          element,
          { autoAlpha: 0, x, y },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            delay,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="motion-root">
      {children}
    </div>
  );
}
