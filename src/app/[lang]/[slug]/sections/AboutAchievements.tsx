'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface AboutAchievementsProps {
  section: PageSection
  lang: string
}

export default function AboutAchievements({
  section,
  lang,
}: AboutAchievementsProps) {
  const block = section.block
  const achievements = section.list || []

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleRef1 = useRef<HTMLHeadingElement | null>(null)
  const titleRef2 = useRef<HTMLDivElement | null>(null)
  const achievementBoxRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (
      !containerRef.current ||
      !imgRef.current ||
      !titleRef1.current ||
      !titleRef2.current ||
      !achievementBoxRef.current
    ) {
      return
    }

    // Initial state
    gsap.set([titleRef1.current, titleRef2.current, achievementBoxRef.current], {
      opacity: 0,
      y: 80,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: true,
        pin: true,
      },
    })

    // 1️ Image zoom
    tl.fromTo(
      imgRef.current,
      { scale: 1 },
      { scale: 2, ease: 'none', duration: 1 }
    )
      // 2️ Title
      .to(titleRef1.current, { opacity: 1, y: 0, duration: 1 })
      // 3️ Description
      .to(titleRef2.current, { opacity: 1, y: 0, duration: 1 })
      // 4️ Achievements section
      .to(achievementBoxRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      })
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center">
      <div className="bg-black/40 absolute z-10 inset-0"></div>

      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={block?.i_1 || '/future-bg.jpg'}
          alt="Achievements Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="container mx-auto relative z-20">
        <div>
          <h2
            ref={titleRef1}
           className="mb-4 text-3xl leading-none font-normal text-[#b0ddfc] uppercase lg:mb-8 lg:text-6xl 2xl:text-[80px]">
            {block?.c_1}
          </h2>

          <div
            ref={titleRef2}
            className="mb-4 text-lg text-white lg:mb-8 lg:text-xl"
            dangerouslySetInnerHTML={{ __html: block?.c_2 || '' }}
          />

          <div ref={achievementBoxRef} className="relative w-full d-block">
            <div className="relative">
              {/* Swiper */}
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  prevEl: '.custom-prev',
                  nextEl: '.custom-next',
                }}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  reverseDirection: lang === 'ar',
                }}
                speed={1200}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  480: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="px-6 md:px-10">
                {achievements.map((item) => (
                  <SwiperSlide key={item.id} className="h-full pb-14">
                    <div className="relative flex h-48 flex-col justify-between border-b border-white pe-14 pb-6">
                      <div className="absolute start-0 -bottom-2.5 size-4.5 rounded-full bg-white"></div>

                      <div className="flex flex-col space-y-3.5 text-white">
                        <h3
                          className="min-h-10 text-lg font-bold text-[#b8ddfa] capitalize md:text-xl lg:text-2xl"
                          dangerouslySetInnerHTML={{ __html: item.c_1 || '' }}
                        />
                        <p
                          className="min-h-10"
                          dangerouslySetInnerHTML={{ __html: item.c_2 || '' }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons — Must be OUTSIDE Swiper */}
              <div className="mt-6 flex justify-end gap-4">
                {/* Prev Button */}
                <button className="custom-prev flex size-12 items-center justify-center rounded-full border border-white bg-[#993929]/10 text-white transition hover:border-[#993929] hover:bg-[#993929]">
                  <MdArrowBackIosNew
                    className={`text-2xl ${lang === 'ar' ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Next Button */}
                <button className="custom-next flex size-12 items-center justify-center rounded-full border border-white bg-[#993929]/10 text-white transition hover:border-[#993929] hover:bg-[#993929]">
                  <MdArrowForwardIos
                    className={`text-2xl ${lang === 'ar' ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
