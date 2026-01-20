export type LanguageCode = 'en' | 'ar' | 'es' | 'zh' | 'fr' | 'de' | 'ja' | 'ru'

export interface LocalizedString {
  en: string
  ar: string
  es: string
  zh: string
  fr: string
  de: string
  ja: string
  ru: string
}

export interface FooterLink {
  href: string
  label: LocalizedString
}

export interface SiteMapSection {
  title: LocalizedString
  links: FooterLink[]
}

export interface ContactValue {
  label: LocalizedString
  value: string
}

export interface ContactSection {
  title: LocalizedString
  localCall: ContactValue
  internationalCall: ContactValue
  email: string
  address: LocalizedString
}

export interface FooterData {
  siteMap: SiteMapSection
  usefulLinks: SiteMapSection
  contact: ContactSection
  copyright: LocalizedString
}
