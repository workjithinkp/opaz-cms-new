'use client'

import { useLang } from '@/context/LangContext'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'

import { IoIosArrowForward } from 'react-icons/io'
import { BsCalendar3 } from 'react-icons/bs'

const connectData = [
  {
    id: 1,
    img: '/investor-stories.jpg',
    event: 'Event name',
    date: 'Date & location',
    key: 'Key focus',
    link: '',
  },
  {
    id: 2,
    img: '/investor-stories.jpg',
    event: 'Event name',
    date: 'Date & location',
    key: 'Key focus',
    link: '',
  },
  {
    id: 3,
    img: '/investor-stories.jpg',
    event: 'Event name',
    date: 'Date & location',
    key: 'Key focus',
    link: '',
  },
  {
    id: 4,
    img: '/investor-stories.jpg',
    event: 'Event name',
    date: 'Date & location',
    key: 'Key focus',
    link: '',
  },
]

gsap.registerPlugin(ScrollTrigger)

export default function OpportunitiesConnect() {
  const { lang } = useLang()
  const isEn = lang === 'en'

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const filterRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<HTMLDivElement | null>(null)
  const joinRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !textRef.current ||
      !itemsRef.current ||
      !filterRef.current ||
      !joinRef.current
    )
      return

    // Initial state

    gsap.set(titleRef.current, { opacity: 0, y: 150, scale: 2 })
    gsap.set(textRef.current, { opacity: 0, y: 80 })
    gsap.set(itemsRef.current, { opacity: 0, y: 80 })
    gsap.set(filterRef.current, { opacity: 0, y: 80 })
    gsap.set(joinRef.current, { opacity: 0, y: 80 })

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
    tl.to(joinRef.current, {
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
            className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-5xl xl:text-6xl 2xl:text-7xl ${isEn ? 'origin-left' : 'origin-right text-right'}`}>
            {isEn ? (
              <>Connect Across Free Zones</>
            ) : (
              <>أداة استكشاف المناطق التفاعلية</>
            )}
          </h2>
          <p ref={textRef} className="text-lg text-white lg:text-xl">
            Build partnerships, meet potential clients, and join sector-specific
            B2B meetups within Oman’s free zones.
          </p>
        </div>
        <div
          ref={filterRef}
          className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div>
            <input
              type="text"
              placeholder="Type"
              className="h-10 w-full rounded-sm border-1 border-white bg-white/10 pr-10 pl-3 text-white transition-colors outline-none placeholder:text-white/72"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Sector"
              className="h-10 w-full rounded-sm border-1 border-white bg-white/10 pr-10 pl-3 text-white transition-colors outline-none placeholder:text-white/72"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Date"
              className="h-10 w-full rounded-sm border-1 border-white bg-white/10 pr-10 pl-3 text-white transition-colors outline-none placeholder:text-white/72"
            />
          </div>
        </div>
        <div
          ref={itemsRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {connectData.map((item) => (
            <div key={item.id}>
              <div className="group relative mb-6 h-[275px] overflow-hidden rounded-xl border border-[#AFDDFC] bg-black">
                <div className="absolute inset-0">
                  <img
                    src={item.img}
                    width={1105}
                    height={585}
                    alt="Image"
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#6FABE6]/85 to-[#6FABE6]/50"></div>
                </div>

                <div className="relative flex h-full flex-col p-8">
                  <div className="mb-4 flex justify-between pb-4">
                    <div>
                      <h3 className="mb-2 text-xl font-medium text-white uppercase">
                        {item.event}
                      </h3>
                      <div className="flex gap-4">
                        <div className="text-white">{item.date}</div>
                        <div className="text-white">{item.key}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1"></div>

                  <div>
                    <Link
                      href={item.link}
                      className="inline-flex items-center rounded-md border border-[#B0DDFC] bg-white/15 px-4 py-3 font-medium text-[#AFDDFC] uppercase transition duration-300 hover:bg-[#B0DDFC]">
                      <div className="me-2">
                        <BsCalendar3 />
                      </div>
                      Add to calendar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div ref={joinRef} className="mt-12 text-center">
          <h3 className="mb-8 text-4xl font-medium text-white uppercase">
            Join the Free Zone Business Network
          </h3>
          <Link
            href=""
            className="inline-flex items-center rounded-md border border-[#B0DDFC] bg-white/15 px-4 py-3 font-medium text-[#AFDDFC] uppercase transition duration-300 hover:bg-[#06213C] hover:text-white">
            Sign up for event alerts
          </Link>
        </div>
      </div>
    </section>
  )
}
