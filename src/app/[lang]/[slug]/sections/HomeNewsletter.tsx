'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { PageSection } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDeviceType } from '@/components/hooks/useDeviceType';
import translations from '@/data/translations.json';

gsap.registerPlugin(ScrollTrigger);

interface HomeNewsletterProps {
  section: PageSection;
  lang: string;
}

export default function HomeNewsletter({ section, lang }: HomeNewsletterProps) {
  const block = section.block;
  const device = useDeviceType();
  const [mounted, setMounted] = useState(false);
  
  // Get translations for current language
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const containerRef = useRef(null);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useGSAP(() => {
    if (!containerRef.current || !imgWrapperRef.current || !contentRef.current || device === 'mobile' || !mounted) {
      return;
    }

    gsap.set(contentRef.current, { scale: 0.15, opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      imgWrapperRef.current,
      { scale: 1, opacity: 1 },
      { scale: 8, opacity: 0, ease: 'none', duration: 1 }
    );

    tl.fromTo(
      contentRef.current,
      { scale: 0.15, opacity: 1 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, [device, mounted]);

  if (!block) return null;

  // Split c_1 by "|" to create line breaks
  const titleParts = block.c_1?.split('|') || [];

  // Desktop View
  if (device === 'desktop') {
    return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#06213c]">
      <div
        ref={imgWrapperRef}
        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <Image
          src="/window.svg"
          alt="Zoom"
          width={377}
          height={510}
          priority
          unoptimized
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-full max-w-[850px] text-white transition-all">
          {titleParts.length > 0 && (
            <div className="pb-4 text-4xl font-light uppercase md:text-6xl lg:text-7xl">
              {titleParts.map((part, index) => (
                <span key={index}>
                  {part.trim()}
                  {index < titleParts.length - 1 && <br />}
                </span>
              ))}
            </div>
          )}

          {block?.c_2 && (
            <div className="pb-3.5 text-lg lg:text-xl">
              {block.c_2}
            </div>
          )}
          
          <Input
  type="email"
  placeholder={block?.c_4 || t.newsletterEmail}
  className="mb-6 h-12 bg-white text-gray-800"
/>
          <div className="pb-11">
            <Button className="cursor-pointer bg-[#e7cab2] px-7 py-6 text-lg text-white transition duration-300 hover:bg-[#b0ddfc]">
              {block?.c_3 || "Subscribe"}
            </Button>
          </div>
        </div>
      </div>

      {/* Radial Background Circle */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="aspect-square h-2/3 rounded-full bg-[radial-gradient(circle,#27425b_0%,#06213c_70%)]"></div>
      </div>
    </section>

    );
  }

  // Mobile View
  return (
    <section className="relative bg-[#06213c] pt-15 pb-10 px-6">
      {/* Content */}
      <div className="relative inset-0 z-20 flex items-center justify-center">
        <div className="text-center text-white transition-all">
          {titleParts.length > 0 && (
            <div className="pb-4 text-4xl font-light uppercase">
              {titleParts.map((part, index) => (
                <span key={index}>
                  {part.trim()}
                  {index < titleParts.length - 1 && <br />}
                </span>
              ))}
            </div>
          )}

          {block?.c_2 && (
            <div className="pb-3.5">{block.c_2}</div>
          )}
          
         <Input
  type="email"
  placeholder={block?.c_4 || t.newsletterEmail}
  className="mb-6 h-12 bg-white text-gray-800"
/>
          <div className="">
            <Button className="cursor-pointer bg-[#e7cab2] px-7 py-6 text-lg text-[#06213c] transition duration-300 hover:bg-[#b0ddfc] w-full">
              {t.subscribe}
            </Button>
          </div>
        </div>
      </div>

      {/* Radial Background Circle */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="aspect-square h-2/3 rounded-full bg-[radial-gradient(circle,#27425b_0%,#06213c_70%)]"></div>
      </div>
    </section>
  );
}


