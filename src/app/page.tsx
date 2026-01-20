// "use client";

// import {useEffect, useRef} from "react";
// import {gsap} from "gsap";
// import Banner from "@/app/home/banner";
// import Sectiontwo from "@/app/home/sectiontwo";
// import SectionThree from "@/app/home/sectionthree";
// import SectionFour from "@/app/home/sectionFour";
// import SectionFive from "@/app/home/sectionFive";
// import SectionSix from "@/app/home/sectionSix";

// export default function HomePage() {
//   const homeRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const home = homeRef.current;
//     if (!home) return;

//     // Hide home content initially
//     gsap.set(home, {opacity: 0, y: 40});

//     const onHeaderShown = () => {
//       gsap.to(home, {
//         opacity: 1,
//         y: 0,
//         duration: 1.1,
//         ease: "power3.out",
//       });
//     };

//     // Now we wait for header, not loader directly
//     window.addEventListener("header-shown", onHeaderShown);

//     return () => {
//       window.removeEventListener("header-shown", onHeaderShown);
//     };
//   }, []);

//   return (
//     <div>
//       <div ref={homeRef} className="min-h-screen bg-gray-900 opacity-0">
//         <Banner />
//       </div>

//       <Sectiontwo />
//       <SectionThree />
//       <SectionFour />
//       <SectionFive />
//       <SectionSix />
//     </div>
//   );
// }





// "use client"
// import { useDeviceType } from '@/components/hooks/useDeviceType';
// import React from 'react'
// import HomeDesktop from './home/homeDesktop';
// import HomeMobile from './home/homeMobile';

// export default function HomePage() {
// const device=useDeviceType()

//   return (
//     <div>
//      {device==="desktop"?(
//       <HomeDesktop/>

//      ):(
// <HomeMobile/>
//      )}
//     </div>
//   );
// }


import { redirect } from 'next/navigation';
import { getDefaultLocale } from '@/lib/api';

export default async function RootPage() {
  const defaultLocale = await getDefaultLocale();
  redirect(`/${defaultLocale.locale}/home`);
}

