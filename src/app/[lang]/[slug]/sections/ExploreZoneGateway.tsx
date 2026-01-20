'use client'

import { useLang } from '@/context/LangContext'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { PageSection, API_DOMAIN } from '@/lib/api'
import 'swiper/css'

gsap.registerPlugin(ScrollTrigger)

interface ExploreZoneGatewayProps {
  section: PageSection
}

export default function ExploreZoneGateway({ section }: ExploreZoneGatewayProps) {
  const { lang } = useLang()
  const isEn = lang === 'en'
  const { block, list = [] } = section

  return (
    <Tabs defaultValue={list[0] ? String(list[0].id) : 'zone-1'} className="block">
      <GlobalTabsNav items={list} lang={lang} block={block} />
      <GlobalTabsContent items={list} lang={lang} />
    </Tabs>
  )
}

// Navigation Section Component
function GlobalTabsNav({ items, lang, block }: { items: any[]; lang: string; block: any }) {
  const isEn = lang === 'en'

  return (
    <section
      id="explore-industries"
      className="relative overflow-hidden bg-[#06213c] pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={block.i_1 ? (block.i_1.startsWith('http') ? block.i_1 : `${API_DOMAIN}${block.i_1}`) : '/explore-business-bg.jpg'}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#1C1C1E]/49"></div>

      <div className="relative z-30 container mx-auto">
        <div className="lg:mb-12">
          <h2
            className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${isEn ? 'origin-left' : 'origin-right text-right'}`}
            dangerouslySetInnerHTML={{ __html: block.c_1 }}
          />
        </div>
      </div>

      <div className="relative z-50 lg:pb-24">
        <div className="container mx-auto">
          <div className="overflow-hidden">
            <div className="slider">
              <TabsList className="m-0 grid h-full w-full p-0">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop
                  autoplay={{
                    delay: 3000,
                    reverseDirection: lang === 'ar',
                    disableOnInteraction: false,
                  }}
                  preventClicks={false}
                  preventClicksPropagation={false}
                  touchStartPreventDefault={false}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1440: { slidesPerView: 4 },
                  }}
                  className="w-full">
                  {items.map((item, index) => (
                    <SwiperSlide key={`${item.id}-${index}`}>
                      <TabsTrigger
                        value={String(item.id)}
                        asChild
                        className="group m-0 w-full border-0 bg-transparent p-0">
                        <div className="w-full text-left">
                          <div className="relative overflow-hidden rounded-xl bg-[#535353]/66 backdrop-blur-md transition-all duration-300">
                            <div className="relative h-[300px] w-full">
                              <Image
                                src={item.i_1 ? (item.i_1.startsWith('http') ? item.i_1 : `${API_DOMAIN}${item.i_1}`) : '/unlock-gate-thumb-01.jpg'}
                                width={450}
                                height={375}
                                alt={item.c_1}
                                className="h-full w-full object-cover opacity-50 transition-all duration-300 group-hover:opacity-100 group-data-[state=active]:opacity-100"
                              />
                            </div>
                            <div className="pointer-events-none absolute inset-0 z-10 flex items-start px-8 py-8">
                              <h3
                                className={`text-2xl font-medium text-white ${lang === 'en' ? 'uppercase' : ''}`}
                                dangerouslySetInnerHTML={{ __html: item.c_1 }}
                              />
                            </div>
                          </div>
                        </div>
                      </TabsTrigger>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </TabsList>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Content Section Component
function GlobalTabsContent({ items, lang }: { items: any[]; lang: string }) {
  return (
    <section className="relative z-10">
      {items.map((item) => (
        <TabsContent key={item.id} value={String(item.id)}>
          <ZoneContent zone={item} lang={lang} />
        </TabsContent>
      ))}
    </section>
  )
}

// Individual Zone Content Component
function ZoneContent({ zone, lang }: { zone: any; lang: string }) {
  const isEn = lang === 'en'
  const infrastructure = zone.infrastructure || []

  return (
    <section className="relative overflow-hidden bg-[#06213c] pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/explore-connect-bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#1C1C1E]/49"></div>

      <div className="relative z-30 container mx-auto">
        <div className="mb-12">
          <h2
            className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-7xl ${isEn ? 'origin-left' : 'origin-right text-right'}`}
            dangerouslySetInnerHTML={{ __html: zone.c_2 }}
          />
          <p
            className="mb-4 text-lg text-white lg:mb-8 lg:text-xl"
            dangerouslySetInnerHTML={{ __html: zone.c_3 }}
          />
        </div>
        <div>
          <Tabs defaultValue={infrastructure[0] ? String(infrastructure[0].id) : 'infra-1'} className="w-full">
            <div
              className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              {/* LEFT SIDE — Dynamic Tab Triggers */}
              <div>
                <div className="mb-8">
                  <h3 className="text-3xl font-medium text-[#b0ddfc] uppercase text-shadow-2xs">
                    {zone.c_4 || (isEn ? 'INFRASTRUCTURE' : 'حول البنية التحتية')}
                  </h3>
                </div>

                <TabsList className="m-0 flex h-auto flex-col items-start gap-0 space-y-4 p-0">
                  {infrastructure.map((item: any) => (
                    <TabsTrigger
                      key={item.id}
                      value={String(item.id)}
                      className={`group flex h-auto cursor-pointer p-0 text-white data-[state=active]:shadow-lg sm:data-[state=active]:shadow-none ${isEn ? 'text-left' : 'text-right'} `}>
                      <div className="me-4 h-[48px] w-[48px] shrink-0 rounded-lg bg-[#F9F3E5] transition-all duration-300 group-hover:bg-[#06213c] group-data-[state=active]:bg-[#06213c]"></div>
                      <div
                        className="!whitespace-normal"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    </TabsTrigger>
                  ))}
                </TabsList>
                {zone.t_1 && (
                  <Link
                    href={zone.t_1}
                    target="_blank"
                    className="mt-6 inline-flex items-center justify-center rounded-md border border-[#b6ddfa]/40 bg-[#2d86dd]/20 px-6 py-3 text-sm text-[#b6ddfa] uppercase transition-all duration-700 hover:border-[#b6ddfa]/70 hover:bg-[#0c213b]">
                    {zone.c_5 || (lang === 'en' ? 'Check Website' : 'الموقع الالكتروني')}
                  </Link>
                )}
              </div>

              {/* RIGHT SIDE — Dynamic Tab Content */}
              <div>
                {infrastructure.map((item: any) => (
                  <TabsContent key={item.id} value={String(item.id)}>
                    <div className="overflow-hidden rounded-lg">
                      {item.image && (
                        <Image
                          src={item.image.startsWith('http') ? item.image : `${API_DOMAIN}${item.image}`}
                          width={800}
                          height={400}
                          className="h-full w-full object-cover"
                          alt={item.title}
                        />
                      )}
                      {item.description && (
                        <p
                          className="mt-4 text-white"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
