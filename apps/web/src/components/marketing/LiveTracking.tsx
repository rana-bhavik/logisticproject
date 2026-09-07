import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LiveTracking: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!routeRef.current || !truckRef.current) return;

    const length = routeRef.current.getTotalLength();
    gsap.set(routeRef.current, { strokeDasharray: length, strokeDashoffset: length });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });
    
    // 3D pop-out for left content
    tl.from('.tracking-content', {
      scale: 0.5,
      z: -300,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.2)'
    }, 0);

    // 3D pop-out for map
    tl.from('.tracking-map', {
      scale: 0.3,
      z: -400,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.5)'
    }, 0);

    tl.to(routeRef.current, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    }, 0);

    // Simple horizontal move to simulate following a route
    tl.to(truckRef.current, {
      left: '90%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-8 bg-smoky-black text-morning-blue overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
        
        <div className="tracking-content w-full md:w-1/2 drop-shadow-2xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">Live Tracking & Telemetry</h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed text-white drop-shadow-md">
            Know exactly where your fleet is at any given moment. High-frequency telemetry ensures you have pinpoint accuracy across the globe.
          </p>
          <div className="flex items-center gap-4 max-w-md p-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
             <input type="text" placeholder="Enter Tracking Number" className="px-4 py-3 bg-transparent w-full text-white placeholder-white/50 focus:outline-none transition-colors" />
             <button className="px-8 py-3 bg-android-green text-smoky-black font-bold rounded-xl hover:bg-white hover:text-black transition-colors whitespace-nowrap shadow-lg">
                Track
             </button>
          </div>
        </div>

        <div className="tracking-map w-full md:w-1/2 relative h-[300px] border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
           {/* Subtle internal glowing grid or aura */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(166,188,54,0.15),transparent_70%)]" />
           
           <svg className="absolute top-1/2 -translate-y-1/2 w-full h-32 opacity-70" preserveAspectRatio="none">
             <path 
               ref={routeRef}
               d="M 0 64 L 800 64" 
               stroke="#a6bc36" 
               strokeWidth="3" 
               strokeDasharray="8 8" 
             />
           </svg>
           
           <div ref={truckRef} className="absolute top-1/2 -translate-y-1/2 left-[10%] bg-white p-4 rounded-full shadow-[0_0_30px_rgba(166,188,54,0.5)] z-10 flex flex-col items-center border-4 border-white/20 bg-clip-padding">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C140C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <rect x="1" y="3" width="15" height="13"></rect>
                 <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                 <circle cx="5.5" cy="18.5" r="2.5"></circle>
                 <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              <div className="absolute -top-12 bg-android-green text-smoky-black text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap pointer-events-none">
                In Transit
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default LiveTracking;
