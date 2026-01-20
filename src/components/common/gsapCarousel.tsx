// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import Draggable from "gsap/Draggable";
// import InertiaPlugin from "gsap/InertiaPlugin";

// gsap.registerPlugin(Draggable, InertiaPlugin);

// // Responsive breakpoints configuration - OUTSIDE component
// const breakpoints = {
//   0: { slidesPerView: 1, gap: 15 },        // Mobile
//   640: { slidesPerView: 2, gap: 18 },      // Small tablets
//   768: { slidesPerView: 3, gap: 20 },      // Tablets
//   1024: { slidesPerView: 3, gap: 20 },     // Small desktop
//   1280: { slidesPerView: 4, gap: 20 },     // Desktop
// };

// const getSlidesPerView = (width: number) => {
//   let config = { slidesPerView: 1, gap: 15 };
//   Object.entries(breakpoints)
//     .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
//     .forEach(([breakpoint, breakConfig]) => {
//       if (width >= parseInt(breakpoint)) {
//         config = breakConfig as { slidesPerView: number; gap: number };
//       }
//     });
//   return config;
// };

// const getFlexBasis = (slides: number, gap: number) => {
//   return `calc(${100 / slides}% - ${(gap * (slides - 1)) / slides}px)`;
// };

// function GsapCarousel({ scrollTrigger, parentSlidesPerView }: { scrollTrigger?: any; parentSlidesPerView?: number }) {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const [slidesPerView, setSlidesPerView] = useState(4);
//   const [gap, setGap] = useState(20);
//   const loopRef = useRef<any>(null);
//   const autoRef = useRef<NodeJS.Timeout | null>(null);
//   const boxesRef = useRef<(HTMLElement | null)[]>([]);
//   const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (resizeTimeoutRef.current) {
//         clearTimeout(resizeTimeoutRef.current);
//       }

//       resizeTimeoutRef.current = setTimeout(() => {
//         const width = window.innerWidth;
//         const config = getSlidesPerView(width);

//         if (config.slidesPerView !== slidesPerView || config.gap !== gap) {
//           setSlidesPerView(config.slidesPerView);
//           setGap(config.gap);

//           // Kill and restart carousel on breakpoint change
//           if (autoRef.current) {
//             clearInterval(autoRef.current);
//           }
//           if (loopRef.current?.kill) {
//             loopRef.current.kill();
//           }
//         }
//       }, 150); // Debounce resize events
//     };

//     // Get initial values
//     if (typeof window !== "undefined") {
//       const initialConfig = getSlidesPerView(window.innerWidth);
//       setSlidesPerView(initialConfig.slidesPerView);
//       setGap(initialConfig.gap);

//       window.addEventListener("resize", handleResize);
//       return () => {
//         window.removeEventListener("resize", handleResize);
//         if (resizeTimeoutRef.current) {
//           clearTimeout(resizeTimeoutRef.current);
//         }
//       };
//     }
//   }, [slidesPerView, gap]);

//   // Handle carousel initialization
//   useGSAP(() => {
//     if (!wrapperRef.current) return;

//     const boxes = gsap.utils.toArray<HTMLElement>(".carousel-box");
//     boxesRef.current = boxes;

//     if (boxes.length === 0) return;

//     const colors = ["#f38630", "#6fb936", "#ccc", "#d63384"];

//     // Set background colors
//     boxes.forEach((box, i) => {
//       box.style.backgroundColor = colors[i % colors.length];
//     });

//     // Initialize carousel loop
//     loopRef.current = horizontalLoop(boxes, {
//       paused: false,
//       draggable: true,
//       paddingRight: gap,
//     });

//     // Auto slide every 4 seconds
//     if (autoRef.current) {
//       clearInterval(autoRef.current);
//     }
//     autoRef.current = setInterval(() => {
//       if (loopRef.current?.next) {
//         loopRef.current.next({ duration: 0.6, ease: "power1.inOut" });
//       }
//     }, 4000);

//     // Click to navigate
//     boxes.forEach((box, i) => {
//       box.addEventListener("click", () => {
//         if (loopRef.current?.toIndex) {
//           loopRef.current.toIndex(i, { duration: 0.8, ease: "power1.inOut" });
//         }
//       });
//     });

//     return () => {
//       if (autoRef.current) {
//         clearInterval(autoRef.current);
//       }
//     };
//   }, [slidesPerView, gap]);

//   return (
//     <div className="w-full mt-8 md:mt-12 px-4">
//       <style>{`
//         .carousel-container {
//           width: 100%;
//           max-width: 100%;
//           height: auto;
//           overflow: hidden;
//           border-radius: 8px;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           margin: 0 auto;
//         }

//         /* Mobile - 1 slide */
//         @media (max-width: 639px) {
//           .carousel-container {
//             height: 280px;
//           }
//         }

//         /* Small tablet - 2 slides */
//         @media (min-width: 640px) and (max-width: 767px) {
//           .carousel-container {
//             height: 300px;
//           }
//         }

//         /* Tablet - 3 slides */
//         @media (min-width: 768px) and (max-width: 1023px) {
//           .carousel-container {
//             height: 320px;
//           }
//         }

//         /* Small desktop - 3 slides */
//         @media (min-width: 1024px) and (max-width: 1279px) {
//           .carousel-container {
//             height: 330px;
//           }
//         }

//         /* Desktop - 4 slides */
//         @media (min-width: 1280px) {
//           .carousel-container {
//             height: 350px;
//           }
//         }

//         .carousel-wrapper {
//           display: flex;
//           height: 100%;
//           width: 100%;
//         }

//         .carousel-box {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: bold;
//           color: white;
//           border-radius: 8px;
//           cursor: pointer;
//           user-select: none;
//           transition: transform 0.2s ease;
//           flex-shrink: 0;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//         }

//         /* Mobile - 1 slide */
//         @media (max-width: 639px) {
//           .carousel-box {
//             font-size: 48px;
//             margin-right: 15px;
//           }
//         }

//         /* Small tablet - 2 slides */
//         @media (min-width: 640px) and (max-width: 767px) {
//           .carousel-box {
//             font-size: 56px;
//             margin-right: 18px;
//           }
//         }

//         /* Tablet - 3 slides */
//         @media (min-width: 768px) and (max-width: 1023px) {
//           .carousel-box {
//             font-size: 64px;
//             margin-right: 20px;
//           }
//         }

//         /* Small desktop - 3 slides */
//         @media (min-width: 1024px) and (max-width: 1279px) {
//           .carousel-box {
//             font-size: 72px;
//             margin-right: 20px;
//           }
//         }

//         /* Desktop - 4 slides */
//         @media (min-width: 1280px) {
//           .carousel-box {
//             font-size: 80px;
//             margin-right: 20px;
//           }
//         }

//         .carousel-box:hover {
//           transform: scale(1.05);
//         }

//         .breakpoint-indicator {
//           position: fixed;
//           top-4;
//           right-4;
//           padding: 12px 16px;
//           background: rgba(0, 0, 0, 0.8);
//           color: white;
//           border-radius: 6px;
//           font-size: 12px;
//           font-family: monospace;
//           z-index: 50;
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .breakpoint-indicator div {
//           display: flex;
//           gap: 8px;
//         }

//         .breakpoint-indicator label {
//           font-weight: bold;
//           min-width: 80px;
//         }
//       `}</style>

//       {/* Breakpoint Indicator */}
//       {/* <div className="breakpoint-indicator">
//         <div>
//           <label>Slides:</label>
//           <span>{slidesPerView}</span>
//         </div>
//         <div>
//           <label>Gap:</label>
//           <span>{gap}px</span>
//         </div>
//         <div>
//           <label>Width:</label>
//           <span>{typeof window !== "undefined" ? window.innerWidth : 0}px</span>
//         </div>
//       </div> */}

//       <div ref={containerRef} className="carousel-container">
//         <div ref={wrapperRef} className="carousel-wrapper">
//           {Array.from({ length: 12 }, (_, i) => (
//             <div
//               key={i}
//               className="carousel-box"
//               style={{
//                 flex: `0 0 ${getFlexBasis(slidesPerView, gap)}`,
//               }}
//             >
//               {i + 1}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GsapCarousel;

// // ---- horizontalLoop helper ----
// function horizontalLoop(items: HTMLElement[] | Element[], config: any) {
//   items = gsap.utils.toArray(items);
//   config = config || {};

//   let onChange = config.onChange,
//     lastIndex = 0,
//     tl: any = gsap.timeline({
//       repeat: config.repeat,
//       onUpdate:
//         onChange &&
//         function () {
//           let i = tl.closestIndex();
//           if (lastIndex !== i) {
//             lastIndex = i;
//             onChange(items[i], i);
//           }
//         },
//       paused: config.paused,
//       defaults: { ease: "none" },
//       onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
//     });

//   let length = items.length,
//     startX = (items[0] as HTMLElement).offsetLeft,
//     times: number[] = [],
//     widths: number[] = [],
//     spaceBefore: number[] = [],
//     xPercents: number[] = [],
//     curIndex = 0,
//     indexIsDirty = false,
//     center = config.center,
//     pixelsPerSecond = (config.speed || 1) * 100,
//     snap =
//       config.snap === false
//         ? (v: number) => v
//         : gsap.utils.snap(config.snap || 1),
//     timeOffset = 0,
//     container =
//       center === true
//         ? items[0].parentNode
//         : gsap.utils.toArray(center)[0] || items[0].parentNode,
//     totalWidth: number,
//     timeWrap: any;

//   const getTotalWidth = () =>
//     (items[length - 1] as HTMLElement).offsetLeft +
//     (xPercents[length - 1] / 100) * widths[length - 1] -
//     startX +
//     spaceBefore[0] +
//     (items[length - 1] as HTMLElement).offsetWidth *
//       gsap.getProperty(items[length - 1], "scaleX") +
//     (parseFloat(config.paddingRight) || 0);

//   const populateWidths = () => {
//     let b1 = (container as HTMLElement).getBoundingClientRect(),
//       b2;
//     items.forEach((el: any, i) => {
//       widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
//       xPercents[i] = snap(
//         (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
//           gsap.getProperty(el, "xPercent")
//       );
//       b2 = el.getBoundingClientRect();
//       spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
//       b1 = b2;
//     });

//     gsap.set(items, {
//       xPercent: (i: number) => xPercents[i],
//     });

//     totalWidth = getTotalWidth();
//   };

//   const populateTimeline = () => {
//     let i, item, curX, distStart, distLoop;
//     tl.clear();

//     for (i = 0; i < length; i++) {
//       item = items[i] as HTMLElement;
//       curX = (xPercents[i] / 100) * widths[i];
//       distStart = item.offsetLeft + curX - startX + spaceBefore[0];
//       distLoop =
//         distStart + widths[i] * gsap.getProperty(item, "scaleX");

//       tl.to(
//         item,
//         {
//           xPercent: snap(((curX - distLoop) / widths[i]) * 100),
//           duration: distLoop / pixelsPerSecond,
//         },
//         0
//       )
//         .fromTo(
//           item,
//           {
//             xPercent: snap(
//               ((curX - distLoop + totalWidth) / widths[i]) * 100
//             ),
//           },
//           {
//             xPercent: xPercents[i],
//             duration:
//               (curX - distLoop + totalWidth - curX) / pixelsPerSecond,
//             immediateRender: false,
//           },
//           distLoop / pixelsPerSecond
//         )
//         .add("label" + i, distStart / pixelsPerSecond);

//       times[i] = distStart / pixelsPerSecond;
//     }

//     timeWrap = gsap.utils.wrap(0, tl.duration());
//   };

//   const refresh = (deep: boolean) => {
//     let progress = tl.progress();
//     tl.progress(0, true);
//     populateWidths();
//     deep && populateTimeline();
//     deep && tl.draggable
//       ? tl.time(times[curIndex], true)
//       : tl.progress(progress, true);
//   };

//   gsap.set(items, { x: 0 });
//   populateWidths();
//   populateTimeline();
//   window.addEventListener("resize", () => refresh(true));

//   function toIndex(index: number, vars: any) {
//     vars = vars || {};
//     Math.abs(index - curIndex) > length / 2 &&
//       (index += index > curIndex ? -length : length);

//     let newIndex = gsap.utils.wrap(0, length, index),
//       time = times[newIndex];

//     if (time > tl.time() !== index > curIndex && index !== curIndex) {
//       time += tl.duration() * (index > curIndex ? 1 : -1);
//     }

//     if (time < 0 || time > tl.duration()) {
//       vars.modifiers = { time: timeWrap };
//     }

//     curIndex = newIndex;
//     vars.overwrite = true;

//     return vars.duration === 0
//       ? tl.time(timeWrap(time))
//       : tl.tweenTo(time, vars);
//   }

//   tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
//   tl.next = (vars: any) => toIndex(curIndex + 1, vars);
//   tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
//   tl.times = times;

//   tl.progress(1, true).progress(0, true);

//   return tl;
// }