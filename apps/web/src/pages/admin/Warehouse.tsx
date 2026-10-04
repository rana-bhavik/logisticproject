import React, { useState, useEffect } from 'react';
import { 
  Warehouse as WarehouseIcon, 
  Layers, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Search, 
  Plus, 
  SlidersHorizontal,
  X,
  Boxes
} from 'lucide-react';
import { warehouseApi, type InventoryItem, type DockSchedule } from '../../services/api';

const Warehouse: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [docks, setDocks] = useState<DockSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'docks'>('inventory');

  // Stock Adjustment Modal
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(50);
  const [adjustReason, setAdjustReason] = useState('Inbound Shipment Restock');

  useEffect(() => {
    Promise.all([warehouseApi.getInventory(), warehouseApi.getDocks()])
      .then(([invRes, dockRes]) => {
        if (invRes?.inventory) setInventory(invRes.inventory);
        if (dockRes?.docks) setDocks(dockRes.docks);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAdjustStock = async (delta: number) => {
    if (!selectedItem) return;
    try {
      await warehouseApi.adjustStock(selectedItem.sku, delta, adjustReason);
    } catch (e) {
      console.warn(e);
    }

    // Update local state
    setInventory(inventory.map(item => {
      if (item.sku === selectedItem.sku) {
        return { ...item, quantityOnHand: Math.max(0, item.quantityOnHand + delta) };
      }
      return item;
    }));

    setShowAdjustModal(false);
  };

  const filteredInventory = inventory.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.zone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalValuation = inventory.reduce((acc, i) => acc + (i.quantityOnHand * i.unitValue), 0);
  const lowStockCount = inventory.filter(i => i.quantityOnHand <= i.reorderThreshold).length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Warehouse & Smart Fulfillment</h1>
          <p className="text-morning-blue/70 mt-1">
            Real-time multi-tier inventory binning, automated reorder thresholds, and dock door scheduling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'inventory' 
                ? 'bg-android-green text-smoky-black' 
                : 'bg-white/5 text-morning-blue/80 hover:text-white'
            }`}
          >
            Inventory Ledger
          </button>
          <button
            onClick={() => setActiveTab('docks')}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'docks' 
                ? 'bg-android-green text-smoky-black' 
                : 'bg-white/5 text-morning-blue/80 hover:text-white'
            }`}
          >
            Dock Door Schedule
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="text-xs text-morning-blue/60 uppercase tracking-wider mb-1">Total Inventory Valuation</div>
          <div className="text-2xl font-bold text-white">₹{(totalValuation / 1000000).toFixed(2)}M</div>
          <div className="text-xs text-android-green mt-1">Across 4 European automated hubs</div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="text-xs text-morning-blue/60 uppercase tracking-wider mb-1">Active SKUs Bin Count</div>
          <div className="text-2xl font-bold text-sky-400">{inventory.length} Verified SKUs</div>
          <div className="text-xs text-morning-blue/60 mt-1">RFID & Barcode scanned</div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="text-xs text-morning-blue/60 uppercase tracking-wider mb-1">Reorder Triggers</div>
          <div className={`text-2xl font-bold ${lowStockCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {lowStockCount} Items Below Min
          </div>
          <div className="text-xs text-morning-blue/60 mt-1">Automated PO generation queued</div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="text-xs text-morning-blue/60 uppercase tracking-wider mb-1">Active Dock Gates</div>
          <div className="text-2xl font-bold text-emerald-400">
            {docks.filter(d => d.status === 'Loading' || d.status === 'Docked').length} Occupied
          </div>
          <div className="text-xs text-morning-blue/60 mt-1">Turnaround avg: 42 mins</div>
        </div>
      </div>

      {/* Tab 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 w-full md:w-80 relative">
              <Search size={16} className="absolute left-3 text-morning-blue/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search SKU, name, zone..."
                className="w-full bg-white/5 border border-dark-olive/50 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-morning-blue/40 focus:outline-none focus:border-android-green"
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-morning-blue/80">
                <thead className="text-xs uppercase bg-white/5 text-morning-blue border-b border-dark-olive/40 tracking-wider">
                  <tr>
                    <th className="px-6 py-4">SKU & Item Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Location Bin</th>
                    <th className="px-6 py-4">On Hand</th>
                    <th className="px-6 py-4">Reserved</th>
                    <th className="px-6 py-4">Unit Value</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-olive/20">
                  {filteredInventory.map(item => {
                    const isLow = item.quantityOnHand <= item.reorderThreshold;
                    return (
                      <tr key={item._id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-white tracking-wide">{item.title}</div>
                          <div className="text-xs font-mono text-android-green">{item.sku}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-white/5 px-2.5 py-1 rounded text-xs text-morning-blue">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-mono">
                          <span className="text-white font-medium">{item.location.zone}</span> • {item.location.aisle} • {item.location.bin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-base">{item.quantityOnHand}</span>
                            {isLow && (
                              <span className="text-[10px] bg-red-900/40 text-red-400 border border-red-500/40 px-2 py-0.5 rounded font-bold">
                                LOW STOCK
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-morning-blue/50">Reorder at {item.reorderThreshold}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-morning-blue/70">
                          {item.quantityReserved} units
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                          ${item.unitValue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setShowAdjustModal(true);
                            }}
                            className="px-3 py-1.5 bg-dark-olive hover:bg-android-green hover:text-smoky-black text-white text-xs font-semibold rounded-lg transition-all border border-android-green/40 cursor-pointer"
                          >
                            Adjust Stock
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Dock Door Scheduling */}
      {activeTab === 'docks' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {docks.map(dock => (
              <div
                key={dock._id}
                className="bg-[#0c120c] border border-white/5 hover:border-android-green/30 rounded-2xl p-5 shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-white text-lg">{dock.dockNumber}</h4>
                    <span className="text-xs text-morning-blue/60">{dock.facility}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    dock.type === 'Inbound'
                      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {dock.type}
                  </span>
                </div>

                <div className="space-y-2 py-3 border-y border-white/5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-morning-blue/60">Carrier</span>
                    <span className="text-white font-medium">{dock.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-morning-blue/60">Time Slot</span>
                    <span className="text-android-green font-mono">{dock.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-morning-blue/60">Vehicle</span>
                    <span className="text-white font-mono">{dock.vehiclePlate}</span>
                  </div>
                </div>

                <div className="mt-3 flex justify-between items-center text-xs">
                  <span className="text-morning-blue/50">Current Status</span>
                  <span className={`font-semibold ${
                    dock.status === 'Loading' || dock.status === 'Docked' ? 'text-android-green' : 'text-morning-blue/80'
                  }`}>
                    {dock.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Adjust Stock Modal */}
      {showAdjustModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0c120c] border border-android-green/40 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAdjustModal(false)}
              className="absolute top-5 right-5 text-morning-blue/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-1">Adjust Inventory Stock</h3>
            <p className="text-xs text-morning-blue/70 mb-4">{selectedItem.title} ({selectedItem.sku})</p>

            <div className="bg-white/5 p-3 rounded-lg text-xs text-morning-blue mb-4">
              Current On Hand: <span className="text-white font-bold text-sm ml-1">{selectedItem.quantityOnHand}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">Quantity Delta</label>
                <input
                  type="number"
                  min="1"
                  value={adjustAmount}
                  onChange={e => setAdjustAmount(Number(e.target.value))}
                  className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-morning-blue/70 mb-1">Adjustment Reason</label>
                <input
                  type="text"
                  value={adjustReason}
                  onChange={e => setAdjustReason(e.target.value)}
                  placeholder="e.g. Inbound Dock Receipt"
                  className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => handleAdjustStock(adjustAmount)}
                  className="flex items-center justify-center gap-2 py-2.5 bg-android-green text-smoky-black font-semibold rounded-lg hover:bg-white transition-all text-xs"
                >
                  <ArrowDownToLine size={16} />
                  Stock In (+{adjustAmount})
                </button>
                <button
                  type="button"
                  onClick={() => handleAdjustStock(-adjustAmount)}
                  className="flex items-center justify-center gap-2 py-2.5 bg-amber-500 text-smoky-black font-semibold rounded-lg hover:bg-amber-400 transition-all text-xs"
                >
                  <ArrowUpFromLine size={16} />
                  Pick / Out (-{adjustAmount})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
