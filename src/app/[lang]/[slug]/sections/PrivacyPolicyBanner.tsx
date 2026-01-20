'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface PrivacyPolicyBannerProps {
  section: PageSection
  lang: string
}

export default function PrivacyPolicyBanner({ section, lang }: PrivacyPolicyBannerProps) {
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const infoRef = useRef(null)

  const block = section.block

  useGSAP(() => {
    if (
      !containerRef.current ||
      !imgRef.current ||
      !textRef.current ||
      !infoRef.current
    ) {
      return
    }

    gsap.set(textRef.current, { opacity: 0, x: -200 })
    gsap.set(infoRef.current, { opacity: 0, x: 200 })

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

    tl.fromTo(
      imgRef.current,
      { scale: 1 },
      { scale: 2, ease: 'none', duration: 1 }
    )

    tl.to(textRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: 'power2.out',
    }).to(infoRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: 'power2.out',
    })
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden pt-36 pb-24">
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src="/terms-hero.jpg"
          alt="Zoom"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-30 container mx-auto flex h-full max-w-[1200px] items-center">
        <div className="w-full">
          {/* Text */}
          <h2
            ref={textRef}
            className={`relative z-20 mb-5 text-center text-3xl font-light text-[#b0ddfc] uppercase text-shadow-2xs lg:text-6xl xl:mb-10 xl:text-7xl 2xl:mb-15 ${lang === 'ar' ? 'origin-right text-right' : 'origin-left'} `}>
            {block?.c_1}
          </h2>

          <div
            ref={infoRef}
            className="rounded-xl border border-[#85abce] bg-[#5288bc]/75 px-4 px-8 py-4 py-8 lg:px-24 lg:py-12">
            <div className="text-center text-[#d8e8f4]">
              <div 
                className="mb-8"
                dangerouslySetInnerHTML={{ __html: block?.c_2 || '' }}
              />
            </div>
            <div className="text-center text-[#d8e8f4]">
              <h4 className="text-xl font-medium">
                {block?.c_3}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
