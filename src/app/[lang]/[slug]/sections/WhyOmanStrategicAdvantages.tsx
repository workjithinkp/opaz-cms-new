'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { IoIosArrowForward } from 'react-icons/io'
import { PageSection } from '@/lib/api'
import { replaceLineBreaks } from '@/lib/utils'
import LocationMap from './components/LocationMap'
import translations from '@/data/translations.json'

gsap.registerPlugin(ScrollTrigger)

interface WhyOmanStrategicAdvantagesProps {
  section: PageSection
  lang: string
}

export default function WhyOmanStrategicAdvantages({
  section,
  lang,
}: WhyOmanStrategicAdvantagesProps) {
  const block = section.block
  const list = section.list || []

  // Filter and sort map items (sort: 1, 2, 3, 4)
  const mapItems = list
    .filter((item) => item.sort && parseInt(item.sort) >= 1 && parseInt(item.sort) <= 4)
    .sort((a, b) => (parseInt(a.sort || '0') || 0) - (parseInt(b.sort || '0') || 0))

  // Get translations for current language
  const t = translations[lang as keyof typeof translations] || translations.en

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const locateLeftRef = useRef<HTMLHeadingElement | null>(null)
  const locateRightRef = useRef<HTMLHeadingElement | null>(null)
  const leftboxRef = useRef<HTMLHeadingElement | null>(null)
  const rightboxRef = useRef<HTMLHeadingElement | null>(null)
  const locationRef = useRef<HTMLHeadingElement | null>(null)

  useGSAP(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !locateLeftRef.current ||
      !locateRightRef.current ||
      !leftboxRef.current ||
      !rightboxRef.current ||
      !locationRef.current
    ) {
      return
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      gsap.set(titleRef.current, { opacity: 0, scale: 6 })
      gsap.set(locateLeftRef.current, { opacity: 0, x: -200 })
      gsap.set(locateRightRef.current, { opacity: 0, x: 200 })
      gsap.set(leftboxRef.current, { opacity: 0, x: -200 })
      gsap.set(rightboxRef.current, { opacity: 0, x: 200 })
      gsap.set(locationRef.current, { opacity: 0, x: 200 })

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
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
        .to(leftboxRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(rightboxRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(locationRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(locateLeftRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(locateRightRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
    })

    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [
          titleRef.current,
          leftboxRef.current,
          rightboxRef.current,
          locationRef.current,
          locateLeftRef.current,
          locateRightRef.current,
        ],
        {
          clearProps: 'all',
          opacity: 1,
          scale: 1,
          x: 0,
        }
      )
    })

    return () => mm.kill()
  }, [])

  return (
    <section
      id="StrategicAdvantages"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#6e7c87] pt-14 lg:pt-36 lg:pb-24">
      <div className="relative container mx-auto text-white">
        <div className="mx-auto">
          <h2
            ref={titleRef}
            className={`relative z-20 mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${lang === 'ar' ? 'origin-right text-center' : 'origin-center'} `}>
            {block?.c_1}
          </h2>

          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div
              ref={leftboxRef}
              className="flex flex-col items-start justify-start space-y-3.5 rounded-2xl border border-[#afddfc] bg-[#6fabe6]/58 p-7">
              <h4 className="text-2xl font-normal uppercase">{block?.c_4}</h4>
              <div
                className="line-clamp-2 text-sm font-normal"
                dangerouslySetInnerHTML={{ __html: replaceLineBreaks(block?.c_5) }}
              />
              {block?.t_2 && (
                <Link
                  href={block.t_2}
                  target="_blank"
                  className="justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 has-[>svg]:px-3 group flex w-fit min-w-60 cursor-pointer items-center gap-2 rounded-sm border border-blue-300 bg-blue-300/10 px-4 py-6 text-base font-medium text-[#b0ddfc] uppercase transition hover:bg-[#06213c]">
                  {block?.c_8 || t.learnMore}
                  <IoIosArrowForward
                    className={`arrow-animate-left size-5 ${
                      lang === 'ar' ? 'rotate-180' : ''
                    }`}
                  />
                </Link>
              )}
            </div>
            <div
              ref={rightboxRef}
              className="flex flex-col items-start justify-start space-y-3.5 rounded-2xl border border-[#afddfc] bg-[#6fabe6]/58 p-7">
              <h4 className="text-2xl font-normal uppercase">{block?.c_6}</h4>
              <div
                className="line-clamp-2 text-sm font-normal"
                dangerouslySetInnerHTML={{ __html: replaceLineBreaks(block?.c_7) }}
              />
              {block?.t_3 && (
                <Link
                  href={block.t_3}
                  target="_blank"
                  className="justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 has-[>svg]:px-3 group flex w-fit min-w-60 cursor-pointer items-center gap-2 rounded-sm border border-blue-300 bg-blue-300/10 px-4 py-6 text-base font-medium text-[#b0ddfc] uppercase transition hover:bg-[#06213c]">
                  {block?.c_9 || t.learnMore}
                  <IoIosArrowForward
                    className={`arrow-animate-left size-5 ${
                      lang === 'ar' ? 'rotate-180' : ''
                    }`}
                  />
                </Link>
              )}
            </div>
          </div>

          <div
            ref={locationRef}
            className="relative mb-9 rounded-2xl border border-[#afddfc] bg-[#6fabe6]/58 p-2 lg:p-7">
            <div
              ref={locateLeftRef}
              className="relative z-20 grid grid-cols-1 items-center gap-2 rounded-2xl lg:grid-cols-2">
              <div className="flex flex-col space-y-4 p-6">
                <h4 className="text-2xl font-normal uppercase">
                  {block?.c_2}
                </h4>
                <div
                  className="line-clamp-2 flex flex-col space-y-3.5 text-sm font-normal"
                  dangerouslySetInnerHTML={{ __html: replaceLineBreaks(block?.c_3) }}
                />
                <Link
                  href={block?.t_1 || '#'}
                  target="_blank"
                  className="group flex w-fit min-w-50 items-center gap-2 rounded-sm border border-blue-300 bg-blue-300/10 px-4 py-4 text-base font-medium text-[#b0ddfc] uppercase transition hover:bg-[#06213c]">
                  {block?.c_10 || t.exploreMore}
                  <IoIosArrowForward
                    className={`arrow-animate-left size-5 ${
                      lang === 'ar' ? 'rotate-180' : ''
                    }`}
                  />
                </Link>
              </div>
              <div className="overflow-hidden p-6">
                <LocationMap mapItems={mapItems} pointerLeft="70%" pointerTop="45%" />
              </div>
            </div>
            <div
              ref={locateRightRef}
              className="absolute inset-0 z-10 rounded-2xl bg-[#6fabe6]/58"></div>
            <Image
              src="/investor-stories.jpg"
              alt="Zoom"
              fill
              priority
              className="absolute inset-0 rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
