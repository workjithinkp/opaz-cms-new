'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { IoIosArrowForward } from 'react-icons/io'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface CareerContactProps {
  section: PageSection
  lang: string
}

export default function CareerContact({ section, lang }: CareerContactProps) {
  const block = section.block
  const title = block?.c_1 || ''
  const description = block?.c_2 || ''
  const linkUrl = block?.t_1 || '/contact-us'

  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (
      !containerRef.current ||
      !imgRef.current ||
      !textRef.current ||
      !contentRef.current ||
      !btnRef.current
    ) {
      return
    }

    const mm = gsap.matchMedia()

    // 🖥 Desktop animation only
    mm.add('(min-width: 1024px)', () => {
      // Initial states
      gsap.set(textRef.current, { opacity: 0, y: 80 })
      gsap.set(contentRef.current, { opacity: 0, y: 80 })
      gsap.set(btnRef.current, { opacity: 0, y: 80 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        })
        .fromTo(
          imgRef.current,
          { scale: 1 },
          { scale: 2, ease: 'none', duration: 1 }
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 150, scale: 2 },
          { opacity: 1, y: 0, scale: 1, duration: 1 }
        )
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
        .to(btnRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
    })

    // 📱 Mobile / Tablet fallback (no pin, no scroll animation)
    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [imgRef.current, textRef.current, contentRef.current, btnRef.current],
        {
          clearProps: 'all',
          opacity: 1,
          scale: 1,
          y: 0,
        }
      )
    })
    return () => mm.kill()
  }, [])

  // Extract text content from HTML to prevent hydration errors
  const extractTextContent = (html: string) => {
    if (typeof window === 'undefined') {
      // Server-side: simple regex to strip HTML tags
      return html.replace(/<[^>]*>/g, '')
    }
    // Client-side: use DOM parser
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent || ''
  }

  const textContent = extractTextContent(description)

  return (
    <section
      ref={containerRef}
      className="relative flex w-full flex-col justify-center overflow-hidden pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div ref={imgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src="/career-future-bg.jpg"
          alt="Zoom"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#0080FF]/23"></div>
      <div className="relative z-30 container mx-auto max-w-[1000px]">
        <div className="w-full">
          {/* Text */}
          <h2
            ref={textRef}
            className={`relative z-20 mb-4 text-3xl font-light text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[80px] ${lang === 'ar' ? 'origin-right' : 'origin-left'} `}>
            {title}
          </h2>
          <p
            ref={contentRef}
            className="mb-4 text-lg text-white lg:mb-8 lg:text-xl">
            {textContent}
          </p>
          <div ref={btnRef} className="">
            <Link
              href={linkUrl}
              className="inline-flex items-center gap-4 rounded-sm border border-blue-300 bg-[#06213c] px-12 py-4 text-[#b0ddfc] uppercase transition duration-300 hover:bg-[#06213c] hover:bg-[#b0ddfc] hover:text-[#06213c]">
              Contact Us
              <span>
                <IoIosArrowForward
                  className={`ms-2 transition-transform ${
                    lang === 'ar' ? 'scale-x-[-1]' : ''
                  }`}
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
