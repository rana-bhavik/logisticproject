import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-700 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      {/* Subtle top border gradient on hover */}
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-700 ${opacity === 1 ? 'opacity-30' : 'opacity-0'}`} />
      
      {/* Content wrapper to stay above the spotlight */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

const ServicesCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant, sophisticated fade up for headers
    gsap.from('.sc-header', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Elegant zero-bounce fade up for cards
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 65%',
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }, { scope: containerRef });

  const services = [
    { title: 'Global Freight', desc: 'Air, sea, and land transport optimized by machine learning.', metric: '120+', metricLabel: 'Countries' },
    { title: 'Warehousing', desc: 'Robotics-assisted fulfillment centers for hyper-fast sorting.', metric: '4M', metricLabel: 'Sq Ft.' },
    { title: 'Last Mile', desc: 'Dynamic routing ensures delivery before expectations.', metric: '99%', metricLabel: 'Success Rate' },
  ];

  return (
    <section ref={containerRef} className="py-32 px-8 bg-[#080d08] relative overflow-hidden border-t border-white/5">
      {/* Minimalist Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <div className="sc-header inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 mb-6 bg-white/5">
             <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
             <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">Platform Capabilities</span>
          </div>
          <h2 className="sc-header text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6">End-to-End Solutions</h2>
          <p className="sc-header text-lg text-white/60 max-w-2xl font-light">Every link in your supply chain, managed through a single pane of glass with unprecedented visibility and control.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <SpotlightCard 
              key={idx} 
              className="service-card group rounded-2xl bg-[#0f140f] border border-white/5 p-10 hover:bg-[#141a14] transition-colors duration-700 min-h-[360px] shadow-2xl"
            >
              <div>
                <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">{service.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{service.desc}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-light text-white tracking-tight">{service.metric}</p>
                  <p className="text-[10px] text-white/40 mt-2 uppercase tracking-[0.2em] font-mono">{service.metricLabel}</p>
                </div>
                {/* Sophisticated arrow interaction without scaling */}
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-500 overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-white transition-all duration-500 transform -translate-x-1 group-hover:translate-x-0"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
