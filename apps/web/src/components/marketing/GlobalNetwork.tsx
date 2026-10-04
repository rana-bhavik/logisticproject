import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Hotspot {
  id: string;
  name: string;
  type: 'rail' | 'road' | 'maritime' | 'air';
  x: number; // percentage
  y: number; // percentage
  metric: string;
  status: string;
  throughput: string;
  role: string;
}

const GlobalNetwork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'rail' | 'road' | 'maritime' | 'air'>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  // Exact coordinates matching the 4K 3D island features
  const hotspots: Hotspot[] = [
    {
      id: 'rail-viaduct-station',
      name: 'Viaduct Rail Terminal',
      type: 'rail',
      x: 21.0,
      y: 49.5,
      metric: '380 km/h',
      status: 'Active Route',
      throughput: 'Electrified Double-Track Viaduct',
      role: 'Continental High-Speed Passenger & Freight',
    },
    {
      id: 'rail-bullet-train',
      name: 'Eurasian Express High-Speed Train',
      type: 'rail',
      x: 32.5,
      y: 38.5,
      metric: 'Cruising 380 km/h',
      status: 'On-Time (99.8%)',
      throughput: '12-Car Automated Consist',
      role: 'Intermodal Freight & Rapid Transit',
    },
    {
      id: 'rail-origin-station',
      name: 'Southwest Rail Gateway',
      type: 'rail',
      x: 12.5,
      y: 62.2,
      metric: 'Synchronized',
      status: 'High Throughput',
      throughput: '36 High-Speed Trains/Day',
      role: 'Multi-Modal Railhead Terminal',
    },
    {
      id: 'road-truck-lower',
      name: 'Central Autonomous EV Semi',
      type: 'road',
      x: 39.5,
      y: 64.5,
      metric: '85 km/h Convoy',
      status: 'Telemetry Locked',
      throughput: 'Zero Emission Freight',
      role: 'Inland Highway Distribution',
    },
    {
      id: 'road-interchange-pin',
      name: 'Highland Freight Interchange',
      type: 'road',
      x: 69.5,
      y: 34.0,
      metric: 'Continuous Flow',
      status: 'Optimal Routing',
      throughput: '2.8M Tons / Month',
      role: 'Multi-Directional Road Hub',
    },
    {
      id: 'maritime-port-pin',
      name: 'Trans-Oceanic Deepsea Port',
      type: 'maritime',
      x: 83.5,
      y: 27.5,
      metric: '22 Knots Direct',
      status: 'Berths Synchronized',
      throughput: '42,000 TEU / Week',
      role: 'Deepwater Container Terminals',
    },
    {
      id: 'maritime-ship-cargo',
      name: 'Atlantic Feeder Container Vessel',
      type: 'maritime',
      x: 64.0,
      y: 83.5,
      metric: 'Speed 22 Knots',
      status: 'Channel Transit',
      throughput: '8,500 TEU Capacity',
      role: 'Oceanic Container Freight Liner',
    },
    {
      id: 'maritime-island-dock',
      name: 'Archipelago Feeder Anchorage',
      type: 'maritime',
      x: 86.8,
      y: 53.0,
      metric: '18 Knots Coastal',
      status: 'Clear Channel',
      throughput: '120 Container Barges',
      role: 'Coastal Feeder & Barge Terminal',
    },
    {
      id: 'air-corridor-hub',
      name: 'Trans-Continental Sky Corridor',
      type: 'air',
      x: 25.0,
      y: 12.0,
      metric: 'Mach 0.82',
      status: 'Priority Airspace',
      throughput: '94 Cargo Jets / Day',
      role: 'Global Next-Day Air Express',
    },
  ];

  useGSAP(() => {
    // Subtle natural floating breathing for the 4K 3D island
    gsap.to('.iso-4k-island-stage', {
      y: -10,
      duration: 5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-4 md:px-8 bg-[#040704] text-white relative overflow-hidden min-h-screen flex flex-col justify-between select-none"
    >
      {/* Background Subtle Atmosphere */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:90px_90px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-android-green/[0.04] blur-[180px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-20 pt-2 mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-android-green animate-pulse" />
          <span className="text-xs font-mono text-android-green uppercase tracking-widest">
            3D Global Infrastructure Network
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-3 drop-shadow-xl">
          Global Network
        </h2>
        <p className="text-base md:text-lg max-w-2xl text-white/60 font-light leading-relaxed mb-7">
          120+ countries. 400+ ports. 1 unified system. Select any mode to focus live transit waves.
        </p>

        {/* Mode Filter Menu */}
        <div className="inline-flex items-center p-1.5 rounded-full bg-[#0d140d]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          {[
            { id: 'all', label: 'All Modes' },
            { id: 'rail', label: 'High-Speed Rail' },
            { id: 'road', label: 'Smart Freight' },
            { id: 'maritime', label: 'Deepsea Maritime' },
            { id: 'air', label: 'Air Express' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSelectedHotspot(null);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-android-green text-black shadow-[0_0_20px_rgba(166,188,54,0.35)] font-bold scale-100'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4K 3D Structure Map Stage */}
      <div className="relative w-full max-w-[1450px] mx-auto flex-1 flex items-center justify-center my-2 z-10">
        <div className="iso-4k-island-stage relative w-full aspect-[16/9] flex items-center justify-center">
          
          {/* 1. Base 3D Island Image (ONLY Image is masked so its rectangular border evaporates) */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              maskImage: 'radial-gradient(ellipse 68% 58% at 50% 50%, black 22%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse 68% 58% at 50% 50%, black 22%, transparent 70%)',
            }}
          >
            <img 
              src="/images/global_network_3d_island_4k.jpg" 
              alt="4K Global Network 3D Island" 
              className="w-full h-full object-cover object-center pointer-events-none brightness-[0.52] contrast-[1.3] saturate-[0.85]"
            />
          </div>

          {/* 2. SVG Animated Glowing Route Waves Overlay (UNMASKED - 100% Full Visibility & Brilliance) */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            viewBox="0 0 1000 562.5"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Luminous Glow Filters */}
              <filter id="wave-glow-green" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="wave-glow-white" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Ultra-Vibrant High-Visibility Wave Gradients */}
              <linearGradient id="rail-wave-vibrant" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a6bc36" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#a6bc36" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="road-wave-vibrant" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#c5d046" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="sea-wave-vibrant" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a6bc36" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#48d1cc" stopOpacity="1" />
                <stop offset="100%" stopColor="#a6bc36" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* 1. HIGH-SPEED RAIL VIADUCT LOGICAL ROUTE (Station -> Viaduct -> Train -> Interchange) */}
            <g className={`transition-all duration-500 ${
              activeTab === 'rail' 
                ? 'opacity-100' 
                : activeTab === 'all' 
                ? 'opacity-90' 
                : 'opacity-20'
            }`}>
              <path 
                d="M 125 350 C 170 310, 205 280, 232 262 C 265 240, 310 220, 360 195 C 440 160, 560 155, 700 175"
                fill="none" 
                stroke="rgba(166,188,54,0.35)" 
                strokeWidth="2" 
              />
              <path 
                d="M 125 350 C 170 310, 205 280, 232 262 C 265 240, 310 220, 360 195 C 440 160, 560 155, 700 175"
                fill="none" 
                stroke="url(#rail-wave-vibrant)" 
                strokeWidth={activeTab === 'rail' ? '3.5' : '2.5'} 
                strokeDasharray="12 18"
                strokeLinecap="round"
                filter="url(#wave-glow-green)"
              >
                <animate attributeName="stroke-dashoffset" from="60" to="0" dur="2.2s" repeatCount="indefinite" />
              </path>
            </g>

            {/* 2. SMART FREIGHT HIGHWAY LOGICAL ROUTE (Interchange -> Upper Truck -> S-Curve -> Lower Truck -> Depot) */}
            <g className={`transition-all duration-500 ${
              activeTab === 'road' 
                ? 'opacity-100' 
                : activeTab === 'all' 
                ? 'opacity-90' 
                : 'opacity-20'
            }`}>
              <path 
                d="M 700 175 C 650 180, 620 190, 570 205 C 500 230, 480 260, 470 300 C 460 330, 430 345, 400 345 C 350 345, 300 340, 250 340"
                fill="none" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="2" 
              />
              <path 
                d="M 700 175 C 650 180, 620 190, 570 205 C 500 230, 480 260, 470 300 C 460 330, 430 345, 400 345 C 350 345, 300 340, 250 340"
                fill="none" 
                stroke="url(#road-wave-vibrant)" 
                strokeWidth={activeTab === 'road' ? '3.5' : '2.5'} 
                strokeDasharray="12 18"
                strokeLinecap="round"
                filter="url(#wave-glow-white)"
              >
                <animate attributeName="stroke-dashoffset" from="60" to="0" dur="2.6s" repeatCount="indefinite" />
              </path>
            </g>

            {/* 3. DEEPSEA MARITIME CHANNEL (Container Ship -> Ocean Lane -> Trans-Oceanic Port) */}
            <g className={`transition-all duration-500 ${
              activeTab === 'maritime' 
                ? 'opacity-100' 
                : activeTab === 'all' 
                ? 'opacity-90' 
                : 'opacity-20'
            }`}>
              <path 
                d="M 640 440 C 700 400, 760 340, 800 260 C 820 220, 830 180, 835 155"
                fill="none" 
                stroke="rgba(72,209,204,0.3)" 
                strokeWidth="2" 
              />
              <path 
                d="M 640 440 C 700 400, 760 340, 800 260 C 820 220, 830 180, 835 155"
                fill="none" 
                stroke="url(#sea-wave-vibrant)" 
                strokeWidth={activeTab === 'maritime' ? '3.5' : '2.5'} 
                strokeDasharray="14 20"
                strokeLinecap="round"
                filter="url(#wave-glow-green)"
              >
                <animate attributeName="stroke-dashoffset" from="68" to="0" dur="3.2s" repeatCount="indefinite" />
              </path>

              {/* Coastal Feeder Channel to Docks */}
              <path 
                d="M 800 260 Q 840 280 870 290"
                fill="none" 
                stroke="#a6bc36" 
                strokeWidth="2" 
                strokeDasharray="8 12"
                strokeLinecap="round"
                filter="url(#wave-glow-green)"
              >
                <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
              </path>
            </g>

            {/* 4. AIR EXPRESS SKY CORRIDOR (Southwest Gateway -> Air Arc -> Trans-Oceanic Hub) */}
            <g className={`transition-all duration-500 ${
              activeTab === 'air' 
                ? 'opacity-100' 
                : activeTab === 'all' 
                ? 'opacity-70' 
                : 'opacity-15'
            }`}>
              <path 
                d="M 125 350 Q 480 90 835 155"
                fill="none" 
                stroke="rgba(255,255,255,0.25)" 
                strokeWidth="1.5" 
                strokeDasharray="6 8"
              />
              <path 
                d="M 125 350 Q 480 90 835 155"
                fill="none" 
                stroke="url(#rail-wave-vibrant)" 
                strokeWidth={activeTab === 'air' ? '3' : '2'} 
                strokeDasharray="16 24"
                strokeLinecap="round"
                filter="url(#wave-glow-green)"
              >
                <animate attributeName="stroke-dashoffset" from="80" to="0" dur="2.4s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Pulsing Beacon Rings on Actual Stations & Hubs (All strictly on the island) */}
            <circle cx="125" cy="350" r="4.5" fill="#ffffff" filter="url(#wave-glow-white)" />
            <circle cx="232" cy="262" r="5" fill="#a6bc36" filter="url(#wave-glow-green)" />
            <circle cx="700" cy="175" r="5" fill="#ffffff" filter="url(#wave-glow-white)" />
            <circle cx="835" cy="155" r="5.5" fill="#a6bc36" filter="url(#wave-glow-green)" />
            <circle cx="640" cy="440" r="4.5" fill="#48d1cc" filter="url(#wave-glow-green)" />
          </svg>

          {/* Interactive Target Hotspots matching image pins & vehicles directly */}
          {hotspots.map((spot) => {
            const isActive = activeTab === 'all' || activeTab === spot.type;
            const isSelected = selectedHotspot?.id === spot.id;

            return (
              <div
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer pointer-events-auto transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-25 pointer-events-none'
                }`}
                onClick={() => setSelectedHotspot(spot)}
              >
                {/* Clean interactive pulse beacon on the real pins */}
                <div className="relative flex items-center justify-center group w-10 h-10">
                  <span className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-android-green/20 group-hover:bg-android-green/40 group-hover:scale-125' 
                      : 'bg-transparent'
                  }`} />
                  
                  {isSelected && (
                    <span className="absolute w-12 h-12 rounded-full border-2 border-android-green animate-ping pointer-events-none" />
                  )}

                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                    isSelected
                      ? 'bg-android-green border-white shadow-[0_0_15px_#a6bc36] scale-125'
                      : 'bg-[#f4b324] border-white shadow-[0_0_8px_rgba(0,0,0,0.6)] group-hover:scale-125'
                  }`} />
                </div>
              </div>
            );
          })}

          {/* Floating Glass Telemetry Card for Selected Hub / Vehicle */}
          {selectedHotspot && (
            <div 
              className="absolute z-40 bg-[#080d08]/95 border border-android-green/50 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-w-sm animate-in fade-in zoom-in-95 duration-200"
              style={{ 
                left: `${Math.min(72, Math.max(28, selectedHotspot.x))}%`, 
                top: `${Math.max(20, selectedHotspot.y - 18)}%`,
                transform: 'translate(-50%, -50%)' 
              }}
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[10px] font-mono text-android-green uppercase tracking-wider font-semibold">
                  [{selectedHotspot.type.toUpperCase()}_CORRIDOR]
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedHotspot(null); }}
                  className="text-white/40 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              <h4 className="text-white font-medium text-sm mb-1">{selectedHotspot.name}</h4>
              <p className="text-xs text-white/50 mb-3 font-light">{selectedHotspot.role}</p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-[11px] font-mono">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Telemetry</span>
                  <span className="text-white font-semibold">{selectedHotspot.metric}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Status</span>
                  <span className="text-android-green font-semibold">{selectedHotspot.status}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-white/60">
                {selectedHotspot.throughput}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Dynamic Statistics Ribbon (Highlights Active Mode) */}
      <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-8 pb-4 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Rail Metric */}
          <div 
            onClick={() => setActiveTab('rail')}
            className={`p-4 rounded-2xl transition-all duration-500 border cursor-pointer ${
              activeTab === 'rail' 
                ? 'bg-white/5 border-android-green/50 shadow-[0_0_25px_rgba(166,188,54,0.2)]' 
                : 'border-transparent hover:bg-white/[0.02]'
            }`}
          >
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-1 block">
              High-Speed Rail
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">18,420</span>
              <span className="text-xs text-android-green font-mono">km</span>
            </div>
            <span className="text-xs text-white/40 mt-1 block">Electrified continental corridors</span>
          </div>

          {/* Road Metric */}
          <div 
            onClick={() => setActiveTab('road')}
            className={`p-4 rounded-2xl transition-all duration-500 border cursor-pointer ${
              activeTab === 'road' 
                ? 'bg-white/5 border-android-green/50 shadow-[0_0_25px_rgba(166,188,54,0.2)]' 
                : 'border-transparent hover:bg-white/[0.02]'
            }`}
          >
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-1 block">
              Smart Freight
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">99.8%</span>
              <span className="text-xs text-android-green font-mono">sync</span>
            </div>
            <span className="text-xs text-white/40 mt-1 block">Autonomous convoy telemetry</span>
          </div>

          {/* Maritime Metric */}
          <div 
            onClick={() => setActiveTab('maritime')}
            className={`p-4 rounded-2xl transition-all duration-500 border cursor-pointer ${
              activeTab === 'maritime' 
                ? 'bg-white/5 border-android-green/50 shadow-[0_0_25px_rgba(166,188,54,0.2)]' 
                : 'border-transparent hover:bg-white/[0.02]'
            }`}
          >
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-1 block">
              Deepsea Ports
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">412</span>
              <span className="text-xs text-android-green font-mono">terminals</span>
            </div>
            <span className="text-xs text-white/40 mt-1 block">Automated container berthing</span>
          </div>

          {/* Air Metric */}
          <div 
            onClick={() => setActiveTab('air')}
            className={`p-4 rounded-2xl transition-all duration-500 border cursor-pointer ${
              activeTab === 'air' 
                ? 'bg-white/5 border-android-green/50 shadow-[0_0_25px_rgba(166,188,54,0.2)]' 
                : 'border-transparent hover:bg-white/[0.02]'
            }`}
          >
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-1 block">
              Air Express
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">3.2M</span>
              <span className="text-xs text-android-green font-mono">parcels/24h</span>
            </div>
            <span className="text-xs text-white/40 mt-1 block">Trans-oceanic air corridors</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalNetwork;
