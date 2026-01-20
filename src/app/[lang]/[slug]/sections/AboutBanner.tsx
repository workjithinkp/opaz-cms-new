'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface AboutBannerProps {
  section: PageSection
  lang: string
}

export default function AboutBanner({ section, lang }: AboutBannerProps) {
  const isRTL = lang === 'ar'
  const block = section.block

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)

  // Parse title - split by pipe separator
  const titleLines = block?.c_1?.split('|') || ['', '']

  useGSAP(() => {
    if (!containerRef.current || !titleRef.current) return

    const mm = gsap.matchMedia()

    // ✅ Desktop only
    mm.add('(min-width: 1024px)', () => {
      gsap.set(titleRef.current, { opacity: 0, scale: 6 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: true,
          pin: true,
        },
      })

      tl.to(titleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      })

      return () => {
        tl.kill()
      }
    })

    mm.add('(max-width: 1023px)', () => {
      gsap.set(titleRef.current, {
        opacity: 1,
        scale: 1,
        clearProps: 'all',
      })
    })

    return () => mm.kill()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden py-40 lg:py-0">
      <div className="absolute inset-0 z-10 bg-black/50" />

      <div className="absolute inset-0 overflow-hidden">
        <video
          playsInline
          autoPlay
          loop
          muted
          poster={block?.i_1 || undefined}
          className="h-screen w-full object-cover">
          <source src={block?.f_1 || undefined} type="video/mp4" />
        </video>
      </div>

      <div className="relative z-30 container mx-auto flex h-full flex-col justify-center">
        <h2
          ref={titleRef}
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-5xl lg:text-6xl xl:text-6xl 2xl:text-8xl 2xl:text-[80px] ${isRTL ? 'origin-right text-right' : 'origin-left text-left'} `}>
          {titleLines[0]}
          <br />
          {titleLines[1]}
        </h2>
      </div>
    </section>
  )
}
