"use client";

import { useLang } from "@/context/LangContext";
import translations from "@/data/translations.json";

export function useTranslations() {
  const { lang } = useLang();

  const capitalizeFirst = (value: string) => {
    if (!value) return value;
    // Keep English labels starting with a capital letter for consistency
    return lang === "en"
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : value;
  };

  const t = (key: string, defaultValue?: string) => {
    const langTranslations = (translations as any)[lang];
    if (!langTranslations) {
      const enTranslations = (translations as any).en;
      return capitalizeFirst(enTranslations[key] || defaultValue || key);
    }
    return capitalizeFirst(langTranslations[key] || defaultValue || key);
  };

  return t;
}

export function useTranslationsObject() {
  const { lang } = useLang();
  return (translations as any)[lang] || (translations as any).en;
}
