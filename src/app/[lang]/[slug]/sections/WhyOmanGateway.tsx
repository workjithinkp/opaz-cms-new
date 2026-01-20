'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface WhyOmanGatewayProps {
  section: PageSection
  lang: string
}

export default function WhyOmanGateway({
  section,
  lang,
}: WhyOmanGatewayProps) {
  const block = section.block

  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const discriptionRef = useRef(null)
  const buttonsRef = useRef(null)

  useGSAP(() => {
    if (
      !containerRef.current ||
      !imgRef.current ||
      !textRef.current ||
      !discriptionRef.current ||
      !buttonsRef.current
    ) {
      return
    }

    const mm = gsap.matchMedia()

    // 🖥 Desktop animation (pin + scroll)
    mm.add('(min-width: 1024px)', () => {
      // Initial states
      gsap.set(textRef.current, { opacity: 0, scale: 6 })
      gsap.set(discriptionRef.current, { opacity: 0, y: 200 })
      gsap.set(buttonsRef.current, { opacity: 0, y: 200 })

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
        .to(textRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
        .to(discriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(buttonsRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
    })

    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [
          imgRef.current,
          textRef.current,
          discriptionRef.current,
          buttonsRef.current,
        ],
        {
          clearProps: 'all',
          opacity: 1,
          scale: 1,
          y: 0,
        }
      )
    })

    return () => mm.kill()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden lg:min-h-screen">
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={block?.i_1 || '/placeholder.jpg'}
          alt="Zoom"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-30 container mx-auto flex h-full max-w-[1200px] items-center pt-32 pb-14 text-white lg:pb-24">
        <div className="max-w-[1100px]">
          {/* Text */}
          <h2
            ref={textRef}
            className={`relative z-20 mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${lang === 'ar' ? 'origin-right text-center' : 'origin-center'} `}>
            {block?.c_1}
          </h2>

          <div
            ref={discriptionRef}
            className="mb-4 text-lg text-white lg:mb-8 lg:text-xl">
            {block?.c_2}
          </div>

          <div
            className="buttons grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 xl:gap-10"
            ref={buttonsRef}>
            <Link href={block?.t_1 || '#'} className="group relative text-center">
              <div className="flex items-center justify-center rounded-xl border border-[#b6ddfa]/40 bg-[#2d86dd]/20 py-3 text-sm text-[#b6ddfa] uppercase transition-all duration-700 group-hover:border-[#b6ddfa]/70 group-hover:bg-[#0c213b] md:py-5 md:text-lg">
                {block?.c_3}

                <MdKeyboardDoubleArrowRight
                  className={`ms-2.5 size-7 text-3xl ${
                    lang === 'ar' ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </Link>
            <Link href={block?.t_2 || '#'} className="group relative text-center">
              <div className="flex items-center justify-center rounded-xl border border-[#b6ddfa]/40 bg-[#2d86dd]/20 py-3 text-sm text-[#b6ddfa] uppercase transition-all duration-700 group-hover:border-[#b6ddfa]/70 group-hover:bg-[#0c213b] md:py-5 md:text-lg">
                {block?.c_4}

                <MdKeyboardDoubleArrowRight
                  className={`ms-2.5 size-7 text-3xl ${
                    lang === 'ar' ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
