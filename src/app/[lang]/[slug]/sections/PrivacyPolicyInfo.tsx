'use client'

import { useRef } from 'react'
import { PageSection } from '@/lib/api'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface PrivacyPolicyInfoProps {
  section: PageSection
  lang: string
}

export default function PrivacyPolicyInfo({ section, lang }: PrivacyPolicyInfoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const infoRef = useRef<HTMLDivElement | null>(null)

  const block = section.block

  // GSAP SCROLL ANIMATION
  useGSAP(() => {
    if (!containerRef.current || !titleRef.current || !infoRef.current) return

    // Initial positions
    gsap.set(titleRef.current, { opacity: 0, x: -200 })
    gsap.set(infoRef.current, { opacity: 0, x: 200 })

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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#06213c] pt-36 pb-24">
      <div className="relative container mx-auto text-center text-white">
        <div className="mx-auto max-w-[1000px]">
          <h2
            ref={titleRef}
            className="mb-12 text-3xl font-normal text-[#d8e8f4] uppercase text-shadow-2xs lg:text-4xl xl:text-6xl 2xl:text-6xl">
            {block?.c_1}
          </h2>
          <div 
            ref={infoRef} 
            className=""
            dangerouslySetInnerHTML={{ __html: block?.c_2 || '' }}
          />
        </div>
      </div>
    </section>
  )
}
