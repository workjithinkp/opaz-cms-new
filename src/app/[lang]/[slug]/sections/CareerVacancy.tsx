'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface CareerVacancyProps {
  section: PageSection
  lang: string
}

export default function CareerVacancy({ section, lang }: CareerVacancyProps) {
  const block = section.block
  const title = block?.c_1 || ''
  const subtitle = block?.c_2 || ''
  const isEn = lang === 'en'

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const infoRef = useRef<HTMLHeadingElement | null>(null)

  useGSAP(() => {
    if (!containerRef.current || !titleRef.current || !infoRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      gsap.set(titleRef.current, { opacity: 0, x: -200 })
      gsap.set(infoRef.current, { opacity: 0, x: 200 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: true,
            pin: true,
          },
        })
        .to(titleRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(infoRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
    })

    mm.add('(max-width: 1023px)', () => {
      gsap.set([titleRef.current, infoRef.current], {
        clearProps: 'all',
        opacity: 1,
        x: 0,
      })
    })

    return () => mm.kill()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[#06213c] pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="relative container mx-auto pt-14 pb-2 text-center text-white lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-[1000px]">
          <h2
            ref={titleRef}
            className="mb-4 text-3xl font-normal text-[#d8e8f4] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px]">
            {title}
          </h2>
          <div ref={infoRef} className="">
            <h3 className="mb-4 text-center text-[#d8e8f4] uppercase lg:mb-8 lg:text-4xl">
              {subtitle}
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
