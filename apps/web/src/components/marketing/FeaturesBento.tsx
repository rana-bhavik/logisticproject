import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FeaturesBento: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll-Driven Physical Card Chunk Assembly & Reconstruction Timeline
    const assemblyTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'top 18%',
        scrub: 1.2,
      },
    });

    // ----------------------------------------------------
    // CARD 1: GLOBAL VISIBILITY (Tall Left)
    // ----------------------------------------------------
    // Chunk 1A: 3D Holographic Globe Visual Chunk
    assemblyTl.fromTo('.c1-chunk-visual',
      {
        x: -110,
        y: -130,
        z: 260,
        rotationX: -18,
        rotationY: 32,
        rotationZ: -10,
        opacity: 0.25,
        filter: 'blur(12px)',
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
      },
      0
    );

    // Chunk 1B: Live Tracking Glass Telemetry Widget Chunk
    assemblyTl.fromTo('.c1-chunk-badge',
      {
        x: 130,
        y: -100,
        z: 320,
        rotationX: 25,
        rotationY: -35,
        rotationZ: 18,
        opacity: 0,
        scale: 0.7,
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      },
      0.05
    );

    // Chunk 1C: Global Intelligence Content & Typography Chunk
    assemblyTl.fromTo('.c1-chunk-content',
      {
        x: -90,
        y: 140,
        z: 220,
        rotationX: 28,
        rotationY: 15,
        rotationZ: 6,
        opacity: 0.2,
        filter: 'blur(10px)',
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
      },
      0.02
    );

    // ----------------------------------------------------
    // CARD 2: AUTOMATED DISPATCH (Wide Top Right)
    // ----------------------------------------------------
    // Chunk 2A: Autonomous Truck Visual Chunk
    assemblyTl.fromTo('.c2-chunk-visual',
      {
        x: 160,
        y: -90,
        z: 280,
        rotationX: 18,
        rotationY: -38,
        rotationZ: 10,
        opacity: 0.25,
        filter: 'blur(12px)',
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
      },
      0
    );

    // Chunk 2B: Driver Dispatch Telemetry HUD Chunk
    assemblyTl.fromTo('.c2-chunk-badge',
      {
        x: 90,
        y: 140,
        z: 320,
        rotationX: -22,
        rotationY: 28,
        rotationZ: -14,
        opacity: 0,
        scale: 0.75,
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      },
      0.06
    );

    // Chunk 2C: Automated Dispatch Intelligence Chunk
    assemblyTl.fromTo('.c2-chunk-content',
      {
        x: -160,
        y: -70,
        z: 200,
        rotationX: -18,
        rotationY: 28,
        rotationZ: -8,
        opacity: 0.2,
        filter: 'blur(10px)',
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
      },
      0.02
    );

    // ----------------------------------------------------
    // CARD 3: FLEET HEALTH MONITORING (Bottom Center)
    // ----------------------------------------------------
    // Chunk 3A: Freight Diagnostics Visual Chunk
    assemblyTl.fromTo('.c3-chunk-visual',
      {
        x: -90,
        y: -110,
        z: 220,
        rotationX: -22,
        rotationY: 28,
        rotationZ: -10,
        opacity: 0.25,
        filter: 'blur(10px)',
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
      },
      0.04
    );

    // Chunk 3B: Fleet Diagnostics Header Chunk
    assemblyTl.fromTo('.c3-chunk-content',
      {
        x: 100,
        y: 35,
        z: 180,
        rotationX: 18,
        rotationY: -22,
        opacity: 0.2,
        filter: 'blur(8px)',
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
      },
      0.05
    );

    // Chunk 3C: Sensor Cluster Hardware Chunk (Engine, Tire, Fuel)
    assemblyTl.fromTo('.c3-chunk-sensors',
      {
        x: -60,
        y: 140,
        z: 260,
        rotationX: 32,
        rotationZ: 12,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationZ: 0,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      },
      0.08
    );

    // ----------------------------------------------------
    // CARD 4: SMART WAREHOUSING (Bottom Right)
    // ----------------------------------------------------
    // Chunk 4A: Autonomous Robotics Visual Chunk
    assemblyTl.fromTo('.c4-chunk-visual',
      {
        x: 110,
        y: -100,
        z: 240,
        rotationX: -22,
        rotationY: -28,
        rotationZ: 10,
        opacity: 0.25,
        filter: 'blur(10px)',
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
      },
      0.04
    );

    // Chunk 4B: Warehousing Overview Chunk
    assemblyTl.fromTo('.c4-chunk-content',
      {
        x: -100,
        y: 35,
        z: 180,
        rotationX: 18,
        rotationY: 22,
        opacity: 0.2,
        filter: 'blur(8px)',
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
      },
      0.05
    );

    // Chunk 4C: Predictive Inventory Matrix Chunk
    assemblyTl.fromTo('.c4-chunk-matrix',
      {
        x: 70,
        y: 140,
        z: 260,
        rotationX: 32,
        rotationZ: -12,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationZ: 0,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      },
      0.08
    );

    // Seam Fusion Laser Pulse across cards as chunks click into place
    assemblyTl.fromTo('.seam-laser-pulse',
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 0.15, ease: 'power1.in' },
      0.75
    );
    assemblyTl.to('.seam-laser-pulse',
      { opacity: 0, duration: 0.25, ease: 'power2.out' },
      0.9
    );

    // Chassis Lock Signal
    assemblyTl.to('.chassis-lock-tag',
      { opacity: 1, duration: 0.1 },
      0.85
    );
    assemblyTl.to('.chassis-assembling-tag',
      { opacity: 0, duration: 0.1 },
      0.85
    );

    // Ambient media zoom
    gsap.utils.toArray<HTMLElement>('.bento-img').forEach((img) => {
      gsap.to(img, {
        scale: 1.1,
        duration: 18,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    // 3D Tilt & Magnetic Spotlight Sheen on Assembled Cards
    const cards = gsap.utils.toArray<HTMLElement>('.bento-card');
    const cleanupFns: Array<() => void> = [];

    cards.forEach((card) => {
      const glow = card.querySelector<HTMLElement>('.card-glow');

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = ((y - centerY) / centerY) * -6;
        const tiltY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 1200,
          duration: 0.4,
          ease: 'power1.out',
        });

        if (glow) {
          glow.style.opacity = '1';
          glow.style.transform = `translate(${x - 175}px, ${y - 175}px)`;
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: 'power2.out',
        });

        if (glow) {
          glow.style.opacity = '0';
        }
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      cleanupFns.push(() => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="py-32 px-8 bg-[#040604] relative overflow-hidden border-t border-white/5"
      style={{ perspective: '2200px' }}
    >
      <div className="max-w-[1400px] mx-auto relative z-10" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Asymmetric 4-Card Bento Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(320px,_auto)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          
          {/* ==================================================== */}
          {/* CARD 1: GLOBAL VISIBILITY (Tall Left)                */}
          {/* ==================================================== */}
          <div 
            className="col-span-1 md:row-span-2 relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Chassis Guide Frame */}
            <div 
              className="bento-card h-full w-full bg-[#0c120c] rounded-[2rem] border border-white/10 relative group min-h-[640px] flex flex-col overflow-hidden cursor-pointer transition-colors duration-500 hover:border-android-green/40 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Dynamic Magnetic Spotlight Glow */}
              <div 
                className="card-glow pointer-events-none absolute w-[350px] h-[350px] rounded-full bg-android-green/10 blur-3xl opacity-0 transition-opacity duration-500 z-40"
                style={{ top: 0, left: 0 }}
              />

              {/* Seam Laser Flash Effect on Assembly */}
              <div className="seam-laser-pulse pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-android-green/20 via-android-green/5 to-transparent border-2 border-android-green/60 rounded-[2rem] opacity-0" />

              {/* Status Header Telemetry */}
              <div className="absolute top-4 left-6 z-20 flex items-center gap-2">
                <span className="chassis-assembling-tag text-[9px] font-mono text-android-green/70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-android-green animate-ping" />
                  RECONSTRUCTING CHUNKS...
                </span>
                <span className="chassis-lock-tag text-[9px] font-mono text-android-green tracking-widest absolute opacity-0">
                  [CHUNK_01 // ASSEMBLED]
                </span>
              </div>

              {/* --- CHUNK 1A: Holographic Earth Visual Chunk --- */}
              <div 
                className="c1-chunk-visual absolute inset-x-0 top-0 h-[65%] z-10 overflow-hidden rounded-t-[2rem] border-b border-android-green/20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img 
                  src="/images/bento_globe.jpg" 
                  alt="Global Visibility" 
                  className="bento-img w-full h-full object-cover object-top opacity-85 mix-blend-screen" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c120c] via-[#0c120c]/60 to-transparent" />
                <div className="absolute top-3 right-6 text-[8px] font-mono text-white/40 tracking-widest">[VISUAL_CORE_01]</div>
              </div>

              {/* --- CHUNK 1B: Live Tracking Glass Badge Chunk --- */}
              <div 
                className="c1-chunk-badge absolute top-10 right-8 z-30 bg-[#111811]/90 backdrop-blur-xl border border-android-green/40 px-4 py-2 rounded-full flex items-center gap-2.5 shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-2 h-2 rounded-full bg-android-green animate-pulse" />
                <span className="text-white text-xs font-mono tracking-widest uppercase">Live Tracking</span>
                <span className="text-[9px] font-mono text-android-green/60 ml-1">99.8%</span>
              </div>

              {/* --- CHUNK 1C: Intelligence Typography & Data Chunk --- */}
              <div 
                className="c1-chunk-content relative z-20 mt-auto p-10 bg-[#0c120c]/95 backdrop-blur-md border-t border-white/5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-1 bg-android-green rounded-full" />
                  <span className="text-[8px] font-mono text-white/30 tracking-widest">[DATA_MODULE_01]</span>
                </div>
                <h3 className="text-4xl font-medium text-white mb-4 tracking-tight leading-none">Global Visibility</h3>
                <p className="text-white/50 text-base font-light leading-relaxed">
                  Track shipments across oceans, air, and land in real-time. We craft visibility models built on exact coordinates, not guesswork—so every routing decision has purpose.
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* CARD 2: AUTOMATED DISPATCH (Wide Top Right)          */}
          {/* ==================================================== */}
          <div 
            className="col-span-1 md:col-span-2 relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className="bento-card h-full w-full bg-[#0c120c] rounded-[2rem] border border-white/10 relative group min-h-[400px] flex items-center overflow-hidden cursor-pointer transition-colors duration-500 hover:border-android-green/40 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Dynamic Magnetic Spotlight Glow */}
              <div 
                className="card-glow pointer-events-none absolute w-[350px] h-[350px] rounded-full bg-android-green/10 blur-3xl opacity-0 transition-opacity duration-500 z-40"
                style={{ top: 0, left: 0 }}
              />

              {/* Seam Laser Flash Effect */}
              <div className="seam-laser-pulse pointer-events-none absolute inset-0 z-30 bg-gradient-to-r from-android-green/20 via-android-green/5 to-transparent border-2 border-android-green/60 rounded-[2rem] opacity-0" />

              {/* Status Header Telemetry */}
              <div className="absolute top-4 left-6 z-20 flex items-center gap-2">
                <span className="chassis-assembling-tag text-[9px] font-mono text-android-green/70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-android-green animate-ping" />
                  RECONSTRUCTING CHUNKS...
                </span>
                <span className="chassis-lock-tag text-[9px] font-mono text-android-green tracking-widest absolute opacity-0">
                  [CHUNK_02 // ASSEMBLED]
                </span>
              </div>

              {/* --- CHUNK 2A: Autonomous Freight Visual Chunk --- */}
              <div 
                className="c2-chunk-visual absolute inset-y-0 right-0 w-[70%] z-10 flex justify-end overflow-hidden rounded-r-[2rem] border-l border-android-green/20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img 
                  src="/images/bento_truck_isometric.jpg" 
                  alt="Automated Dispatch" 
                  className="bento-img w-full h-full object-cover object-left opacity-90 mix-blend-lighten" 
                  style={{ 
                    maskImage: 'linear-gradient(to right, transparent, black 35%)', 
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 35%)' 
                  }} 
                />
                <div className="absolute top-3 right-6 text-[8px] font-mono text-white/40 tracking-widest">[VISUAL_CORE_02]</div>
              </div>

              {/* --- CHUNK 2B: Driver Assignment HUD Badge Chunk --- */}
              <div 
                className="c2-chunk-badge absolute top-10 right-10 z-30 bg-[#111811]/90 backdrop-blur-xl border border-android-green/40 p-4 rounded-xl flex items-center gap-4 shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-10 h-10 rounded-full bg-android-green/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Assigned</p>
                  <p className="text-white/50 text-xs font-mono mt-1">Driver #4587</p>
                  <p className="text-android-green text-xs font-mono mt-1">ETA 2h 34m</p>
                </div>
              </div>

              {/* --- CHUNK 2C: Automated Dispatch Data & Algorithm Chunk --- */}
              <div 
                className="c2-chunk-content relative z-20 p-10 max-w-lg bg-[#0c120c]/90 backdrop-blur-md rounded-2xl border border-white/5 ml-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-1 bg-android-green rounded-full" />
                  <span className="text-[8px] font-mono text-white/30 tracking-widest">[ALGO_MODULE_02]</span>
                </div>
                <h3 className="text-4xl font-medium text-white mb-4 tracking-tight leading-none">Automated Dispatch</h3>
                <p className="text-white/50 text-base font-light leading-relaxed">
                  Reach the right driver at the right time with intelligent assignments that reduce deadhead miles across every region.
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* CARD 3: FLEET HEALTH MONITORING (Bottom Center)      */}
          {/* ==================================================== */}
          <div 
            className="col-span-1 relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className="bento-card h-full w-full bg-[#0c120c] rounded-[2rem] border border-white/10 relative group min-h-[420px] flex flex-col justify-end overflow-hidden cursor-pointer transition-colors duration-500 hover:border-android-green/40 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Dynamic Magnetic Spotlight Glow */}
              <div 
                className="card-glow pointer-events-none absolute w-[350px] h-[350px] rounded-full bg-android-green/10 blur-3xl opacity-0 transition-opacity duration-500 z-40"
                style={{ top: 0, left: 0 }}
              />

              {/* Seam Laser Flash */}
              <div className="seam-laser-pulse pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-android-green/20 via-android-green/5 to-transparent border-2 border-android-green/60 rounded-[2rem] opacity-0" />

              {/* Status Header Telemetry */}
              <div className="absolute top-4 left-6 z-20 flex items-center gap-2">
                <span className="chassis-assembling-tag text-[9px] font-mono text-android-green/70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-android-green animate-ping" />
                  RECONSTRUCTING CHUNKS...
                </span>
                <span className="chassis-lock-tag text-[9px] font-mono text-android-green tracking-widest absolute opacity-0">
                  [CHUNK_03 // ASSEMBLED]
                </span>
              </div>

              {/* --- CHUNK 3A: Diagnostics Visual Chunk --- */}
              <div 
                className="c3-chunk-visual absolute inset-x-0 top-0 h-[65%] z-10 overflow-hidden rounded-t-[2rem] border-b border-android-green/20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img 
                  src="/images/bento_truck_front.jpg" 
                  alt="Fleet Health" 
                  className="bento-img w-full h-full object-cover object-bottom opacity-75 mix-blend-screen" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c120c] via-[#0c120c]/80 to-transparent" />
                <div className="absolute top-3 right-6 text-[8px] font-mono text-white/40 tracking-widest">[DIAG_CORE_03]</div>
              </div>

              {/* --- CHUNK 3B: Overview Content Chunk --- */}
              <div 
                className="c3-chunk-content relative z-20 px-8 pt-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-8 h-1 bg-android-green mb-4 rounded-full" />
                <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">Fleet Health Monitoring</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed mb-6">
                  From engine diagnostics to tire pressure alerts.
                </p>
              </div>

              {/* --- CHUNK 3C: Hardware Sensor Cluster Chunk --- */}
              <div 
                className="c3-chunk-sensors relative z-20 px-8 pb-8 flex gap-4"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="bg-[#111811]/90 border border-android-green/30 p-3 rounded-xl flex flex-col items-center flex-1 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="1.5" className="mb-2"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l3 3"></path></svg>
                  <span className="text-[10px] text-white/80 text-center uppercase font-mono">Engine</span>
                  <span className="text-[8px] text-android-green font-mono">NORMAL</span>
                </div>
                <div className="bg-[#111811]/90 border border-android-green/30 p-3 rounded-xl flex flex-col items-center flex-1 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="1.5" className="mb-2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>
                  <span className="text-[10px] text-white/80 text-center uppercase font-mono">Tire</span>
                  <span className="text-[8px] text-android-green font-mono">32 PSI</span>
                </div>
                <div className="bg-[#111811]/90 border border-android-green/30 p-3 rounded-xl flex flex-col items-center flex-1 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="1.5" className="mb-2"><path d="M3 22h18"></path><path d="M7 22v-6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v6"></path><path d="M12 12V3"></path></svg>
                  <span className="text-[10px] text-white/80 text-center uppercase font-mono">Fuel</span>
                  <span className="text-[8px] text-android-green font-mono">84%</span>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* CARD 4: SMART WAREHOUSING (Bottom Right)             */}
          {/* ==================================================== */}
          <div 
            className="col-span-1 relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className="bento-card h-full w-full bg-[#0c120c] rounded-[2rem] border border-white/10 relative group min-h-[420px] flex flex-col justify-end overflow-hidden cursor-pointer transition-colors duration-500 hover:border-android-green/40 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Dynamic Magnetic Spotlight Glow */}
              <div 
                className="card-glow pointer-events-none absolute w-[350px] h-[350px] rounded-full bg-android-green/10 blur-3xl opacity-0 transition-opacity duration-500 z-40"
                style={{ top: 0, left: 0 }}
              />

              {/* Seam Laser Flash */}
              <div className="seam-laser-pulse pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-android-green/20 via-android-green/5 to-transparent border-2 border-android-green/60 rounded-[2rem] opacity-0" />

              {/* Status Header Telemetry */}
              <div className="absolute top-4 left-6 z-20 flex items-center gap-2">
                <span className="chassis-assembling-tag text-[9px] font-mono text-android-green/70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-android-green animate-ping" />
                  RECONSTRUCTING CHUNKS...
                </span>
                <span className="chassis-lock-tag text-[9px] font-mono text-android-green tracking-widest absolute opacity-0">
                  [CHUNK_04 // ASSEMBLED]
                </span>
              </div>

              {/* --- CHUNK 4A: Robotics Visual Chunk --- */}
              <div 
                className="c4-chunk-visual absolute inset-x-0 top-0 h-[65%] z-10 flex justify-end items-end overflow-hidden rounded-t-[2rem] border-b border-android-green/20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img 
                  src="/images/bento_warehouse_robot.jpg" 
                  alt="Smart Warehousing" 
                  className="bento-img w-full h-full object-cover object-right-bottom opacity-85 mix-blend-screen" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c120c] via-[#0c120c]/80 to-transparent" />
                <div className="absolute top-3 right-6 text-[8px] font-mono text-white/40 tracking-widest">[ROBOTICS_CORE_04]</div>
              </div>

              {/* --- CHUNK 4B: Overview Content Chunk --- */}
              <div 
                className="c4-chunk-content relative z-20 px-8 pt-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-8 h-1 bg-android-green mb-4 rounded-full" />
                <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">Smart Warehousing</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed mb-6">
                  Boost fulfillment speed with predictive slotting and automated retrieval.
                </p>
              </div>

              {/* --- CHUNK 4C: Matrix Operations Cluster Chunk --- */}
              <div 
                className="c4-chunk-matrix relative z-20 px-8 pb-8 flex gap-4"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="bg-[#111811]/90 border border-android-green/30 p-3 rounded-xl flex flex-col items-center flex-1 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="1.5" className="mb-2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="12"></line><line x1="22" y1="8.5" x2="12" y2="12"></line><line x1="2" y1="8.5" x2="12" y2="12"></line></svg>
                  <span className="text-[10px] text-white/80 text-center uppercase font-mono">Slotting</span>
                  <span className="text-[8px] text-android-green font-mono">AUTO</span>
                </div>
                <div className="bg-[#111811]/90 border border-android-green/30 p-3 rounded-xl flex flex-col items-center flex-1 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="1.5" className="mb-2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  <span className="text-[10px] text-white/80 text-center uppercase font-mono">Retrieval</span>
                  <span className="text-[8px] text-android-green font-mono">&lt; 1.2s</span>
                </div>
                <div className="bg-[#111811]/90 border border-android-green/30 p-3 rounded-xl flex flex-col items-center flex-1 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="1.5" className="mb-2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                  <span className="text-[10px] text-white/80 text-center uppercase font-mono">Matrix</span>
                  <span className="text-[8px] text-android-green font-mono">SYNCED</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturesBento;
