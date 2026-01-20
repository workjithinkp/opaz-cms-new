'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useLang } from '@/context/LangContext'
import { PageSection } from '@/lib/api'
import Investments from './Investments'

gsap.registerPlugin(ScrollTrigger)

interface InvestBannerProps {
  section: PageSection
  lang: string
}

export default function InvestBanner({ section, lang }: InvestBannerProps) {
  const { lang: contextLang } = useLang()
  const block = section.block

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleRef1 = useRef<HTMLHeadingElement | null>(null)
  const titleRef2 = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (
      !containerRef.current ||
      !imgRef.current ||
      !titleRef1.current ||
      !titleRef2.current ||
      !sliderRef.current
    ) {
      return
    }

    const mm = gsap.matchMedia()

    // 🖥 DESKTOP ONLY (GSAP ACTIVE)
    mm.add('(min-width: 1024px)', () => {
      // Initial states
      gsap.set(titleRef1.current, { opacity: 0, y: -80 })
      gsap.set(titleRef2.current, { opacity: 0, y: 80 })
      gsap.set(sliderRef.current, { opacity: 0, y: 80 })

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
        .to(titleRef1.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        })
        .to(titleRef2.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        })
        .to(sliderRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        })
    })

    // 📱 MOBILE / TABLET (GSAP FULLY KILLED)
    mm.add('(max-width: 1023px)', () => {
      // Kill all ScrollTriggers immediately
      ScrollTrigger.getAll().forEach((st) => st.kill())

      // Remove GSAP inline styles
      gsap.set(
        [
          imgRef.current,
          titleRef1.current,
          titleRef2.current,
          sliderRef.current,
        ],
        { clearProps: 'all' }
      )
    })

    // ✅ ONE cleanup only
    return () => mm.kill()
  }, [])

  if (!block) return null

  return (
    <section
      ref={containerRef}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 z-10 bg-black/40"></div>

      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={block.i_1 || '/future-bg.jpg'}
          alt="Invest Oman Banner"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative z-20 container mx-auto">
        <div>
          <h2
            ref={titleRef1}
            className="text-2xl font-light text-[#b0ddfc] uppercase lg:text-6xl 2xl:text-[56px]">
            {block.c_1}
          </h2>

          <div
            ref={titleRef2}
            className="mb-4 text-3xl font-light text-[#b0ddfc] uppercase lg:mb-8 lg:text-6xl 2xl:text-[80px]">
            {block.c_2}
          </div>

          <div ref={sliderRef} className="d-block relative w-full">
            <div>
              <Investments investments={block.investments || []} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
