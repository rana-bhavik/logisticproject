import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const IntroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    // 3D pop-out masked text reveal
    tl.from('.mask-text', {
      y: '100%',
      z: -200,
      scale: 0.7,
      opacity: 0,
      rotateX: -45,
      transformOrigin: 'top center',
      duration: 1.2,
      stagger: 0.15,
      ease: 'back.out(1.2)',
    })
    
    // Smooth cinematic clip-path reveal for the image wrapper
    .fromTo('.intro-img-wrapper', 
      { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.5, ease: 'power3.inOut' },
      '-=1'
    )
    
    // Internal image zoom-out while clipping
    .fromTo('.intro-img', 
      { scale: 1.4 },
      { scale: 1.1, duration: 2, ease: 'power2.out' },
      '-=1.5'
    )
    
    // Floating stat card zooms out like a 3D movie
    .from('.floating-card', {
      scale: 0.3,
      z: -300,
      opacity: 0,
      filter: 'blur(15px)',
      duration: 1.2,
      ease: 'back.out(1.5)',
    }, '-=1.2');

    // Continuous slow parallax for the image inside the wrapper on scroll
    gsap.to('.intro-img', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: '15%',
      ease: 'none',
    });
    
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-8 bg-smoky-black text-morning-blue overflow-hidden" style={{ perspective: '1200px' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Side: Premium Typography */}
        <div className="w-full md:w-1/2">
          
          <div className="overflow-hidden mb-8">
            <h2 className="mask-text text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              The heartbeat of
            </h2>
          </div>
          <div className="overflow-hidden mb-8 -mt-6">
            <h2 className="mask-text text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              global commerce.
            </h2>
          </div>
          
          <div className="overflow-hidden mb-6">
            <p className="mask-text text-xl opacity-90 leading-relaxed">
              We don't just move boxes. We engineer the
            </p>
          </div>
          <div className="overflow-hidden mb-6 -mt-4">
            <p className="mask-text text-xl opacity-90 leading-relaxed">
              flow of the world's resources. Our logistics
            </p>
          </div>
          <div className="overflow-hidden mb-6 -mt-4">
            <p className="mask-text text-xl opacity-90 leading-relaxed">
              network combines heavy machinery with artificial
            </p>
          </div>
          <div className="overflow-hidden mb-6 -mt-4">
            <p className="mask-text text-xl opacity-90 leading-relaxed">
              intelligence to ensure unparalleled reliability.
            </p>
          </div>
          
        </div>
        
        {/* Right Side: Cinematic Image */}
        <div className="w-full md:w-1/2 relative">
          
          <div className="intro-img-wrapper aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <img 
              src="/images/marketing-2.png" 
              alt="Logistics Operations" 
              className="intro-img w-full h-full object-cover origin-top"
            />
          </div>
          
          {/* Floating Glassmorphic Stat Card */}
          <div className="floating-card absolute -bottom-8 -left-8 bg-dark-olive/90 backdrop-blur-xl p-8 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/20">
            <p className="text-white font-bold text-3xl mb-1">99.9%</p>
            <p className="text-sm text-june-bud font-medium tracking-wide uppercase">On-Time Delivery</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
