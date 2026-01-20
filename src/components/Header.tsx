'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import DropMenu from './DropMenu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from '@/context/LangContext'
import { useClickOutside } from './hooks/useClickOutside'
import { fetchMenus, type Menu } from '@/lib/api'

/*  TYPES  */
type MarqueeItem = {
  c_1: string | null
  sort?: string | number
}

type ApiResponse = {
  status: number
  data: MarqueeItem[]
  message: string
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [menuData, setMenuData] = useState<Menu | null>(null)
  const [marqueeTexts, setMarqueeTexts] = useState<string[]>([])

  const headerRef = useRef<HTMLDivElement | null>(null)
  const marqueeRef = useRef<HTMLDivElement | null>(null)
  const lastScrollY = useRef(0)
  
  // Close language dropdown when clicking outside
  const langDropdownRef = useClickOutside<HTMLDivElement>(() => {
    setLangOpen(false)
  })

  const { lang, locales, switchLanguage } = useLang()
  const pathname = usePathname()

  // Get current locale object
  const currentLocale = locales.find(l => l.locale === lang)
  const currentLangLabel = currentLocale?.name || lang.toUpperCase()

  /*HEADER ANIMATION*/
  // useEffect(() => {
  //   const header = headerRef.current
  //   if (!header) return

  //   gsap.set(header, { y: '-120%', opacity: 0 })

  //   const onLoaderFinished = () => {
  //     gsap.to(header, {
  //       y: 0,
  //       opacity: 1,
  //       duration: 1,
  //       ease: 'power4.out',
  //     })
  //   }

  //   window.addEventListener('loader-finished', onLoaderFinished)
  //   return () => window.removeEventListener('loader-finished', onLoaderFinished)
  // }, [])
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scroll DOWN → hide header
        gsap.to(header, {
          y: '-120%',
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      } else {
        // Scroll UP → show header
        gsap.to(header, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /*FETCH MENU DATA*/
  useEffect(() => {
    const loadMenu = async () => {
      const menu = await fetchMenus(lang)
      setMenuData(menu)
    }
    loadMenu()
  }, [lang])

  /*FETCH MARQUEE DATA*/
  useEffect(() => {
    const loadMarqueeTexts = async () => {
      try {
        const response = await fetch(
          `/api/header-scrolling-info/${lang}`,
          {
            method: 'GET',
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
            }
          }
        )
        const data: ApiResponse = await response.json()
        
        console.log('API Response:', data)
        
        if (data.status === 1 && data.data) {
          console.log('Raw data items:', data.data)
          
          // Sort by sort field and extract c_1 content (show all, even empty)
          const sorted = data.data
            .sort((a, b) => {
              const sortA = parseInt(a.sort as any) || 0
              const sortB = parseInt(b.sort as any) || 0
              return sortA - sortB
            })
            .map(item => item.c_1 as string)
          
          console.log('Marquee texts loaded:', sorted)
          setMarqueeTexts(sorted)
        }
      } catch (error) {
        console.error('Failed to fetch marquee texts:', error)
      }
    }
    
    loadMarqueeTexts()
  }, [lang])

  /*MARQUEE*/
  useEffect(() => {
    const track = marqueeRef.current
    if (!track || marqueeTexts.length === 0) return

    // Small delay to ensure DOM has rendered and scrollWidth is calculated
    const timer = setTimeout(() => {
      gsap.killTweensOf(track)

      const width = track.scrollWidth / 2
      if (width === 0) return // Exit if width is still 0

      const fromX = lang === 'ar' ? -width : 0
      const toX = lang === 'ar' ? 0 : -width

      gsap.set(track, { x: fromX })
      gsap.to(track, {
        x: toX,
        duration: 20,
        ease: 'none',
        repeat: -1,
      })
    }, 50)

    return () => {
      clearTimeout(timer)
      gsap.killTweensOf(track)
    }
  }, [lang, marqueeTexts])

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-6 z-50 opacity-0">
      <div className="container mx-auto">
        <div className="rounded-xl bg-[#2d86dd]/20 px-5 py-2 text-white backdrop-blur-md">
          <div className="flex items-center justify-between gap-6 lg:justify-around">
            {/* Logo */}
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault()
                  window.location.reload()
                }
              }}>
              <Image
                src="/opaz-logo.svg"
                alt="OPAZ Logo"
                width={410}
                height={82}
                priority
              />
            </Link>

            {/* Marquee */}
            <div className="marquee-mask relative hidden h-9 flex-1 items-center overflow-hidden rounded-sm bg-white/50 px-3 text-sm md:flex">
              <div
                ref={marqueeRef}
                className="inline-block whitespace-nowrap text-gray-900">
                {[...marqueeTexts, ...marqueeTexts].map((text, i) => (
                  <span key={i} className="mx-8 inline-block">
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Menu + Language */}
            <div className="flex items-center gap-3">
              {/* Menu Button */}
              <div
                className="menu-button flex w-10 cursor-pointer flex-col items-center space-y-2"
                onClick={() => setOpen(!open)}>
                <div
                  className={`grid w-full grid-cols-2 transition duration-300 ${open ? 'translate-y-3 rotate-45' : ''}`}>
                  <div className="h-1 w-full rounded-s-2xl bg-white"></div>
                  <div className="h-1 w-full rounded-e-2xl bg-white"></div>
                </div>
                <div
                  className={`h-1 rounded-2xl bg-white ${
                    open ? 'w-0' : 'w-full'
                  }`}
                />
                <div
                  className={`grid w-full grid-cols-2 transition duration-300 ${
                    open ? '-translate-y-3 -rotate-45' : ''
                  }`}>
                  <div className="h-1 w-full rounded-s-2xl bg-white"></div>
                  <div className="h-1 w-full rounded-e-2xl bg-white"></div>
                </div>
              </div>

              {open && (
                <DropMenu
                  menuData={menuData}
                  closeMenuExternally={() => setOpen(false)}
                  resetMenuIcon={() => setOpen(false)}
                />
              )}

              {/* Language Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-3 py-1 text-sm backdrop-blur-md hover:bg-white/20">
                  {currentLangLabel}
                  <span>▾</span>
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md border border-white/20 bg-[#0c213b] shadow-lg">
                    {locales.map((locale) => (
                      <button
                        key={locale.id}
                        onClick={() => {
                          switchLanguage(locale.locale)
                          document.documentElement.setAttribute('dir', locale.rtl === 1 ? 'rtl' : 'ltr')
                          setLangOpen(false)
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-white/10 ${
                          lang === locale.locale
                            ? 'bg-white/20 text-[#b0ddfc]'
                            : 'text-white'
                        }`}>
                        {locale.full_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
