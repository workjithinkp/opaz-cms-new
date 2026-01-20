'use client'

import { useLang } from '@/context/LangContext'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  'All categories',
  'Category X',
  'Category X',
  'Category X',
  'Category X',
  'Category X',
  'Category X',
  'Category X',
  'Category X',
]

const ecoBusinessData = [
  {
    id: 1,
    title: 'Business Title 01',
    subtitle: 'Subtitle or description here',
    info: 'Information Box Content',
    img: null,
  },
  {
    id: 2,
    title: 'Business Title 02',
    subtitle: 'Short text here',
    info: 'Details about this item',
    img: null,
  },
  {
    id: 3,
    title: 'Business Title 03',
    subtitle: 'Something informative',
    info: 'More information can go here',
    img: null,
  },
]

export default function ExplorationForm() {
  const { lang } = useLang()
  const isEn = lang === 'en'

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const textRefDec = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLDivElement | null>(null)
  const cateRef = useRef<HTMLDivElement | null>(null)
  const cardItemRef = useRef<HTMLDivElement | null>(null)
  const viewBtnRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (
      !containerRef.current ||
      !imgRef.current ||
      !titleRef.current ||
      !textRefDec.current ||
      !searchRef.current ||
      !cateRef.current ||
      !cardItemRef.current ||
      !viewBtnRef.current
    )
      return

    // Initial state

    gsap.set(titleRef.current, { opacity: 0, y: 150, scale: 2 })
    gsap.set(textRefDec.current, { opacity: 0, y: 80 })
    gsap.set(searchRef.current, { opacity: 0, y: 80 })
    gsap.set(cateRef.current, { opacity: 0, y: 80 })
    gsap.set(cardItemRef.current, { opacity: 0, y: 80 })
    gsap.set(viewBtnRef.current, { opacity: 0, y: 80 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: true,
        pin: true,
      },
    })

    tl.to(imgRef.current, { scale: 2, ease: 'none', duration: 1 })

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
    tl.to(textRefDec.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
    tl.to(searchRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
    tl.to(cateRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
    tl.to(cardItemRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
    tl.to(viewBtnRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#06213c] pt-36 pb-24">
      <div className="absolute inset-0 z-10 bg-[#0080FF]/23"></div>

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

      <div className="relative z-30 container mx-auto">
        <div className="mx-auto mb-12 max-w-[1200px]">
          <h2
            ref={titleRef}
            className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-5xl xl:text-6xl 2xl:text-8xl ${isEn ? 'origin-left' : 'origin-right text-right'}`}>
            {isEn ? (
              <>Explore the Local Business Ecosystem</>
            ) : (
              <>تواصل مع مستشار المنطقة</>
            )}
          </h2>
          <p ref={textRefDec} className="text-lg text-white lg:text-xl">
            {isEn ? (
              <>
                Discover verified local suppliers, manufacturers, and service
                providers to support your operations.
              </>
            ) : (
              <>
                Discover verified local suppliers, manufacturers, and service
                providers to support your operations.
              </>
            )}
          </p>
        </div>

        <div ref={searchRef} className="mx-auto mb-12 max-w-[1200px]">
          <div className="mb-6 mb-12 grid grid-cols-1 gap-4 lg:grid-cols-1">
            <div>
              <input
                type="text"
                placeholder="Search"
                className="h-10 w-full rounded-sm border-1 border-white/20 bg-white/10 pr-10 pl-3 text-white transition-colors outline-none placeholder:text-white"
              />
            </div>
            <div ref={cateRef} className="flex flex-wrap justify-center gap-3">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="cursor-pointer rounded-[50px] border border-[#AFDDFC] bg-[#6FABE6]/40 px-8 py-2 text-sm text-white transition-all duration-300 hover:bg-[#6FABE6]/60">
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={cardItemRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {ecoBusinessData.map((item) => (
            <div key={item.id}>
              <div className="rounded-xl border border-[#AFDDFC] bg-[#6FABE6]/60 p-4">
                <div className="mx-auto mb-8 h-[125px] w-[125px] overflow-hidden rounded-full bg-[#848484]">
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="mb-4 text-center">
                  <h3 className="mb-2 text-xl font-medium text-white uppercase">
                    {item.title}
                  </h3>

                  <p className="text-white">{item.subtitle}</p>
                </div>
                <div className="mb-4 flex h-[100px] items-center justify-center bg-[#848484] text-white">
                  {item.info}
                </div>
                <div className="text-center">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-md border border-[#B0DDFC] bg-white/15 px-4 py-3 font-medium text-white uppercase transition duration-300 hover:bg-[#B0DDFC]">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div ref={viewBtnRef} className="mt-12 text-center">
          <Link
            href=""
            className="inline-flex items-center rounded-md border border-[#B0DDFC] bg-white/15 px-4 py-3 font-medium text-[#AFDDFC] uppercase transition duration-300 hover:bg-[#06213C] hover:text-white">
            View Full Directory
          </Link>
        </div>
      </div>
    </section>
  )
}
