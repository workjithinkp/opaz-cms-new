'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { PageSection } from '@/lib/api'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

gsap.registerPlugin(ScrollTrigger)

interface CareerWorkplaceProps {
  section: PageSection
  lang: string
}

export default function CareerWorkplace({ section, lang }: CareerWorkplaceProps) {
  const block = section.block
  const list = section.list || []
  const title = block?.c_1 || ''
  const isEn = lang === 'en'

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (
      !containerRef.current ||
      !imgRef.current ||
      !titleRef.current ||
      !sliderRef.current
    ) {
      return
    }

    const mm = gsap.matchMedia()

    // 🖥 Desktop animation (pin + scroll)
    mm.add('(min-width: 1024px)', () => {
      // Initial states
      gsap.set(titleRef.current, { opacity: 0, y: 150, scale: 2 })
      gsap.set(sliderRef.current, { opacity: 0, y: 80 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: true,
            pin: true,
          },
        })
        .to(imgRef.current, {
          scale: 2,
          ease: 'none',
          duration: 1,
        })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
        .to(sliderRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
    })

    // 📱 Mobile / Tablet fallback (no pin)
    mm.add('(max-width: 1023px)', () => {
      gsap.set([imgRef.current, titleRef.current, sliderRef.current], {
        clearProps: 'all',
        opacity: 1,
        scale: 1,
        y: 0,
      })
    })

    // ✅ Single cleanup
    return () => mm.kill()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#06213c] pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={block?.i_1 || "/career-workplace-bg.jpg"}
          alt="Zoom"
          fill
          priority
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#06213c]/45"></div>

      <div className="relative z-30 container mx-auto">
        <div className="max-w-[1000px]">
          <h2
            ref={titleRef}
            className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${isEn ? 'origin-left' : 'origin-right text-right'}`}>
            {title}
          </h2>
        </div>
      </div>

      <div className="relative lg:pb-24">
        <div className="container mx-auto">
          <div className="hidden overflow-hidden lg:block">
            <div ref={sliderRef} className="slider">
              <Swiper
                modules={[Autoplay, Navigation]}
                navigation={{ prevEl: '.custom-prev', nextEl: '.custom-next' }}
                spaceBetween={20}
                loop={true}
                autoplay={{
                  delay: 3000,
                  reverseDirection: lang === 'ar',
                  disableOnInteraction: false,
                }}
                speed={1200}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  1024: { slidesPerView: 2 },
                  1440: { slidesPerView: 2 },
                }}
                className="swiper-business">
                {list.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="group relative min-h-[250px] overflow-hidden rounded-xl border border-[#85abce] bg-white/5 px-4 py-4 backdrop-blur-md transition transition-all duration-300 hover:bg-[#5288bc] lg:px-8 lg:py-8">
                      <h3 className="mb-5 text-xl font-medium text-white uppercase lg:mb-12 lg:text-3xl">
                        {item.c_1 || ''}
                      </h3>
                      <div
                        className="text-white"
                        dangerouslySetInnerHTML={{ __html: item.c_2 || '' }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="mt-6 flex justify-start gap-4">
                <button className="custom-prev flex size-12 cursor-pointer items-center justify-center rounded-full border border-white bg-[#993929]/10 text-white duration-700 hover:border-[#993929] hover:bg-[#993929]">
                  <MdArrowBackIosNew
                    className={`text-2xl ${lang === 'ar' ? 'rotate-180' : ''}`}
                  />
                </button>
                <button className="custom-next flex size-12 cursor-pointer items-center justify-center rounded-full border border-white bg-[#993929]/10 text-white duration-700 hover:border-[#993929] hover:bg-[#993929]">
                  <MdArrowForwardIos
                    className={`text-2xl ${lang === 'ar' ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3.5 lg:hidden">
            {list.map((item, i) => (
              <div className="space-y-3.5" key={i}>
                <div className="group relative overflow-hidden rounded-xl border border-[#85abce] bg-white/5 px-4 py-4 backdrop-blur-md transition transition-all duration-300 hover:bg-[#5288bc] lg:px-8 lg:py-8">
                  <h3 className="mb-2 text-xl font-medium text-white uppercase">
                    {item.c_1 || ''}
                  </h3>
                  <div
                    className="text-white"
                    dangerouslySetInnerHTML={{ __html: item.c_2 || '' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
