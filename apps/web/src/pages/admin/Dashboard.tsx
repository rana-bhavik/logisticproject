import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Users, Truck, CheckCircle2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const data = [
    { name: 'Jan', deliveries: 4000, revenue: 2400 },
    { name: 'Feb', deliveries: 3000, revenue: 1398 },
    { name: 'Mar', deliveries: 2000, revenue: 9800 },
    { name: 'Apr', deliveries: 2780, revenue: 3908 },
    { name: 'May', deliveries: 1890, revenue: 4800 },
    { name: 'Jun', deliveries: 2390, revenue: 3800 },
    { name: 'Jul', deliveries: 3490, revenue: 4300 },
  ];

  const stats = [
    { title: 'Total Companies', value: '142', change: '+12%', icon: Users },
    { title: 'Active Fleets', value: '1,204', change: '+5%', icon: Truck },
    { title: 'System Health', value: '99.9%', change: 'Stable', icon: Activity },
    { title: 'Deliveries Today', value: '45.2k', change: '+18%', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Overview</h1>
          <p className="text-morning-blue/70">Welcome back to the Super Admin console.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white/5 border border-dark-olive/50 text-white text-sm rounded-lg focus:ring-android-green focus:border-android-green block p-2.5">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-dark-olive text-white rounded-lg hover:bg-android-green hover:text-smoky-black transition-colors font-medium text-sm">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-dark-olive/30 rounded-lg text-android-green">
                  <Icon size={24} />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-android-green' : 'text-morning-blue'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-morning-blue/70">{stat.title}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Revenue Chart */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-6">Platform Revenue</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A6BC36" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#A6BC36" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#B5C3C3" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#B5C3C3" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0C140C', borderColor: '#566933', color: '#fff' }}
                  itemStyle={{ color: '#A6BC36' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#A6BC36" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deliveries Chart */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-6">Global Deliveries</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#B5C3C3" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#B5C3C3" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0C140C', borderColor: '#566933', color: '#fff' }}
                  itemStyle={{ color: '#566933' }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Bar dataKey="deliveries" fill="#566933" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
