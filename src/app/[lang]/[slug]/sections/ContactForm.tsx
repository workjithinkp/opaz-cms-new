'use client'

import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PageSection } from '@/lib/api'
import { useTranslations } from '@/lib/useTranslations'

gsap.registerPlugin(ScrollTrigger)

interface ContactFormProps {
  section: PageSection
  lang: string
}

export default function ContactForm({ section, lang }: ContactFormProps) {
  const t = useTranslations()
  const block = section.block

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const formRef = useRef<HTMLHeadingElement | null>(null)

  // content - use API fields (c_1 to c_6) with fallbacks to translations
  const formContent = {
    title: block?.c_1 || t('getInTouchWithUs'),
    name: block?.c_2 || t('yourName'),
    email: block?.c_3 || t('emailAddress'),
    company: block?.c_4 || t('phoneNumber'),
    message: block?.c_5 || t('message'),
    submit: block?.c_6 || t('submitYourRequest'),
  }

  // GSAP SCROLL ANIMATION
  useGSAP(() => {
    const mm = gsap.matchMedia()

    // ✅ DESKTOP ONLY
    mm.add('(min-width: 1025px)', () => {
      if (!containerRef.current || !titleRef.current || !formRef.current) return

      gsap.set(titleRef.current, { opacity: 0, x: -200 })
      gsap.set(formRef.current, { opacity: 0, x: 200 })

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

      tl.to(titleRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out',
      }).to(formRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out',
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center bg-[#06213c] pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="relative container mx-auto text-white">
        <div className="mx-auto max-w-[1000px]">
          <h2
            ref={titleRef}
            className="mb-12 text-3xl font-normal text-[#d8e8f4] uppercase text-shadow-2xs lg:text-4xl xl:text-6xl 2xl:text-6xl">
            {formContent.title}
          </h2>
          <div className="mx-auto max-w-6xl">
            <div ref={formRef}>
              <div className="grid gap-2.5 pb-3.5 lg:grid-cols-3">
                <Input
                  placeholder={formContent.name}
                  className="h-[52px] w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
                />
                <Input
                  placeholder={formContent.email}
                  className="h-[52px] w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
                />
                <Input
                  placeholder={formContent.company}
                  className="h-[52px] w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
                />
              </div>

              <div className="pb-11">
                <Textarea
                  placeholder={formContent.message}
                  className="w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
                />
              </div>

              <div className="pb-11">
                <Button className="cursor-pointer bg-[#e7cab2] px-7 py-8 text-xl font-bold text-white transition duration-300 hover:bg-[#d8e8f4] hover:text-[#06213c]">
                  {formContent.submit}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
