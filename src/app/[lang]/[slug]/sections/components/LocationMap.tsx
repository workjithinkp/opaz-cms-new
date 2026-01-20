'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { MdOutlineZoomOutMap } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface MapItem {
  sort?: string
  c_1?: string // Tooltip text
  c_2?: string // Top position
  c_3?: string // Left position
}

interface LocationMapProps {
  mapItems?: MapItem[]
  pointerLeft?: string
  pointerTop?: string
}

export default function LocationMap({
  mapItems = [],
  pointerLeft = '62%',
  pointerTop = '55%',
}: LocationMapProps) {
  const [zoomed, setZoomed] = useState(false)

  // Default positions for the 4 locations (Muscat, Sohar, Duqm, Salalah)
  const defaultPositions = [
    { top: '45%', left: '65%' }, // Point 1
    { top: '55%', left: '59%' }, // Point 2
    { top: '68%', left: '53%' }, // Point 3
    { top: '80%', left: '37%' }, // Point 4
  ]

  // Sort map items by sort field
  const sortedMapItems = [...mapItems].sort(
    (a, b) => (parseInt(a.sort || '0') || 0) - (parseInt(b.sort || '0') || 0)
  )

  return (
    <div
      id="strategic-advantages"
      className="location-map relative overflow-hidden">
      {/* 🔽 Minimize button */}
      <button
        onClick={() => setZoomed(false)}
        className={`absolute top-2 right-2 z-40 rounded-full bg-white/90 p-2 text-gray-900 shadow-lg transition-all duration-300 hover:bg-white ${zoomed ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'} `}
        aria-label="Minimize map">
        <MdOutlineZoomOutMap className="size-6" />
      </button>

      {/* 📍 MAP POINTS (dynamic from API) */}
      <div
        className={`absolute inset-0 z-30 transition-all duration-500 ease-out ${
          zoomed
            ? 'pointer-events-auto scale-100 opacity-100 delay-300'
            : 'pointer-events-none scale-95 opacity-0'
        } `}>
        {sortedMapItems.map((item, index) => {
          // Use API positions if provided, otherwise use default positions
          const position = defaultPositions[index] || { top: '50%', left: '50%' }
          
          return (
            <Button
              key={index}
              className="puls-anim absolute size-4.5 rounded-full p-0 transition-all duration-500"
              style={{
                top: item.c_2 || position.top,
                left: item.c_3 || position.left,
                transitionDelay: `${(index + 1) * 100}ms`,
              }}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="size-4.5 rounded-full bg-[#06213c]" />
                </TooltipTrigger>
                {item.c_1 && (
                  <TooltipContent className="max-w-44 bg-black text-white">
                    {item.c_1}
                  </TooltipContent>
                )}
              </Tooltip>
            </Button>
          )
        })}
      </div>

      {/* 🗺 MAP + ZOOM */}
      <div
        className="relative transition-transform duration-1000 ease-in-out"
        style={{
          transform: zoomed
            ? `translate(
                calc(-140% - ${pointerLeft}),
                calc(8% - ${pointerTop})
              ) scale(17)`
            : 'scale(1)',
        }}>
        {/* 🎯 ZOOM TRIGGER (Oman) */}
        <div
          className={`puls-anim absolute start-[62%] top-[50%] z-30 size-4.5 cursor-pointer rounded-full bg-[#06213c] transition-all duration-500 ease-out ${
            zoomed
              ? 'pointer-events-none scale-75 opacity-0'
              : 'pointer-events-auto scale-100 opacity-100 delay-700'
          } `}
          onClick={() => setZoomed(true)}
        />

        {/* 🗺 Map Image */}
        <Image
          src="/world-map.svg"
          alt="World Map"
          width={4748}
          height={2349}
          priority
          className="pointer-events-none relative select-none"
        />
      </div>
    </div>
  )
}
