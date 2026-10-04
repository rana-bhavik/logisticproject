import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Truck, 
  Navigation, 
  Compass, 
  Battery, 
  Thermometer, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Radio, 
  PhoneCall, 
  LogOut, 
  PenTool, 
  FileText,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { shipmentsApi } from '../../services/api';

const DriverCockpit: React.FC = () => {
  const navigate = useNavigate();

  // Driver Assignment State
  const [currentMilestone, setCurrentMilestone] = useState<'Dispatched' | 'In_Transit' | 'Out_For_Delivery' | 'Delivered'>('In_Transit');
  const [speedKmh, setSpeedKmh] = useState(84);
  const [batteryPct, setBatteryPct] = useState(74);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [coords, setCoords] = useState({ lat: 49.6116, lng: 6.1319 });

  // Proof of Delivery (e-POD) State
  const [showPodModal, setShowPodModal] = useState(false);
  const [recipientName, setRecipientName] = useState('Jean-Luc Picard');
  const [cargoIntact, setCargoIntact] = useState(true);
  const [tempCompliant, setTempCompliant] = useState(true);
  const [podCompleted, setPodCompleted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Signature Pad Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#a6bc36';
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Transmit Live Telemetry Ping to Backend
  const handleTransmitPing = async () => {
    setIsTransmitting(true);
    const newLat = coords.lat + (Math.random() - 0.48) * 0.02;
    const newLng = coords.lng + (Math.random() - 0.48) * 0.02;
    const newSpeed = Math.floor(78 + Math.random() * 12);
    setCoords({ lat: Number(newLat.toFixed(4)), lng: Number(newLng.toFixed(4)) });
    setSpeedKmh(newSpeed);

    try {
      await shipmentsApi.postTelemetry('shp-901', {
        latitude: newLat,
        longitude: newLng,
        speedKmh: newSpeed,
        heading: 245,
        temperatureC: 4.1,
        batteryLevelPct: batteryPct,
      });
    } catch (e) {
      console.warn('Telemetry broadcast fallback');
    }

    setTimeout(() => setIsTransmitting(false), 500);
  };

  const handleConfirmPod = (e: React.FormEvent) => {
    e.preventDefault();
    setPodCompleted(true);
    setCurrentMilestone('Delivered');
    setShowPodModal(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#060a06] text-morning-blue pb-16">
      {/* Mobile-First Header */}
      <header className="sticky top-0 z-40 bg-[#060a06]/90 backdrop-blur-xl border-b border-dark-olive/40 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-dark-olive/50 border border-android-green/40 flex items-center justify-center text-android-green">
            <Truck size={18} />
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
              Marcus Lindqvist
              <span className="w-2 h-2 rounded-full bg-android-green animate-pulse"></span>
            </div>
            <div className="text-[11px] text-morning-blue/60 font-mono">LOG-TRK-108 • Electric Semi</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSignOut}
            className="p-2 text-morning-blue/70 hover:text-white rounded-lg bg-white/5 border border-white/5 text-xs flex items-center gap-1 cursor-pointer"
            title="Sign Out"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        {/* Active Route Manifest Card */}
        <div className="bg-[#0c120c] border border-android-green/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-android-green bg-android-green/10 border border-android-green/30 px-2 py-0.5 rounded-full">
                Active Freight Run
              </span>
              <h2 className="text-xl font-bold text-white mt-1.5 font-mono">MANIFEST-EU-8921</h2>
              <div className="text-xs text-morning-blue/70">Carrier: Logistis Trans-Euro Express</div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-morning-blue/50 uppercase block">Milestone</span>
              <span className="text-sm font-bold text-android-green">{currentMilestone.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Route Stepper */}
          <div className="relative py-4 border-y border-white/5 my-4">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-white font-bold block text-sm">Frankfurt Hub</span>
                <span className="text-morning-blue/60 text-[11px]">Origin Alpha • 06:30</span>
              </div>
              <div className="text-center font-mono text-android-green text-xs">
                520 KM Remaining
              </div>
              <div className="text-right">
                <span className="text-white font-bold block text-sm">Paris CDG Hub</span>
                <span className="text-morning-blue/60 text-[11px]">Gate 4 • Est 14:15</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-android-green h-full rounded-full transition-all duration-500 shadow-[0_0_10px_#a6bc36]"
                style={{ width: currentMilestone === 'Delivered' ? '100%' : currentMilestone === 'Out_For_Delivery' ? '85%' : '60%' }}
              />
            </div>
          </div>

          {/* Powertrain & Telematics Gauges */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <div className="text-[10px] text-morning-blue/60 uppercase">GPS Speed</div>
              <div className="text-base font-bold text-white mt-0.5">{speedKmh} <span className="text-[10px] text-morning-blue/60">km/h</span></div>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <div className="text-[10px] text-morning-blue/60 uppercase">Heading</div>
              <div className="text-base font-bold text-android-green mt-0.5 flex items-center justify-center gap-1">
                <Compass size={14} /> 245°
              </div>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <div className="text-[10px] text-morning-blue/60 uppercase">EV Battery</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
                <Battery size={14} /> {batteryPct}%
              </div>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <div className="text-[10px] text-morning-blue/60 uppercase">Cargo Temp</div>
              <div className="text-base font-bold text-sky-400 mt-0.5 flex items-center justify-center gap-1">
                <Thermometer size={14} /> 4.1°C
              </div>
            </div>
          </div>

          {/* GPS Telemetry Ingest Action */}
          <button
            onClick={handleTransmitPing}
            disabled={isTransmitting}
            className="w-full mt-5 py-3 bg-dark-olive hover:bg-android-green hover:text-smoky-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-android-green/40 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Radio size={16} className={isTransmitting ? 'animate-pulse text-android-green' : ''} />
            {isTransmitting ? 'Broadcasting GPS Telemetry Packet...' : 'Transmit Live Telemetry Ping'}
          </button>
        </div>

        {/* Milestone Transition Controller */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-android-green" />
            Route Milestone Checkpoints
          </h3>

          <div className="space-y-2.5">
            {[
              { key: 'Dispatched', label: 'Departed Frankfurt Freight Terminal' },
              { key: 'In_Transit', label: 'Crossed Border Corridor (A-4 Highway)' },
              { key: 'Out_For_Delivery', label: 'Entered Greater Paris Metro Ring' },
              { key: 'Delivered', label: 'Arrived at Consignee Dock Door' },
            ].map(ms => {
              const active = currentMilestone === ms.key;
              return (
                <button
                  key={ms.key}
                  onClick={() => setCurrentMilestone(ms.key as any)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs font-medium cursor-pointer ${
                    active 
                      ? 'bg-android-green/10 border-android-green text-white font-semibold shadow-[0_0_15px_rgba(166,188,54,0.15)]'
                      : 'bg-white/5 border-white/5 text-morning-blue/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{ms.label}</span>
                  {active && <CheckCircle2 size={16} className="text-android-green shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Electronic Proof of Delivery (e-POD) Trigger Card */}
        <div className="bg-gradient-to-br from-dark-olive/30 to-smoky-black border border-android-green/40 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-android-green/10 rounded-xl text-android-green border border-android-green/30">
              <PenTool size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Electronic Proof of Delivery (e-POD)</h3>
              <p className="text-xs text-morning-blue/70">Obtain cryptographic recipient signature and handover receipt.</p>
            </div>
          </div>

          {podCompleted ? (
            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} /> e-POD Signed & Verified ({recipientName})
              </span>
              <span className="font-mono text-morning-blue/60">ID #POD-9921</span>
            </div>
          ) : (
            <button
              onClick={() => setShowPodModal(true)}
              className="w-full mt-4 py-3 bg-android-green text-smoky-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(166,188,54,0.3)] cursor-pointer"
            >
              Open e-POD Handover Pad
            </button>
          )}
        </div>
      </main>

      {/* Interactive e-POD Signature Modal */}
      {showPodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0c120c] border border-android-green/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-1">Consignee Handover & Sign-Off</h3>
            <p className="text-xs text-morning-blue/70 mb-4">Recipient must inspect cargo seal and sign below.</p>

            <form onSubmit={handleConfirmPod} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cargoIntact}
                    onChange={e => setCargoIntact(e.target.checked)}
                    className="accent-android-green"
                  />
                  <span>Physical container seal intact (No transit damage)</span>
                </label>
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempCompliant}
                    onChange={e => setTempCompliant(e.target.checked)}
                    className="accent-android-green"
                  />
                  <span>Cold-Chain temperature SLA compliant (4.1°C logged)</span>
                </label>
              </div>

              {/* Digital Signature Canvas Pad */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase text-morning-blue/70">Recipient Signature Pad</label>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-[11px] text-android-green hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} /> Clear Pad
                  </button>
                </div>
                <div className="border border-dark-olive/60 rounded-xl bg-black/40 overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={440}
                    height={140}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-32 cursor-crosshair touch-none"
                  />
                </div>
                <div className="text-[10px] text-morning-blue/50 text-center mt-1">
                  Sign with finger or stylus inside the box
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-dark-olive/30">
                <button
                  type="button"
                  onClick={() => setShowPodModal(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-android-green text-smoky-black font-bold rounded-lg text-sm hover:bg-white transition-all shadow-[0_0_15px_rgba(166,188,54,0.3)]"
                >
                  Submit & Complete Handover
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverCockpit;
