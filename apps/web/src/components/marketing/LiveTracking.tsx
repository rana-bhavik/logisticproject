import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LiveTracking: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.tracking-content', {
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%'
      }
    });

    gsap.from('.tracking-map-container', {
      opacity: 0,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%'
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-8 bg-[#080c08] text-morning-blue overflow-hidden relative min-h-screen flex items-center">
      
      {/* Background Map spanning the entire section seamlessly */}
      <div className="tracking-map-container absolute inset-0 z-0 opacity-60">
         {/* Dark Minimal Vector Map Background */}
         <div className="absolute inset-0 bg-[url('/images/dark_vector_map.jpg')] bg-cover bg-center mix-blend-lighten" />
         
         {/* Fade out edges so it blends perfectly into the section background without harsh borders */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#080c08_80%)]" />

         {/* SVG Routes & Animated Dashed Waves (Centered on India ~x:550, y:230) */}
         <div className="absolute inset-0 z-10 flex items-center justify-center">
            <svg viewBox="0 0 1000 600" className="w-full h-full max-w-7xl opacity-80" preserveAspectRatio="xMidYMid slice">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#a6bc36" stopOpacity="0.1" />
                   <stop offset="100%" stopColor="#a6bc36" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Base Paths (Origin: India 650, 280) */}
              {/* To Europe */}
              <path id="path-1" d="M 680 280 Q 550 150 480 180" fill="none" stroke="#222" strokeWidth="2" />
              {/* To North America */}
              <path id="path-2" d="M 680 280 Q 500 50 200 180" fill="none" stroke="#222" strokeWidth="2" />
              {/* To Africa */}
              <path id="path-3" d="M 680 280 Q 550 350 480 380" fill="none" stroke="#222" strokeWidth="2" />
              {/* To SE Asia / Australia */}
              <path id="path-4" d="M 680 280 Q 750 350 850 420" fill="none" stroke="#222" strokeWidth="2" />
              {/* To East Asia */}
              <path id="path-5" d="M 680 280 Q 750 200 820 220" fill="none" stroke="#222" strokeWidth="2" />

              {/* Animated Glowing Wave Branches */}
              <path d="M 680 280 Q 550 150 480 180" fill="none" stroke="url(#path-gradient)" strokeWidth="3" strokeDasharray="15 25" strokeLinecap="round" filter="url(#glow)">
                <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              
              <path d="M 680 280 Q 500 50 200 180" fill="none" stroke="url(#path-gradient)" strokeWidth="3" strokeDasharray="20 30" strokeLinecap="round" filter="url(#glow)">
                <animate attributeName="stroke-dashoffset" from="50" to="0" dur="3s" repeatCount="indefinite" />
              </path>
              
              <path d="M 680 280 Q 550 350 480 380" fill="none" stroke="url(#path-gradient)" strokeWidth="3" strokeDasharray="15 20" strokeLinecap="round" filter="url(#glow)">
                <animate attributeName="stroke-dashoffset" from="35" to="0" dur="2.5s" repeatCount="indefinite" />
              </path>

              <path d="M 680 280 Q 750 350 850 420" fill="none" stroke="url(#path-gradient)" strokeWidth="3" strokeDasharray="20 30" strokeLinecap="round" filter="url(#glow)">
                <animate attributeName="stroke-dashoffset" from="50" to="0" dur="2.8s" repeatCount="indefinite" />
              </path>

              <path d="M 680 280 Q 750 200 820 220" fill="none" stroke="url(#path-gradient)" strokeWidth="3" strokeDasharray="10 20" strokeLinecap="round" filter="url(#glow)">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>

              {/* Target Nodes */}
              <circle cx="480" cy="180" r="3" fill="#a6bc36" filter="url(#glow)" />
              <circle cx="200" cy="180" r="4" fill="#a6bc36" filter="url(#glow)" />
              <circle cx="480" cy="380" r="3" fill="#a6bc36" filter="url(#glow)" />
              <circle cx="850" cy="420" r="4" fill="#a6bc36" filter="url(#glow)" />
              <circle cx="820" cy="220" r="3" fill="#a6bc36" filter="url(#glow)" />
              
              {/* Origin Node (India) */}
              <circle cx="680" cy="280" r="6" fill="#ffffff" filter="url(#glow)" />
              <circle cx="680" cy="280" r="2" fill="#000000" />
            </svg>
            
            {/* Origin Label attached roughly over India */}
            <div className="absolute left-[68%] top-[46%] transform -translate-x-1/2 -translate-y-1/2 z-20">
               <div className="bg-[#111] border border-white/10 text-white font-bold text-[10px] tracking-widest px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(166,188,54,0.3)]">
                  INDIA HQ
               </div>
            </div>

            {/* CSS Motion Path Elements (Mini Icons) */}
            <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto pointer-events-none">
                {/* Airplane to NA */}
                <div 
                  className="absolute w-5 h-5 -ml-2.5 -mt-2.5 bg-[#111] border border-[#a6bc36] rounded-full flex items-center justify-center shadow-[0_0_10px_#a6bc36] z-30"
                  style={{
                    offsetPath: "path('M 680 280 Q 500 50 200 180')",
                    animation: "travel 6s linear infinite"
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#a6bc36" stroke="none"><path d="M22 2L11 13" stroke="#a6bc36" strokeWidth="2" strokeLinecap="round"/><path d="M22 2l-7 20-4-9-9-4 20-7z" fill="#a6bc36" stroke="#a6bc36" strokeWidth="2" strokeLinejoin="round"/></svg>
                </div>

                {/* Ship to Australia */}
                <div 
                  className="absolute w-5 h-5 -ml-2.5 -mt-2.5 bg-[#111] border border-[#a6bc36] rounded-full flex items-center justify-center shadow-[0_0_10px_#a6bc36] z-30"
                  style={{
                    offsetPath: "path('M 680 280 Q 750 350 850 420')",
                    animation: "travel 8s linear infinite"
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M20 12v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3"/><path d="M10 12V7h4v5"/><path d="M6 12V5h12v7"/></svg>
                </div>

                {/* Truck to Europe */}
                <div 
                  className="absolute w-5 h-5 -ml-2.5 -mt-2.5 bg-[#111] border border-[#a6bc36] rounded-full flex items-center justify-center shadow-[0_0_10px_#a6bc36] z-30"
                  style={{
                    offsetPath: "path('M 680 280 Q 550 150 480 180')",
                    animation: "travel 10s linear infinite"
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a6bc36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                </div>
            </div>

         </div>

         <style dangerouslySetInnerHTML={{__html: `
           @keyframes travel {
             0% { offset-distance: 0%; }
             100% { offset-distance: 100%; }
           }
         `}} />
         
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10 w-full pointer-events-none">
        {/* Right Side: Clean Content & Input (Floating over the map) */}
        <div className="tracking-content w-full lg:w-1/2 relative z-10 pointer-events-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white leading-tight drop-shadow-lg">
            Global Tracking <br/>& Telemetry
          </h2>
          <p className="text-xl mb-10 leading-relaxed text-white/80 max-w-lg font-medium drop-shadow-md">
            Know exactly where your fleet is at any given moment. High-frequency telemetry ensures you have pinpoint accuracy across the globe—originating from India to the world.
          </p>
          
          <div className="max-w-md">
            <div className="flex items-center p-2 bg-[#121c12]/90 backdrop-blur border border-white/10 rounded-2xl shadow-2xl focus-within:border-android-green/50 transition-colors">
               <div className="pl-4 text-white/40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </div>
               <input 
                 type="text" 
                 placeholder="Enter Tracking Number" 
                 className="px-4 py-4 bg-transparent w-full text-white placeholder-white/40 focus:outline-none font-mono text-sm" 
               />
               <button className="px-8 py-4 bg-android-green text-black font-bold rounded-xl hover:bg-white transition-all duration-300 whitespace-nowrap active:scale-95 shadow-md">
                  Track Now
               </button>
            </div>
          </div>
          
          <div className="mt-8 flex items-center gap-6 text-sm text-white/90 font-semibold drop-shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-android-green animate-pulse shadow-[0_0_10px_#a6bc36]" />
              <span>Real-time GPS updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#a6bc36]/50" />
              <span>Global Branch Routing</span>
            </div>
          </div>

        </div>
        
        {/* Empty space for the right side to let the map show through */}
        <div className="w-full lg:w-1/2 hidden lg:block" />
      </div>
    </section>
  );
};

export default LiveTracking;
