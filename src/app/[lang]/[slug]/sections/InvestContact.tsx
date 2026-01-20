'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/context/LangContext'
import { useTranslations } from '@/lib/useTranslations'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MdMailOutline } from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface InvestContactProps {
  section: PageSection
  lang: string
}

export default function InvestContact({
  section,
  lang,
}: InvestContactProps) {
  const { lang: contextLang } = useLang()
  const t = useTranslations()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subTitleRef = useRef<HTMLHeadingElement | null>(null)
  const formRef = useRef<HTMLDivElement | null>(null)
  const titleTwoRef = useRef<HTMLHeadingElement | null>(null)
  const contactInfoRef = useRef<HTMLDivElement | null>(null)

  const block = section.block

  useGSAP(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !subTitleRef.current ||
      !formRef.current ||
      !titleTwoRef.current ||
      !contactInfoRef.current
    )
      return

    const mm = gsap.matchMedia()

    /* =========================
     🖥 DESKTOP ONLY
     ========================= */
    mm.add('(min-width: 1024px)', () => {
      // Initial positions
      gsap.set(titleRef.current, { opacity: 0, x: -200 })
      gsap.set(subTitleRef.current, { opacity: 0, x: 220 })
      gsap.set(formRef.current, { opacity: 0, x: -200 })
      gsap.set(titleTwoRef.current, { opacity: 0, x: 220 })
      gsap.set(contactInfoRef.current, { opacity: 0, x: -200 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: true,
          pin: true,
        },
      })

      tl.to(titleRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out',
      })
        .to(subTitleRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(formRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(titleTwoRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
        .to(contactInfoRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
        })

      return () => {
        tl.kill()
      }
    })

    /* =========================
     📱 MOBILE / TABLET
     ========================= */
    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [
          titleRef.current,
          subTitleRef.current,
          formRef.current,
          titleTwoRef.current,
          contactInfoRef.current,
        ],
        {
          clearProps: 'all',
          opacity: 1,
          x: 0,
          y: 0,
        }
      )
    })

    return () => mm.kill()
  }, [])

  if (!block) return null

  // Extract contact info from block fields
  const email = block.t_1 || ''
  const localPhone = block.t_2 || ''
  const internationalPhone = block.t_3 || ''

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#06213c]">
      <div className="relative container mx-auto max-w-6xl text-white">
        <h2
          ref={titleRef}
          className="mb-4 text-3xl font-normal uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px]">
          {block.c_1}
        </h2>
        <div
          ref={subTitleRef}
          className="mb-4 text-lg text-white lg:mb-8 lg:text-xl">
          {block.c_2}
        </div>
        <div className="mx-auto max-w-6xl">
          <div ref={formRef}>
            <div className="grid gap-2.5 pb-2.5 lg:grid-cols-3 lg:pb-3.5">
              <Input
                placeholder={t('name')}
                className="h-[52px] w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
              />
              <Input
                placeholder={t('email')}
                className="h-[52px] w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
              />
              <Input
                placeholder={t('company')}
                className="h-[52px] w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
              />
            </div>
            <div className="pb-2.5 lg:pb-11">
              <Textarea
                placeholder={t('message')}
                className="w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
              />
            </div>
            <div className="pb-11">
              <Button className="bg-[#e7cab2] px-7 py-8 text-xl font-bold text-white">
                {t('submit')}
              </Button>
            </div>
          </div>
          <h2
            ref={titleTwoRef}
            className={`pb-9 text-2xl font-bold text-[#daf0fe] uppercase lg:text-4xl`}>
            {t('directInformation')}
          </h2>
          <div
            ref={contactInfoRef}
            className={`grid gap-4 text-2xl font-medium text-[#e7cab2] lg:grid-cols-3`}>
            {email && (
              <div className="flex">
                <div className="mt-1 size-11">
                  <MdMailOutline className="text-2xl" />
                </div>
                <div className="flex-1">
                  {t('directInformation')}
                  <div className="text-white">{email}</div>
                </div>
              </div>
            )}

            {localPhone && (
              <div className="flex">
                <div className="mt-1 size-11">
                  <FiPhone className="text-2xl" />
                </div>
                <div className="flex-1">
                  {t('localCall')}
                  <div className="text-white">{localPhone}</div>
                </div>
              </div>
            )}

            {internationalPhone && (
              <div className="flex">
                <div className="mt-1 size-11">
                  <FiPhone className="text-2xl" />
                </div>
                <div className="flex-1">
                  {t('internationalCall')}
                  <div className="text-white">{internationalPhone}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
