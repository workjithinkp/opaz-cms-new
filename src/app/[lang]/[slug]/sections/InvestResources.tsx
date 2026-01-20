'use client'

import { useLang } from '@/context/LangContext'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PageSection, API_DOMAIN } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import translations from '@/data/translations.json'

gsap.registerPlugin(ScrollTrigger)

interface InvestResourcesProps {
  section: PageSection
  lang: string
  buttonMode?: 'download' | 'explore'
  buttonslug?: string
}

export default function InvestResources({
  section,
  lang,
  buttonMode = 'download',
  buttonslug,
}: InvestResourcesProps) {
  const { lang: contextLang } = useLang()
  const isEn = contextLang === 'en'
  const t = translations[contextLang as keyof typeof translations] || translations.en

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const accessRef = useRef<HTMLDivElement | null>(null)
  const docsRef = useRef<HTMLDivElement | null>(null)

  const block = section.block
  const items = section.list || []

  useGSAP(() => {
    if (
      !containerRef.current ||
      !imgRef.current ||
      !titleRef.current ||
      !accessRef.current ||
      !docsRef.current
    )
      return

    const docsEl = docsRef.current // ✅ TS now knows it's NOT null

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current!,
          start: 'top top',
          end: '+=400%',
          scrub: true,
          pin: true,
        },
      })

      tl.fromTo(
        imgRef.current!,
        { scale: 1 },
        { scale: 2, ease: 'none', duration: 1 }
      )

      tl.from(titleRef.current!, {
        opacity: 0,
        scale: 6,
        duration: 1,
        ease: 'power2.out',
      })

      tl.from(accessRef.current!, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
      })

      // ✅ FIXED
      tl.from(docsEl.children, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.25,
      })

      return () => tl.kill()
    })

    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [
          imgRef.current!,
          titleRef.current!,
          accessRef.current!,
          ...Array.from(docsRef.current!.children),
        ],
        {
          clearProps: 'all',
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        }
      )
    })

    return () => mm.kill()
  }, [])

  if (!block) return null

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-14 lg:min-h-screen lg:pt-36 lg:pb-24">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-[#06213c]/60"></div>

      {/* Background Image */}
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src="/team-bg.jpg"
          alt="Zoom"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto text-white">
        <h2
          ref={titleRef}
          className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${isEn ? 'origin-left' : 'origin-right text-right'}`}>
          {block.c_1}
        </h2>

        <div
          ref={accessRef}
          className="mb-4 text-lg text-white lg:mb-8 lg:text-xl">
          {block.c_2}
        </div>
      <div
  ref={docsRef}
  className="documents flex w-full flex-col items-center space-y-4"
>
  {items.map((item, index) =>
    buttonslug === 'media' ? (
      <div
        key={index}
        className="w-full justify-start rounded-2xl border border-[#afddfc] bg-[#6fabe6]/40 p-7 uppercase lg:flex"
      >
        <div className="flex flex-1 space-x-3.5 pb-3 lg:pb-0">
          <div className="size-8 lg:size-12">
            <Image
              src="/icon-pdf.png"
              alt="PDF Icon"
              width={69}
              height={80}
            />
          </div>

          <div className="flex-1 lg:space-y-2">
            <h3 className="text-lg font-medium uppercase lg:line-clamp-1 lg:max-w-3/4 lg:text-xl">
              {item.c_1}
            </h3>
            <div className="line-clamp-1 max-w-3/4 normal-case">
              {item.c_2}
            </div>
          </div>
        </div>

        <Link
          href={`${API_DOMAIN}${item.f_1 || ''}`}
          target="_blank"
          className="flex w-fit items-center rounded-sm border border-blue-300 bg-blue-300/30 px-4 py-2 text-[#b0ddfc] uppercase transition hover:bg-[#0c213b] lg:px-6 lg:py-3"
        >
          {buttonMode === 'explore' ? t.exploreMore : t.download}
          <IoIosArrowForward
            className={`transition-transform ${
              isEn ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </Link>
      </div>
    ) : (
      <div
              key={index}
              className="w-full justify-start rounded-2xl border border-[#afddfc] bg-[#6fabe6]/40 px-6 py-6 uppercase lg:flex">
              <div className="flex flex-1 space-x-3.5 pb-3 lg:pb-0">
                <div className="size-8 lg:size-15">
                  <Image src={'/icon-pdf.png'} alt="PDF Icon" width={69} height={80} />
                </div>

                <div className="flex-1 lg:space-y-2">
                  <h3 className="text-xl font-medium lg:line-clamp-1 lg:max-w-3/4 lg:text-2xl">
                    {item.c_1}
                  </h3>
                  <div className="normal-case lg:line-clamp-1 lg:max-w-3/4">
                    {item.c_2}
                  </div>
                </div>
              </div>
              <Link
                href={`${API_DOMAIN}${item.f_1 || ''}`}
                target="_blank"
                className="flex w-fit items-center gap-2 border px-4 py-1.5 text-sm lg:px-6 lg:py-3 lg:text-base hover:bg-white/10 transition-colors group">
                 {buttonMode === 'explore' ? t.exploreMore : t.download}
              </Link>
            </div>

    )
  )}
</div>

      </div>
    </section>
  )
}
