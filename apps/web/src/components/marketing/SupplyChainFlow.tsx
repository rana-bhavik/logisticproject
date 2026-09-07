import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SupplyChainFlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // Continuous flowing animation for multiple waves
    gsap.to('.wave-path', {
      strokeDashoffset: -100, // Move the dashes infinitely
      ease: 'none',
      duration: 3,
      repeat: -1,
    });
    
    // Faster secondary wave
    gsap.to('.wave-path-fast', {
      strokeDashoffset: -100,
      ease: 'none',
      duration: 1.5,
      repeat: -1,
    });

    gsap.from('.flow-node', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
      },
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      ease: 'back.out(1.5)',
    });

    // Background minimal animations
    gsap.to('.bg-logistics-line', {
      strokeDashoffset: -500,
      ease: 'none',
      duration: 15,
      repeat: -1,
    });
    
    gsap.to('.bg-parallax-img', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: '20%',
      ease: 'none',
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-8 bg-[#080c08] text-morning-blue relative overflow-hidden">
      
      {/* --- Minimal Logistics Background --- */}
      {/* 1. Low Opacity Parallax Image */}
      <div className="absolute inset-0 w-full h-full opacity-5 pointer-events-none mix-blend-screen">
        <img src="/images/marketing-2.png" alt="Logistics Background" className="bg-parallax-img w-full h-[120%] object-cover object-center -top-[10%] relative filter grayscale" />
      </div>

      {/* 2. Blueprint / Radar Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      
      {/* 3. Minimal Animated Logistics Lines (Data flows across the background) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
         <path className="bg-logistics-line" d="M -100 200 Q 300 100 600 300 T 1200 100" fill="none" stroke="#a6bc36" strokeWidth="1" strokeDasharray="10 30" />
         <path className="bg-logistics-line" d="M -100 600 Q 400 700 800 500 T 1400 700" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="5 40" />
         <path className="bg-logistics-line" d="M 200 -100 L 200 1200" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="20 40" opacity="0.3" />
         <path className="bg-logistics-line" d="M 800 -100 L 800 1200" fill="none" stroke="#a6bc36" strokeWidth="1" strokeDasharray="10 50" opacity="0.3" />
      </svg>
      {/* ---------------------------------- */}

      <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Seamless Supply Flow</h2>
        <p className="text-xl max-w-3xl mx-auto opacity-90 text-morning-blue">Every stage of fulfillment connected flawlessly through our infrastructure.</p>
      </div>

      <div className="max-w-5xl mx-auto relative h-[400px] md:h-[500px] border border-white/5 rounded-3xl bg-[#080d08] overflow-hidden shadow-2xl">
        
        {/* Map Background */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
          alt="World Map" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 invert grayscale brightness-50"
        />

        {/* SVG Paths representing multiple waves */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 200">
          
          {/* Base solid line connecting the nodes */}
          <path 
            d="M 100 120 C 300 120, 300 60, 500 60 C 700 60, 700 140, 900 140" 
            fill="none" 
            stroke="#ffffff" 
            strokeOpacity="0.1"
            strokeWidth="1" 
          />

          {/* Wave 1: Primary thick wave */}
          <path 
            className="wave-path"
            d="M 100 120 C 300 120, 300 60, 500 60 C 700 60, 700 140, 900 140" 
            fill="none" 
            stroke="#a6bc36" 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeDasharray="20 40"
          />

          {/* Wave 2: Fast thin data wave offset slightly */}
          <path 
            className="wave-path-fast"
            d="M 100 115 C 300 115, 300 55, 500 55 C 700 55, 700 135, 900 135" 
            fill="none" 
            stroke="#819c8d" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            strokeDasharray="5 20"
          />

          {/* Wave 3: Another flow below the main one */}
          <path 
            className="wave-path"
            d="M 100 125 C 300 125, 300 65, 500 65 C 700 65, 700 145, 900 145" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="2" 
            strokeLinecap="round"
            strokeDasharray="15 60"
            strokeOpacity="0.7"
          />
        </svg>

        {/* Nodes */}
        <div className="absolute left-[10%] top-[60%] -translate-y-1/2 flex flex-col items-center group">
          <div className="flow-node w-4 h-4 rounded-full bg-android-green z-10 border-4 border-smoky-black bg-clip-padding group-hover:scale-125 transition-transform" />
          <div className="mt-4 bg-smoky-black border border-white/10 px-4 py-2 rounded-xl shadow-xl">
            <p className="text-white font-bold tracking-wide uppercase text-xs">Origin</p>
          </div>
        </div>
        
        <div className="absolute left-[50%] top-[30%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group">
          <div className="flow-node w-4 h-4 rounded-full bg-android-green z-10 border-4 border-smoky-black bg-clip-padding group-hover:scale-125 transition-transform" />
          <div className="mt-4 bg-smoky-black border border-white/10 px-4 py-2 rounded-xl shadow-xl">
            <p className="text-white font-bold tracking-wide uppercase text-xs">Distribution Hub</p>
          </div>
        </div>
        
        <div className="absolute right-[10%] top-[70%] -translate-y-1/2 flex flex-col items-center group">
          <div className="flow-node w-4 h-4 rounded-full bg-android-green z-10 border-4 border-smoky-black bg-clip-padding group-hover:scale-125 transition-transform" />
          <div className="mt-4 bg-smoky-black border border-white/10 px-4 py-2 rounded-xl shadow-xl">
            <p className="text-white font-bold tracking-wide uppercase text-xs">Destination</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplyChainFlow;
