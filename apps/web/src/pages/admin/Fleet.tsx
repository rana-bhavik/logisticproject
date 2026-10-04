import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Battery, 
  Fuel, 
  Thermometer, 
  Gauge, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Wrench, 
  Search,
  Zap,
  Plane,
  Shield,
  X
} from 'lucide-react';
import { fleetApi, type Vehicle } from '../../services/api';

const Fleet: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // New vehicle form
  const [newVehicle, setNewVehicle] = useState({
    vehicleNumber: '',
    vin: '',
    type: 'Truck' as Vehicle['type'],
  });

  useEffect(() => {
    Promise.all([fleetApi.list(), fleetApi.getDrivers()])
      .then(([vRes, dRes]) => {
        if (vRes?.vehicles) setVehicles(vRes.vehicles);
        if (dRes?.drivers) setDrivers(dRes.drivers);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Vehicle = {
      _id: `veh-${Date.now()}`,
      vehicleNumber: newVehicle.vehicleNumber || `LOG-TRK-${Math.floor(100 + Math.random() * 900)}`,
      vin: newVehicle.vin || '1HD' + Math.random().toString(36).substring(2, 12).toUpperCase(),
      type: newVehicle.type,
      status: 'Active',
      telematics: {
        lastPing: new Date().toISOString(),
        latitude: 50.11,
        longitude: 8.68,
        speedKmh: 0,
        fuelLevelPct: 100,
        batteryLevelPct: 100,
        odometerKm: 1200,
        engineTempC: 65,
        diagnosticsOk: true,
      },
    };
    setVehicles([created, ...vehicles]);
    setShowAddModal(false);
  };

  const filteredVehicles = vehicles.filter(v => {
    if (filterType === 'ALL') return true;
    return v.type === filterType;
  });

  const getVehicleIcon = (type: Vehicle['type']) => {
    switch (type) {
      case 'Electric_Semi': return <Zap size={20} className="text-android-green" />;
      case 'Cargo_Plane': return <Plane size={20} className="text-sky-400" />;
      default: return <Truck size={20} className="text-white" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Fleet Telematics & Assets</h1>
          <p className="text-morning-blue/70 mt-1">
            Real-time IoT powertrain diagnostics, battery health, fuel economy, and driver safety roster.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-android-green text-smoky-black font-semibold rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(166,188,54,0.3)] cursor-pointer"
        >
          <Plus size={18} /> Register Fleet Asset
        </button>
      </div>

      {/* Fleet KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="text-xs text-morning-blue/60 uppercase tracking-wider mb-1">Total Active Fleet</div>
          <div className="text-2xl font-bold text-white">{vehicles.length} Assets</div>
          <div className="text-xs text-android-green mt-1">100% OBD-II Connected</div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="text-xs text-morning-blue/60 uppercase tracking-wider mb-1">Vehicles In-Motion</div>
          <div className="text-2xl font-bold text-amber-400">
            {vehicles.filter(v => v.status === 'In_Transit').length} Units
          </div>
          <div className="text-xs text-morning-blue/60 mt-1">Live routing enabled</div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="text-xs text-morning-blue/60 uppercase tracking-wider mb-1">Fleet Diagnostics</div>
          <div className="text-2xl font-bold text-emerald-400">
            {vehicles.filter(v => v.telematics.diagnosticsOk).length} / {vehicles.length} Optimal
          </div>
          <div className="text-xs text-emerald-400 mt-1">0 Critical faults</div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="text-xs text-morning-blue/60 uppercase tracking-wider mb-1">Avg Safety Score</div>
          <div className="text-2xl font-bold text-sky-400">97.8%</div>
          <div className="text-xs text-morning-blue/60 mt-1">Certified Driver Pool</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-dark-olive/30 pb-3">
        {['ALL', 'Electric_Semi', 'Truck', 'Van', 'Cargo_Plane'].map(t => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              filterType === t
                ? 'bg-android-green text-smoky-black'
                : 'bg-white/5 text-morning-blue/70 hover:text-white'
            }`}
          >
            {t.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map(veh => (
          <div
            key={veh._id}
            className="bg-[#0c120c] border border-white/5 hover:border-android-green/40 rounded-2xl p-6 transition-all shadow-xl backdrop-blur-sm relative group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-android-green/40">
                  {getVehicleIcon(veh.type)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base tracking-wide">{veh.vehicleNumber}</h3>
                  <div className="text-xs text-morning-blue/60 font-mono">{veh.vin}</div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                veh.status === 'In_Transit' 
                  ? 'bg-android-green/10 text-android-green border border-android-green/30'
                  : veh.status === 'Maintenance'
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                  : 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
              }`}>
                {veh.status}
              </span>
            </div>

            {/* Telematics Indicators */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/5 my-4 text-xs">
              <div className="flex items-center gap-2">
                <Gauge size={16} className="text-morning-blue/60" />
                <div>
                  <div className="text-morning-blue/50 text-[10px] uppercase">Speed</div>
                  <div className="text-white font-semibold">{veh.telematics.speedKmh} km/h</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {veh.type === 'Electric_Semi' ? (
                  <Battery size={16} className="text-android-green" />
                ) : (
                  <Fuel size={16} className="text-amber-400" />
                )}
                <div>
                  <div className="text-morning-blue/50 text-[10px] uppercase">
                    {veh.type === 'Electric_Semi' ? 'Battery' : 'Fuel'}
                  </div>
                  <div className="text-white font-semibold">
                    {veh.telematics.batteryLevelPct || veh.telematics.fuelLevelPct}%
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Thermometer size={16} className="text-morning-blue/60" />
                <div>
                  <div className="text-morning-blue/50 text-[10px] uppercase">Powertrain Temp</div>
                  <div className="text-white font-semibold">{veh.telematics.engineTempC}°C</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wrench size={16} className="text-morning-blue/60" />
                <div>
                  <div className="text-morning-blue/50 text-[10px] uppercase">Odometer</div>
                  <div className="text-white font-semibold">{veh.telematics.odometerKm.toLocaleString()} km</div>
                </div>
              </div>
            </div>

            {/* Driver & Diagnostic Footer */}
            <div className="flex justify-between items-center text-xs pt-1">
              <div className="flex items-center gap-2 text-morning-blue/80">
                <UserCheck size={14} className="text-android-green" />
                <span>{veh.currentDriver?.fullName || 'Standby Driver Pool'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {veh.telematics.diagnosticsOk ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={13} /> ECU Healthy
                  </span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertCircle size={13} /> Sensor Error
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Driver Safety & Licensing Roster */}
      <div className="bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm mt-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield size={18} className="text-android-green" />
          Certified Commercial Driver Directory & Safety Scores
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {drivers.map(drv => (
            <div key={drv._id} className="bg-white/5 border border-white/5 rounded-xl p-4">
              <div className="font-bold text-white text-sm">{drv.fullName}</div>
              <div className="text-xs text-android-green mt-0.5">{drv.licenseClass}</div>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5 text-xs">
                <span className="text-morning-blue/60">Safety Index</span>
                <span className="font-bold text-emerald-400">{drv.safetyScore}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Register Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0c120c] border border-android-green/40 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-morning-blue/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-1">Register Telematics Asset</h3>
            <p className="text-xs text-morning-blue/70 mb-4">Enroll vehicle or plane into global GPS telemetry network.</p>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">Asset ID / Plate</label>
                <input
                  type="text"
                  required
                  value={newVehicle.vehicleNumber}
                  onChange={e => setNewVehicle({ ...newVehicle, vehicleNumber: e.target.value })}
                  placeholder="e.g. LOG-TRK-909"
                  className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">VIN / Serial</label>
                <input
                  type="text"
                  required
                  value={newVehicle.vin}
                  onChange={e => setNewVehicle({ ...newVehicle, vin: e.target.value })}
                  placeholder="e.g. 1HD1KRE..."
                  className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">Powertrain Type</label>
                <select
                  value={newVehicle.type}
                  onChange={e => setNewVehicle({ ...newVehicle, type: e.target.value as any })}
                  className="w-full bg-smoky-black border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                >
                  <option value="Electric_Semi">Electric Semi (EV Heavy Class 8)</option>
                  <option value="Truck">Heavy Diesel Truck</option>
                  <option value="Van">Sprinter Courier Van</option>
                  <option value="Cargo_Plane">Air Cargo Freighter</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-dark-olive/30">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-android-green text-smoky-black font-semibold rounded-lg text-sm"
                >
                  Activate Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fleet;
