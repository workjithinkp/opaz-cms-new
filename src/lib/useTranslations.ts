"use client";

import { useLang } from "@/context/LangContext";
import translations from "@/data/translations.json";

export function useTranslations() {
  const { lang } = useLang();

  const t = (key: string, defaultValue?: string) => {
    const langTranslations = (translations as any)[lang];
    if (!langTranslations) {
      const enTranslations = (translations as any).en;
      return enTranslations[key] || defaultValue || key;
    }
    return langTranslations[key] || defaultValue || key;
  };

  return t;
}

export function useTranslationsObject() {
  const { lang } = useLang();
  return (translations as any)[lang] || (translations as any).en;
}
