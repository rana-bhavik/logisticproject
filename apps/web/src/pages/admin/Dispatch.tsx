import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Navigation, 
  Zap, 
  AlertTriangle, 
  Compass, 
  Wind, 
  Activity, 
  Truck, 
  Plane, 
  Ship, 
  Send, 
  RefreshCw,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { shipmentsApi, type Shipment } from '../../services/api';
import { subscribeToShipment, subscribeToFleet } from '../../services/socket';

const Dispatch: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(null);
  const [telemetryLogs, setTelemetryLogs] = useState<{ id: string; time: string; text: string; type: 'info' | 'warn' | 'success' }[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [socketConnected, setSocketConnected] = useState(true);

  useEffect(() => {
    // Initial fetch
    shipmentsApi.list().then(res => {
      if (res && res.shipments && res.shipments.length > 0) {
        setShipments(res.shipments);
        setActiveShipment(res.shipments[0]);
      }
    });

    // Add initial log
    setTelemetryLogs([
      { id: '1', time: new Date().toLocaleTimeString(), text: 'Telemetry gateway online. Listening on secure WebSockets channel.', type: 'info' },
      { id: '2', time: new Date().toLocaleTimeString(), text: 'Corridor A-9 Frankfurt-Paris encrypted uplink established.', type: 'success' },
    ]);

    // Hook socket fleet events
    const unsubscribeFleet = subscribeToFleet((data) => {
      setTelemetryLogs(prev => [
        { id: Date.now().toString(), time: new Date().toLocaleTimeString(), text: `Fleet stream: ${JSON.stringify(data)}`, type: 'info' },
        ...prev.slice(0, 20)
      ]);
    });

    return () => {
      unsubscribeFleet();
    };
  }, []);

  // Listen to active shipment telemetry
  useEffect(() => {
    if (!activeShipment) return;

    const unsubscribe = subscribeToShipment(activeShipment._id, (data) => {
      if (data.location) {
        setActiveShipment(prev => prev ? {
          ...prev,
          currentLocation: {
            ...prev.currentLocation,
            lat: data.location.latitude,
            lng: data.location.longitude,
            speedKmh: data.speedKmh || prev.currentLocation?.speedKmh || 80,
            heading: data.heading || prev.currentLocation?.heading || 0,
            updatedAt: new Date().toISOString()
          }
        } : null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [activeShipment?._id]);

  // Telemetry Ping Simulator
  const handleSimulatePing = async () => {
    if (!activeShipment) return;
    setIsSimulating(true);

    const nextLat = (activeShipment.currentLocation?.lat || 49.0) + (Math.random() - 0.48) * 0.08;
    const nextLng = (activeShipment.currentLocation?.lng || 8.0) + (Math.random() - 0.48) * 0.08;
    const nextSpeed = Math.floor(75 + Math.random() * 25);
    const heading = Math.floor(Math.random() * 360);

    const newTelemetry = {
      latitude: Number(nextLat.toFixed(4)),
      longitude: Number(nextLng.toFixed(4)),
      speedKmh: nextSpeed,
      heading: heading,
      temperatureC: 4.2 + (Math.random() - 0.5) * 0.4,
      fuelLevelPct: 78,
    };

    try {
      await shipmentsApi.postTelemetry(activeShipment._id, newTelemetry);
    } catch (e) {
      console.warn('Backend telemetry fallback update');
    }

    // Update state locally
    setActiveShipment(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentLocation: {
          lat: newTelemetry.latitude,
          lng: newTelemetry.longitude,
          speedKmh: newTelemetry.speedKmh,
          heading: newTelemetry.heading,
          updatedAt: new Date().toISOString(),
        },
      };
    });

    setTelemetryLogs(prev => [
      {
        id: Date.now().toString(),
        time: new Date().toLocaleTimeString(),
        text: `Telemetry Ping [${activeShipment.trackingNumber}]: Lat ${newTelemetry.latitude}, Lng ${newTelemetry.longitude}, Speed ${newTelemetry.speedKmh} km/h`,
        type: 'success',
      },
      ...prev.slice(0, 20),
    ]);

    setTimeout(() => setIsSimulating(false), 400);
  };

  const getModeIcon = (mode: Shipment['transportMode']) => {
    switch (mode) {
      case 'Air': return <Plane size={18} className="text-sky-400" />;
      case 'Sea': return <Ship size={18} className="text-cyan-400" />;
      default: return <Truck size={18} className="text-android-green" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">Mission Control & Dispatch Hub</h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-android-green/10 text-android-green border border-android-green/30 animate-pulse">
              <Radio size={12} /> LIVE TELEMETRY
            </span>
          </div>
          <p className="text-morning-blue/70 mt-1">
            Real-time geospatial fleet tracking, automated waypoint telemetry ingest, and situational radar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulatePing}
            disabled={isSimulating || !activeShipment}
            className="flex items-center gap-2 px-4 py-2.5 bg-dark-olive hover:bg-android-green hover:text-smoky-black text-white font-medium rounded-lg transition-all border border-android-green/40 shadow-lg cursor-pointer"
          >
            <Zap size={16} className={isSimulating ? 'animate-spin' : ''} />
            {isSimulating ? 'Transmitting Ping...' : 'Transmit Telemetry Ping'}
          </button>
        </div>
      </div>

      {/* Main Grid: Active Vehicle Radar + Telemetry Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Shipment HUD Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Radar / Geospatial Visualizer Container */}
          <div className="bg-[#0c120c] border border-android-green/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl backdrop-blur-md">
            {/* Visual Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#2e3d1a_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

            <div className="flex items-center justify-between relative z-10 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-android-green/10 text-android-green rounded-xl border border-android-green/30">
                  {activeShipment ? getModeIcon(activeShipment.transportMode) : <Truck size={24} />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {activeShipment?.trackingNumber || 'SELECT SHIPMENT'}
                  </h3>
                  <div className="text-xs text-morning-blue/70 flex items-center gap-2">
                    <span>Carrier: {activeShipment?.carrier}</span>
                    <span>•</span>
                    <span className="text-android-green font-semibold">{activeShipment?.status}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-morning-blue/60 uppercase">Telemetry Signal</div>
                <div className="text-sm font-semibold text-android-green flex items-center gap-1.5 justify-end">
                  <Activity size={14} className="animate-pulse" /> 99.8% Uplink
                </div>
              </div>
            </div>

            {/* Simulated Live Radar Instrument Box */}
            <div className="relative h-64 w-full bg-[#050805] border border-dark-olive/40 rounded-xl flex items-center justify-center overflow-hidden">
              {/* Concentric radar rings */}
              <div className="absolute w-48 h-48 border border-android-green/20 rounded-full" />
              <div className="absolute w-80 h-80 border border-android-green/15 rounded-full" />
              <div className="absolute w-full h-[1px] bg-android-green/15" />
              <div className="absolute h-full w-[1px] bg-android-green/15" />

              {/* Radar sweep line */}
              <div className="absolute inset-0 origin-center animate-[spin_8s_linear_infinite] pointer-events-none">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-android-green/20 to-transparent" />
              </div>

              {/* Active Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-6 h-6 bg-android-green/20 rounded-full animate-ping absolute inset-0" />
                  <div className="w-6 h-6 bg-android-green rounded-full flex items-center justify-center text-smoky-black shadow-[0_0_15px_#a6bc36]">
                    <Navigation size={14} style={{ transform: `rotate(${activeShipment?.currentLocation?.heading || 45}deg)` }} />
                  </div>
                </div>
                <div className="mt-2 px-3 py-1 bg-smoky-black/90 border border-android-green/50 rounded text-xs text-white font-mono shadow-lg">
                  {activeShipment?.currentLocation?.lat.toFixed(4)}°N, {activeShipment?.currentLocation?.lng.toFixed(4)}°E
                </div>
              </div>

              {/* Origin & Destination Nodes */}
              <div className="absolute top-6 left-6 text-xs bg-smoky-black/80 px-2.5 py-1.5 rounded border border-white/10">
                <span className="text-morning-blue/60 uppercase block text-[10px]">Origin</span>
                <span className="text-white font-medium">{activeShipment?.origin.hubName}</span>
              </div>
              <div className="absolute bottom-6 right-6 text-xs bg-smoky-black/80 px-2.5 py-1.5 rounded border border-white/10 text-right">
                <span className="text-morning-blue/60 uppercase block text-[10px]">Destination Hub</span>
                <span className="text-white font-medium">{activeShipment?.destination.hubName}</span>
              </div>
            </div>

            {/* Gauge Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                <div className="text-[11px] text-morning-blue/60 uppercase font-semibold">Speed In-Flight</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {activeShipment?.currentLocation?.speedKmh || 0} <span className="text-xs text-morning-blue/60 font-normal">km/h</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                <div className="text-[11px] text-morning-blue/60 uppercase font-semibold">Heading Vector</div>
                <div className="text-2xl font-bold text-android-green mt-1 flex items-center justify-center gap-1">
                  <Compass size={18} />
                  {activeShipment?.currentLocation?.heading || 0}°
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                <div className="text-[11px] text-morning-blue/60 uppercase font-semibold">ETA Delivery</div>
                <div className="text-base font-bold text-sky-400 mt-1">
                  {activeShipment?.estimatedDeliveryDate 
                    ? new Date(activeShipment.estimatedDeliveryDate).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit' })
                    : 'On Schedule'}
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                <div className="text-[11px] text-morning-blue/60 uppercase font-semibold">Telemetry Feed</div>
                <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1">
                  <ShieldCheck size={16} /> Encrypted
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Event Feed */}
          <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3 border-b border-dark-olive/30 pb-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Clock size={16} className="text-android-green" />
                Live Telemetry Packets & Ingest Logs
              </div>
              <span className="text-xs text-morning-blue/60">Auto-streaming updates</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 font-mono text-xs">
              {telemetryLogs.map(log => (
                <div key={log.id} className="flex items-start gap-3 py-1 border-b border-white/[0.02]">
                  <span className="text-morning-blue/50 shrink-0">{log.time}</span>
                  <span className={log.type === 'success' ? 'text-android-green' : log.type === 'warn' ? 'text-amber-400' : 'text-morning-blue/80'}>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Shipments Queue & Selector */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Monitored Corridors ({shipments.length})
            </h3>

            <div className="space-y-3">
              {shipments.map(s => {
                const isSelected = activeShipment?._id === s._id;
                return (
                  <div
                    key={s._id}
                    onClick={() => setActiveShipment(s)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-dark-olive/50 border-android-green text-white shadow-[0_0_15px_rgba(166,188,54,0.2)]'
                        : 'bg-white/5 border-white/5 hover:border-white/20 text-morning-blue/80'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white text-sm">{s.trackingNumber}</span>
                      <div className="flex items-center gap-1.5">
                        {getModeIcon(s.transportMode)}
                        <span className="text-xs font-semibold text-android-green">{s.status}</span>
                      </div>
                    </div>
                    <div className="text-xs text-morning-blue/70">
                      {s.origin.city} → {s.destination.city}
                    </div>
                    <div className="text-[11px] text-morning-blue/50 mt-1 truncate">
                      {s.carrier}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Dispatch Action Card */}
          <div className="bg-gradient-to-br from-dark-olive/40 to-smoky-black border border-android-green/30 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-1">Automated Dispatch Broadcast</h4>
            <p className="text-xs text-morning-blue/70 mb-4">
              Push route re-optimization and geo-fence alerts to connected driver mobile units.
            </p>
            <button
              onClick={() => {
                setTelemetryLogs(prev => [
                  { id: Date.now().toString(), time: new Date().toLocaleTimeString(), text: 'BROADCAST: Congestion detour pushed to driver navigation unit.', type: 'warn' },
                  ...prev,
                ]);
              }}
              className="w-full py-2 bg-white/10 hover:bg-android-green hover:text-smoky-black text-white text-xs font-semibold rounded-lg transition-all border border-white/10"
            >
              Broadcast Congestion Reroute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dispatch;
