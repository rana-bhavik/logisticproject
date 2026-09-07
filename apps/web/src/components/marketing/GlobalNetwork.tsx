import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const GlobalNetwork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.network-map', {
      scale: 0.8,
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'back.out(1.2)',
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

    // 3D Smooth Scroll Scrub Animation for the Isometric Image
    gsap.fromTo('.iso-image', 
      { 
        rotationX: 15, 
        rotationY: -15, 
        scale: 0.9,
        z: -100
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        rotationX: -10,
        rotationY: 10,
        scale: 1.1,
        z: 100,
        ease: 'none',
      }
    );

    // Continuous floating loop animation
    gsap.to('.iso-image', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-8 bg-[#080c08] text-morning-blue relative overflow-hidden" style={{ perspective: '1000px' }}>
      
      {/* --- Minimal Logistics Background --- */}
      {/* 1. Low Opacity Parallax Image */}
      <div className="absolute inset-0 w-full h-full opacity-5 pointer-events-none mix-blend-screen">
        <img src="/images/marketing-2.png" alt="Logistics Background" className="bg-parallax-img w-full h-[120%] object-cover object-center -top-[10%] relative filter grayscale" />
      </div>

      {/* 2. Blueprint / Radar Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      
      {/* 3. Minimal Animated Logistics Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
         <path className="bg-logistics-line" d="M -100 200 Q 300 100 600 300 T 1200 100" fill="none" stroke="#a6bc36" strokeWidth="1" strokeDasharray="10 30" />
         <path className="bg-logistics-line" d="M -100 600 Q 400 700 800 500 T 1400 700" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="5 40" />
         <path className="bg-logistics-line" d="M 200 -100 L 200 1200" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="20 40" opacity="0.3" />
         <path className="bg-logistics-line" d="M 800 -100 L 800 1200" fill="none" stroke="#a6bc36" strokeWidth="1" strokeDasharray="10 50" opacity="0.3" />
      </svg>
      {/* ---------------------------------- */}

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Global Network</h2>
        <p className="text-xl max-w-3xl opacity-90 text-morning-blue">120+ countries. 400+ ports. 1 unified system.</p>
      </div>

      <div className="max-w-6xl mx-auto relative network-map flex justify-center items-center transform-style-3d">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 group">
          {/* Subtle overlay reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
          
          <img 
            src="/images/isometric-earth.png" 
            alt="Isometric Logistics Network" 
            className="iso-image w-full h-auto object-cover transform-gpu"
          />
        </div>
      </div>
    </section>
  );
};

export default GlobalNetwork;
