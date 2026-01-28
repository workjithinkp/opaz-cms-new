'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PageSection, API_DOMAIN } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineDateRange } from 'react-icons/md'
import { useTranslations } from '@/lib/useTranslations'

gsap.registerPlugin(ScrollTrigger)

interface MediaAnnualReportProps {
  section: PageSection
  lang: string
}

export default function MediaAnnualReport({ section, lang }: MediaAnnualReportProps) {
  const isEn = lang === 'en'
  const { block, list } = section
  const t = useTranslations()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const archiveitemsRef = useRef<HTMLDivElement | null>(null)

  // GSAP SCROLL ANIMATION
  useGSAP(() => {
    const mm = gsap.matchMedia()

    // ✅ DESKTOP ONLY
    mm.add('(min-width: 1025px)', () => {
      if (
        !containerRef.current ||
        !archiveitemsRef.current ||
        !titleRef.current ||
        !imgRef.current
      )
        return

      const title = titleRef.current

      // Initial states
      gsap.set(title, { opacity: 0, scale: 6 })
      gsap.set(archiveitemsRef.current.children, { opacity: 0, y: 50 })

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

      tl.to(imgRef.current, { scale: 2, ease: 'none', duration: 1 })
        // TITLE
        .to(title, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })

        // ARCHIVE ITEMS
        .to(
          archiveitemsRef.current.children,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.25,
          },
          '-=0.3'
        )
    })

    // 🔥 Cleanup on unmount / resize
    return () => mm.revert()
  }, [])

  if (!list || list.length === 0) return null

  // Reverse the list to show latest first
  const reversedList = [...list].reverse()

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center bg-[#06213c] py-14 text-white lg:min-h-screen lg:pt-36 lg:pb-24">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-[#06213c]/80"></div>

      {/* Background Image */}
      <div ref={imgRef} className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/future-bg.jpg"
          alt="Zoom"
          fill
          priority
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="relative z-30 container mx-auto pb-4 lg:pb-7 xl:pb-14 2xl:pb-30">
        {/* TITLE */}
        <h2
          ref={titleRef}
          className={`text-3x mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${isEn ? 'origin-left text-left' : 'origin-right text-right'}`}>
          {block?.c_1 || (isEn ? 'Annual Reports' : 'التقارير السنوية')}
        </h2>

        <div
          ref={archiveitemsRef}
          className="grid grid-cols-1 gap-5 pb-6 md:grid-cols-2 lg:grid-cols-3 lg:pb-12">
          {reversedList.map((report) => {
            const pdfUrl = report.f_1 && report.f_1.startsWith('http')
              ? report.f_1
              : report.f_1
                ? `${API_DOMAIN}${report.f_1}`
                : null

            const reportDate = report.date_1 || ''

            if (!pdfUrl) return null

            return (
              <div
                key={report.id}
                className="group relative overflow-hidden rounded-2xl border border-[#b0ddfc] lg:h-58 2xl:h-50">
                <div className="relative inset-0 z-20 flex flex-col items-start justify-end p-8 text-white lg:absolute">
                  <div className="mb-2 w-full border-b border-blue-300/50">
                    <h3 className="text-2xl font-medium uppercase lg:line-clamp-1">
                      {report.c_1}
                    </h3>
                    <div className="date mb-3 flex items-center gap-2">
                      <MdOutlineDateRange />
                      <div>{reportDate}</div>
                    </div>
                  </div>
                  <div className="line-clamp-5 flex-1">
                    {report.c_2 || ''}
                  </div>
                  <div className="pt-4">
                    <Link
                      href={pdfUrl}
                      target="_blank"
                      className="flex items-center rounded-sm border border-blue-300 bg-blue-300/10 px-4 py-2 text-sm text-[#b0ddfc] uppercase hover:bg-[#06213c] hover:text-[#b0ddfc] lg:px-5 lg:py-3 lg:text-base">
                      <div>{t('readMore')}</div>
                    </Link>
                  </div>
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(149,59,38,0.85)] to-[rgba(149,59,38,0.6)]"></div>
                <Image
                  src="/lt-news-bg.jpg"
                  alt={report.c_1 || 'Report'}
                  fill
                  loading="lazy"
                  className="object-cover transition-all duration-500 group-hover:scale-125 group-hover:opacity-65"
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
