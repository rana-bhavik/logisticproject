import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Statistics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.stat-card', {
      scale: 0.2,
      z: -500,
      rotationX: 45,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'back.out(1.5)',
    });

    // Number counting animation
    gsap.utils.toArray<HTMLElement>('.stat-number').forEach(el => {
      const targetValue = parseInt(el.getAttribute('data-target') || '0', 10);
      gsap.to(el, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        innerHTML: targetValue,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: 'power2.out',
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-8 bg-smoky-black text-morning-blue border-t border-b border-white/5 relative overflow-hidden">
      {/* Wide horizontal aura for statistics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[300px] bg-[#0044ff]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
        <div className="stat-card">
           <h4 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-white to-gray-500 text-transparent bg-clip-text mb-4"><span className="stat-number" data-target="100">0</span>B+</h4>
           <p className="opacity-80 text-sm uppercase tracking-widest font-medium text-morning-blue">Goods Delivered</p>
        </div>
        <div className="stat-card">
           <h4 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-android-green to-dark-olive text-transparent bg-clip-text mb-4"><span className="stat-number" data-target="120">0</span>+</h4>
           <p className="opacity-80 text-sm uppercase tracking-widest font-medium text-morning-blue">Countries Served</p>
        </div>
        <div className="stat-card">
           <h4 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-white to-gray-500 text-transparent bg-clip-text mb-4"><span className="stat-number" data-target="45">0</span>K</h4>
           <p className="opacity-80 text-sm uppercase tracking-widest font-medium text-morning-blue">Active Fleet</p>
        </div>
        <div className="stat-card">
           <h4 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-[#0044ff] to-blue-900 text-transparent bg-clip-text mb-4"><span className="stat-number" data-target="99">0</span>.9%</h4>
           <p className="opacity-80 text-sm uppercase tracking-widest font-medium text-morning-blue">Uptime Reliability</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
