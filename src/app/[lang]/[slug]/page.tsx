import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { fetchPageData, fetchLocales } from '@/lib/api';
import SectionRenderer from './SectionRenderer';
import LangLayout from '../LangLayout';

// Allow dynamic rendering and params
export const dynamic = 'force-dynamic';
export const revalidate = 0; // No caching - always fresh data

interface PageProps {
  params: {
    lang: string;
    slug: string;
  };
}

export default async function DynamicPage(props: PageProps) {
  const params = await Promise.resolve(props.params);
  const { lang, slug } = params;

  // Fetch page data and locales
  const [pageData, locales] = await Promise.all([
    fetchPageData(lang, slug),
    fetchLocales(),
  ]);

  // Validate locale
  const validLocale = locales.some((l) => l.locale === lang);
  if (!validLocale) {
    notFound();
  }

  if (!pageData) {
    notFound();
  }

  // Get sections from page data
  const sections = pageData.sections || [];

  const activeSections = sections
    .filter((section) => section.page_section_status === 1)
    .sort((a, b) => a.section_sort - b.section_sort);

  return (
    <LangLayout lang={lang} locales={locales}>
      <div className="dynamic-page">
        {activeSections && activeSections.length > 0 ? (
          activeSections.map((section) => (
            <Fragment key={section.id}>
              <SectionRenderer section={section} lang={lang} slug={slug} />
            </Fragment>
          ))
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <p>No content available</p>
          </div>
        )}
      </div>
    </LangLayout>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await Promise.resolve(props.params);
  const { lang, slug } = params;
  const pageData = await fetchPageData(lang, slug);

  if (!pageData) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: pageData.seo_title || pageData.title || pageData.name,
    description: pageData.seo_description || '',
    keywords: pageData.seo_keywords || '',
  };
}
