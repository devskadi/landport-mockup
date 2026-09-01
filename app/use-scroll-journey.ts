"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type JourneyOptions = {
  root: RefObject<HTMLElement | null>;
  onFeatureChange: (index: number) => void;
  onProgressChange: (progress: number) => void;
  onStopChange: (stop: string) => void;
};

const stops = ["arrival", "transport", "explore", "features", "contact"];

export function useScrollJourney({
  root,
  onFeatureChange,
  onProgressChange,
  onStopChange,
}: JourneyOptions) {
  useLayoutEffect(() => {
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);
    let cleanupActiveStop = () => {};
    const scope = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      document.querySelectorAll<HTMLElement>(".thing-card").forEach((card) => {
        card.tabIndex = 0;
      });

      const sectionStops = stops.flatMap((stop) => {
        const element = document.getElementById(stop);
        return element ? [{ stop, element }] : [];
      });
      let lastActiveStop = "";
      const setActiveStop = (stop: string) => {
        if (stop === lastActiveStop) return;
        lastActiveStop = stop;
        onStopChange(stop);
      };
      const updateActiveStop = () => {
        const focusLine = window.innerHeight * 0.52;
        const focusColumns = [0.25, 0.5, 0.75];
        const activeAtFocus = focusColumns
          .map((ratio) => document.elementFromPoint(window.innerWidth * ratio, focusLine)?.closest<HTMLElement>("#arrival, #transport, #explore, #features, #contact"))
          .find((element): element is HTMLElement => Boolean(element));
        if (activeAtFocus) {
          setActiveStop(activeAtFocus.id);
          return;
        }

        const activeSection = sectionStops.find(({ element }) => {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= focusLine && bounds.bottom > focusLine;
        });
        if (activeSection) {
          setActiveStop(activeSection.stop);
          return;
        }
        const footer = document.querySelector<HTMLElement>("footer");
        if (footer && footer.getBoundingClientRect().top <= focusLine) setActiveStop("footer");
      };
      window.addEventListener("scroll", updateActiveStop, { passive: true });
      window.addEventListener("resize", updateActiveStop);
      cleanupActiveStop = () => {
        window.removeEventListener("scroll", updateActiveStop);
        window.removeEventListener("resize", updateActiveStop);
      };

      ScrollTrigger.create({
        trigger: "footer",
        start: "top 52%",
        onEnter: () => setActiveStop("footer"),
        onEnterBack: () => setActiveStop("contact"),
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: ({ progress }) => {
          onProgressChange(progress);
          updateActiveStop();
        },
        onRefresh: updateActiveStop,
      });
      updateActiveStop();

      if (reduceMotion) return;

      gsap.from(".hero-intro", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.12,
      });

      gsap.from(".transport-image-reveal", {
        clipPath: "inset(0 100% 0 0)",
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".transport",
          start: "top 72%",
          end: "top 30%",
          scrub: 0.6,
        },
      });

      gsap.from(".transport-copy > :not(.ride-grid)", {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".transport-copy", start: "top 72%" },
      });

      const routeReveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".transport-route",
          start: "top 82%",
          end: "bottom 32%",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });
      routeReveal
        .fromTo(".transport-route-node-0", { autoAlpha: 0, scale: .72 }, { autoAlpha: 1, scale: 1, ease: "back.out(1.4)" }, 0)
        .fromTo(".transport-route-segment-0", { scaleY: 0 }, { scaleY: 1, ease: "none" }, .2)
        .fromTo(".transport-route-node-1", { autoAlpha: 0, scale: .72 }, { autoAlpha: 1, scale: 1, ease: "back.out(1.4)" }, .42)
        .fromTo(".transport-route-segment-1", { scaleX: 0 }, { scaleX: 1, ease: "none" }, .62)
        .fromTo(".transport-route-node-2", { autoAlpha: 0, scale: .72 }, { autoAlpha: 1, scale: 1, ease: "back.out(1.4)" }, .84)
        .fromTo(".transport-route-segment-2", { scaleY: 0 }, { scaleY: 1, ease: "none" }, 1.04)
        .fromTo(".transport-route-node-3", { autoAlpha: 0, scale: .72 }, { autoAlpha: 1, scale: 1, ease: "back.out(1.4)" }, 1.26);

      gsap.from(".soft-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact", start: "top 72%" },
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1001px)", () => {
        const opening = gsap.timeline({
          scrollTrigger: {
            trigger: ".opening-journey",
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
        opening
          .fromTo(".hero-media", { scale: 1.01, yPercent: 0 }, { scale: 1.11, yPercent: 7, ease: "none" }, 0)
          .to(".hero-copy", { yPercent: -34, opacity: 0, ease: "power2.in" }, 0.12)
          .to(".hero-kicker", { opacity: 0, yPercent: -100, ease: "power2.in" }, 0.32)
          .fromTo(".statement", { autoAlpha: 0 }, { autoAlpha: 1, ease: "none" }, 0.18)
          .fromTo(".statement-sky", { scale: 1.02, yPercent: -2 }, { scale: 1.08, yPercent: 4, ease: "none" }, 0.18)
          .fromTo(".statement-foreground", { yPercent: 38, scale: .98 }, { yPercent: 5, scale: 1.04, ease: "none" }, 0.2)
          .fromTo(".statement-frame", { clipPath: "inset(48% 48% 48% 48%)", opacity: 0 }, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, ease: "power2.out" }, 0.34)
          .fromTo(".statement-copy > *", { y: 32, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, ease: "power3.out" }, 0.46);

        const rail = document.querySelector<HTMLElement>(".cards-rail");
        const viewport = document.querySelector<HTMLElement>(".cards-viewport");
        const cards = gsap.utils.toArray<HTMLElement>(".thing-card");
        if (rail && viewport) {
          const updateCards = () => {
            const center = window.innerWidth / 2;
            cards.forEach((card) => {
              const box = card.getBoundingClientRect();
              const delta = (box.left + box.width / 2 - center) / window.innerWidth;
              gsap.set(card, {
                rotateY: gsap.utils.clamp(-7, 7, delta * -10),
                scale: 1 - Math.min(Math.abs(delta) * 0.1, 0.08),
              });
            });
          };
          gsap.to(rail, {
            x: () => -(rail.scrollWidth - viewport.clientWidth),
            ease: "none",
            scrollTrigger: {
              trigger: ".things",
              start: "top top",
              end: () => `+=${Math.max(rail.scrollWidth - viewport.clientWidth, window.innerWidth)}`,
              pin: true,
              scrub: 0.7,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: updateCards,
              onRefresh: updateCards,
            },
          });
        }

        let lastFeature = -1;
        ScrollTrigger.create({
          trigger: ".feature-panel",
          start: "top 10%",
          end: "+=150%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: ({ progress }) => {
            const index = Math.min(4, Math.floor(progress * 5));
            if (index !== lastFeature) {
              lastFeature = index;
              onFeatureChange(index);
            }
          },
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      document.fonts?.ready.then(refresh);
    }, root);

    return () => {
      cleanupActiveStop();
      scope.revert();
    };
  }, [onFeatureChange, onProgressChange, onStopChange, root]);
}
