'use client'

import { useLang } from '@/context/LangContext'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PageSection } from '@/lib/api'

import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

gsap.registerPlugin(ScrollTrigger)

interface InvestSuccessStoriesProps {
  section: PageSection
  lang: string
}

export default function InvestSuccessStories({
  section,
  lang,
}: InvestSuccessStoriesProps) {
  const { lang: contextLang } = useLang()
  const isEn = contextLang === 'en'

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const descriptionRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef(null)

  const block = section.block
  const stories = section.list || []

  useGSAP(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !descriptionRef.current
    ) {
      return
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      gsap.set(titleRef.current, { opacity: 0, scale: 5 })
      gsap.set(descriptionRef.current, { opacity: 0, y: 40 })
      
      if (sliderRef.current) {
        gsap.set(sliderRef.current, { opacity: 0, y: 60 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl.to(titleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      })
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        })

      if (sliderRef.current) {
        tl.to(sliderRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        })
      }

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })

    mm.add('(max-width: 1023px)', () => {
      const elements = [titleRef.current, descriptionRef.current]
      if (sliderRef.current) elements.push(sliderRef.current)
      
      gsap.set(elements, {
        clearProps: 'all',
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      })
    })

    return () => mm.kill()
  }, [])

  if (!block) return null

  return (
    <section
      ref={containerRef}
      id="success-stories"
      className="relative flex flex-col justify-center bg-[#06213c] pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="block">
        <div className="relative z-30 container mx-auto flex flex-col">
          <h2
            ref={titleRef}
            className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${isEn ? 'origin-left' : 'origin-right text-right'}`}>
            {block.c_1}
          </h2>
          {/* DESCRIPTION */}
          <div
            ref={descriptionRef}
            className={`mb-4 text-lg text-white lg:mb-8 lg:text-xl ${
              isEn ? 'text-left' : 'text-right'
            }`}>
            {block.c_2}
          </div>
          {/* SECOND SLIDER */}
          <div className="relative z-30">
            <div ref={sliderRef} className="slider hidden lg:block">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop
                autoplay={{
                  delay: 3000,
                  reverseDirection: contextLang === 'ar',
                  disableOnInteraction: false,
                }}
                speed={1200}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1440: { slidesPerView: 3 },
                }}
                className="swiper-incentive">
                {stories.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="flex h-full flex-col items-start space-y-5 rounded-xl border border-[#afddfc] p-8 text-white backdrop-blur-md duration-700 hover:bg-[#b0ddfc]/60">
                      <div className="company-name text-4xl font-bold uppercase">
                        {item.c_1}
                      </div>

                      <div className="line-clamp-4 min-h-24">
                        {item.c_2}
                      </div>

                      <Link
                        className="flex items-center rounded-sm border border-blue-300 bg-blue-300/30 px-6 py-3 text-[#b0ddfc] uppercase transition hover:bg-[#0c213b]"
                        href={item.t_1 || '#'}
                        target="_blank">
                        {isEn ? 'Watch here' : 'شاهد هنا'}
                        <IoIosArrowForward
                          className={`ms-2 ${contextLang === 'ar' ? 'scale-x-[-1]' : ''}`}
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex flex-col space-y-4 lg:hidden">
              {stories.map((item, i) => (
                <div key={i}>
                  <div className="flex h-full flex-col items-start space-y-3 rounded-xl border border-[#afddfc] p-4 text-white backdrop-blur-md duration-700 hover:bg-[#b0ddfc]/60 lg:p-8">
                    <div className="company-name text-xl font-bold uppercase lg:text-4xl">
                      {item.c_1}
                    </div>
                    <div className="text-sm lg:min-h-24">
                      {item.c_2}
                    </div>
                    <Link
                      className="flex items-center rounded-sm border border-blue-300 bg-blue-300/30 px-6 py-2 text-xs text-[#b0ddfc] uppercase transition hover:bg-[#0c213b]"
                      href={item.t_1 || '#'}
                      target="_blank">
                      {isEn ? 'Watch here' : 'شاهد هنا'}
                      <IoIosArrowForward
                        className={`ms-2 ${contextLang === 'ar' ? 'scale-x-[-1]' : ''}`}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
