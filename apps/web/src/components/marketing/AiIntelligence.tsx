import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AiIntelligence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.ai-text', {
      scale: 0.6,
      z: -300,
      rotationX: -15,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'back.out(1.2)',
    })
    .from('.ai-panel-left', {
      scale: 0.3,
      z: -400,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.5)',
    }, '-=0.8')
    .from('.ai-panel-right', {
      scale: 0.3,
      z: -400,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.5)',
      stagger: 0.2,
    }, '-=1.0');
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-8 bg-smoky-black text-morning-blue overflow-hidden relative">
      {/* Mixed Auras: Deep Oceanic Blue & Android Green */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0044ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-android-green/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        <div className="w-full md:w-1/2">
          <h2 className="ai-text text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">AI-Powered Operations</h2>
          <p className="ai-text text-xl opacity-90 leading-relaxed mb-8">
            Stop reacting and start predicting. Our machine learning models forecast demand, predict delays, and optimize your network autonomously.
          </p>
          <div className="ai-text flex flex-col gap-4">
            <div className="flex items-center gap-4 text-white">
               <div className="w-8 h-8 rounded-full bg-android-green/20 text-android-green flex items-center justify-center font-bold">1</div>
               <p>Predictive ETA with 98% accuracy</p>
            </div>
            <div className="flex items-center gap-4 text-white">
               <div className="w-8 h-8 rounded-full bg-android-green/20 text-android-green flex items-center justify-center font-bold">2</div>
               <p>Automated fleet maintenance scheduling</p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col gap-6">
           <div className="ai-panel-left bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-white font-bold text-lg">Route Optimization</h3>
                 <span className="text-android-green text-xs font-bold px-3 py-1 bg-android-green/10 rounded-full uppercase tracking-widest border border-android-green/20">Active</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                 <div className="h-full bg-gradient-to-r from-[#0044ff] to-android-green w-[85%] relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                 </div>
              </div>
              <p className="mt-4 text-sm opacity-80 text-white">Rerouting 14 vehicles away from weather front.</p>
           </div>
           
           <div className="flex gap-6">
              <div className="ai-panel-right flex-1 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col justify-center">
                 <p className="opacity-60 text-sm mb-1 uppercase tracking-widest text-morning-blue">Fuel Saved</p>
                 <p className="text-4xl font-bold bg-gradient-to-br from-white to-gray-400 text-transparent bg-clip-text">12.4%</p>
              </div>
              <div className="ai-panel-right flex-1 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col justify-center">
                 <p className="opacity-60 text-sm mb-1 uppercase tracking-widest text-morning-blue">Idle Time</p>
                 <p className="text-4xl font-bold bg-gradient-to-br from-android-green to-white text-transparent bg-clip-text">-45%</p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default AiIntelligence;
