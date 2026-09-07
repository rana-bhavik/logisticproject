import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CtaSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Zoom CTA background image slightly
    tl.fromTo(bgRef.current, 
      { scale: 1 }, 
      { scale: 1.15, ease: 'none' }
    );

    // Reveal text
    gsap.from('.cta-content', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-48 px-8 text-center overflow-hidden">
      <img 
        ref={bgRef}
        src="/images/marketing-8.png" 
        alt="Join Platform" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-smoky-black/80 mix-blend-multiply z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d08] to-transparent z-10" />
      
      <div className="relative z-20 max-w-4xl mx-auto">
        <h2 className="cta-content text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 drop-shadow-2xl">
          Ready to command<br/>your supply chain?
        </h2>
        <div className="cta-content">
          <button className="px-10 py-5 text-lg bg-android-green text-smoky-black font-bold rounded-full hover:bg-june-bud transition-colors shadow-[0_0_30px_rgba(166,188,54,0.3)]">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
