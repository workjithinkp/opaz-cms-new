'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { PageSection } from '@/lib/api';
import { useDeviceType } from '@/components/hooks/useDeviceType';

gsap.registerPlugin(ScrollTrigger);

interface HomeFreedomProps {
  section: PageSection;
  lang: string;
}

export default function HomeFreedom({ section, lang }: HomeFreedomProps) {
  const device = useDeviceType();
  const [mounted, setMounted] = useState(false);
  const block = section.block;
  const list = section.list || [];

  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const textRefDec = useRef(null);
  const boxesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (
      !mounted ||
      device === 'mobile' ||
      !containerRef.current ||
      !imgRef.current ||
      !textRef.current ||
      !textRefDec.current ||
      !boxesRef.current
    ) {
      return;
    }

    gsap.set(textRef.current, { opacity: 0, y: 80 });
    gsap.set(textRefDec.current, { opacity: 0, y: 80 });
    gsap.set(boxesRef.current.children, { opacity: 0, y: 150 });

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
      imgRef.current,
      { scale: 1 },
      { scale: 2, ease: 'none', duration: 1 }
    );

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 150, x: 0, scale: 2 },
      { opacity: 1, y: 0, x: 0, duration: 1, scale: 1 }
    );
    tl.fromTo(
      textRefDec.current,
      { opacity: 0, y: 150, x: 0 },
      { opacity: 1, y: 0, x: 0, duration: 1, ease: 'power3.out' }
    );

    const boxItems = boxesRef.current.children;
    tl.fromTo(
      boxItems,
      { opacity: 0, y: 150 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
      }
    );
  }, [mounted, device]);

  if (!block) return null;

  // Parse boxes data from list or fallback to block data
  const boxesData = list.length > 0 
    ? list.map(item => ({ title: item.c_1 || '', link: item.t_1 || '#' }))
    : [
        block.t_1 && block.c_3 ? { title: block.c_3, link: block.t_1 } : null,
        block.t_2 && block.c_4 ? { title: block.c_4, link: block.t_2 } : null,
        block.t_3 && block.c_5 ? { title: block.c_5, link: block.t_3 } : null,
      ].filter(Boolean);

  // Mobile version
  if (device === 'mobile') {
    return (
      <section className="relative  w-full overflow-hidden py-15 px-6">
        <div className="absolute inset-0 z-10 bg-black/40"></div>

        <div className="absolute inset-0">
          {block.i_1 && (
            <Image
              src={block.i_1}
              alt="Freedom"
              fill
              priority
              className="object-cover"
            />
          )}
        </div>

        <div className="relative z-30">
          <div className="w-full">
            {block.c_1 && (
              <h2
                className={`mb-5 text-3xl font-light text-[#b0ddfc] ${
                  lang === 'ar' ? 'text-right' : 'text-left'
                }`}>
                {block.c_1.split('|').map((part, index) => (
                  <span key={index}>
                    {part.trim()}
                    {index < block.c_1!.split('|').length - 1 && <br />}
                  </span>
                ))}
              </h2>
            )}

            {block.c_2 && (
              <div className="mb-5  text-white">{block.c_2}</div>
            )}

            <div className="grid gap-2">
              {boxesData.map((box: any, index: number) => (
                <Link
                  href={box.link.startsWith('http') ? box.link : `/${lang}${box.link}`}
                  key={index}
                  target={box.link.startsWith('http') ? '_blank' : undefined}
                  rel={box.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-center rounded-xl border border-[#b6ddfa]/40 bg-[#2d86dd]/20 py-4 text-[#b6ddfa]">
                  {box.title}
                  <MdKeyboardDoubleArrowRight
                    className={`ms-2 ${lang === 'ar' ? 'rotate-180' : ''}`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop version
  return (
    <section
      ref={containerRef}
      className="relative flex w-full flex-col justify-center overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 z-10 bg-black/40"></div>

      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        {block.i_1 && (
          <Image
            src={block.i_1}
            alt="Freedom"
            fill
            priority
            unoptimized
            className="object-cover"
          />
        )}
      </div>

      <div className="relative z-30 container mx-auto">
        <div className="w-full">
          {/* Title */}
          {block.c_1 && (
            <h2
              ref={textRef}
              className={`relative z-20 mb-4 text-3xl font-light text-[#b0ddfc] text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${lang === 'ar' ? 'origin-right text-right' : 'origin-left'}`}>
              {block.c_1.split('|').map((part, index) => (
                <span key={index}>
                  {part.trim()}
                  {index < block.c_1!.split('|').length - 1 && <br />}
                </span>
              ))}
            </h2>
          )}

          {/* Description */}
          {block.c_2 && (
            <div
              className="mb-4 max-w-[1100px] origin-left text-lg text-white lg:mb-8 lg:text-xl"
              ref={textRefDec}>
              {block.c_2}
            </div>
          )}

          {/* Boxes */}
          <div
            ref={boxesRef}
            className="grid h-54 items-start gap-2 lg:grid-cols-3 lg:gap-6">
            {boxesData.map((box: any, index: number) => (
              <Link
                href={box.link.startsWith('http') ? box.link : `/${lang}${box.link}`}
                key={index}
                target={box.link.startsWith('http') ? '_blank' : undefined}
                rel={box.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative text-center">
                <div className="flex items-center justify-center rounded-xl border border-[#b6ddfa]/40 bg-[#2d86dd]/20 py-3 text-sm text-[#b6ddfa] uppercase transition-all duration-700 group-hover:border-[#b6ddfa]/70 group-hover:bg-[#0c213b] md:py-5 md:text-lg">
                  {box.title}
                  <MdKeyboardDoubleArrowRight
                    className={`ms-2.5 size-7 text-3xl ${
                      lang === 'ar' ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
