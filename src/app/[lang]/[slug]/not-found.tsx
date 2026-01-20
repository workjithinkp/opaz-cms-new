'use client';

import { useLang } from '@/context/LangContext';
import { useTranslations } from '@/lib/useTranslations';

export default function NotFound() {
  const { lang } = useLang();
  const t = useTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t('pageNotFound')}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {t('pageNotFoundMessage')}
        </p>
        
        <div className="space-y-3">
          <a
            href="/"
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {t('goToHomepage')}
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="block w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            {t('goBack')}
          </button>
        </div>
      </div>
    </div>
  );
}
