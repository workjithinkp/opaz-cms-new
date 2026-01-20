'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { PageSection } from '@/lib/api';
import { useDeviceType } from '@/components/hooks/useDeviceType';

gsap.registerPlugin(ScrollTrigger);

interface HomeEntryProps {
  section: PageSection;
  lang: string;
}

export default function HomeEntry({ section, lang }: HomeEntryProps) {
  const device = useDeviceType();
  const [mounted, setMounted] = useState(false);
  const block = section.block;
  const list = section.list || [];

  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
      !sidebarRef.current
    ) {
      return;
    }

    const bulletItems = sidebarRef.current.querySelectorAll<HTMLLIElement>('li');

    gsap.set(textRef.current, { opacity: 0, y: 80 });

    gsap.set(sidebarRef.current, {
      opacity: 0,
      x: 200,
      width: 0,
      height: '100%',
    });

    bulletItems.forEach((li) => {
      const bullet = li.querySelector('.bullet');
      const text = li.querySelector('.text');
      const line = li.querySelector('.line');

      gsap.set([bullet, text], {
        scale: 0,
        opacity: 0,
      });

      if (line) {
        gsap.set(line, {
          height: 0,
        });
      }
    });

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
    );

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 150, scale: 2 },
      { opacity: 1, y: 0, scale: 1, duration: 1 }
    );

    tl.fromTo(
      sidebarRef.current,
      { opacity: 0, x: 200, width: 0 },
      {
        opacity: 1,
        x: 0,
        width: '25vw',
        duration: 1.2,
        ease: 'power3.out',
      }
    );

    bulletItems.forEach((li) => {
      const bullet = li.querySelector('.bullet');
      const text = li.querySelector('.text');
      const line = li.querySelector('.line');

      tl.fromTo(
        [bullet, text],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '+=0.1'
      );

      if (line) {
        tl.fromTo(
          line,
          { height: 0 },
          { height: '100%', duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        );
      }
    });
  }, [mounted, device]);

  if (!block && list.length === 0) return null;

  const sidebarData = list.length > 0 
    ? list.map(item => ({ title: item.c_1 || '' }))
    : [];

  // Mobile version
  if (device === 'mobile') {
    return (
      <section className="relative w-full overflow-hidden py-15 px-6">
        <div className="absolute inset-0 z-20 bg-[#065cb2]/50"></div>
        <div className="absolute inset-0 overflow-hidden">
          {block?.i_1 && (
            <Image
              src={block.i_1}
              alt="Entry"
              fill
              priority
              className="object-cover"
            />
          )}
        </div>
        <div className="relative z-30 flex h-full items-center py-7">
          {block?.c_1 && (
            <h2 className="relative z-20 text-3xl font-light text-[#b0ddfc] lg:text-5xl xl:text-6xl 2xl:text-8xl">
              {block.c_1.split('|').map((part, index) => (
                <span key={index}>
                  {part.trim()}
                  {index < block.c_1!.split('|').length - 1 && <br />}
                </span>
              ))}
            </h2>
          )}
        </div>

        {/* Sidebar */}
        {sidebarData.length > 0 && (
          <div className="rounded-xl  bg-white/20 px-8 py-10 z-30 relative">
            <ul className="group flex flex-col text-white uppercase ">
              {sidebarData.map((item, index) => (
                <li
                  key={index}
                  className="relative flex flex-1 items-start ps-9 pb-3.5">
                  <div className="bullet absolute start-0 top-0 size-4.5 rounded-sm bg-white"></div>
                  <div className="line absolute start-2 top-0 h-full w-px bg-white"></div>
                  <div className="text">{item.title}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  }

  // Desktop version
  return (
    <section
      ref={containerRef}
      className="relative flex w-full flex-col justify-center overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 z-20 bg-[#065cb2]/50"></div>

      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        {block?.i_1 && (
          <Image
            src={block.i_1}
            alt="Entry"
            fill
            priority
            className="object-cover"
          />
        )}
      </div>

      <div className="item relative z-30 container mx-auto">
        <div className="max-w-[900px]">
          {block?.c_1 && (
            <h2
              ref={textRef}
              className="relative z-20 mb-4 text-3xl font-light text-[#b0ddfc] lg:mb-8 lg:text-6xl 2xl:text-[80px]">
              {block.c_1.split('|').map((part, index) => (
                <span key={index}>
                  {part.trim()}
                  {index < block.c_1!.split('|').length - 1 && <br />}
                </span>
              ))}
            </h2>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {sidebarData.length > 0 && (
        <div
          ref={sidebarRef}
          className="sidebar absolute inset-y-0 end-0 z-20 w-1/4 overflow-hidden bg-white/20 px-[2%] py-[10%]">
          <ul className="group flex h-full flex-col text-white uppercase">
            {sidebarData.map((item, index) => (
              <li key={index} className="relative flex flex-1 items-start ps-9">
                <div className="bullet absolute start-0 top-0 size-4.5 rounded-sm bg-white"></div>
                <div className="line absolute start-2 top-0 h-full w-px bg-white"></div>
                <div className="text">{item.title}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
