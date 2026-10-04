import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AiIntelligence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant, zero-bounce fade-ups for text
    gsap.from('.ai-content', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Professional Scroll-Scrubbed Progress Bar
    gsap.fromTo(progressBarRef.current, 
      { width: '0%' },
      {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        }
      }
    );

    // Number counting for stats (sophisticated, no bouncing)
    gsap.utils.toArray<HTMLElement>('.ai-stat-number').forEach(el => {
      const targetValue = parseFloat(el.getAttribute('data-target') || '0');
      const isNegative = targetValue < 0;
      const prefix = isNegative ? '-' : '';
      const absValue = Math.abs(targetValue);
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')!, 10) : 0;
      
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: absValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        onUpdate: () => {
          el.innerHTML = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-8 bg-[#0a0f0a] text-morning-blue relative overflow-hidden border-t border-white/5">
      
      {/* Sophisticated Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Column: Typography */}
        <div className="w-full lg:w-1/2">
          <div className="ai-content inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 mb-6 bg-white/5">
             <div className="w-1.5 h-1.5 rounded-full bg-android-green animate-pulse" />
             <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">System Core</span>
          </div>
          <h2 className="ai-content text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-tight">
            AI-Powered <br/>Operations
          </h2>
          <p className="ai-content text-lg opacity-70 leading-relaxed mb-10 max-w-lg font-light text-white/80">
            Stop reacting and start predicting. Our machine learning models forecast demand, predict delays, and optimize your network autonomously in real-time.
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="ai-content flex items-start gap-4">
               <div className="mt-1">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
               </div>
               <div>
                  <h4 className="text-white font-medium mb-1">Predictive ETA</h4>
                  <p className="text-sm opacity-60">Consistently achieving 98% accuracy globally.</p>
               </div>
            </div>
            <div className="ai-content flex items-start gap-4">
               <div className="mt-1">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
               </div>
               <div>
                  <h4 className="text-white font-medium mb-1">Automated Maintenance</h4>
                  <p className="text-sm opacity-60">Fleet scheduling optimized to reduce downtime.</p>
               </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Sophisticated Telemetry UI */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
           
           {/* Terminal-Style Card */}
           <div className="ai-content bg-[#111611] border border-white/10 p-8 rounded-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-android-green to-transparent opacity-50" />
              
              <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-android-green"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <h3 className="text-white font-medium text-sm tracking-wide">Live Route Optimization</h3>
                 </div>
                 <span className="text-android-green text-[10px] font-mono px-2 py-1 bg-android-green/10 rounded uppercase tracking-widest border border-android-green/20">Executing</span>
              </div>
              
              {/* Scroll Scrubbed Progress Bar */}
              <div className="mb-6">
                 <div className="flex justify-between text-xs font-mono text-white/40 mb-2">
                    <span>Processing Nodes</span>
                    <span>14 / 8,245</span>
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div ref={progressBarRef} className="h-full bg-android-green shadow-[0_0_10px_rgba(166,188,54,0.5)]" />
                 </div>
              </div>
              
              <div className="bg-black/50 border border-white/5 p-4 rounded text-xs font-mono text-android-green/80">
                 <p className="opacity-50 mb-1">&gt; Analyzing weather front intersection...</p>
                 <p className="opacity-50 mb-1">&gt; Calculating path divergence vectors...</p>
                 <p className="text-white">&gt; Rerouting 14 vehicles successfully.</p>
              </div>
           </div>
           
           <div className="flex gap-6">
              {/* Metric 1 */}
              <div className="ai-content flex-1 bg-[#111611] border border-white/10 p-6 rounded-xl shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-[2px] h-full bg-sky-500/50" />
                 <p className="opacity-50 text-[10px] font-mono mb-2 uppercase tracking-widest text-white">Fuel Efficiency Gain</p>
                 <p className="text-3xl font-light text-white tracking-tight">
                    <span className="ai-stat-number" data-target="12.4" data-decimals="1" data-suffix="%">0.0%</span>
                 </p>
              </div>
              
              {/* Metric 2 */}
              <div className="ai-content flex-1 bg-[#111611] border border-white/10 p-6 rounded-xl shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-[2px] h-full bg-android-green/50" />
                 <p className="opacity-50 text-[10px] font-mono mb-2 uppercase tracking-widest text-white">Idle Time Reduction</p>
                 <p className="text-3xl font-light text-white tracking-tight">
                    <span className="ai-stat-number" data-target="-45" data-decimals="0" data-suffix="%">0%</span>
                 </p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default AiIntelligence;
