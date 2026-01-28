'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { useLang } from '@/context/LangContext'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface ExploreZonesBannerProps {
  section: PageSection
  lang: string
}

export default function ExploreZonesBanner({
  section,
  lang,
}: ExploreZonesBannerProps) {
  const { lang: contextLang } = useLang()
  const isEn = contextLang === 'en'

  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const textRefDec = useRef(null)
  const boxesRef = useRef<HTMLDivElement>(null)

  const block = section.block

  useGSAP(() => {
    if (window.innerWidth <= 1024) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      gsap.globalTimeline.clear()
      return
    }

    if (
      !containerRef.current ||
      !imgRef.current ||
      !textRef.current ||
      !textRefDec.current ||
      !boxesRef.current
    ) {
      return
    }

    gsap.set(textRef.current, { opacity: 0, y: 80 })
    gsap.set(textRefDec.current, { opacity: 0, y: 80 })
    gsap.set(boxesRef.current.children, { opacity: 0, y: 150 })

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

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 150, scale: 2 },
      { opacity: 1, y: 0, scale: 1, duration: 1 }
    )

    tl.fromTo(
      textRefDec.current,
      { opacity: 0, y: 150 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    tl.fromTo(
      boxesRef.current.children,
      { opacity: 0, y: 150 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
      }
    )
  }, [])

  if (!block) return null

  return (
    <section
      ref={containerRef}
      className="relative flex w-full flex-col justify-center overflow-hidden pt-20 pb-7 lg:min-h-screen lg:pt-0 lg:pb-0">
      <div className="absolute inset-0 z-10 bg-black/40"></div>

      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={block.i_1 || '/opportunities-hero-bg.jpg'}
          alt="Explore Zones"
          fill
          priority
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="relative z-30 container mx-auto max-w-[1200px]">
        <div className="w-full">
          {/* Text */}
          <h2
            ref={textRef}
            className={`relative z-20 mb-4 text-3xl font-light text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${contextLang === 'ar' ? 'origin-right text-right' : 'origin-left'} `}>
            {block.c_1}
          </h2>

          <div
            className="mb-5 origin-left text-lg text-white lg:text-xl xl:mb-10"
            ref={textRefDec}>
            {block.c_2}
          </div>

          {/* Boxes */}
          <div
            ref={boxesRef}
            className="grid items-start gap-2 lg:grid-cols-2 lg:gap-6">
            <Link
              href={block.t_1 || '#explore-industries'}
              className="group relative text-center">
              <div className="flex items-center justify-center rounded-xl border border-[#b6ddfa]/40 bg-[#2d86dd]/20 py-3 text-sm text-[#b6ddfa] uppercase transition-all duration-700 group-hover:border-[#b6ddfa]/70 group-hover:bg-[#0c213b] md:py-5 md:text-lg">
                {block.c_3}
                <MdKeyboardDoubleArrowRight
                  className={`ms-2.5 size-7 text-3xl ${contextLang === 'ar' ? 'rotate-180' : 'rotate-0'
                    }`}
                />
              </div>
            </Link>

            <Link
              href={block.t_2 || '#renewable-energy'}
              className="group relative text-center">
              <div className="flex items-center justify-center rounded-xl border border-[#b6ddfa]/40 bg-[#2d86dd]/20 py-3 text-sm text-[#b6ddfa] uppercase transition-all duration-700 group-hover:border-[#b6ddfa]/70 group-hover:bg-[#0c213b] md:py-5 md:text-lg">
                {block.c_4}
                <MdKeyboardDoubleArrowRight
                  className={`ms-2.5 size-7 text-3xl ${contextLang === 'ar' ? 'rotate-180' : 'rotate-0'
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
