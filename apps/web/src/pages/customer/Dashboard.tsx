import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Truck, Clock, AlertTriangle } from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const data = [
    { name: 'Mon', shipments: 45 },
    { name: 'Tue', shipments: 52 },
    { name: 'Wed', shipments: 38 },
    { name: 'Thu', shipments: 65 },
    { name: 'Fri', shipments: 48 },
    { name: 'Sat', shipments: 20 },
    { name: 'Sun', shipments: 12 },
  ];

  const stats = [
    { title: 'Active Shipments', value: '124', icon: Package },
    { title: 'In Transit', value: '42', icon: Truck },
    { title: 'Delayed', value: '3', icon: AlertTriangle, color: 'text-red-500' },
    { title: 'Avg Delivery Time', value: '2.4 days', icon: Clock },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-morning-blue/70">Overview of your logistics activity.</p>
        </div>
        <button className="px-4 py-2 bg-dark-olive text-white rounded-lg hover:bg-android-green hover:text-smoky-black transition-colors font-medium text-sm">
          New Shipment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 bg-dark-olive/30 rounded-lg ${stat.color || 'text-android-green'}`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-morning-blue/70">{stat.title}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm mt-8">
        <h3 className="text-lg font-medium text-white mb-6">Shipment Volume (Last 7 Days)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorShip" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A6BC36" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#A6BC36" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#B5C3C3" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#B5C3C3" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0C140C', borderColor: '#566933', color: '#fff' }}
                itemStyle={{ color: '#A6BC36' }}
              />
              <Area type="monotone" dataKey="shipments" stroke="#A6BC36" strokeWidth={2} fillOpacity={1} fill="url(#colorShip)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
