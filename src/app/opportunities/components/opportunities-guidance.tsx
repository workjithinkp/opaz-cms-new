'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/context/LangContext'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MdMailOutline } from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'
gsap.registerPlugin(ScrollTrigger)

export default function Help() {
  const { lang } = useLang()
  const isEn = lang === 'en'

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subTitlRef = useRef<HTMLHeadingElement | null>(null)
  const formRef = useRef<HTMLHeadingElement | null>(null)
  const titletwoRef = useRef<HTMLHeadingElement | null>(null)
  const contactinfoRef = useRef<HTMLHeadingElement | null>(null)

  // content
  const t = {
    title: isEn ? 'Need Guidance or Advisory?' : 'نحن هنا لمساعدتك',
    subtitle: isEn
      ? 'Our Partnerships & Development team can connect you with local suppliers, help with ICV planning, and guide your CSR involvement.'
      : 'فريق علاقات المستثمرين جاهز للإجابة على أسئلتك وإرشادك خلال رحلتك.',

    name: isEn ? 'Name' : 'الاسم',
    email: isEn ? 'Email' : 'البريد الإلكتروني',
    company: isEn ? 'Company' : 'الشركة',
    message: isEn ? 'Message' : 'اكتب رسالتك هنا.',
    submit: isEn ? 'Submit' : 'إرسال',

    directInfo: isEn ? 'Direct Contact Info' : 'معلومات الاتصال المباشر',

    relEmail: isEn
      ? 'Investor Relations Email'
      : 'البريد الإلكتروني لعلاقات المستثمرين',
    hotline: isEn ? 'Investor Support Hotline' : 'الخط الساخن لدعم المستثمرين',
    officeHours: isEn
      ? 'Office Hours & Time Zone'
      : 'ساعات العمل والمنطقة الزمنية',

    sampleEmail: isEn ? 'Example@mail.com' : 'Example@mail.com',
    samplePhone: isEn ? '+968 XXXX XXXX' : '+968 XXXX XXXX',
  }

  // GSAP SCROLL ANIMATION
  useGSAP(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !subTitlRef.current ||
      !formRef.current ||
      !titletwoRef.current ||
      !contactinfoRef.current
    )
      return

    // Initial positions
    gsap.set(titleRef.current, { opacity: 0, x: -200 }) // LEFT
    gsap.set(subTitlRef.current, { opacity: 0, x: 220 }) // RIGHT
    gsap.set(formRef.current, { opacity: 0, x: -200 }) // LEFT
    gsap.set(titletwoRef.current, { opacity: 0, x: 220 }) // RIGHT
    gsap.set(contactinfoRef.current, { opacity: 0, x: -200 }) // LEFT

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
      .to(subTitlRef.current, {
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
      .to(titletwoRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out',
      })
      .to(contactinfoRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out',
      })
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#06213c] pt-36 pb-24">
      <div className="relative container mx-auto text-white">
        <div className="mx-auto max-w-6xl">
          <h2
            ref={titleRef}
            className="mb-4 text-3xl font-normal uppercase text-shadow-2xs lg:mb-8 lg:text-5xl xl:text-6xl 2xl:text-8xl">
            {t.title}
          </h2>

          <div
            ref={subTitlRef}
            className="pb-5 text-sm font-semibold lg:pb-12 lg:text-lg">
            {t.subtitle}
          </div>
        </div>

        <div className="mx-auto max-w-6xl">
          <div ref={formRef}>
            <div className="grid grid-cols-3 gap-2.5 pb-3.5">
              <Input
                placeholder={t.name}
                className="h-[52px] w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
              />
              <Input
                placeholder={t.email}
                className="h-[52px] w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
              />
              <Input
                placeholder={t.company}
                className="h-[52px] w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
              />
            </div>

            <div className="pb-11">
              <Textarea
                placeholder={t.message}
                className="w-full border border-[#e7cab2] bg-white/5 placeholder:text-[#e7cab2]"
              />
            </div>

            <div className="pb-11">
              <Button className="bg-[#e7cab2] px-7 py-8 text-xl font-bold text-white">
                {t.submit}
              </Button>
            </div>
          </div>

          <h2
            ref={titletwoRef}
            className={`pb-9 text-4xl font-bold text-[#daf0fe] uppercase ${isEn ? 'text-start' : 'text-right'}`}>
            {t.directInfo}
          </h2>

          <div
            ref={contactinfoRef}
            className={`grid grid-cols-3 gap-4 text-2xl font-medium text-[#e7cab2] ${isEn ? 'text-start' : 'text-right'}`}>
            <div className="flex">
              <div className="mt-1 size-11">
                <MdMailOutline className="text-2xl" />
              </div>
              <div className="flex-1">
                {t.relEmail}
                <div className="text-white">{t.sampleEmail}</div>
              </div>
            </div>

            <div className="flex">
              <div className="mt-1 size-11">
                <FiPhone className="text-2xl" />
              </div>
              <div className="flex-1">
                {t.hotline}
                <div className="text-white">{t.samplePhone}</div>
              </div>
            </div>

            <div className="flex">
              <div className="mt-1 size-11">
                <FiPhone className="text-2xl" />
              </div>
              <div className="flex-1">
                {t.officeHours}
                <div className="text-white">{t.samplePhone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
