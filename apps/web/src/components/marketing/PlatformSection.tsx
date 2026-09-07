import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const PlatformSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
      }
    });

    // Smooth subtle zoom for background image
    tl.fromTo(bgRef.current, 
      { scale: 1.1 }, 
      { scale: 1, ease: 'power2.out', duration: 1.5 }
    );

    // Smooth float up for text
    tl.fromTo('.platform-content', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, 
      0.3
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden text-morning-blue flex items-center bg-smoky-black">
      <img 
        ref={bgRef}
        src="/images/marketing-3.png" 
        alt="Platform Visibility" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-smoky-black/80 mix-blend-multiply z-10" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 drop-shadow-2xl">
          <h2 className="platform-content text-5xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">Complete Visibility</h2>
          <p className="platform-content text-xl opacity-90 mb-8 max-w-lg leading-relaxed text-white drop-shadow-md">
            Our intelligent platform connects your entire supply chain, from the warehouse to the last mile, in a unified ecosystem. Every asset, every movement, instantly accessible.
          </p>
          <div className="platform-content">
            <button className="px-8 py-4 bg-dark-olive text-white font-semibold rounded-lg hover:bg-android-green hover:text-smoky-black transition-colors shadow-lg">
              Discover Platform
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
