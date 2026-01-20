'use client'

import Link from 'next/link'
import Image from 'next/image'
import footer from '@/data/footer.json'
import { useLang } from '@/context/LangContext'
import { useState, useEffect } from 'react'
import { fetchMenus, type Menu } from '@/lib/api'
import type { FooterData, LanguageCode } from '@/types/footer'

export default function Footer() {
  const { lang } = useLang() as { lang: LanguageCode }
  const typedFooter = footer as FooterData
  const [menusData, setMenusData] = useState<any>(null)
  const [socialMedia, setSocialMedia] = useState<any>(null)
  const [contactInfo, setContactInfo] = useState<any>(null)

  // Fetch menus on mount and language change
  useEffect(() => {
    const loadMenus = async () => {
      try {
        const response = await fetch(`/api/menus/${lang}`)
        const result = await response.json()
        if (result.status === 1) {
          setMenusData(result.data)
        }
      } catch (error) {
        console.error('Failed to load footer menus:', error)
      }
    }
    loadMenus()
  }, [lang])

  // Fetch social media links
  useEffect(() => {
    const loadSocialMedia = async () => {
      try {
        const response = await fetch('/api/settings/social-media')
        const result = await response.json()
        if (result.success) {
          setSocialMedia(result.data.social_media)
        }
      } catch (error) {
        console.error('Failed to load social media:', error)
      }
    }
    loadSocialMedia()
  }, [])

  // Fetch contact info
  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const response = await fetch('/api/settings/footer-contact')
        const result = await response.json()
        if (result.success) {
          setContactInfo(result.data.contact)
        }
      } catch (error) {
        console.error('Failed to load contact info:', error)
      }
    }
    loadContactInfo()
  }, [])

  const toArabicNumber = (num: string) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
    return num.replace(/\d/g, (d) => arabicNumbers[Number(d)])
  }

  return (
    <footer className="w-full bg-[#06213c] px-4 py-8 text-white">
      <div className="rounded-2xl bg-[#f9f3e5] px-4 text-[#838383]">
        <div className="container mx-auto">

          {/* TOP */}
          <div className="md:flex justify-between gap-6 border-b border-[#ecd6c1] py-8">

            {/* SITE MAP */}
            <div className='md:pb-0 mb-6'>
              <h3 className="pb-4 font-semibold uppercase text-gray-900">
                {typedFooter.siteMap.title[lang]}
              </h3>
              <ul className="space-y-2">
                {menusData?.menu3?.items && menusData.menu3.items.length > 0 ? (
                  menusData.menu3.items
                    .filter((item: any) => !item.parent_id)
                    .sort((a: any, b: any) => a.sort - b.sort)
                    .map((item: any) => {
                      let title = item.title
                      try {
                        const parsed = JSON.parse(item.title)
                        title = parsed[lang] || item.title
                      } catch {
                        // Keep original title if not JSON
                      }
                      
                      let url = item.url || '#'
                      if (url && !url.startsWith('http') && !url.startsWith(`/${lang}/`)) {
                        url = `/${lang}${url.startsWith('/') ? '' : '/'}${url}`
                      }
                      
                      return (
                        <li key={item.id}>
                          <Link
                            href={url}
                            target={item.target}
                            className='group relative inline-block transition-all hover:text-gray-900'>
                            {title}
                            <span className="liner"></span>
                          </Link>
                        </li>
                      )
                    })
                ) : (
                  typedFooter.siteMap.links.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className='group relative inline-block transition-all hover:text-gray-900'>
                        {item.label[lang]}
                        <span className="liner"></span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* USEFUL LINKS */}
            <div className='md:pb-0 mb-6'>
              <h3 className="pb-4 font-semibold uppercase text-gray-900">
                {typedFooter.usefulLinks.title[lang]}
              </h3>
              <ul className="space-y-2">
                {menusData?.menu4?.items && menusData.menu4.items.length > 0 ? (
                  menusData.menu4.items
                    .filter((item: any) => !item.parent_id)
                    .sort((a: any, b: any) => a.sort - b.sort)
                    .map((item: any) => {
                      let title = item.title
                      try {
                        const parsed = JSON.parse(item.title)
                        title = parsed[lang] || item.title
                      } catch {
                        // Keep original title if not JSON
                      }
                      
                      const url = item.url || '#'
                      
                      return (
                        <li key={item.id}>
                          <Link
                            href={url}
                            target={item.target}
                            className='group relative inline-block transition-all hover:text-gray-900'>
                            {title}
                            <span className="liner"></span>
                          </Link>
                        </li>
                      )
                    })
                ) : (
                  typedFooter.usefulLinks.links.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className='group relative inline-block transition-all hover:text-gray-900'>
                        {item.label[lang]}
                        <span className="liner"></span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* CONTACT */}
            <div className='md:pb-0 mb-6 md:max-w-2xs'>
              <h3 className="pb-4 font-semibold uppercase text-gray-900">
                {contactInfo?.title || typedFooter.contact.title[lang]}
              </h3>

              <p>
                {contactInfo?.local_call?.label || typedFooter.contact.localCall.label[lang]} <br />
                <span className='font-medium' dir="ltr">
                  {contactInfo?.local_call?.number || typedFooter.contact.localCall.value}
                </span>
              </p>

              <p className="mt-2">
                {contactInfo?.international_call?.label || typedFooter.contact.internationalCall.label[lang]} <br />
                <span className='font-medium' dir="ltr">
                  {contactInfo?.international_call?.number || typedFooter.contact.internationalCall.value}
                </span>
              </p>

              <p dir="ltr" className="mt-2">
                {contactInfo?.email || typedFooter.contact.email}
              </p>

              <p className="mt-2">
                {contactInfo?.address || typedFooter.contact.address[lang]}
              </p>
              
              <div className="flex items-center space-x-7 text-2xl text-[#9d6d53] pt-4">
                {socialMedia ? (
                  <>
                    {socialMedia.facebook && (
                      <Link
                        href={socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                          src="/social-media-01.svg"
                          width={100}
                          height={100}
                          className="w-[24px]"
                          alt="Facebook"
                        />
                      </Link>
                    )}
                    {socialMedia.instagram && (
                      <Link
                        href={socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                          src="/social-media-02.svg"
                          width={100}
                          height={100}
                          className="w-[24px]"
                          alt="Instagram"
                        />
                      </Link>
                    )}
                    {socialMedia.whatsapp && (
                      <Link
                        href={socialMedia.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                          src="/social-media-03.svg"
                          width={100}
                          height={100}
                          className="w-[24px]"
                          alt="WhatsApp"
                        />
                      </Link>
                    )}
                    {socialMedia.twitter && (
                      <Link
                        href={socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                          src="/social-media-04.svg"
                          width={100}
                          height={100}
                          className="w-[24px]"
                          alt="Twitter"
                        />
                      </Link>
                    )}
                    {socialMedia.youtube && (
                      <Link
                        href={socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                          src="/social-media-05.svg"
                          width={100}
                          height={100}
                          className="w-[24px]"
                          alt="YouTube"
                        />
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      href="https://www.facebook.com/omanopaz"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Image
                        src="/social-media-01.svg"
                        width={100}
                        height={100}
                        className="w-[24px]"
                        alt="Facebook"
                      />
                    </Link>
                    <Link
                      href="https://www.instagram.com/omanopaz/"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Image
                        src="/social-media-02.svg"
                        width={100}
                        height={100}
                        className="w-[24px]"
                        alt="Instagram"
                      />
                    </Link>
                    <Link
                      href="https://api.whatsapp.com/send/?phone=96871144433&text&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Image
                        src="/social-media-03.svg"
                        width={100}
                        height={100}
                        className="w-[24px]"
                        alt="WhatsApp"
                      />
                    </Link>
                    <Link
                      href="https://x.com/OmanOpaz"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Image
                        src="/social-media-04.svg"
                        width={100}
                        height={100}
                        className="w-[24px]"
                        alt="Twitter"
                      />
                    </Link>
                    <Link
                      href="https://www.youtube.com/channel/UCuMqLcSCixwDsHvQCRoDjEw"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Image
                        src="/social-media-05.svg"
                        width={100}
                        height={100}
                        className="w-[24px]"
                        alt="YouTube"
                      />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM */}



          <div className="grid md:grid-cols-3 items-end px-3 py-4 md:px-0">
            <div className="hidden md:flex">
              <Image
                src="/opaz-logo-footer.png"
                alt="Logo"
                width={410}
                height={82}
                priority
              />
            </div>

            <div className="text-center text-sm font-medium text-gray-900 uppercase">
              {typedFooter.copyright[lang]}
            </div>

            <div className="flex items-end md:justify-end justify-center">
              <Image
                src="/2040-logo.png"
                alt="Vision Logo"
                width={82}
                height={103}
                priority
              />
            </div>
          </div>








        </div>
      </div>
    </footer>
  )
}
