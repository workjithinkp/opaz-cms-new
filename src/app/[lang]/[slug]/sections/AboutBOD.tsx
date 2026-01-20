'use client'

import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PageSection } from '@/lib/api'
import BodCarousel from './components/BodCarousel'
import LeadershipCarousel from './components/LeadershipCarousel'

gsap.registerPlugin(ScrollTrigger)

interface AboutBODProps {
  section: PageSection
  lang: string
}

export default function AboutBOD({ section, lang }: AboutBODProps) {
  const isEn = lang === 'en'
  const block = section.block
  const members = section.list || []

  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const titleTwoRef = useRef(null)
  const buttonGroupRef = useRef(null)
  const descriptionRef = useRef(null)

  const bodRef = useRef(null)
  const leaderRef = useRef(null)

  const [activeTab, setActiveTab] = useState<'bod' | 'leadership'>('bod')

  // Separate members by type (using t_1 field now)
  const leadershipMembers = members
    .filter((m) => m.t_1 === 'Leadership Team')
    .sort((a, b) => (parseInt(a.sort || '0') || 0) - (parseInt(b.sort || '0') || 0))
    .map((m) => ({ ...m, i_1: m.i_1 ?? undefined }))

  const bodMembers = members
    .filter((m) => m.t_1 === 'Board of Directors')
    .sort((a, b) => (parseInt(a.sort || '0') || 0) - (parseInt(b.sort || '0') || 0))
    .map((m) => ({ ...m, i_1: m.i_1 ?? undefined }))

  // Get chairman/president from BOD members (usually first one with c_4 field)
  const chairman = bodMembers.find((m) => m.c_4) || bodMembers[0]

  const handleTabChange = (tab: 'bod' | 'leadership') => {
    setActiveTab(tab)

    if (tab === 'bod') {
      gsap.to(leaderRef.current, { autoAlpha: 0, scale: 0.95, duration: 0.5 })
      gsap.fromTo(
        bodRef.current,
        { autoAlpha: 0, scale: 0.95 },
        { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      )
    } else {
      gsap.to(bodRef.current, { autoAlpha: 0, scale: 0.95, duration: 0.5 })
      gsap.fromTo(
        leaderRef.current,
        { autoAlpha: 0, scale: 0.95 },
        { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      )
    }
  }

  useGSAP(() => {
    if (
      !containerRef.current ||
      !imgRef.current ||
      !titleTwoRef.current ||
      !descriptionRef.current ||
      !buttonGroupRef.current ||
      !bodRef.current ||
      !leaderRef.current
    )
      return

    const mm = gsap.matchMedia()

    // ✅ DESKTOP ONLY
    mm.add('(min-width: 1024px)', () => {
      gsap.set(titleTwoRef.current, {
        opacity: 0,
        scale: 6,
      })

      gsap.set(buttonGroupRef.current, { opacity: 0, y: 50 })
      gsap.set(descriptionRef.current, { opacity: 0, y: 50 })

      gsap.set(bodRef.current, { opacity: 0, y: 60 })
      gsap.set(leaderRef.current, { opacity: 0, y: 60 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current!,
          start: 'top top',
          end: '+=400%',
          scrub: true,
          pin: true,
        },
      })

      tl.to(imgRef.current!, {
        scale: 2,
        duration: 1,
        ease: 'none',
      })
        .to(titleTwoRef.current!, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
        .to(descriptionRef.current!, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        })
        .to(buttonGroupRef.current!, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        })
        .to(bodRef.current!, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(leaderRef.current!, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        })

      return () => {
        tl.kill()
      }
    })

    // ❌ MOBILE / TABLET — NO GSAP
    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [
          titleTwoRef.current,
          buttonGroupRef.current,
          descriptionRef.current,
          bodRef.current,
          leaderRef.current,
          imgRef.current,
        ],
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clearProps: 'all',
        }
      )
    })

    return () => mm.kill()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 z-20 bg-[#065cb2]/50" />

      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={block?.i_1 || '/possibilities-bg.jpg'}
          alt="Board of Directors Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative z-30 container mx-auto flex flex-col justify-center">
        <h2
          ref={titleTwoRef}
          className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase lg:mb-8 lg:text-6xl 2xl:text-[80px] ${isEn ? 'origin-left text-left' : 'origin-right text-right'} `}>
          {block?.c_1}
        </h2>

        <div
          ref={descriptionRef}
          className={`mb-10 max-w-5xl text-lg text-sm text-white lg:text-base lg:text-xl ${isEn ? 'text-left' : 'text-right'} `}>
          {block?.c_2}
        </div>

        <div
          ref={buttonGroupRef}
          className="mb-10 flex flex-col gap-3 lg:flex-row">
          <Button
            onClick={() => handleTabChange('bod')}
            className={`min-w-60 rounded-sm border border-blue-300 px-6 py-6 transition ${
              activeTab === 'bod'
                ? 'bg-[#0c213b] text-[#b0ddfc]'
                : 'bg-blue-300/30 text-[#b0ddfc] hover:bg-blue-300/40'
            }`}>
            {bodMembers[0]?.t_1 || block?.c_3}
          </Button>

          <Button
            onClick={() => handleTabChange('leadership')}
            className={`min-w-60 rounded-sm border border-blue-300 px-6 py-6 transition ${
              activeTab === 'leadership'
                ? 'bg-[#0c213b] text-[#b0ddfc]'
                : 'bg-blue-300/30 text-[#b0ddfc] hover:bg-blue-300/40'
            }`}>
            {leadershipMembers[0]?.t_1 || block?.c_4}
          </Button>
        </div>
      </div>

      <div className="pl-half-container relative z-30 ms-5">
        <div
          ref={bodRef}
          style={{ display: activeTab === 'bod' ? 'block' : 'none' }}>
          {chairman && (
            <div className="mb-4 max-w-[325px]">
              <div className="flex flex-col text-center">
                <div className="flex justify-center overflow-hidden rounded-xl border border-[#afddfc] bg-[#6fabe6]/50">
                  <Image
                    src={chairman.i_1 || ''}
                    alt={chairman.c_2 || ''}
                    width={350}
                    height={350}
                    priority
                  />
                </div>

                <div className="relative min-h-[225px] -translate-y-4 rounded-xl bg-[#06213c] p-6 text-white">
                  <h3 className="text-lg font-semibold text-[#b8ddfa]">
                    {chairman.c_2}
                  </h3>
                  <p className="mt-2">
                    {chairman.c_3}
                  </p>
                  {chairman.c_4 && (
                    <p className="mt-3 text-lg font-semibold">
                      {chairman.c_4}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <BodCarousel members={bodMembers.filter((m) => m.id !== chairman?.id)} lang={lang} />
        </div>

        <div
          ref={leaderRef}
          style={{
            display: activeTab === 'leadership' ? 'block' : 'none',
          }}>
          {leadershipMembers.length > 0 && leadershipMembers[0] && (
            <div className="mb-4 max-w-[325px]">
              <div className="flex flex-col text-center">
                <div className="flex justify-center overflow-hidden rounded-xl border border-[#afddfc] bg-[#6fabe6]/50">
                  <Image
                    src={leadershipMembers[0].i_1 || ''}
                    alt={leadershipMembers[0].c_2 || ''}
                    width={350}
                    height={350}
                    priority
                  />
                </div>

                <div className="relative min-h-[225px] -translate-y-4 rounded-xl bg-[#06213c] p-6 text-white">
                  <h3 className="text-lg font-semibold text-[#b8ddfa]">
                    {leadershipMembers[0].c_2}
                  </h3>
                  <p className="mt-2">
                    {leadershipMembers[0].c_3}
                  </p>
                </div>
              </div>
            </div>
          )}
          <LeadershipCarousel members={leadershipMembers.slice(1)} lang={lang} />
        </div>
      </div>
    </section>
  )
}
