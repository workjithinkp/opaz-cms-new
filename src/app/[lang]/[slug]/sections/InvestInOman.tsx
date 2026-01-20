'use client'

import { useLang } from '@/context/LangContext'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { PageSection } from '@/lib/api'

import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

gsap.registerPlugin(ScrollTrigger)

interface InvestInOmanProps {
  section: PageSection
  lang: string
}

export default function InvestInOman({
  section,
  lang,
}: InvestInOmanProps) {
  const { lang: contextLang } = useLang()
  const isEn = contextLang === 'en'

  const containerRef = useRef(null)
  const imgRef = useRef(null)

  const title1Ref = useRef(null)
  const descriptionRef = useRef(null)
  const title2Ref = useRef(null)

  // Separate refs for sliders
  const sliderRef = useRef(null)
  const sliderRef2 = useRef(null)

  const block = section.block
  const list = section.list || []

  // Separate lists by template
  const shortList = list.filter((item) => item.template === 'invest-in-oman-15')
  const longList = list.filter((item) => item.template === 'invest-in-oman-2-15')

  useGSAP(() => {
    if (
      !containerRef.current ||
      !imgRef.current ||
      !title1Ref.current ||
      !descriptionRef.current ||
      !title2Ref.current
    ) {
      return
    }

    const mm = gsap.matchMedia()

    // 🖥 DESKTOP ONLY
    mm.add('(min-width: 1024px)', () => {
      /** ▼ INITIAL STATES ▼ */
      gsap.set(imgRef.current, { scale: 1 })
      gsap.set(title1Ref.current, { opacity: 0, scale: 3 })
      gsap.set(descriptionRef.current, { opacity: 0, y: 40 })
      gsap.set(title2Ref.current, { opacity: 0, y: 60 })
      
      // Only set slider refs if they exist
      if (sliderRef.current) {
        gsap.set(sliderRef.current, { opacity: 0, y: 60 })
      }
      if (sliderRef2.current) {
        gsap.set(sliderRef2.current, { opacity: 0, y: 60 })
      }

      /** ▼ MASTER TIMELINE ▼ */
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

      /** 1️⃣ IMAGE ZOOM */
      tl.to(imgRef.current, { scale: 2, ease: 'none' }, 0)

      /** 2️⃣ TITLE 1 */
      tl.to(
        title1Ref.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        },
        0.3
      )

      /** 3️⃣ DESCRIPTION */
      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.6
      )

      /** 4️⃣ TITLE 2 */
      tl.to(
        title2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
        },
        1.4
      )

      /** 5️⃣ SWIPER #1 */
      if (sliderRef.current) {
        tl.to(
          sliderRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          1.7
        )
      }

      /** 6️⃣ SWIPER #2 */
      if (sliderRef2.current) {
        tl.to(
          sliderRef2.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          2.0
        )
      }
    })

    // 📱 MOBILE / TABLET → GSAP OFF
    mm.add('(max-width: 1023px)', () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())

      const elements = [
        imgRef.current,
        title1Ref.current,
        descriptionRef.current,
        title2Ref.current,
      ]
      
      if (sliderRef.current) elements.push(sliderRef.current)
      if (sliderRef2.current) elements.push(sliderRef2.current)
      
      gsap.set(elements, { clearProps: 'all' })
    })

    // ✅ CLEANUP
    return () => mm.kill()
  }, [])

  if (!block) return null

  return (
    <section
      ref={containerRef}
      id="incentives"
      className="relative overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      {/* Background & Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-sm"></div>

      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={block.i_1 || '/future-bg.jpg'}
          alt="Invest in Oman"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Title Section */}
      <div className="relative z-30 container mx-auto">
        <h2
          ref={title1Ref}
          className="mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px]">
          {block.c_1?.split('|').map((part, index, arr) => (
            <span key={index}>
              {part}
              {index < arr.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <div
          ref={descriptionRef}
          className="mb-4 text-lg text-white lg:mb-8 lg:text-xl">
          {block.c_2}
        </div>
      </div>

      {/* Incentives Section */}
      <div className="relative z-30 bg-[#475a69]/30 py-9 lg:pb-20">
        <div className="container mx-auto">
          <div className="overflow-hidden">
            <h2
              ref={title2Ref}
              className="mb-10 text-2xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:text-5xl xl:text-6xl 2xl:text-7xl">
              {block.c_3 || (isEn ? 'OPAZ INCENTIVES' : 'حوافز الاستثمار')}
            </h2>

            {/* FIRST SLIDER - Short Items (invest-in-oman-15) */}
            {shortList.length > 0 && (
              <div ref={sliderRef} className="slider">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  navigation={{ prevEl: '.custom-prev', nextEl: '.custom-next' }}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={true}
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
                  {shortList.map((item, i) => (
                    <SwiperSlide key={i}>
                      <div className="incentive-item h-full rounded-xl border border-[#afddfc] p-8 backdrop-blur-md transition-all duration-700 hover:bg-[#6fabe6]/50">
                        <div className="mb-4">
                          <Image
                            src={item.i_1 || '/incentives-icon.png'}
                            width={60}
                            height={65}
                            alt="Icon"
                          />
                        </div>
                        <div className="min-h-26">
                          <p className="text-white">{item.c_1}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Nav Buttons */}
                <div className="mt-6 flex justify-start gap-4">
                  <button className="custom-prev flex size-12 cursor-pointer items-center justify-center rounded-full border border-white bg-[#993929]/10 text-white duration-700 hover:border-[#993929] hover:bg-[#993929]">
                    <MdArrowBackIosNew
                      className={`text-2xl ${contextLang === 'ar' ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <button className="custom-next flex size-12 cursor-pointer items-center justify-center rounded-full border border-white bg-[#993929]/10 text-white duration-700 hover:border-[#993929] hover:bg-[#993929]">
                    <MdArrowForwardIos
                      className={`text-2xl ${contextLang === 'ar' ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECOND SLIDER - Long Items (invest-in-oman-2-15) */}
      {longList.length > 0 && (
        <div className="relative z-30 container mx-auto pt-12">
          <div ref={sliderRef2} className="slider">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 8000,
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
              {longList.map((item, i) => {
                // Cycle through different background colors
                const bgColors = [
                  'bg-[#6fabe6]/20 hover:bg-[#6fabe6]/40',
                  'bg-[#06213c]/60 hover:bg-[#06213c]',
                  'bg-[#953b26]/50 hover:bg-[#953b26]/80',
                  'bg-[#6fabe6]/50 hover:bg-[#6fabe6]/80',
                ]
                const bgClass = bgColors[i % bgColors.length]

                return (
                  <SwiperSlide key={i}>
                    <div
                      className={`incentive-item h-full min-h-60 items-center rounded-xl border border-[#afddfc] p-8 text-start text-white backdrop-blur-md transition-all duration-700 ${bgClass}`}
                      dangerouslySetInnerHTML={{
                        __html: item.c_1 || '',
                      }}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  )
}