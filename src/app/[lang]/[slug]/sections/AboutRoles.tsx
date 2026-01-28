'use client'

import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PageSection } from '@/lib/api'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface AboutRolesProps {
  section: PageSection
  lang: string
}

export default function AboutRoles({ section, lang }: AboutRolesProps) {
  const isEn = lang === 'en'
  const block = section.block
  const items = section.list || []

  // Helper function to replace | with <br/>
  const renderTextWithBreaks = (text: string) => {
    if (!text) return text
    return text.split('|').map((part, index) => (
      <React.Fragment key={index}>
        {part.trim()}
        {index < text.split('|').length - 1 && <br />}
      </React.Fragment>
    ))
  }

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const descriptionRef = useRef<HTMLDivElement | null>(null)
  const boxesRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(items[0]?.id || 0)
  const activeItem = items.find((i) => i.id === active)

  useGSAP(() => {
    if (
      !containerRef.current ||
      !boxesRef.current ||
      !titleRef.current ||
      !descriptionRef.current ||
      !previewRef.current
    )
      return

    const mm = gsap.matchMedia()

    // ✅ DESKTOP ONLY
    mm.add('(min-width: 1024px)', () => {
      const itemElements = Array.from(boxesRef.current!.children)
      if (!itemElements.length) return

      gsap.set(titleRef.current, { opacity: 0, scale: 5 })
      gsap.set(descriptionRef.current, { opacity: 0, y: 40 })
      gsap.set(itemElements, { opacity: 0, x: -150 })
      gsap.set(previewRef.current, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: 'left',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current!,
          start: 'top top',
          end: '+=300%',
          scrub: true,
          pin: true,
        },
      })

      tl.to(titleRef.current!, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      })
        .to(descriptionRef.current!, {
          opacity: 1,
          y: 0,
          duration: 1,
        })
        .to(itemElements, {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.25,
          ease: 'power3.out',
        })
        .to(previewRef.current!, {
          opacity: 1,
          scaleX: 1,
          duration: 1.2,
        })

      return () => {
        tl.kill()
      }
    })

    // ❌ MOBILE / TABLET — NO GSAP
    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [
          titleRef.current,
          descriptionRef.current,
          ...(boxesRef.current?.children
            ? Array.from(boxesRef.current.children)
            : []),
          previewRef.current,
        ],
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          scaleX: 1,
          clearProps: 'all',
        }
      )
    })

    return () => mm.kill()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center overflow-hidden bg-[#06213c] pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="relative z-30 container mx-auto flex flex-col justify-center space-y-6">
        <h2
          ref={titleRef}
          className={`mb-4 text-3xl text-[#b0ddfc] uppercase lg:mb-8 lg:text-6xl 2xl:text-[80px] ${isEn ? 'origin-left text-left' : 'origin-right text-right'
            }`}>
          {block?.c_1}
        </h2>

        <div
          ref={descriptionRef}
          className={`mb-4 text-lg text-white lg:mb-8 lg:text-xl ${isEn ? 'text-left' : 'text-right'
            }`}>
          {block?.c_2}
        </div>

        <div className="grid-cols-[3fr_7fr] gap-4 lg:grid">
          <div className="grid grid-cols-2 gap-4 pb-4 lg:pb-0" ref={boxesRef}>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`cursor-pointer rounded-xl p-3 text-sm uppercase transition duration-300 lg:p-6 lg:text-base ${active === item.id
                    ? 'bg-[#B0DDFC]'
                    : 'bg-[#f1ebe4] hover:bg-[#BFBFBF]'
                  }`}>
                {renderTextWithBreaks(item.c_1 || '')}
              </button>
            ))}
          </div>

          <div
            ref={previewRef}
            className="flex items-center justify-center rounded-xl bg-[#f1ebe4] p-6">
            <div className={`text-[#0c213b] ${activeItem?.i_1 ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 w-full' : 'text-center'}`}>
              {/* Conditionally show image if i_1 exists */}
              {activeItem?.i_1 && (
                <div className="flex items-center justify-center">
                  <Image
                    src={activeItem.i_1}
                    width={400}
                    height={400}
                    className="h-auto w-full max-w-md rounded-lg object-cover"
                    alt={activeItem.c_1 || 'Role image'}
                    unoptimized
                  />
                </div>
              )}

              {/* Description */}
              <div className={`flex flex-col justify-center ${activeItem?.i_1
                  ? (isEn ? 'text-left' : 'text-right')
                  : 'text-center'
                }`}>
                <p className="text-base lg:text-lg">{activeItem?.c_2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
