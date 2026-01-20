'use client';

import { useEffect } from 'react';
import { LangProvider } from '@/context/LangContext';
import { Locale } from '@/lib/api';

interface LangLayoutClientProps {
  children: React.ReactNode;
  lang: string;
  locales: Locale[];
}

export default function LangLayoutClient({ children, lang, locales }: LangLayoutClientProps) {
  useEffect(() => {
    // Set document direction - only Arabic is RTL
    const isRtl = lang === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang, locales]);

  return (
    <LangProvider initialLang={lang} initialLocales={locales}>
      {children}
    </LangProvider>
  );
}
