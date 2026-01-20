
// import { useEffect, useState } from "react";

// export function useDeviceType() {
//   const [device, setDevice] = useState<"mobile" | "desktop" | null>(null);

//   useEffect(() => {
//     // const ua = navigator.userAgent || navigator.vendor || window.opera;
//      const ua = navigator.userAgent 
//     if (/android|iphone|ipad|mobile/i.test(ua)) {
//       setDevice("mobile");
//     } else {
//       setDevice("desktop");
//     }
//   }, []);

//   return device;
// }

"use client"
import { useState, useEffect } from "react";

export function useDeviceType() {
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop"); // Default to desktop for SSR

  useEffect(() => {
    // Only run on client
    const ua = navigator.userAgent;
    const isMobile = /android|iphone|ipad|mobile/i.test(ua);
    setDevice(isMobile ? "mobile" : "desktop");
  }, []);

  return device;
}
