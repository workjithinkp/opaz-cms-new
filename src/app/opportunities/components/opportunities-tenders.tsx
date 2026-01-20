'use client'

import { useLang } from '@/context/LangContext'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'

import { IoIosArrowForward } from 'react-icons/io'

const tenderData = [
  {
    id: 1,
    img: '/tender-con-thumb-01.jpg',
    title: 'Lorem ipsum dolor sit amet',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    link: '',
  },
  {
    id: 2,
    img: '/tender-con-thumb-01.jpg',
    title: 'Consectetur adipiscing elit',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '',
  },
  {
    id: 3,
    img: '/tender-con-thumb-01.jpg',
    title: 'Sed do eiusmod tempor',
    desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    link: '',
  },
]

gsap.registerPlugin(ScrollTrigger)

export default function OpportunitiesTenders() {
  const { lang } = useLang()
  const isEn = lang === 'en'

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<HTMLDivElement | null>(null)
  const filterRef = useRef<HTMLDivElement | null>(null)
  const tenderBtnRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !textRef.current ||
      !itemsRef.current ||
      !filterRef.current ||
      !tenderBtnRef.current
    )
      return

    // Initial state

    gsap.set(titleRef.current, { opacity: 0, y: 150, scale: 2 })
    gsap.set(textRef.current, { opacity: 0, y: 80 })
    gsap.set(itemsRef.current, { opacity: 0, y: 80 })
    gsap.set(filterRef.current, { opacity: 0, y: 80 })
    gsap.set(tenderBtnRef.current, { opacity: 0, y: 80 })

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
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
    tl.to(filterRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
    tl.to(itemsRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
    tl.to(tenderBtnRef.current, {
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
      <div className="relative z-30 container mx-auto">
        <div className="mb-6">
          <h2
            ref={titleRef}
            className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-5xl xl:text-6xl 2xl:text-8xl ${isEn ? 'origin-left' : 'origin-right text-right'}`}>
            {isEn ? (
              <>Tenders & Contracts</>
            ) : (
              <>أداة استكشاف المناطق التفاعلية</>
            )}
          </h2>
          <p
            ref={textRef}
            className="mb-4 text-lg text-white lg:mb-8 lg:text-xl">
            Find tenders, join CSR & ICV initiatives, explore local businesses,
            and connect with investors community
          </p>
        </div>
        <div
          ref={filterRef}
          className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div>
            <input
              type="text"
              placeholder="Filter"
              className="h-10 w-full rounded-sm border-1 border-[#E7CAB2] bg-white/10 pr-10 pl-3 text-white transition-colors outline-none placeholder:text-[#E7CAB2]"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Filter"
              className="h-10 w-full rounded-sm border-1 border-[#E7CAB2] bg-white/10 pr-10 pl-3 text-white transition-colors outline-none placeholder:text-[#E7CAB2]"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Filter"
              className="h-10 w-full rounded-sm border-1 border-[#E7CAB2] bg-white/10 pr-10 pl-3 text-white transition-colors outline-none placeholder:text-[#E7CAB2]"
            />
          </div>
        </div>
        <div
          ref={itemsRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tenderData.map((item) => (
            <div key={item.id}>
              <div className="group overflow-hidden rounded-lg border border-[#AFDDFC] bg-[#6FABE6]">
                <div className="overflow-hidden">
                  <Image
                    src={item.img}
                    width={550}
                    height={350}
                    className="h-full max-h-48 w-full object-cover transition-all duration-300 group-hover:scale-110"
                    alt={item.title}
                  />
                </div>

                <div className="px-6 py-6">
                  <div className="mb-2 min-h-[125px]">
                    <h3 className="mb-2 line-clamp-2 text-xl font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="line-clamp-2 text-white">{item.desc}</p>
                  </div>

                  <div>
                    <Link
                      href={item.link}
                      className="inline-flex items-center rounded-sm border border-white bg-transparent px-6 py-3 text-[#b0ddfc] uppercase transition-all duration-300 hover:border-[#06213C] hover:bg-[#06213C]">
                      View Details
                      <IoIosArrowForward />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div ref={tenderBtnRef} className="mt-8">
          <Link
            href=""
            className="inline-flex items-center rounded-sm border border-blue-300 bg-blue-300/30 px-6 py-3 text-[#b0ddfc] uppercase transition hover:bg-[#0c213b]">
            watch here <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </section>
  )
}
