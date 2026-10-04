import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Statistics: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Cinematic Parallax Background
    gsap.to(bgRef.current, {
      y: '20%',
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Subdued, imposing entrance for the numbers
    gsap.from('.stat-block', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });

    // Number counting animation
    gsap.utils.toArray<HTMLElement>('.stat-number').forEach(el => {
      const targetValue = parseInt(el.getAttribute('data-target') || '0', 10);
      gsap.fromTo(el, 
        { innerHTML: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
          innerHTML: targetValue,
          duration: 3,
          snap: { innerHTML: 1 },
          ease: 'power3.out',
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-48 px-8 overflow-hidden min-h-[800px] flex items-center justify-center bg-[#080c08]">
      
      {/* Epic Cinematic Parallax Background */}
      <img 
        ref={bgRef}
        src="/images/premium_statistics_bg.jpg" 
        alt="Automated Warehouse" 
        className="absolute inset-0 w-full h-[120%] object-cover object-top -top-[10%] z-0 opacity-40 mix-blend-luminosity"
      />

      {/* Extreme Seamless Edge Fades */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c08] from-0% via-transparent via-30% to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050805] from-0% via-black/80 via-30% to-transparent z-10 pointer-events-none" />
      
      {/* Ambient center darkness for legibility */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Monolithic Minimalist Typography */}
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        
        <div className="text-center mb-24 stat-block">
          <p className="text-white/40 uppercase tracking-[0.3em] font-mono text-sm mb-4">Unprecedented Scale</p>
          <div className="w-px h-16 bg-white/20 mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 text-center">
          
          <div className="stat-block">
             <h4 className="text-6xl md:text-8xl lg:text-[7rem] font-medium text-white mb-6 tracking-tighter leading-none">
               <span className="stat-number" data-target="100">0</span><span className="text-white/50">B+</span>
             </h4>
             <p className="text-white/60 uppercase tracking-[0.2em] text-xs font-semibold">Goods Delivered</p>
          </div>

          <div className="stat-block">
             <h4 className="text-6xl md:text-8xl lg:text-[7rem] font-medium text-white mb-6 tracking-tighter leading-none">
               <span className="stat-number" data-target="120">0</span><span className="text-white/50">+</span>
             </h4>
             <p className="text-white/60 uppercase tracking-[0.2em] text-xs font-semibold">Countries Served</p>
          </div>

          <div className="stat-block">
             <h4 className="text-6xl md:text-8xl lg:text-[7rem] font-medium text-white mb-6 tracking-tighter leading-none">
               <span className="stat-number" data-target="45">0</span><span className="text-white/50">K</span>
             </h4>
             <p className="text-white/60 uppercase tracking-[0.2em] text-xs font-semibold">Active Fleet</p>
          </div>

          <div className="stat-block">
             <h4 className="text-6xl md:text-8xl lg:text-[7rem] font-medium text-white mb-6 tracking-tighter leading-none flex items-baseline justify-center">
               <span className="stat-number" data-target="99">0</span><span className="text-4xl md:text-6xl lg:text-[5rem] text-white/50">.9%</span>
             </h4>
             <p className="text-white/60 uppercase tracking-[0.2em] text-xs font-semibold">Uptime Reliability</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Statistics;
