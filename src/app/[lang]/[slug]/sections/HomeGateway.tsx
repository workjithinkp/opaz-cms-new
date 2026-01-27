'use client'

import { useDeviceType } from '@/components/hooks/useDeviceType'
import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { PageSection } from '@/lib/api'
import { useTranslations } from '@/lib/useTranslations'

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
      if (format === 'decimal') {
        el.innerHTML = obj.v.toFixed(1)
      } else if (format === 'k') {
        el.innerHTML = `${Math.floor(obj.v)}K`
      } else {
        el.innerHTML = Math.floor(obj.v).toString()
      }
    },
  })
}

const parseValue = (t: string): { v: number; f: CounterFormat } => {
  t = t.trim().toUpperCase()

  if (t.endsWith('K')) return { v: parseFloat(t), f: 'k' }
  if (t.includes('.')) return { v: parseFloat(t), f: 'decimal' }

  return { v: parseFloat(t.replace(/,/g, '')), f: 'normal' }
}

interface HomeGatewayProps {
  section: PageSection
  lang: string
}

export default function HomeGateway({ section, lang }: HomeGatewayProps) {
  const device = useDeviceType()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations()
  const stepInsideLabel = t('stepInside')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Extract counter data from block fields (c_2-c_10)
  const block = section.block as any;
  const boxesData = section.list && section.list.length > 0
    ? (section.list || []).map((item: any) => ({
        target: item.c_1 || '0',
        title: item.c_2 || '',
        description: item.c_3 || '',
      }))
    : [
        {
          target: block?.c_3 || '0',
          title: block?.c_2 || '',
          description: block?.c_4 || '',
        },
        {
          target: block?.c_6 || '0',
          title: block?.c_5 || '',
          description: block?.c_7 || '',
        },
        {
          target: block?.c_9 || '0',
          title: block?.c_8 || '',
          description: block?.c_10 || '',
        },
      ].filter(box => box.target !== '0' || box.title !== '');

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const boxesRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (device === 'mobile') return

      if (
        !containerRef.current ||
        !imgRef.current ||
        !titleRef.current ||
        !boxesRef.current ||
        !buttonRef.current
      )
        return

      gsap.set(titleRef.current, { opacity: 0, y: 80 })
      gsap.set(boxesRef.current.children, { opacity: 0, y: 150 })
      gsap.set(buttonRef.current, { opacity: 0, y: 150 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: true,
          pin: true,
        },
      })

      tl.to(imgRef.current, { scale: 2, ease: 'none', duration: 1 }).to(
        titleRef.current,
        { opacity: 1, y: 0, duration: 1 }
      )

      Array.from(boxesRef.current.children).forEach((box: Element) => {
        const counter = box.querySelector('.counter') as HTMLElement
        if (!counter) return

        const target = counter.dataset.target ?? '0'
        const parsed = parseValue(target)

        tl.to(box, {
          opacity: 1,
          y: 0,
          duration: 1,

          onStart: () => {
            counter.innerHTML = parsed.f === 'k' ? '0K' : '0'
            animateCounter(counter, parsed.v, parsed.f)
          },
        })
      })

      tl.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      })
    },
    [device]
  )

  if (device === 'mobile') {
    return (
      <section className="relative py-15 px-6">
        <div className="absolute inset-0 z-10 bg-black/15"></div>

        <div className="absolute inset-0">
          <Image
            src={block?.i_1 || ''}
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative z-30">
          <h2
            className={`mb-6 text-3xl font-light text-[#b0ddfc] ${
              lang === 'ar' ? 'text-right' : 'text-left'
            }`}>
            {(block?.c_1 || '').split('|').map((part: string, index: number) => (
              <span key={index}>
                {part.trim()}
                {index < (block?.c_1 || '').split('|').length - 1 && <br />}
              </span>
            ))}
          </h2>

          <div className="grid gap-4 pb-4">
            {boxesData.map((b, i) => (
              <div
                key={i}
                className="rounded-2xl border border-blue-300 bg-blue-300/50 py-4 text-center text-white">
                <div className="pb-2 text-3xl">{b.target}</div>
                <div className="text-lg uppercase">{b.title}</div>
                <p className="mt-2 px-4 text-sm">{b.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center text-center">
            <Link
              href="/about"
              className="flex w-fit items-center border border-blue-300 bg-blue-300/30 px-6 py-3 text-[#b0ddfc]">
              {stepInsideLabel}
              <MdOutlineArrowForwardIos
                className={`ms-2 ${lang === 'ar' ? 'scale-x-[-1]' : ''}`}
              />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 z-10 bg-black/15"></div>

      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={block?.i_1 || ''}
          alt="Zoom"
          fill
          priority
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="relative z-30 container mx-auto">
        <h2
          ref={titleRef}
          className={`not-odd: mb-4 text-3xl font-light text-[#b0ddfc] text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${
            lang === 'ar' ? 'origin-right text-right' : 'origin-left'
          }`}>
          {(block?.c_1 || '').split('|').map((part: string, index: number) => (
            <span key={index}>
              {part.trim()}
              {index < (block?.c_1 || '').split('|').length - 1 && <br />}
            </span>
          ))}
        </h2>

        <div
          ref={boxesRef}
          className="grid h-64 items-start gap-4 md:grid-cols-3 lg:gap-8">
          {boxesData.map((b, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-blue-300 bg-blue-300/50 py-3 text-center text-white transition-all hover:backdrop-blur-sm lg:py-5 2xl:py-7">
              <div
                className="counter pb-3 text-3xl font-normal transition-all duration-700 group-hover:scale-105 lg:text-4xl xl:pb-5 xl:text-4xl 2xl:text-5xl"
                data-target={b.target}>
                0
              </div>

              <div className="text-xl uppercase transition-all duration-700 group-hover:scale-105 group-hover:pb-5 lg:text-2xl xl:text-xl 2xl:text-2xl">
                {b.title}
              </div>

              <div className="mx-auto h-0 -translate-y-11 scale-50 overflow-hidden px-4 opacity-0 transition-all duration-1000 group-hover:h-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 lg:px-8">
                {b.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="inset-x-0 z-30 md:absolute md:bottom-4">
        <div
          className="container mx-auto flex justify-center md:justify-end"
          ref={buttonRef}>
          <Link
            href={block.t_1}
            className="flex items-center rounded-sm border border-blue-300 bg-blue-300/30 px-6 py-3 text-[#b0ddfc] transition hover:bg-[#0c213b]">
            {stepInsideLabel}
            <MdOutlineArrowForwardIos
              className={`ms-2 transition-transform ${
                lang === 'ar' ? 'scale-x-[-1]' : ''
              }`}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
