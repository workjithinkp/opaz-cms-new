"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Locale } from "@/lib/api";

interface LangContextType {
  lang: string;
  locales: Locale[];
  currentLocale: Locale | null;
  setLang: (locale: string) => void;
  switchLanguage: (locale: string) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  locales: [],
  currentLocale: null,
  setLang: () => {},
  switchLanguage: () => {},
});

export function LangProvider({ 
  children,
  initialLang = "en",
  initialLocales = [],
}: { 
  children: React.ReactNode;
  initialLang?: string;
  initialLocales?: Locale[];
}) {
  const [lang, setLangState] = useState<string>(initialLang);
  const [locales, setLocales] = useState<Locale[]>(initialLocales);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch locales on mount if not provided
  useEffect(() => {
    if (locales.length === 0) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      fetch('/api/locales', {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      })
        .then(res => {
          clearTimeout(timeoutId);
          if (!res.ok) throw new Error('Failed to fetch locales');
          return res.json();
        })
        .then(data => {
          const localesList = Array.isArray(data) ? data : (data.data || []);
          const activeLocales = localesList.filter((l: Locale) => l.is_active === 1);
          setLocales(activeLocales);
        })
        .catch(err => {
          clearTimeout(timeoutId);
          if (err?.name === 'AbortError') return; // Ignore expected aborts (timeout/unmount)
          // Fallback to default locales when fetch fails
          setLocales([
            { id: 1, locale: 'en', full_name: 'English', name: 'EN', rtl: 0, is_default: 1, is_active: 1, sort: 1 },
            { id: 2, locale: 'ar', full_name: 'Arabic', name: 'AR', rtl: 1, is_default: 0, is_active: 1, sort: 2 },
          ]);
        });

      return () => {
        clearTimeout(timeoutId);
        controller.abort();
      };
    }
  }, []);

  // Get current locale object
  const currentLocale = locales.find(l => l.locale === lang) || null;

  // Set language and ensure translations are available
  const setLang = (locale: string) => {
    setLangState(locale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', locale);
      // Translations are automatically loaded from translations.json based on language
    }
  };

  // Switch language and update URL
  const switchLanguage = (newLocale: string) => {
    if (newLocale === lang) return;

    // Extract current slug from pathname
    // Pathname format: /[lang]/[slug] or /[lang]
    const pathParts = pathname?.split('/').filter(Boolean) || [];
    
    if (pathParts.length >= 2) {
      // Has lang and slug: /en/home -> /ar/home
      const currentSlug = pathParts.slice(1).join('/');
      router.push(`/${newLocale}/${currentSlug}`);
    } else if (pathParts.length === 1) {
      // Only lang: /en -> /ar
      router.push(`/${newLocale}`);
    } else {
      // Root: / -> /ar
      router.push(`/${newLocale}`);
    }

    setLang(newLocale);
  };

  return (
    <LangContext.Provider value={{ lang, locales, currentLocale, setLang, switchLanguage }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
