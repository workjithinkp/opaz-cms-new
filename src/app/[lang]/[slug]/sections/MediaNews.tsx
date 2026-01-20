'use client'

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineDateRange } from 'react-icons/md'
import { PageSection, API_DOMAIN } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useTranslations } from '@/lib/useTranslations'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

gsap.registerPlugin(ScrollTrigger)

interface MediaNewsProps {
  section: PageSection & { news?: any[] }
  lang: string
}

export default function MediaNews({ section, lang }: MediaNewsProps) {
  const t = useTranslations()
  const isEn = lang === 'en'
  const news = (section as any).news || []
  const block = section.block

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const galitemsRef = useRef<HTMLDivElement | null>(null)

  if (!news || news.length === 0) return null

  // Calculate pagination
  const totalPages = Math.ceil(news.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = news.slice(startIndex, endIndex)

  // Generate page numbers array
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }
    return pages
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    // Scroll to pagination or top of section
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // GSAP SCROLL ANIMATION
  useGSAP(() => {
    if (!containerRef.current || !titleRef.current || !galitemsRef.current)
      return

    gsap.set(titleRef.current, { opacity: 0, scale: 6 })

    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: false,
          pin: false,
          markers: false,
        },
      })
      // 1. Title zoom-in
      .to(titleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      })
      .from(
        galitemsRef.current.children,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.25,
        },
        '-=0.3'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex overflow-hidden bg-[#06213c] pt-14 pb-10 text-white lg:min-h-screen lg:pt-36 lg:pb-24">
      {/* Content */}
      <div className="relative z-30 container mx-auto">
        {/* TITLE */}
        <h2
          ref={titleRef}
          className={`text-3x mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${isEn ? 'origin-left' : 'origin-right text-right'}`}>
          {block?.c_1 || t('latestNews')}
        </h2>

        <div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          ref={galitemsRef}>
          {currentItems.map((item: { i_1: string; date_1: string; slug: any; id: Key | null | undefined; c_1: any; t_1: any; c_2: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => {
            const imageUrl = item.i_1 && item.i_1.startsWith('http')
              ? item.i_1
              : item.i_1
              ? `${API_DOMAIN}${item.i_1}`
              : '/news-placeholder.jpg'

            const newsDate = item.date_1 || ''

            return (
              <Link href={`/${lang}/news/${item.slug || item.id}`} key={item.id}>
                <div className="group relative h-58 overflow-hidden rounded-2xl lg:h-58 2xl:h-50">
                  <div className="absolute inset-0 z-20 flex flex-col items-start justify-end p-8 text-white">
                    <h3 className="line-clamp-2 text-2xl font-medium uppercase mb-2">
                      {item.c_1 || item.t_1}
                    </h3>

                    {item.c_2 && (
                      <p className="line-clamp-2 text-sm mb-3 leading-relaxed">
                        {item.c_2}
                      </p>
                    )}

                    <div className="date flex items-center gap-2">
                      <MdOutlineDateRange />
                      <div>{newsDate}</div>
                    </div>
                  </div>

                  <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(111,171,230,0.27)] to-[rgba(111,171,230,0.84)]" />

                  <Image
                    src={imageUrl}
                    alt={item.c_1 || item.t_1 || 'News'}
                    fill
                    loading="lazy"
                    className="object-cover object-top transition-all duration-500 group-hover:scale-125 group-hover:opacity-65"
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={cn(
                      'cursor-pointer hover:bg-white/10',
                      currentPage === 1 && 'pointer-events-none opacity-50',
                      'rtl:[&_svg]:rotate-180',
                      `rtl:after:ms-2 rtl:after:content-["${t('previous')}"] rtl:[&_span]:hidden`
                    )}
                  />
                </PaginationItem>

                {/* Pages */}
                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(page as number)}
                        isActive={currentPage === page}
                        className={cn(
                          'cursor-pointer',
                          currentPage === page
                            ? 'bg-white text-[#06213c]'
                            : 'hover:bg-white/10'
                        )}>
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={cn(
                      'cursor-pointer hover:bg-white/10',
                      currentPage === totalPages &&
                        'pointer-events-none opacity-50',
                      'rtl:[&_svg]:rotate-180',
                      `rtl:after:me-2 rtl:after:content-["${t('next')}"] rtl:[&_span]:hidden`
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  )
}
