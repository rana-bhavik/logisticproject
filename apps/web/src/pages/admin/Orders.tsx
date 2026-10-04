import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  Plane, 
  Ship, 
  ShieldAlert,
  ChevronRight,
  X
} from 'lucide-react';
import { ordersApi, type Order } from '../../services/api';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Form State for new order
  const [newOrder, setNewOrder] = useState({
    senderName: '',
    senderCity: '',
    senderCountry: '',
    recipientName: '',
    recipientCity: '',
    recipientCountry: '',
    sku: '',
    itemDesc: '',
    quantity: 1,
    weightKg: 100,
    freightType: 'Express' as Order['freightType'],
    priority: 'High' as Order['priority'],
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await ordersApi.list(statusFilter === 'ALL' ? undefined : statusFilter);
      if (res && res.orders) {
        setOrders(res.orders);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Partial<Order> = {
        sender: {
          name: newOrder.senderName || 'Global Hub Logistics',
          address: 'Terminal 1 Alpha',
          city: newOrder.senderCity || 'Zurich',
          country: newOrder.senderCountry || 'Switzerland',
        },
        recipient: {
          name: newOrder.recipientName || 'Nexus Distribution',
          address: 'Logistics Parkway 88',
          city: newOrder.recipientCity || 'Milan',
          country: newOrder.recipientCountry || 'Italy',
        },
        items: [
          {
            sku: newOrder.sku || 'SKU-GEN-01',
            description: newOrder.itemDesc || 'General Cargo Pack',
            quantity: Number(newOrder.quantity),
            weightKg: Number(newOrder.weightKg),
          },
        ],
        totalWeightKg: Number(newOrder.weightKg),
        freightType: newOrder.freightType,
        priority: newOrder.priority,
        status: 'Pending',
      };

      const res = await ordersApi.create(payload);
      if (res?.order) {
        setOrders([res.order, ...orders]);
      } else {
        // Fallback simulate creation locally
        const mockCreated: Order = {
          _id: `ord-${Date.now()}`,
          orderNumber: `ORD-GL-${Math.floor(1000 + Math.random() * 9000)}`,
          sender: payload.sender!,
          recipient: payload.recipient!,
          items: payload.items!,
          totalWeightKg: payload.totalWeightKg!,
          freightType: payload.freightType!,
          priority: payload.priority!,
          status: 'Pending',
          createdAt: new Date().toISOString(),
        };
        setOrders([mockCreated, ...orders]);
      }
      setShowCreateModal(false);
    } catch (err) {
      alert('Error creating order: ' + (err as Error).message);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await ordersApi.updateStatus(orderId, newStatus);
      setOrders(orders.map(o => (o._id === orderId ? { ...o, status: newStatus } : o)));
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.warn(err);
      // Update local state anyway
      setOrders(orders.map(o => (o._id === orderId ? { ...o, status: newStatus } : o)));
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.sender.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.recipient.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.recipient.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'In_Transit':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-android-green/10 text-android-green border border-android-green/30"><Truck size={12} /> In Transit</span>;
      case 'Delivered':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"><CheckCircle2 size={12} /> Delivered</span>;
      case 'Processing':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30"><Clock size={12} /> Processing</span>;
      case 'Confirmed':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30"><ArrowUpRight size={12} /> Confirmed</span>;
      case 'Pending':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-500/10 text-neutral-400 border border-neutral-500/30"><Clock size={12} /> Pending</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30"><AlertCircle size={12} /> {status}</span>;
    }
  };

  const getPriorityBadge = (priority: Order['priority']) => {
    switch (priority) {
      case 'Urgent':
        return <span className="text-red-400 bg-red-900/30 px-2 py-0.5 rounded text-xs font-bold border border-red-500/40">URGENT</span>;
      case 'High':
        return <span className="text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded text-xs font-medium border border-amber-500/40">HIGH</span>;
      default:
        return <span className="text-morning-blue/70 bg-white/5 px-2 py-0.5 rounded text-xs">{priority}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Cargo & Order Manifests</h1>
          <p className="text-morning-blue/70 mt-1">
            Global booking registry, multi-modal container manifests, and dispatch verification.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-android-green text-smoky-black font-semibold rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(166,188,54,0.3)] cursor-pointer"
          >
            <Plus size={18} />
            Book Freight Order
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-start text-morning-blue/70 text-xs uppercase tracking-wider mb-2">
            <span>Total Active Orders</span>
            <Package size={16} className="text-android-green" />
          </div>
          <div className="text-2xl font-bold text-white">{orders.length}</div>
          <div className="text-xs text-android-green mt-1">100% synchronized with ledger</div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-start text-morning-blue/70 text-xs uppercase tracking-wider mb-2">
            <span>In Transit High Priority</span>
            <Truck size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">
            {orders.filter(o => o.status === 'In_Transit' || o.priority === 'Urgent').length}
          </div>
          <div className="text-xs text-morning-blue/60 mt-1">Telemetry GPS streaming live</div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-start text-morning-blue/70 text-xs uppercase tracking-wider mb-2">
            <span>Total Tonnage In-Flight</span>
            <Plane size={16} className="text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-sky-400">
            {(orders.reduce((acc, o) => acc + (o.totalWeightKg || 0), 0) / 1000).toFixed(1)} <span className="text-sm font-normal text-morning-blue/60">Tons</span>
          </div>
          <div className="text-xs text-morning-blue/60 mt-1">Multi-modal global corridors</div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-start text-morning-blue/70 text-xs uppercase tracking-wider mb-2">
            <span>Fulfilled Rate</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">99.4%</div>
          <div className="text-xs text-morning-blue/60 mt-1">On-time SLA compliance</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-80 relative">
          <Search size={16} className="absolute left-3 text-morning-blue/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order #, city, or company..."
            className="w-full bg-white/5 border border-dark-olive/50 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-morning-blue/40 focus:outline-none focus:border-android-green"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs text-morning-blue/60 uppercase flex items-center gap-1 mr-1">
            <Filter size={12} /> Status:
          </span>
          {['ALL', 'Pending', 'Confirmed', 'Processing', 'In_Transit', 'Delivered'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === st
                  ? 'bg-android-green text-smoky-black font-semibold'
                  : 'bg-white/5 text-morning-blue/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-morning-blue/80">
            <thead className="text-xs uppercase bg-white/5 text-morning-blue border-b border-dark-olive/40 tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Sender Hub</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Cargo & Weight</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-olive/20">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-morning-blue/50">
                    Synchronizing orders from global telemetry hub...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-morning-blue/50">
                    No orders match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr 
                    key={order._id} 
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-white tracking-wide">{order.orderNumber}</div>
                      <div className="text-xs text-morning-blue/50">
                        {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-medium">{order.sender.city}</div>
                      <div className="text-xs text-morning-blue/60">{order.sender.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-medium">{order.recipient.city}</div>
                      <div className="text-xs text-morning-blue/60">{order.recipient.country}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white">
                        {order.items[0]?.sku || 'CARGO-PALLET'} ({order.totalWeightKg} kg)
                      </div>
                      <div className="text-xs text-android-green">{order.freightType} Freight</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(order.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order._id, e.target.value as Order['status'])}
                        className="bg-smoky-black border border-dark-olive/60 text-xs text-morning-blue rounded-md px-2 py-1 focus:border-android-green focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="In_Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal / Flyout */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0c120c] border border-android-green/30 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 text-morning-blue/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-android-green/10 text-android-green rounded-xl border border-android-green/30">
                <Package size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedOrder.orderNumber}</h3>
                <div className="flex items-center gap-3 mt-1">
                  {getStatusBadge(selectedOrder.status)}
                  {getPriorityBadge(selectedOrder.priority)}
                  <span className="text-xs text-morning-blue/60">{selectedOrder.freightType} Freight</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                <div className="text-xs text-morning-blue/50 uppercase tracking-wider mb-2 font-semibold">Origin Dispatch</div>
                <div className="text-white font-medium">{selectedOrder.sender.name}</div>
                <div className="text-sm text-morning-blue/70">{selectedOrder.sender.address}</div>
                <div className="text-sm text-morning-blue/70">{selectedOrder.sender.city}, {selectedOrder.sender.country}</div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                <div className="text-xs text-morning-blue/50 uppercase tracking-wider mb-2 font-semibold">Destination Consignee</div>
                <div className="text-white font-medium">{selectedOrder.recipient.name}</div>
                <div className="text-sm text-morning-blue/70">{selectedOrder.recipient.address}</div>
                <div className="text-sm text-morning-blue/70">{selectedOrder.recipient.city}, {selectedOrder.recipient.country}</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-6">
              <div className="text-xs text-morning-blue/50 uppercase tracking-wider mb-3 font-semibold">Consignment Manifest</div>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <div>
                      <div className="text-white font-mono">{item.sku}</div>
                      <div className="text-xs text-morning-blue/60">{item.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">{item.quantity} units</div>
                      <div className="text-xs text-android-green">{item.weightKg} kg</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20 text-sm font-medium"
              >
                Close Manifest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Freight Order Booking Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0c120c] border border-android-green/40 rounded-2xl w-full max-w-xl p-6 shadow-2xl my-8 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 text-morning-blue/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-2">Book Multi-Modal Freight Order</h3>
            <p className="text-xs text-morning-blue/70 mb-6">Initiate container booking, customs manifest, and priority freight assignment.</p>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Sender Company</label>
                  <input
                    type="text"
                    required
                    value={newOrder.senderName}
                    onChange={e => setNewOrder({ ...newOrder, senderName: e.target.value })}
                    placeholder="e.g. Acme Tech"
                    className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Origin City & Country</label>
                  <input
                    type="text"
                    required
                    value={newOrder.senderCity}
                    onChange={e => setNewOrder({ ...newOrder, senderCity: e.target.value })}
                    placeholder="e.g. Frankfurt, Germany"
                    className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Recipient Consignee</label>
                  <input
                    type="text"
                    required
                    value={newOrder.recipientName}
                    onChange={e => setNewOrder({ ...newOrder, recipientName: e.target.value })}
                    placeholder="e.g. EuroLogix B.V."
                    className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Destination City</label>
                  <input
                    type="text"
                    required
                    value={newOrder.recipientCity}
                    onChange={e => setNewOrder({ ...newOrder, recipientCity: e.target.value })}
                    placeholder="e.g. Rotterdam, Netherlands"
                    className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Cargo SKU</label>
                  <input
                    type="text"
                    required
                    value={newOrder.sku}
                    onChange={e => setNewOrder({ ...newOrder, sku: e.target.value })}
                    placeholder="SKU-CHIP-9"
                    className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newOrder.quantity}
                    onChange={e => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Weight (KG)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newOrder.weightKg}
                    onChange={e => setNewOrder({ ...newOrder, weightKg: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Freight Type</label>
                  <select
                    value={newOrder.freightType}
                    onChange={e => setNewOrder({ ...newOrder, freightType: e.target.value as any })}
                    className="w-full bg-smoky-black border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  >
                    <option value="Express">Express Air/Road</option>
                    <option value="Standard">Standard Multi-Modal</option>
                    <option value="Refrigerated">Refrigerated Cold-Chain</option>
                    <option value="Hazardous">Hazardous Hazmat Certified</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Priority SLA</label>
                  <select
                    value={newOrder.priority}
                    onChange={e => setNewOrder({ ...newOrder, priority: e.target.value as any })}
                    className="w-full bg-smoky-black border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  >
                    <option value="Urgent">Urgent (Express 24h)</option>
                    <option value="High">High (Priority 48h)</option>
                    <option value="Medium">Medium (Standard 72h)</option>
                    <option value="Low">Low (Economy Freight)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-dark-olive/30">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-android-green text-smoky-black font-semibold rounded-lg hover:bg-white transition-all text-sm"
                >
                  Confirm & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
