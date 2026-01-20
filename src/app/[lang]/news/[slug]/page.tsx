'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import { useTranslations } from '@/lib/useTranslations'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineDateRange } from 'react-icons/md'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

gsap.registerPlugin(ScrollTrigger)

type NewsDetails = {
  id: number
  t_1: string
  c_1: string
  c_2: string
  c_3: string
  i_1: string
  i_2: string
  date_1: string
  slug: string
  type: string
  template: string
  published: number
  created_at: string
  updated_at: string
}

type ApiResponse = {
  status: number
  message: string
  data: NewsDetails
}

export default function NewsDetailsPage() {
  const { slug } = useParams<{ slug: string }>()
  const { lang } = useLang()
  const t = useTranslations()
  const isEn = lang === 'en'

  const [news, setNews] = useState<NewsDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const formRef = useRef<HTMLDivElement | null>(null)
  const galitemsRef = useRef<HTMLDivElement | null>(null)

  // GSAP SCROLL ANIMATION
  useGSAP(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !formRef.current ||
      !galitemsRef.current
    )
      return

    gsap.set(titleRef.current, { opacity: 0, scale: 6 })

    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: true,
          pin: true,
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
        formRef.current.children,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.25,
        },
        '-=0.3'
      )
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
  }, [])

  useEffect(() => {
    if (!slug || !lang) return

    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/news-details/${lang}/${slug}`)
        if (!res.ok) throw new Error('Failed to fetch')

        const json: ApiResponse = await res.json()
        if (json.status !== 1 || !json.data) {
          throw new Error('Not found')
        }

        setNews(json.data)
      } catch (e: any) {
        setError(e.message || 'Error loading news')
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [slug, lang])

  if (loading) {
    return (
      <section className="min-h-screen bg-[#06213c] pt-24 text-white">
        <div className="container mx-auto max-w-5xl px-4">{t('loading')}</div>
      </section>
    )
  }

  if (error || !news) {
    return (
      <section className="min-h-screen bg-[#06213c] pt-24 text-white">
        <div className="container mx-auto max-w-5xl px-4">
          {error ? t('errorLoadingNews') : t('newsNotFound')}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#06213c] pt-4 text-white lg:pt-36 lg:pb-24">
      {/* Content */}
      <div className="relative z-30 container mx-auto pb-4">
        {/* TITLE */}
        <h2
          ref={titleRef}
          className={`text-3x pb-4 text-center font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:pb-7 lg:text-5xl xl:pb-14 xl:text-6xl 2xl:text-8xl`}>
          {t('latestNews')}
        </h2>

        <div className="" ref={formRef}></div>

        <div className="" ref={galitemsRef}>
          <div className="rounded-xl border border-[#b0ddfc] bg-[#b0ddfc]/50 px-4 py-4 text-white lg:px-12 lg:py-12">
            <div className="mb-4 border-b border-b-white/50 pb-4">
              <h3 className="line-clamp-1 text-2xl font-medium uppercase">
                {news.c_1 || news.t_1}
              </h3>
              <div className="date mb-3.5 flex items-center gap-2">
                <MdOutlineDateRange />
                <div>{news.date_1}</div>
              </div>
            </div>
            {news.i_1 && (
              <Image
                src={news.i_1}
                alt={news.c_1 || news.t_1}
                width={1200}
                height={675}
                className="h-full w-full object-cover mb-6 rounded-lg"
                unoptimized
              />
            )}
            <div className="">
              {news.c_2 && (
                <p className="mb-4 text-lg text-gray-100">
                  {news.c_2}
                </p>
              )}

              {news.c_3 && (
                <article
                  className="prose prose-invert hide-br line-height-lg my-6 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: news.c_3,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
