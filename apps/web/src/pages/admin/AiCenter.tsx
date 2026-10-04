import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Route, 
  Clock, 
  Leaf, 
  AlertTriangle, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sliders,
  Send,
  Plane,
  Truck,
  Ship
} from 'lucide-react';
import { aiApi } from '../../services/api';

const AiCenter: React.FC = () => {
  // ETA Predictor State
  const [distanceKm, setDistanceKm] = useState(850);
  const [transportMode, setTransportMode] = useState<'Truck' | 'Air' | 'Sea'>('Truck');
  const [weatherSeverity, setWeatherSeverity] = useState(2);
  const [trafficFactor, setTrafficFactor] = useState(1.2);
  const [isPredicting, setIsPredicting] = useState(false);
  const [etaResult, setEtaResult] = useState<any>({
    estimatedTravelHours: 11.8,
    estimatedArrivalDate: new Date(Date.now() + 3600000 * 12).toLocaleString(),
    riskScore: 'Low',
    co2EmissionsKg: 119,
    routeConfidencePct: 97.4,
  });

  // Route Optimizer State
  const [stopsInput, setStopsInput] = useState('Munich, Nuremberg, Prague, Vienna, Budapest');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedResult, setOptimizedResult] = useState<any>(null);

  // Predictive Maintenance Alerts
  const [maintenanceAlerts, setMaintenanceAlerts] = useState<any[]>([]);

  useEffect(() => {
    aiApi.getMaintenanceAlerts().then(res => {
      if (res?.alerts) setMaintenanceAlerts(res.alerts);
    });
  }, []);

  const handlePredictEta = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    try {
      const res = await aiApi.predictETA({
        distanceKm: Number(distanceKm),
        transportMode,
        weatherSeverity: Number(weatherSeverity),
        trafficFactor: Number(trafficFactor),
      });
      if (res?.prediction) setEtaResult(res.prediction);
    } catch (err) {
      console.warn(err);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleOptimizeRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    const stops = stopsInput.split(',').map(s => s.trim()).filter(Boolean);
    try {
      const res = await aiApi.optimizeRoute(stops);
      if (res) setOptimizedResult(res);
    } catch (err) {
      console.warn(err);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Dispatch & Neural Optimization</h1>
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-android-green/10 text-android-green border border-android-green/30">
            <Sparkles size={12} /> NEURAL NETWORK ACTIVE
          </span>
        </div>
        <p className="text-morning-blue/70 mt-1">
          Predictive arrival simulation, autonomous stop sequencing, and predictive hardware telemetry diagnostics.
        </p>
      </div>

      {/* Main Row: ETA Simulator & Route Optimizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1: Predictive ETA Simulator */}
        <div className="bg-[#0c120c] border border-android-green/30 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-android-green/10 text-android-green rounded-xl border border-android-green/30">
              <Clock size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Dynamic AI ETA Prediction</h3>
              <p className="text-xs text-morning-blue/60">Simulates real-world traffic, weather gradients, and border friction.</p>
            </div>
          </div>

          <form onSubmit={handlePredictEta} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">Route Distance (KM)</label>
                <input
                  type="number"
                  min="10"
                  value={distanceKm}
                  onChange={e => setDistanceKm(Number(e.target.value))}
                  className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">Transport Modality</label>
                <select
                  value={transportMode}
                  onChange={e => setTransportMode(e.target.value as any)}
                  className="w-full bg-smoky-black border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                >
                  <option value="Truck">Heavy Long-Haul Truck (80 km/h)</option>
                  <option value="Air">Air Cargo Jet (800 km/h)</option>
                  <option value="Sea">Maritime Vessel (35 km/h)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">
                  Weather Index: {weatherSeverity === 1 ? 'Clear' : weatherSeverity === 2 ? 'Light Rain' : weatherSeverity === 3 ? 'Storm Front' : 'Severe Snow'}
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={weatherSeverity}
                  onChange={e => setWeatherSeverity(Number(e.target.value))}
                  className="w-full accent-android-green cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">
                  Corridor Congestion: {trafficFactor}x
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="2.0"
                  step="0.1"
                  value={trafficFactor}
                  onChange={e => setTrafficFactor(Number(e.target.value))}
                  className="w-full accent-android-green cursor-pointer"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPredicting}
              className="w-full py-2.5 bg-android-green text-smoky-black font-semibold rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Cpu size={16} />
              {isPredicting ? 'Inferring ETA Parameters...' : 'Run Neural Inference'}
            </button>
          </form>

          {/* Result Card */}
          {etaResult && (
            <div className="mt-6 pt-5 border-t border-dark-olive/40 grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-[10px] text-morning-blue/60 uppercase">Predicted Duration</div>
                <div className="text-xl font-bold text-white mt-1">{etaResult.estimatedTravelHours}h</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-[10px] text-morning-blue/60 uppercase">CO2 Footprint</div>
                <div className="text-xl font-bold text-android-green mt-1">{etaResult.co2EmissionsKg} kg</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-[10px] text-morning-blue/60 uppercase">Confidence</div>
                <div className="text-xl font-bold text-sky-400 mt-1">{etaResult.routeConfidencePct}%</div>
              </div>
            </div>
          )}
        </div>

        {/* Module 2: Multi-Stop Autonomous Route Optimizer */}
        <div className="bg-[#0c120c] border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/30">
              <Route size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Multi-Stop Corridor Optimization</h3>
              <p className="text-xs text-morning-blue/60">Genetic algorithm solving the Traveling Salesperson routing graph.</p>
            </div>
          </div>

          <form onSubmit={handleOptimizeRoute} className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-morning-blue/70 mb-1">Waypoints (Comma separated)</label>
              <input
                type="text"
                value={stopsInput}
                onChange={e => setStopsInput(e.target.value)}
                placeholder="e.g. Munich, Nuremberg, Prague, Vienna, Budapest"
                className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isOptimizing}
              className="w-full py-2.5 bg-dark-olive hover:bg-android-green hover:text-smoky-black text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm border border-android-green/40 cursor-pointer"
            >
              <Route size={16} />
              {isOptimizing ? 'Sequencing Optimal Corridors...' : 'Optimize Waypoint Sequence'}
            </button>
          </form>

          {/* Optimized Sequence Display */}
          <div className="mt-6 pt-5 border-t border-dark-olive/40 space-y-3">
            <div className="text-xs text-morning-blue/60 uppercase font-semibold">Recommended Transit Waypoint Chain</div>
            <div className="flex flex-wrap items-center gap-2">
              {(optimizedResult?.optimizedStops || stopsInput.split(',')).map((stop: string, idx: number) => (
                <React.Fragment key={idx}>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-android-green text-smoky-black rounded-full flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    {stop.trim()}
                  </span>
                  {idx < (optimizedResult?.optimizedStops || stopsInput.split(',')).length - 1 && (
                    <ArrowRight size={14} className="text-morning-blue/40" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="bg-android-green/10 border border-android-green/30 rounded-xl p-3 flex justify-between items-center text-xs mt-3">
              <span className="text-white flex items-center gap-1.5 font-medium">
                <Leaf size={14} className="text-android-green" /> Eco-Efficiency Gain
              </span>
              <span className="text-android-green font-bold">
                {optimizedResult?.fuelSavedPct || 18.4}% Fuel Saved (≈ {optimizedResult?.co2ReductionKg || 284} kg CO2)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Module 3: Predictive Hardware Maintenance Alerts */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/30">
            <Wrench size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Predictive Powertrain Diagnostics</h3>
            <p className="text-xs text-morning-blue/60">OBD-II anomaly classification model identifying impending mechanical failure.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {maintenanceAlerts.map((alert, idx) => (
            <div
              key={idx}
              className="bg-[#0c120c] border border-red-500/30 rounded-xl p-5 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-mono text-android-green font-bold">{alert.vehicleId}</span>
                  <h4 className="text-base font-bold text-white">{alert.component}</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-red-900/40 text-red-400 border border-red-500/40">
                  {alert.failureRiskPct}% Failure Risk
                </span>
              </div>
              <p className="text-xs text-morning-blue/80 my-2">{alert.recommendation}</p>
              <div className="text-[11px] text-amber-400 flex items-center gap-1 mt-3">
                <AlertTriangle size={13} /> Immediate depot service recommended
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiCenter;
