'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { useLang } from '@/context/LangContext'
gsap.registerPlugin(ScrollTrigger)

export default function OpportunitiesHero() {
  const { lang } = useLang()
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const textRefDec = useRef(null)
  const boxesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
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
      { opacity: 0, y: 150, x: 0, scale: 2 },
      { opacity: 1, y: 0, x: 0, duration: 1, scale: 1 }
    )
    tl.fromTo(
      textRefDec.current,
      { opacity: 0, y: 150, x: 0 },
      { opacity: 1, y: 0, x: 0, duration: 1, ease: 'power3.out' }
    )

    // 3 boxes
    const boxItems = boxesRef.current.children
    tl.fromTo(
      boxItems,
      { opacity: 0, y: 150 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        onComplete: () => {
          Array.from(boxItems).forEach((box: any) => {})
        },
      }
    )
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col justify-center overflow-hidden pt-36 pb-24">
      <div className="absolute inset-0 z-10 bg-black/40"></div>

      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src="/opportunities-hero-bg.jpg"
          alt="Zoom"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="relative z-30 container mx-auto flex h-full max-w-[1200px] items-center">
        <div className="w-full">
          {/* Text */}
          <h2
            ref={textRef}
            className={`relative z-20 mb-4 text-3xl font-light text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-5xl xl:text-6xl 2xl:text-8xl ${lang === 'ar' ? 'origin-right text-right' : 'origin-left'} `}>
            {lang === 'en' ? (
              <>Invest in Oman Where Vision Meets Opportunity</>
            ) : (
              <>استثمر في عُمان حيث تلتقي الرؤية بالفرصة</>
            )}
          </h2>

          <div
            className="mx-auto mb-4 origin-left text-lg text-white lg:mb-8 lg:text-xl xl:mb-10"
            ref={textRefDec}>
            {lang === 'en'
              ? 'Explore high-impact industries, government incentives, and a thriving investment ecosystem. '
              : 'استكشف الصناعات ذات التأثير الكبير، والحوافز الحكومية، وبيئة استثمارية مزدهرة.'}
          </div>

          {/* Boxes */}
          <div
            ref={boxesRef}
            className="grid h-54 items-start gap-2 lg:grid-cols-2 lg:gap-6">
            <div className="group relative text-center">
              <div className="flex items-center justify-center rounded-xl border border-[#b6ddfa]/40 bg-[#2d86dd]/20 py-3 text-sm text-[#b6ddfa] uppercase transition-all duration-700 group-hover:border-[#b6ddfa]/70 group-hover:bg-[#0c213b] md:py-5 md:text-lg">
                {' '}
                {lang === 'en'
                  ? 'Explore Free & Economic Zones'
                  : 'استكشف المناطق الحرة والاقتصادية'}
                <MdKeyboardDoubleArrowRight
                  className={`ms-2.5 size-7 text-3xl ${
                    lang === 'ar' ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </div>

            <div className="group relative text-center">
              <div className="flex items-center justify-center rounded-xl border border-[#b6ddfa]/40 bg-[#2d86dd]/20 py-3 text-sm text-[#b6ddfa] uppercase transition-all duration-700 group-hover:border-[#b6ddfa]/70 group-hover:bg-[#0c213b] md:py-5 md:text-lg">
                {lang === 'en'
                  ? 'Explore Key Industries'
                  : 'استكشف الصناعات الرئيسية'}{' '}
                <MdKeyboardDoubleArrowRight
                  className={`ms-2.5 size-7 text-3xl ${
                    lang === 'ar' ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
