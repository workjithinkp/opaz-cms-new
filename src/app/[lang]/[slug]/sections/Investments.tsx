'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

interface InvestmentItem {
  id: number;
  i_1?: string | null;
  c_1?: string;
  c_2?: string;
  [key: string]: any;
}

interface InvestmentsProps {
  investments: InvestmentItem[];
  lang: string;
}

export default function Investments({ investments = [], lang }: InvestmentsProps) {
  const slides = lang === 'ar' ? [...investments].reverse() : investments;

  if (!slides.length) return null;

  return (
    <>
      {/* Swiper */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        loop={slides.length > 3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          reverseDirection: lang === 'ar',
        }}
        speed={1200}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-full px-6 md:px-10">
        {slides.map((item) => (
          <SwiperSlide key={item.id} className="h-full max-w-full pb-14">
            <div className="relative flex h-60 flex-col justify-between border-b border-white pe-14 pb-6">
              <div className="absolute start-0 -bottom-2.5 size-4.5 rounded-full bg-white" />

              <div className="flex flex-col space-y-3.5 text-white">
                {/* Icon */}
                {item.i_1 && (
                  <div className="flex size-16 w-fit items-center justify-center rounded-xl border border-[#b6ddfa]/40 bg-[#2d86dd]/20 px-2 py-2">
                    <Image
                      src={item.i_1}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                      alt={item.c_1 || 'Investment'}
                    />
                  </div>
                )}

                {/* Title */}
                {item.c_1 && (
                  <h3 className="min-h-15 text-lg font-bold text-[#b8ddfa] capitalize md:text-xl lg:text-2xl">
                    {item.c_1}
                  </h3>
                )}

                {/* Description */}
                {item.c_2 && (
                  <p
                    className="min-h-15 md:line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: item.c_2 }}
                  />
                )}

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-end gap-4 px-6 md:px-10">
        <button
          aria-label="Previous slide"
          className="custom-prev flex size-12 items-center justify-center rounded-full border border-white bg-[#993929]/10 text-white transition hover:border-[#993929] hover:bg-[#993929]">
          <MdArrowBackIosNew
            className={`text-2xl ${lang === 'ar' ? 'scale-x-[-1]' : ''}`}
          />
        </button>

        <button
          aria-label="Next slide"
          className="custom-next flex size-12 items-center justify-center rounded-full border border-white bg-[#993929]/10 text-white transition hover:border-[#993929] hover:bg-[#993929]">
          <MdArrowForwardIos
            className={`text-2xl ${lang === 'ar' ? 'scale-x-[-1]' : ''}`}
          />
        </button>
      </div>
    </>
  );
}
