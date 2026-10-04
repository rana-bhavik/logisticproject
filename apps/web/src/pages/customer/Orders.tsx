import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  MapPin, 
  Truck, 
  Plane, 
  Ship, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { ordersApi, shipmentsApi, type Order, type Shipment } from '../../services/api';

const CustomerOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackedShipment, setTrackedShipment] = useState<Shipment | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);

  // Rate calculator booking form
  const [booking, setBooking] = useState({
    origin: 'Munich, Germany',
    destination: 'Berlin, Germany',
    weightKg: 250,
    freightType: 'Express' as Order['freightType'],
  });

  const estimatedQuote = Math.round(booking.weightKg * (booking.freightType === 'Express' ? 2.8 : 1.4) + 120);

  useEffect(() => {
    Promise.all([ordersApi.list(), shipmentsApi.list()])
      .then(([oRes, sRes]) => {
        if (oRes?.orders) setOrders(oRes.orders);
        if (sRes?.shipments) {
          setShipments(sRes.shipments);
          setTrackedShipment(sRes.shipments[0]);
          setTrackingInput(sRes.shipments[0].trackingNumber);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = shipments.find(s => s.trackingNumber.toLowerCase() === trackingInput.trim().toLowerCase());
    if (found) {
      setTrackedShipment(found);
    } else {
      alert(`Tracking number "${trackingInput}" not found in current manifest. Try: TRK-GL-89104`);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrd: Order = {
      _id: `ord-cust-${Date.now()}`,
      orderNumber: `ORD-CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      sender: { name: 'Customer Logistics Account', address: 'Commercial Bay 4', city: booking.origin.split(',')[0], country: 'EU' },
      recipient: { name: 'Direct Consignee', address: 'Receiving Dock 2', city: booking.destination.split(',')[0], country: 'EU' },
      items: [{ sku: 'COMMERCIAL-PARCEL', description: 'Booked freight shipment', quantity: 1, weightKg: Number(booking.weightKg) }],
      totalWeightKg: Number(booking.weightKg),
      freightType: booking.freightType,
      priority: 'High',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    setOrders([newOrd, ...orders]);
    setShowBookModal(false);
    alert(`Freight booking confirmed! Reference: ${newOrd.orderNumber}. Quote: ₹${estimatedQuote}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Shipments & Live Tracking</h1>
          <p className="text-morning-blue/70 mt-1">
            Real-time milestone visibility, instant rate booking, and delivery confirmation.
          </p>
        </div>

        <button
          onClick={() => setShowBookModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-android-green text-smoky-black font-semibold rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(166,188,54,0.3)] cursor-pointer"
        >
          <Plus size={18} /> Book New Freight
        </button>
      </div>

      {/* Live Tracking HUD Banner */}
      <div className="bg-[#0c120c] border border-android-green/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-3 text-morning-blue/50" />
            <input
              type="text"
              value={trackingInput}
              onChange={e => setTrackingInput(e.target.value)}
              placeholder="Enter container or air waybill tracking number (e.g. TRK-GL-89104)..."
              className="w-full bg-white/5 border border-dark-olive/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-android-green font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-dark-olive hover:bg-android-green hover:text-smoky-black text-white text-sm font-semibold rounded-xl transition-all border border-android-green/40 cursor-pointer"
          >
            Track Container
          </button>
        </form>

        {trackedShipment && (
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-olive/30 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-white font-mono">{trackedShipment.trackingNumber}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-android-green/10 text-android-green border border-android-green/30">
                    {trackedShipment.status}
                  </span>
                </div>
                <p className="text-xs text-morning-blue/70 mt-0.5">Carrier: {trackedShipment.carrier}</p>
              </div>

              <div className="text-right">
                <div className="text-xs text-morning-blue/50 uppercase">Estimated Delivery</div>
                <div className="text-base font-bold text-android-green">
                  {trackedShipment.estimatedDeliveryDate 
                    ? new Date(trackedShipment.estimatedDeliveryDate).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
                    : 'On Schedule'}
                </div>
              </div>
            </div>

            {/* Milestones Stepper */}
            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              {[
                { label: 'Booking Confirmed', done: true },
                { label: 'Customs Manifested', done: true },
                { label: 'In Transit Corridors', done: true },
                { label: 'Final Hub Delivery', done: false },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                    step.done 
                      ? 'bg-android-green text-smoky-black shadow-[0_0_15px_#a6bc36]' 
                      : 'bg-white/10 text-morning-blue/60 border border-white/10'
                  }`}>
                    {step.done ? <CheckCircle2 size={16} /> : idx + 1}
                  </div>
                  <div className={`text-xs font-medium ${step.done ? 'text-white' : 'text-morning-blue/50'}`}>
                    {step.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Live Location telemetry badge */}
            {trackedShipment.currentLocation && (
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-morning-blue/80">
                  <MapPin size={16} className="text-android-green" />
                  <span>Last Reported Coordinates:</span>
                  <span className="font-mono text-white">
                    {trackedShipment.currentLocation.lat.toFixed(3)}°N, {trackedShipment.currentLocation.lng.toFixed(3)}°E
                  </span>
                </div>
                <div className="flex items-center gap-4 text-morning-blue/70">
                  <span>Speed: <strong className="text-white">{trackedShipment.currentLocation.speedKmh} km/h</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck size={14} /> Telematics Verified</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booked Shipments List */}
      <div className="bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-4">My Booked Shipments & Active Corridors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-[#0c120c] border border-white/5 hover:border-android-green/40 rounded-xl p-5 shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white font-mono text-sm">{order.orderNumber}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-android-green/10 text-android-green border border-android-green/30">
                  {order.status}
                </span>
              </div>
              <div className="text-xs text-morning-blue/70 my-2">
                {order.sender.city} → {order.recipient.city}
              </div>
              <div className="flex justify-between items-center text-xs pt-3 border-t border-white/5 text-morning-blue/60">
                <span>{order.totalWeightKg} kg ({order.freightType})</span>
                <span className="text-white font-medium">{order.priority} SLA</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instant Rate Booking Modal */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0c120c] border border-android-green/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setShowBookModal(false)}
              className="absolute top-5 right-5 text-morning-blue/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-1">Instant Freight Booking</h3>
            <p className="text-xs text-morning-blue/70 mb-4">Get instant algorithmic container rates and dispatch approval.</p>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Origin City</label>
                  <input
                    type="text"
                    required
                    value={booking.origin}
                    onChange={e => setBooking({ ...booking, origin: e.target.value })}
                    className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Destination City</label>
                  <input
                    type="text"
                    required
                    value={booking.destination}
                    onChange={e => setBooking({ ...booking, destination: e.target.value })}
                    className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Weight (KG)</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={booking.weightKg}
                    onChange={e => setBooking({ ...booking, weightKg: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-morning-blue/70 mb-1">Modality SLA</label>
                  <select
                    value={booking.freightType}
                    onChange={e => setBooking({ ...booking, freightType: e.target.value as any })}
                    className="w-full bg-smoky-black border border-dark-olive/50 rounded-lg px-3 py-2 text-sm text-white focus:border-android-green focus:outline-none"
                  >
                    <option value="Express">Express Multi-Modal (Fast)</option>
                    <option value="Standard">Standard Multi-Modal (Eco)</option>
                    <option value="Refrigerated">Cold-Chain Reefer</option>
                  </select>
                </div>
              </div>

              {/* Instant Quote Box */}
              <div className="bg-android-green/10 border border-android-green/30 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <div className="text-xs text-morning-blue/70 uppercase">Estimated Guaranteed Freight Cost</div>
                  <div className="text-2xl font-bold text-white">₹{estimatedQuote.toLocaleString()} INR</div>
                </div>
                <div className="text-xs text-android-green font-semibold">Includes Port Customs</div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-dark-olive/30">
                <button
                  type="button"
                  onClick={() => setShowBookModal(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-android-green text-smoky-black font-semibold rounded-lg text-sm"
                >
                  Confirm & Reserve Freight
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
