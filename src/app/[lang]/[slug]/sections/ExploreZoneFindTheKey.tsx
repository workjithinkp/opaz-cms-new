'use client'

import { useLang } from '@/context/LangContext'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageSection, API_DOMAIN } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface ExploreZoneFindTheKeyProps {
  section: PageSection
}

export default function ExploreZoneFindTheKey({ section }: ExploreZoneFindTheKeyProps) {
  const { lang } = useLang()
  const isEn = lang === 'en'
  const { block, list } = section
  const firstTabValue = list && list[0]?.id != null ? String(list[0].id) : 'industry-1'

  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const titleSubRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const tabRef = useRef<HTMLDivElement | null>(null)
  const tabConRef = useRef<HTMLDivElement | null>(null)
  const removeBr = (html = '') =>
  html.replace(/<br\s*\/?>|<\/br>/gi, ' ')
  useGSAP(() => {
    const mm = gsap.matchMedia()

    // ✅ DESKTOP ONLY
    mm.add('(min-width: 1025px)', () => {
      if (
        !containerRef.current ||
        !imgRef.current ||
        !titleRef.current ||
        !titleSubRef.current ||
        !tabRef.current ||
        !tabConRef.current
      )
        return

      // Initial state
      gsap.set(titleRef.current, { opacity: 0, y: 150, scale: 2 })
      gsap.set(titleSubRef.current, { opacity: 0, y: 80 })
      gsap.set(tabRef.current, { opacity: 0, y: 80 })
      gsap.set(tabConRef.current, { opacity: 0, y: 80 })
      
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

      tl.to(imgRef.current, { scale: 2, ease: 'none', duration: 1 })
        .to(titleSubRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
        .to(tabRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
        .to(tabConRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
    })

    // 🔥 Cleanup on resize/unmount
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="renewable-energy"
      className="relative overflow-hidden bg-[#06213c] py-14 lg:min-h-screen lg:py-0">
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
       
          <Image
           src={block?.i_1 ? (block.i_1.startsWith('http') ? block.i_1 : `${API_DOMAIN}${block.i_1}`) : '/explore-renewable-bg.jpg'}
            alt="Background"
            fill
            priority
            className="object-cover"
          />
      
      </div>
      <div className="absolute inset-0 bg-[#1C1C1E]/26"></div>

      <Tabs defaultValue={firstTabValue} className="h-full w-full">
        <div
          ref={containerRef}
          className="relative z-10 container mx-auto lg:h-full">
          <div
            className="grid h-full lg:grid-cols-2 lg:gap-12"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="lg:pt-36 lg:pb-20">
              <div className="lg:mb-12">
                <h3
                  ref={titleSubRef}
                  className={`pb-4 text-3xl font-normal text-white uppercase text-shadow-2xs lg:text-3xl xl:text-3xl ${isEn ? 'origin-left' : 'origin-right text-right'}`}
                  dangerouslySetInnerHTML={{ __html: block?.c_1 ?? '' }}
                />
                <div className="" ref={titleRef}>
                  {(list ?? []).map((item) => {
                    const tabValue = String(item.id)
                    return (
                    <TabsContent
                      key={item.id}
                      value={tabValue}
                      className="transition-all duration-500 ease-out data-[state=active]:translate-y-0 data-[state=active]:opacity-100 data-[state=inactive]:translate-y-4 data-[state=inactive]:opacity-0">
                      <h2
                        className={`pb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:text-5xl xl:text-6xl 2xl:text-6xl ${isEn ? 'origin-left' : 'origin-right text-right'}`}
                        dangerouslySetInnerHTML={{ __html: removeBr(item.c_1) }}
                      />
                    </TabsContent>
                    )
                  })}
                </div>
              </div>
              <div ref={tabRef}>
                <TabsList className="m-0 mb-6 grid h-full w-full grid-cols-2 gap-4 p-0 lg:mb-0 lg:grid-cols-2 lg:gap-8">
                  {(list ?? []).map((item) => {
                    const tabValue = String(item.id)
                    return (
                    <TabsTrigger
                      key={item.id}
                      value={tabValue}
                      className="!whitespace-wrap flex h-full w-full items-center justify-center bg-[#F1ECE3] px-4 py-4 text-[#6E7C87] uppercase transition duration-300 data-[state=active]:bg-[#B0DDFC] data-[state=active]:shadow-lg sm:data-[state=active]:shadow-none">
                      <span
                        className="text-center leading-tight"
                        dangerouslySetInnerHTML={{ __html: item.c_1 ?? '' }}
                      />
                    </TabsTrigger>
                    )
                  })}
                </TabsList>
              </div>
            </div>
            <div
              ref={tabConRef}
              className="bg-[#AFDDFC] px-8 py-10 lg:px-12 lg:pt-36 lg:pb-20">
              <div className="">
                {(list ?? []).map((item) => {
                  const tabValue = String(item.id)
                  return (
                  <TabsContent
                    key={item.id}
                    value={tabValue}
                    className="transition-all duration-500 ease-out data-[state=active]:translate-y-0 data-[state=active]:opacity-100 data-[state=inactive]:translate-y-4 data-[state=inactive]:opacity-0">
                    <div className="overflow-hidden rounded-lg">
                      <h4
                        className="mb-6 text-2xl font-medium text-[#434343]"
                        dangerouslySetInnerHTML={{ __html: item.c_2 ?? '' }}
                      />

                      <div
                        className={`mb-6 leading-relaxed text-[#434343] ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                        dangerouslySetInnerHTML={{ __html: item.c_3 ?? '' }}
                      />

                      {(item.i_1 || item.i_2) && (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                          {item.i_1 && (
                            <div className="overflow-hidden rounded-lg">
                              <Image
                                src={item.i_1.startsWith('http') ? item.i_1 : `${API_DOMAIN}${item.i_1}`}
                                width={420}
                                height={365}
                                className="h-full w-full object-cover"
                                alt={item.c_1 ?? 'Image'}
                              />
                            </div>
                          )}
                          {item.i_2 && (
                            <div className="overflow-hidden rounded-lg">
                              <Image
                                src={item.i_2.startsWith('http') ? item.i_2 : `${API_DOMAIN}${item.i_2}`}
                                width={420}
                                height={365}
                                className="h-full w-full object-cover"
                                alt={item.c_1 ?? 'Image'}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </section>
  )
}
