'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import { PageSection, API_DOMAIN } from '@/lib/api'
import { IoIosArrowForward } from 'react-icons/io'

gsap.registerPlugin(ScrollTrigger)

interface MediaInvestorResourcesProps {
  section: PageSection
  lang: string
}

export default function MediaInvestorResources({ section, lang }: MediaInvestorResourcesProps) {
  const isEn = lang === 'en'
  const { block, list } = section

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLDivElement | null>(null)
  const docsRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1025px)', () => {
      if (
        !containerRef.current ||
        !imgRef.current ||
        !titleRef.current ||
        !subtitleRef.current ||
        !docsRef.current
      )
        return

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
        .from(
          titleRef.current,
          {
            opacity: 0,
            scale: 6,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.1'
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          docsRef.current.children,
          {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.25,
          },
          '-=0.3'
        )
    })

    return () => mm.revert()
  }, [])

  if (!list || list.length === 0) return null

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-[#06213c]/60"></div>

      {/* Background Image */}
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src="/team-bg.jpg"
          alt="Resources"
          fill
          priority
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto text-white px-4">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-6 text-center">
          {block?.c_1 || 'INVESTOR RESOURCES'}
        </h2>

        <p
          ref={subtitleRef}
          className="text-base md:text-lg lg:text-xl text-center max-w-3xl mx-auto mb-12 lg:mb-20">
          {block?.c_2 || 'Access key documents to help plan your investment.'}
        </p>

        <div ref={docsRef} className="space-y-6 max-w-5xl mx-auto">
          {list.map((doc) => {
            const pdfUrl = doc.f_1 && doc.f_1.startsWith('http')
              ? doc.f_1
              : doc.f_1
                ? `${API_DOMAIN}${doc.f_1}`
                : null

            if (!pdfUrl) return null

            return (
              <Link
                key={doc.id}
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 md:gap-6 bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16">
                  <Image
                    src="/icon-pdf.png"
                    alt="PDF"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-[#ffd700] transition-colors">
                    {doc.c_1}
                  </h3>
                  {doc.c_2 && (
                    <p className="text-sm md:text-base text-white/80 line-clamp-2">
                      {doc.c_2}
                    </p>
                  )}
                </div>
                <IoIosArrowForward className="flex-shrink-0 w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
