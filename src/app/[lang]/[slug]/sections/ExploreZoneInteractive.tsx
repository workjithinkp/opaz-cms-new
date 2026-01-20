'use client'

import { useLang } from '@/context/LangContext'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PageSection } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

interface ExploreZoneInteractiveProps {
  section: PageSection
}

export default function ExploreZoneInteractive({ section }: ExploreZoneInteractiveProps) {
  const { lang } = useLang()
  const isEn = lang === 'en'
  const { block, list } = section

  if (!block || !list) {
    return null
  }

  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const tableRef = useRef<HTMLDivElement | null>(null)
  const tableBtnRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (window.innerWidth <= 1024) {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      gsap.globalTimeline.clear()
      return
    }

    if (
      !containerRef.current ||
      !titleRef.current ||
      !textRef.current ||
      !tableRef.current ||
      !tableBtnRef.current
    )
      return

    gsap.set(titleRef.current, { opacity: 0, y: 150, scale: 2 })
    gsap.set(textRef.current, { opacity: 0, y: 80 })
    gsap.set(tableRef.current, { opacity: 0, y: 80 })
    gsap.set(tableBtnRef.current, { opacity: 0, y: 80 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: true,
        pin: true,
      },
    })

    tl.to(titleRef.current, { opacity: 1, y: 0, scale: 1, duration: 1 })
      .to(textRef.current, { opacity: 1, y: 0, duration: 1 })
      .to(tableRef.current, { opacity: 1, y: 0, duration: 1 })
      .to(tableBtnRef.current, { opacity: 1, y: 0, duration: 1 })
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#06213c] pt-14 pb-10 lg:min-h-screen lg:pt-36 lg:pb-24">
      <div className="relative z-30 container mx-auto">
        <div className="mb-12">
          <h2
            ref={titleRef}
            className={`mb-4 text-3xl font-normal text-[#b0ddfc] uppercase text-shadow-2xs lg:mb-8 lg:text-6xl 2xl:text-[70px] ${isEn ? 'origin-left' : 'origin-right text-right'}`}
            dangerouslySetInnerHTML={{ __html: block.c_1 || '' }}
          />
          <p
            ref={textRef}
            className="mb-4 text-lg text-white lg:mb-8 lg:text-xl"
            dangerouslySetInnerHTML={{ __html: block.c_2 || '' }}
          />
        </div>

        <div
          ref={tableRef}
          className="mb-6 overflow-hidden rounded-lg border border-[#AFDDFC] bg-[#6FABE6]/58">
          <Table className="w-full border-collapse text-white">
            <TableHeader>
              <TableRow className="!border-b !border-[#DAF0FE]/20">
                <TableHead className="px-4 py-4 text-center">
                  {lang === 'en' ? `No.` : `رقم`}
                </TableHead>
                <TableHead className="px-4 py-4">
                  {lang === 'en' ? `Location` : `الموقع`}
                </TableHead>
                <TableHead className="px-4 py-4">
                  {lang === 'en' ? `Sectors` : `القطاعات`}
                </TableHead>
                <TableHead className="px-4 py-4">
                  {lang === 'en' ? `Ports and Customs` : `الموانئ والجمارك`}
                </TableHead>
                <TableHead className="px-4 py-4">
                  {lang === 'en' ? `Rental Rates` : `الرسوم الإيجارية`}
                </TableHead>
                <TableHead className="px-4 py-4">
                  {lang === 'en' ? `Utilities` : `الخدمات`}
                </TableHead>
                <TableHead className="px-4 py-4">
                  {lang === 'en' ? `Localization` : `التعمين`}
                </TableHead>
                <TableHead className="px-4 py-4">
                  {lang === 'en' ? `Tax` : `الضرائب`}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="border-b border-[#DAF0FE]/20">
                  <TableCell className="px-4 py-4 text-center whitespace-normal">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-4 whitespace-normal">
                    {item.c_1}
                  </TableCell>
                  <TableCell className="px-4 py-4 whitespace-normal">
                    {item.c_2}
                  </TableCell>
                  <TableCell className="px-4 py-4 whitespace-normal">
                    {item.c_3}
                  </TableCell>
                  <TableCell className="px-4 py-4 whitespace-normal">
                    {item.c_4}
                  </TableCell>
                  <TableCell className="px-4 py-4 whitespace-normal">
                    {item.c_5}
                  </TableCell>
                  <TableCell className="px-4 py-4 whitespace-normal">
                    {item.c_6}
                  </TableCell>
                  <TableCell className="px-4 py-4 whitespace-normal">
                    {item.c_7}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div ref={tableBtnRef}>
          <Link
            href={block.t_1 || 'https://omap.om/'}
            target="_blank"
            className="inline-flex items-center rounded-sm border border-blue-300 bg-blue-300/30 px-6 py-3 text-[#b0ddfc] uppercase transition hover:bg-[#0c213b]">
            {block.c_3 || (lang === 'en' ? `EXPLORE OUR ZONES` : `اكتشف مناطقنا`)}{' '}
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </section>
  )
}
