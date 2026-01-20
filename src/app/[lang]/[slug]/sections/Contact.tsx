'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { PageSection } from '@/lib/api'
import { useTranslations } from '@/lib/useTranslations'

import { FiPhone } from 'react-icons/fi'
import { MdOutlineMail } from 'react-icons/md'
import { GrLocation } from 'react-icons/gr'

gsap.registerPlugin(ScrollTrigger)

interface ContactProps {
  section: PageSection
  lang: string
}

export default function Contact({ section, lang }: ContactProps) {
  const t = useTranslations()
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const infoRef = useRef(null)

  const block = section.block

  // Labels from API (c_4 to c_10) or fallbacks from translations
  const localCallLabel = block?.c_4 || t('localCall')
  const internationalCallLabel = block?.c_5 || t('internationalCall')
  const emailLabel = block?.c_6 || t('email')
  const addressLabel = block?.c_7 || t('address')

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1025px)', () => {
      if (
        !containerRef.current ||
        !imgRef.current ||
        !textRef.current ||
        !infoRef.current
      ) {
        return
      }

      gsap.set(textRef.current, { opacity: 0, y: 80 })
      gsap.set(infoRef.current, { opacity: 0, y: 80 })

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

      tl.fromTo(
        imgRef.current,
        { scale: 1 },
        { scale: 2, ease: 'none', duration: 1 }
      )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 150, scale: 2 },
          { opacity: 1, y: 0, scale: 1, duration: 1 }
        )
        .fromTo(
          infoRef.current,
          { opacity: 0, y: 150 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
    })

    return () => mm.revert()
  }, [])

  const toArabicNumber = (num: string) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
    return num.replace(/\d/g, (d) => arabicNumbers[Number(d)])
  }

  return (
    <section
      ref={containerRef}
      className="relative flex w-full flex-col justify-center overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={block?.i_1 || "/contact-hero.jpg"}
          alt="Zoom"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-30 container mx-auto max-w-[1200px]">
        <div className="w-full">
          {/* Text */}
          <h2
            ref={textRef}
            className={`relative z-20 mb-4 text-2xl text-3xl font-light text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${lang === 'ar' ? 'origin-right text-right' : 'origin-left'} `}>
            {block?.c_1 || 'How Can We Help You?'}
          </h2>

          <div
            ref={infoRef}
            className="rounded-xl border border-[#85abce] bg-[#5288bc]/75 px-4 px-8 py-4 py-8 lg:px-24 lg:py-12">
            <div className="mb-6 lg:mb-12">
              <h3 className="text-2xl font-medium text-[#d8e8f4] uppercase lg:text-4xl">
                {block?.c_2 || 'Contact Customer Service'}
              </h3>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div>
                <div className="flex">
                  <div className="me-4 mt-2 text-lg text-[#d8e8f4] md:text-2xl lg:mt-0 lg:text-4xl">
                    <FiPhone />
                  </div>
                  <div>
                    <div className="text-lg font-medium text-[#d8e8f4] lg:text-xl">
                      {localCallLabel}
                    </div>
                    <div
                      className={`text-base font-medium text-[#d8e8f4] lg:text-2xl ${
                        lang === 'ar' ? 'text-right' : 'text-left'
                      }`}>
                      <span dir="ltr">{block?.t_1 || '1919'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <div className="me-4 mt-2 text-lg text-[#d8e8f4] md:text-2xl lg:mt-0 lg:text-4xl">
                    <FiPhone />
                  </div>
                  <div>
                    <div className="text-lg font-medium text-[#d8e8f4] lg:text-xl">
                      {internationalCallLabel}
                    </div>
                    <div
                      className={`text-base font-medium text-[#d8e8f4] lg:text-2xl ${
                        lang === 'ar' ? 'text-right' : 'text-left'
                      }`}>
                      <span dir="ltr">{block?.t_2 || '+968 800111 10'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <div className="me-4 mt-2 text-lg text-[#d8e8f4] md:text-2xl lg:mt-0 lg:text-4xl">
                    <MdOutlineMail />
                  </div>
                  <div>
                    <div className="text-lg font-medium text-[#d8e8f4] lg:text-xl">
                      {emailLabel}
                    </div>
                    <div
                      className={`text-base font-medium text-[#d8e8f4] lg:text-2xl ${
                        lang === 'ar' ? 'text-right' : 'text-left'
                      }`}>
                      <span dir="ltr">{block?.t_3 || 'call.center@opaz.gov.om'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <div className="me-4 mt-2 text-2xl text-[#d8e8f4] lg:mt-0 lg:text-4xl">
                  <GrLocation />
                </div>
                <div>
                  <div className="text-lg font-medium text-[#d8e8f4] lg:text-xl">
                    {addressLabel}
                  </div>
                  <div 
                    className="text-base font-medium text-[#d8e8f4] lg:text-2xl"
                    dangerouslySetInnerHTML={{ __html: block?.c_3 || 'P.O. Box 77, Postal Code 100, Muscat, Sultanate of Oman' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
