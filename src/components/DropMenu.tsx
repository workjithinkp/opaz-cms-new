'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { GoCircle } from 'react-icons/go'
import { useLang } from '@/context/LangContext'
import { type Menu } from '@/lib/api'

/* -------------------------------------------------------------------------- */
/* HASH SCROLL HELPER */
/* -------------------------------------------------------------------------- */

const scrollToHashWhenReady = (hash: string) => {
  if (!hash) return

  let attempts = 0
  const maxAttempts = 100 // ~10 seconds

  const interval = setInterval(() => {
    const el = document.getElementById(hash)
    if (el) {
      // Wait for DOM to be fully painted
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      clearInterval(interval)
      return
    }

    attempts++
    if (attempts >= maxAttempts) {
      console.warn(`Element with id "${hash}" not found`)
      clearInterval(interval)
    }
  }, 100)
}

/* -------------------------------------------------------------------------- */
/* COMPONENT */
/* -------------------------------------------------------------------------- */

export default function DropMenu({
  menuData,
  closeMenuExternally,
  resetMenuIcon,
}: {
  menuData: Menu | null
  closeMenuExternally?: () => void
  resetMenuIcon?: () => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { lang } = useLang()

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Return null if no menu data
  if (!menuData?.items || menuData.items.length === 0) {
    return (
      <div className="drop-menu absolute end-0 top-full z-50 max-w-96 min-w-96 rounded-xl border border-[#b0ddfc] p-6">
        <div className="text-center text-white/60">No menu items available</div>
        <div className="absolute inset-0 -z-10 bg-[#2d86dd]/20 backdrop-blur-md" />
      </div>
    )
  }

  const handleNavigate = async (url: string) => {
    if (!url) return

    setIsLoading(true)
    setOpenIndex(null)

    closeMenuExternally?.()
    resetMenuIcon?.()

    // External links
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer')
      setIsLoading(false)
      return
    }

    const [pathname, hash] = url.split('#')
    
    // Ensure locale prefix is in URL
    let finalPath = pathname
    if (!pathname.startsWith(`/${lang}/`)) {
      // Remove any existing locale prefix and add the current one
      const cleanPath = pathname.replace(/^\/[a-z]{2}\//, '/')
      finalPath = `/${lang}${cleanPath}`
    }
    
    // Check if already on same page
    const isSamePage = window.location.pathname === finalPath

    if (isSamePage && hash) {
      // Already on same page, just scroll to hash
      scrollToHashWhenReady(hash)
      setIsLoading(false)
    } else {
      // Navigate to different page
      await router.push(finalPath)
      
      if (hash) {
        // Increase delay to ensure page is fully rendered before scrolling
        setTimeout(() => {
          scrollToHashWhenReady(hash)
        }, 1000)
      }
      setIsLoading(false)
    }
  }

  // Filter top-level items (no parent_id) and sort by sort order
  const topLevelItems = menuData.items
    .filter(item => !item.parent_id)
    .sort((a, b) => a.sort - b.sort)

  return (
    <div className="drop-menu absolute end-0 top-full z-50 max-w-96 min-w-96 rounded-xl border border-[#b0ddfc] p-6">
      {/* LOADING */}
      {isLoading && (
        <div className="mb-3 flex items-center gap-2 text-white">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <span>Loading...</span>
        </div>
      )}

      {/* MENU */}
      <div className="relative z-10 flex flex-col space-y-4">
        {topLevelItems.map((item, index) => {
          const isOpen = openIndex === index
          const hasChildren = !!item.children?.length

          return (
            <div key={`${item.id}`}>
              {/* PARENT */}
              <div className="flex items-center justify-between text-lg font-semibold text-white">
                <button
                  onClick={() => item.url && handleNavigate(item.url)}
                  disabled={!item.url}
                  className={`group flex-1 ${
                    item.url ? 'cursor-pointer' : 'cursor-default'
                  } ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  {item.title}
                  {item.url && (
                    <div className="h-px w-0 border-b border-white/50 transition-all group-hover:w-full" />
                  )}
                </button>

                {hasChildren && (
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="cursor-pointer p-1">
                    <IoIosArrowDown
                      className={`transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* CHILDREN */}
              {hasChildren && (
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? 'mt-2 max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <div
                    className={`flex flex-col gap-2 text-sm text-white/80 ${
                      lang === 'ar' ? 'pr-4 text-right' : 'pl-4 text-left'
                    }`}>
                    {item.children!.map((child) => (
                      <button
                        key={`${child.id}`}
                        onClick={() => child.url && handleNavigate(child.url)}
                        className="group flex cursor-pointer items-start gap-2 transition hover:text-white">
                        <GoCircle className="mt-1 size-2" />
                        {child.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* BACKDROP */}
      <div className="absolute inset-0 -z-10 bg-[#2d86dd]/20 backdrop-blur-md" />
    </div>
  )
}
