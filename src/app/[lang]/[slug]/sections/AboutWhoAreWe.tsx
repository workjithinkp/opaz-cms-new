'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { PageSection } from '@/lib/api'
import { replaceLineBreaks } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type CounterFormat = 'decimal' | 'normal' | 'k'

const animateCounter = (
  el: HTMLElement,
  end: number,
  format: CounterFormat
) => {
  const obj = { v: 0 }

  gsap.to(obj, {
    v: end,
    duration: 2,
    ease: 'power1.out',
    onUpdate: () => {
      if (format === 'decimal') el.innerHTML = obj.v.toFixed(1)
      else if (format === 'k')
        el.innerHTML = `<span>${Math.floor(obj.v)}</span><span>K</span>`
      else el.innerHTML = Math.floor(obj.v).toString()
    },
  })
}

const parseValue = (t: string): { v: number; f: CounterFormat } => {
  const hasK = t.toUpperCase().includes('K')
  const numeric = parseFloat(t.replace(/[^0-9.]/g, ''))
  return hasK ? { v: numeric, f: 'k' } : { v: numeric, f: 'normal' }
}

interface AboutWhoAreWeProps {
  section: PageSection
  lang: string
}

export default function AboutWhoAreWe({ section, lang }: AboutWhoAreWeProps) {
  const isEn = lang === 'en'
  const block = section.block

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const descriptionRef = useRef<HTMLDivElement | null>(null)
  const boxesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (window.innerWidth >= 1024) return // desktop handled by GSAP

    if (!boxesRef.current) return

    const boxes = Array.from(boxesRef.current.children)

    boxes.forEach((box) => {
      const counter = box.querySelector('.counter') as HTMLElement | null
      if (!counter) return

      const parsed = parseValue(counter.dataset.target || '0')
      counter.innerHTML = parsed.f === 'k' ? '0<span>K</span>' : '0'
      animateCounter(counter, parsed.v, parsed.f)
    })
  }, [])

  useGSAP(() => {
    if (
      !containerRef.current ||
      !boxesRef.current ||
      !titleRef.current ||
      !descriptionRef.current ||
      !imgRef.current
    )
      return

    const mm = gsap.matchMedia()

    // ✅ Desktop only
    mm.add('(min-width: 1024px)', () => {
      const boxes = Array.from(boxesRef.current!.children)

      gsap.set(titleRef.current, { opacity: 0, x: 200 })
      gsap.set(descriptionRef.current, { opacity: 0, x: -220 })
      gsap.set(boxes, { opacity: 0, x: 250 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current!,
          start: 'top top',
          end: '+=300%',
          scrub: true,
          pin: true,
        },
      })

      tl.to(imgRef.current!, { scale: 2, duration: 1 })
        .to({}, { duration: 0.5 })
        .to([titleRef.current!, descriptionRef.current!, ...boxes], {
          opacity: 1,
          x: 0,
          duration: 1,
          onStart: () => {
            boxes.forEach((box) => {
              const counter = box.querySelector(
                '.counter'
              ) as HTMLElement | null
              if (!counter) return

              const parsed = parseValue(counter.dataset.target || '0')
              counter.innerHTML = parsed.f === 'k' ? '0<span>K</span>' : '0'
              animateCounter(counter, parsed.v, parsed.f)
            })
          },
        })

      return () => {
        tl.kill()
      }
    })

    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [
          titleRef.current,
          descriptionRef.current,
          ...(boxesRef.current?.children
            ? Array.from(boxesRef.current.children)
            : []),
        ],
        {
          opacity: 1,
          x: 0,
          clearProps: 'all',
        }
      )
    })

    return () => mm.kill()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 z-10 bg-black/50" />

      <div ref={imgRef} className="absolute inset-0">
        <Image
          src={block?.i_1 || '/placeholder.jpg'}
          alt="Background"
          fill
          priority
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="relative z-30 container mx-auto">
        <h2
          ref={titleRef}
          className="mb-4 text-3xl font-light text-[#b0ddfc] lg:mb-8 lg:text-6xl 2xl:text-[80px]">
          {block?.c_1}
        </h2>

        <div
          ref={descriptionRef}
          className="mb-4 text-lg text-white lg:mb-8 lg:text-xl"
          dangerouslySetInnerHTML={{ __html: replaceLineBreaks(block?.c_2) }}
        />

        <div
          ref={boxesRef}
          className="grid h-auto items-start gap-4 lg:h-64 lg:grid-cols-3 lg:gap-8">
          {/* Box 1 */}
          <div className="lg:group rounded-2xl border border-blue-300 bg-blue-300/70 py-3 text-center text-white transition-all hover:backdrop-blur-sm lg:py-5 2xl:py-8">
            <div
              className="counter pb-3 text-3xl font-normal transition-all duration-700 group-hover:scale-105 lg:text-4xl xl:pb-5 xl:text-4xl 2xl:text-5xl"
              data-target={block?.c_5}>
              0
            </div>
            <div className="text-lg uppercase transition-all duration-700 group-hover:scale-105 group-hover:pb-5 xl:text-xl 2xl:text-2xl">
              {block?.c_3}
            </div>
            <div className="mx-auto h-auto overflow-hidden px-4 text-sm transition-all duration-1000 group-hover:h-20 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 lg:h-0 lg:w-3/4 lg:-translate-y-11 lg:scale-50 lg:px-0 lg:text-base lg:opacity-0">
              {block?.c_4}
            </div>
          </div>

          {/* Box 2 */}
          <div className="lg:group rounded-2xl border border-blue-300 bg-blue-300/70 py-3 text-center text-white transition-all hover:backdrop-blur-sm lg:py-5 2xl:py-8">
            <div
              className="counter pb-3 text-3xl font-normal transition-all duration-700 group-hover:scale-105 lg:text-4xl xl:pb-5 xl:text-4xl 2xl:text-5xl"
              data-target={block?.c_8}>
              0
            </div>
            <div className="text-lg uppercase transition-all duration-700 group-hover:scale-105 group-hover:pb-5 xl:text-xl 2xl:text-2xl">
              {block?.c_6}
            </div>
            <div className="mx-auto h-auto overflow-hidden px-4 text-sm transition-all duration-1000 group-hover:h-20 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 lg:h-0 lg:w-3/4 lg:-translate-y-11 lg:scale-50 lg:px-0 lg:text-base lg:opacity-0">
              {block?.c_7}
            </div>
          </div>

          {/* Box 3 */}
          <div className="lg:group rounded-2xl border border-blue-300 bg-blue-300/70 py-3 text-center text-white transition-all hover:backdrop-blur-sm lg:py-5 2xl:py-8">
            <div
              className="counter pb-3 text-3xl font-normal transition-all duration-700 group-hover:scale-105 lg:text-4xl xl:pb-5 xl:text-4xl 2xl:text-5xl"
              data-target={block?.c_11}>
              0
            </div>
            <div className="text-lg uppercase transition-all duration-700 group-hover:scale-105 group-hover:pb-5 xl:text-xl 2xl:text-2xl">
              {block?.c_9}
            </div>
            <div className="mx-auto h-auto overflow-hidden px-4 text-sm transition-all duration-1000 group-hover:h-20 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 lg:h-0 lg:w-3/4 lg:-translate-y-11 lg:scale-50 lg:px-0 lg:text-base lg:opacity-0">
              {block?.c_10}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
