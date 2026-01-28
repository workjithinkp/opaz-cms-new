'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface CareerBannerProps {
  section: PageSection
  lang: string
}

export default function CareerBanner({ section, lang }: CareerBannerProps) {
  const block = section.block
  const title = block?.c_1 || ''

  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)

  useGSAP(() => {
    if (!containerRef.current || !imgRef.current || !textRef.current) return

    const mm = gsap.matchMedia()

    // 🖥 Desktop animation
    mm.add('(min-width: 1024px)', () => {
      gsap.set(textRef.current, { opacity: 0, y: 80 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        })
        .fromTo(
          imgRef.current,
          { scale: 1 },
          { scale: 2, ease: 'none', duration: 1 }
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 150, scale: 2 },
          { opacity: 1, y: 0, scale: 1, duration: 1 }
        )
    })

    // 📱 Mobile fallback (no pin, no animation)
    mm.add('(max-width: 1023px)', () => {
      gsap.set([imgRef.current, textRef.current], {
        clearProps: 'all',
        opacity: 1,
        scale: 1,
        y: 0,
      })
    })

    // ✅ SINGLE cleanup
    return () => mm.kill()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex w-full flex-col justify-center overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={block?.i_1 || "/career-hero.jpg"}
          alt="Zoom"
          fill
          priority
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-30 container mx-auto flex h-full max-w-[1200px] items-center py-7">
        <div className="w-full">
          {/* Text */}
          <h2
            ref={textRef}
            className={`relative z-20 mb-4 text-3xl font-light text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px]`}>
            {title}
          </h2>
        </div>
      </div>
    </section>
  )
}
