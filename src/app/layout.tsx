// src/app/layout.tsx
"use client";
import { useEffect } from "react";
import { useLang, LangProvider,  } from "@/context/LangContext";
import "./globals.css";
import LenisSmooth from "@/components/LenisSmooth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import GlobalLoader from "@/components/GlobalLoader";

import { Montserrat, Noto_Kufi_Arabic } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-kufi",
});

// ---------- Wrapper Component to use useLang() ----------
function BodyWrapper({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();

  // Update HTML element attributes for language and direction
  useEffect(() => {
    const htmlElement = document.documentElement;
    const isRTL = lang === "ar";
    htmlElement.lang = lang;
    htmlElement.dir = isRTL ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div className={lang === "ar" ? "font-arabic" : "font-english"}>
      <PageLoader />
      <LenisSmooth>
        <Header />
        <main>{children}</main>
        <Footer />
      </LenisSmooth>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <html lang="en" dir="ltr" className={`${montserrat.variable} ${notoKufi.variable}`}>
      <body className="antialiased bg-blue-300/50" suppressHydrationWarning>
        <LangProvider>

          <BodyWrapper>{children}</BodyWrapper>
        </LangProvider>
      </body>
    </html>
  );
}
