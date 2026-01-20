'use client'

import { useLang } from '@/context/LangContext'
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface WhyOmanInvestmentProps {
  section: PageSection
  lang: string
}

export default function WhyOmanInvestment({ section, lang }: WhyOmanInvestmentProps) {
  const { lang: contextLang } = useLang()
  const isEn = contextLang === 'en'
  
  const block = section.block
  const list = section.list || []

  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const boxesRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Sort list items by sort field
  const sortedList = [...list].sort((a, b) => parseInt(a.sort || '0') - parseInt(b.sort || '0'))

  const [active, setActive] = useState(sortedList[0]?.id || 0)
  const activeItem = sortedList.find((item) => item.id === active)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const boxes = gsap.utils.toArray<HTMLElement>(
          boxesRef.current?.children || []
        )

        gsap.set(titleRef.current, { opacity: 0, scale: 5 })
        gsap.set(previewRef.current, {
          opacity: 0,
          scaleX: 0,
          transformOrigin: isEn ? 'left center' : 'right center',
        })
        gsap.set(boxes, { opacity: 0, x: -150 })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=300%',
              scrub: true,
              pin: true,
              anticipatePin: 1,
            },
          })
          .to(titleRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
          })
          .to(boxes, {
            opacity: 1,
            x: 0,
            stagger: 0.2,
            ease: 'power3.out',
          })
          .to(previewRef.current, {
            opacity: 1,
            scaleX: 1,
            ease: 'power2.out',
          })
      })

      return () => mm.kill()
    },
    { scope: containerRef }
  )

  // Helper function to format title with pipe separator
  const formatTitle = (title: string) => {
    return title.split('|').map((line, index) => (
      <span key={index}>
        {line.trim()}
        {index < title.split('|').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <section
      id="investment-enablers"
      ref={containerRef}
      className="relative flex flex-col justify-center overflow-hidden bg-[#06213c] pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="relative z-30 container mx-auto px-4">
        <h2
          ref={titleRef}
          className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase lg:mb-8 lg:text-6xl ${
            isEn ? 'origin-left text-left' : 'origin-right text-right'
          }`}>
          {block?.c_1 || ''}
        </h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_7fr]">
          <div className="grid grid-cols-2 gap-4" ref={boxesRef}>
            {sortedList.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="rounded-xl p-4 transition bg-[#b0ddfc] text-black">
              
                  {formatTitle(item.c_1 || '')}
              
              </button>
            ))}
          </div>

          <div ref={previewRef} className="rounded-xl bg-[#efe8dd] p-6 lg:p-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {activeItem?.i_1 && (
                <img
                  src={activeItem.i_1}
                  alt={activeItem.c_1 || ''}
                  className="w-full rounded-lg object-cover"
                />
              )}
              <div 
              
                dangerouslySetInnerHTML={{ __html: activeItem?.c_2 || '' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
