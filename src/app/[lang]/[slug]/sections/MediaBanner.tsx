'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { API_DOMAIN } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface MediaBannerProps {
  section: {
    block?: {
      i_1?: string
      c_1?: string
      c_2?: string
    }
  }
  lang: string
}

export default function MediaBanner({ section, lang }: MediaBannerProps) {
  const isEn = lang === 'en'

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subTitleRef = useRef<HTMLDivElement | null>(null)

  const block = section.block
  const backgroundImage = block?.i_1?.startsWith('http')
    ? block.i_1
    : `${API_DOMAIN}${block?.i_1 || '/future-bg.jpg'}`
  const title = block?.c_1 || 'Stay Updated with OPAZ'
  const description = block?.c_2 || 'Explore high-impact industries, government incentives, and a thriving investment ecosystem.'

  // GSAP SCROLL ANIMATION
  useGSAP(() => {
    const mm = gsap.matchMedia()

    // ✅ Run animation ONLY on desktop
    mm.add('(min-width: 1025px)', () => {
      if (
        !containerRef.current ||
        !imgRef.current ||
        !titleRef.current ||
        !subTitleRef.current
      )
        return

      // Initial state
      gsap.set(titleRef.current, { opacity: 0, scale: 6 })
      gsap.set(subTitleRef.current, { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.to(imgRef.current, { scale: 2, ease: 'none', duration: 1 })
        .to(titleRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(subTitleRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
        })
    })

    // 🔥 Cleanup on resize / unmount
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center pt-40 pb-14 lg:min-h-screen lg:pt-0 lg:pb-0">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50"></div>

      {/* Background Image */}
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>
      {/* Content */}
      <div className="relative z-30 container mx-auto text-white">
        <div>
          {/* TITLE */}
          <h2
            ref={titleRef}
            className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px]`}>
            {title}
          </h2>
          <div
            className="mb-4 text-lg text-white lg:mb-8 lg:text-xl"
            ref={subTitleRef}>
            {description}
          </div>
        </div>
      </div>
    </section>
  )
}
