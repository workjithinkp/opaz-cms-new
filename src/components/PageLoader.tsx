"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
export default function PageLoader() {
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.5, // wait slightly before start
    });

    // Logo zoom out
    tl.to(logoRef.current, {
      scale: 0,
      duration: 0.8,
      ease: "power3.inOut",
    });

    // Shutter animation
    tl.to(
      topRef.current,
      {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
      },
      "-=0.4"
    );

    tl.to(
      bottomRef.current,
      {
        y: "100%",
        duration: 1,
        ease: "power4.inOut",
      },
      "<"
    );

    // Fade out loader
    tl.to(
      wrapperRef.current,
      {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5,
      },
      "-=0.4"
    );

    // 🔥 FIRE EVENT AT END
    tl.call(() => {
      window.dispatchEvent(new Event("loader-finished"));
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    >
      {/* Top part */}
      <div
        ref={topRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-white"
      ></div>

      {/* Bottom part */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-white"
      ></div>

      {/* Logo */}
      <div
        ref={logoRef}
        className="relative z-10 text-3xl font-bold scale-100"
      >
      <div className="mx-auto  relative flex justify-center items-center">
        <div className="relative text-center">
          <Image
            src="/opaz-logo-footer.png"
            alt="Zoom"
            width={410}
            height={82}
            priority
            className="mix-blend-darken max-w-3/4 mx-auto"
          />
        </div>
      </div>
      </div>
    </div>
  );
}
