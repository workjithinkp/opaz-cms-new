'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Image from 'next/image'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

interface Member {
  id: number
  i_1?: string
  c_2?: string
  c_3?: string
  c_4?: string
}

interface BodCarouselProps {
  members: Member[]
  lang: string
}

export default function BodCarousel({ members, lang }: BodCarouselProps) {
  const slides = lang === 'ar' ? [...members].reverse() : members

  return (
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        loop
        initialSlide={0}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1200}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          990: { slidesPerView: 3 },
          1200: { slidesPerView: 3 },
          1360: { slidesPerView: 4 },
          1440: { slidesPerView: 5 },
        }}>
        {slides.map((m) => (
          <SwiperSlide key={m.id} className="pb-14">
            <div className="flex flex-col text-center">
              <div className="flex justify-center overflow-hidden rounded-xl border border-[#afddfc] bg-[#6fabe6]/50">
                <Image
                  src={m.i_1 || ''}
                  alt={m.c_2 || ''}
                  width={350}
                  height={350}
                  priority
                />
              </div>

              <div className="relative min-h-[225px] -translate-y-4 rounded-xl bg-[#06213c] p-6 text-white">
                <h3 className="text-lg font-semibold text-[#b8ddfa]">
                  {m.c_2}
                </h3>

                <p className="mt-2">{m.c_3}</p>

                {m.c_4 && (
                  <p className="mt-3 text-lg font-semibold">{m.c_4}</p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 hidden justify-end gap-4">
        <button className="custom-prev flex size-12 items-center justify-center rounded-full border border-white bg-[#993929]/10 text-white transition hover:border-[#993929] hover:bg-[#993929]">
          <MdArrowBackIosNew
            className={`text-2xl ${lang === 'ar' ? 'rotate-180' : ''}`}
          />
        </button>

        <button className="custom-next flex size-12 items-center justify-center rounded-full border border-white bg-[#993929]/10 text-white transition hover:border-[#993929] hover:bg-[#993929]">
          <MdArrowForwardIos
            className={`text-2xl ${lang === 'ar' ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  )
}
