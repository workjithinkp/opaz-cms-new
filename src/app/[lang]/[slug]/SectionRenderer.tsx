'use client';

import React from 'react';
import { PageSection } from '@/lib/api';
import dynamic from 'next/dynamic';

// Home sections - dynamic imports for code splitting (client-side only)
const HomeBanner = dynamic(() => import('./sections/HomeBanner'));
const HomeGateway = dynamic(() => import('./sections/HomeGateway'));
const HomeFreedom = dynamic(() => import('./sections/HomeFreedom'));
const HomeFeatures = dynamic(() => import('./sections/HomeFeatures'));
const HomeEntry = dynamic(() => import('./sections/HomeEntry'));
const HomeNewsletter = dynamic(() => import('./sections/HomeNewsletter'));

// About sections - dynamic imports for code splitting (client-side only)
const AboutBanner = dynamic(() => import('./sections/AboutBanner'));
const AboutWhoAreWe = dynamic(() => import('./sections/AboutWhoAreWe'));
const AboutRoles = dynamic(() => import('./sections/AboutRoles'));
const AboutBOD = dynamic(() => import('./sections/AboutBOD'));
const AboutAchievements = dynamic(() => import('./sections/AboutAchievements'));

// Why Oman sections - dynamic imports for code splitting (client-side only)
const WhyOmanGateway = dynamic(() => import('./sections/WhyOmanGateway'));
const WhyOmanStrategicAdvantages = dynamic(() => import('./sections/WhyOmanStrategicAdvantages'));
const WhyOmanInvestment = dynamic(() => import('./sections/WhyOmanInvestment'));

// Invest Oman sections - dynamic imports for code splitting (client-side only)
const InvestBanner = dynamic(() => import('./sections/InvestBanner'));
const InvestInOman = dynamic(() => import('./sections/InvestInOman'));
const InvestSuccessStories = dynamic(() => import('./sections/InvestSuccessStories'));
const InvestResources = dynamic(() => import('./sections/InvestResources'));
const InvestContact = dynamic(() => import('./sections/InvestContact'));

// Explore Zones sections - dynamic imports for code splitting (client-side only)
const ExploreZoneInteractive = dynamic(() => import('./sections/ExploreZoneInteractive'));
const ExploreZoneGateway = dynamic(() => import('./sections/ExploreZoneGateway'));
const ExploreZoneFindTheKey = dynamic(() => import('./sections/ExploreZoneFindTheKey'));

// Media sections - dynamic imports for code splitting (client-side only)
const MediaBanner = dynamic(() => import('./sections/MediaBanner'));
const MediaNews = dynamic(() => import('./sections/MediaNews'));
const MediaAnnualReport = dynamic(() => import('./sections/MediaAnnualReport'));
const MediaInvestorResources = dynamic(() => import('./sections/MediaInvestorResources'));

// Contact sections - dynamic imports for code splitting (client-side only)
const Contact = dynamic(() => import('./sections/Contact'));
const ContactForm = dynamic(() => import('./sections/ContactForm'));

// Career sections - dynamic imports for code splitting (client-side only)
const CareerBanner = dynamic(() => import('./sections/CareerBanner'));
const CareerContact = dynamic(() => import('./sections/CareerContact'));
const CareerWorkplace = dynamic(() => import('./sections/CareerWorkplace'));
const CareerVacancy = dynamic(() => import('./sections/CareerVacancy'));

// Privacy Policy / Terms sections - dynamic imports for code splitting (client-side only)
const PrivacyPolicyBanner = dynamic(() => import('./sections/PrivacyPolicyBanner'));
const PrivacyPolicyInfo = dynamic(() => import('./sections/PrivacyPolicyInfo'));

interface SectionRendererProps {
  section: PageSection;
  lang: string;
  slug?: string;
}

export default function SectionRenderer({ section, lang, slug }: SectionRendererProps) {
  const template = section.section?.template;

  switch (template) {
    // Home sections
    case 'home-banner':
      return <HomeBanner section={section} lang={lang} />;
    case 'home-gateway':
      return <HomeGateway section={section} lang={lang} />;
    case 'home-freedom':
      return <HomeFreedom section={section} lang={lang} />;
    case 'home-features':
      return <HomeFeatures section={section} lang={lang} />;
    case 'home-entry':
      return <HomeEntry section={section} lang={lang} />;
    case 'home-newsletter':
      return <HomeNewsletter section={section} lang={lang} />;
    
    // About sections
    case 'about-banner':
      return <AboutBanner section={section} lang={lang} />;
    case 'about-who-are-we':
      return <AboutWhoAreWe section={section} lang={lang} />;
    case 'about-roles':
      return <AboutRoles section={section} lang={lang} />;
    case 'about-bod':
      return <AboutBOD section={section} lang={lang} />;
    case 'about-achievements':
      return <AboutAchievements section={section} lang={lang} />;
    
    // Why Oman sections
    case 'why-oman-the-gateway':
      return <WhyOmanGateway section={section} lang={lang} />;
    case 'why-oman-strategic-advantages':
      return <WhyOmanStrategicAdvantages section={section} lang={lang} />;
    case 'why-oman-investment':
      return <WhyOmanInvestment section={section} lang={lang} />;
    
    // Invest Oman sections
    case 'invest-in-oman-banner':
      return <InvestBanner section={section} lang={lang} />;
    case 'invest-in-oman':
      return <InvestInOman section={section} lang={lang} />;
    case 'invest-in-oman-success-stories':
      return <InvestSuccessStories section={section} lang={lang} />;
    case 'invest-in-oman-resources':
      return <InvestResources section={section} lang={lang} buttonMode={slug === 'media' ? 'explore' : 'explore'} buttonslug={slug === 'media' ? 'media' : 'explore'} />;
    case 'invest-in-oman-contact':
      return <InvestContact section={section} lang={lang} />;
    
    // Explore Zones sections
    case 'explore-zone-interactive':
      return <ExploreZoneInteractive section={section} />;
    case 'explore-zone-gateway':
      return <ExploreZoneGateway section={section} />;
    case 'explore-zone-find-the-key':
      return <ExploreZoneFindTheKey section={section} />;
    
    // Media sections
    case 'media-banner':
      return (
        <MediaBanner
          section={{
            block: section.block
              ? {
                  i_1: section.block.i_1 ?? undefined,
                  c_1: section.block.c_1 ?? undefined,
                  c_2: section.block.c_2 ?? undefined,
                }
              : undefined,
          }}
          lang={lang}
        />
      );
    case 'media-news':
      return <MediaNews section={section} lang={lang} />;
    case 'media-annual-report':
      return <MediaAnnualReport section={section} lang={lang} />;
    
    // Contact sections
    case 'contact':
      return <Contact section={section} lang={lang} />;
    case 'contact-form':
      return <ContactForm section={section} lang={lang} />;
    
    // Career sections
    case 'career-banner':
      return <CareerBanner section={section} lang={lang} />;
    case 'career-contact':
      return <CareerContact section={section} lang={lang} />;
    case 'career-workplace':
      return <CareerWorkplace section={section} lang={lang} />;
    case 'career-vacancy':
      return <CareerVacancy section={section} lang={lang} />;
    
    // Privacy Policy / Terms sections
    case 'privacy-policy-banner':
      return <PrivacyPolicyBanner section={section} lang={lang} />;
    case 'privacy-policy-info':
      return <PrivacyPolicyInfo section={section} lang={lang} />;
    
    // Fallback
    default:
      console.warn(`No component found for template: ${template}`);
      return null;
  }
}
