'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { PageSection } from '@/lib/api';
import { useDeviceType } from '@/components/hooks/useDeviceType';
import Investments from './Investments';

gsap.registerPlugin(ScrollTrigger);

interface HomeFeaturesProps {
  section: PageSection;
  lang: string;
}

export default function HomeFeatures({ section, lang }: HomeFeaturesProps) {
  const device = useDeviceType();
  const [mounted, setMounted] = useState(false);
  const block = section.block;
  const list = section.list || [];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const titleRef1 = useRef<HTMLHeadingElement | null>(null);
  const titleRef2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (
      !mounted ||
      device === 'mobile' ||
      !containerRef.current ||
      !imgRef.current ||
      !titleRef1.current ||
      !titleRef2.current
    ) {
      return;
    }

    gsap.set(titleRef1.current, { opacity: 0, y: -80 });
    gsap.set(titleRef2.current, { opacity: 0, y: 80 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: true,
        pin: true,
      },
    });

    tl.fromTo(
      imgRef.current,
      { scale: 1 },
      { scale: 2, ease: 'none', duration: 1 }
    )
      .to(titleRef1.current, { opacity: 1, y: 0, duration: 1 })
      .to(titleRef2.current, { opacity: 1, y: 0, duration: 1 });
  }, [mounted, device]);

  if (!block && list.length === 0) return null;

  // Mobile version
  if (device === 'mobile') {
    return (
      <section className="relative flex w-full items-center overflow-hidden py-15 px-6">
        <div className="absolute inset-0 z-10 bg-black/40"></div>
        <div className="absolute inset-0 overflow-hidden">
          {block?.i_1 && (
            <Image
              src={block.i_1}
              alt="Features"
              fill
              priority
              unoptimized
              className="object-cover"
            />
          )}
        </div>
        <div className="relative z-20">
          {block?.c_1 && (
            <h2 className="text-2xl font-light text-[#b0ddfc] uppercase">
              {block.c_1.split('|').map((part, index) => (
                <span key={index}>
                  {part.trim()}
                  {index < block.c_1!.split('|').length - 1 && <br />}
                </span>
              ))}
            </h2>
          )}

          {block?.c_2 && (
            <div className="mb-5 text-3xl font-light text-[#b0ddfc] uppercase">
              {block.c_2.split('|').map((part, index) => (
                <span key={index}>
                  {part.trim()}
                  {index < block.c_2!.split('|').length - 1 && <br />}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {list.map((item, index) => (
              <div
                key={index}
                className="relative bg-[#06213c]/45 p-6 rounded-lg">
                <div className="flex gap-3 text-white">
                  {item.i_1 && (
                    <div className="flex size-10 items-center justify-center rounded-xl border border-[#b6ddfa]/40 bg-[#065cb2]/80 backdrop-blur-2xl">
                      <Image
                        src={item.i_1}
                        width={50}
                        height={50}
                        className="size-5"
                        alt="icon"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    {item.c_1 && (
                      <h3 className="text-lg font-medium text-[#b8ddfa] capitalize">
                        {item.c_1}
                      </h3>
                    )}

                    {item.c_2 && (
                      <p className="text-sm">{item.c_2}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
        {block?.i_1 && (
          <Image
            src={block.i_1}
            alt="Features"
            fill
            priority
            unoptimized
            className="object-cover"
          />
        )}
      </div>

      <div className="relative z-20 container mx-auto">
        <div>
          {block?.c_1 && (
            <h2
              ref={titleRef1}
              className="text-2xl font-light text-[#b0ddfc] uppercase lg:text-3xl xl:text-4xl 2xl:text-6xl">
              {block.c_1.split('|').map((part, index) => (
                <span key={index}>
                  {part.trim()}
                  {index < block.c_1!.split('|').length - 1 && <br />}
                </span>
              ))}
            </h2>
          )}

          {block?.c_2 && (
            <div
              ref={titleRef2}
              className="mb-4 mb-5 text-3xl font-light text-[#b0ddfc] uppercase lg:mb-8 lg:text-6xl 2xl:text-[80px]">
              {block.c_2.split('|').map((part, index) => (
                <span key={index}>
                  {part.trim()}
                  {index < block.c_2!.split('|').length - 1 && <br />}
                </span>
              ))}
            </div>
          )}

          <div className="d-block relative w-full">
            <div className="container mx-auto overflow-hidden">
              <Investments investments={list} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
