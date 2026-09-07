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
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(166,188,54,0.15), transparent 40%)`,
        }}
      />
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
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.5,
      z: -300,
      rotationX: 15,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'back.out(1.2)',
    });
  }, { scope: containerRef });

  const services = [
    { title: 'Global Freight', desc: 'Air, sea, and land transport optimized by machine learning.', metric: '120+', metricLabel: 'Countries' },
    { title: 'Warehousing', desc: 'Robotics-assisted fulfillment centers for hyper-fast sorting.', metric: '4M', metricLabel: 'Sq Ft.' },
    { title: 'Last Mile', desc: 'Dynamic routing ensures delivery before expectations.', metric: '99%', metricLabel: 'Success Rate' },
  ];

  return (
    <section ref={containerRef} className="py-32 px-8 bg-smoky-black relative overflow-hidden">
      {/* Ambient glowing aura background */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#2a452a]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <img src="/images/marketing-4.png" alt="Texture" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">End-to-End Solutions</h2>
          <p className="text-xl text-morning-blue max-w-2xl opacity-90">Every link in your supply chain, managed through a single pane of glass.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <SpotlightCard 
              key={idx} 
              className="service-card group rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-android-green/50 transition-colors duration-500 min-h-[320px] shadow-2xl"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-morning-blue opacity-80">{service.desc}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold bg-gradient-to-r from-android-green to-white text-transparent bg-clip-text tracking-tight">{service.metric}</p>
                  <p className="text-sm text-morning-blue opacity-60 mt-1 uppercase tracking-widest">{service.metricLabel}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-android-green group-hover:text-smoky-black transition-all duration-300 transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
