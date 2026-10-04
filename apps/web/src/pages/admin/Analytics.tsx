import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { Download, FileText, Leaf, Target, TrendingUp, Calendar, Filter } from 'lucide-react';

const Analytics: React.FC = () => {
  const [reportType, setReportType] = useState('esg');
  
  const esgData = [
    { month: 'Jan', emissions: 120, savings: 40 },
    { month: 'Feb', emissions: 110, savings: 50 },
    { month: 'Mar', emissions: 95, savings: 65 },
    { month: 'Apr', emissions: 85, savings: 75 },
    { month: 'May', emissions: 70, savings: 90 },
    { month: 'Jun', emissions: 65, savings: 95 },
  ];

  const slaData = [
    { name: 'On-Time Delivery', value: 94 },
    { name: 'Delayed', value: 4 },
    { name: 'Exceptions', value: 2 },
  ];

  const COLORS = ['#a6bc36', '#f59e0b', '#ef4444'];

  const handleExport = () => {
    alert('Custom Data Export Engine (CSV/Excel/JSON) initiated. Your report is generating...');
  };

  const handleSchedule = () => {
    alert('Scheduled Automated Report Delivery configured. You will receive this report weekly.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Enterprise Analytics & ESG</h1>
          <p className="text-morning-blue">Advanced reporting, SLA scorecards, and carbon footprint metrics.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSchedule} className="px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2 cursor-pointer">
            <Calendar size={18} /> Schedule Report
          </button>
          <button onClick={handleExport} className="px-4 py-2 bg-android-green text-smoky-black font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer">
            <Download size={18} /> Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ESG & Carbon Footprint */}
        <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Leaf size={18} className="text-android-green" /> Environmental & Carbon (ESG) Reporting
              </h3>
              <p className="text-xs text-morning-blue/70 mt-1">Track CO2 emissions vs savings from EV fleet routing.</p>
            </div>
            <select className="bg-[#0c120c] border border-dark-olive/50 rounded-lg px-3 py-1.5 text-sm text-white focus:border-android-green outline-none">
              <option>H1 2026</option>
              <option>2025 Annual</option>
            </select>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={esgData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e3d1a" vertical={false} />
                <XAxis dataKey="month" stroke="#8d9b93" />
                <YAxis stroke="#8d9b93" tickFormatter={(v) => `${v}t`} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0c120c', borderColor: '#a6bc36' }} />
                <Line type="monotone" dataKey="emissions" name="CO2 Emissions (Tons)" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="savings" name="CO2 Savings (Tons)" stroke="#a6bc36" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SLA Performance Scorecard */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target size={18} className="text-sky-400" /> SLA Performance Scorecard
            </h3>
            <p className="text-xs text-morning-blue/70 mt-1">Network-wide delivery compliance.</p>
          </div>
          
          <div className="flex-1 flex justify-center items-center -mt-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={slaData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {slaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#0c120c', borderColor: '#a6bc36' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2 mt-4">
            {slaData.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-white">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  {item.name}
                </span>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Driver Performance & Behavior Analytics */}
        <div className="lg:col-span-3 bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm mt-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-amber-400" /> Driver Performance & Profit & Loss (P&L) Route Analytics
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-morning-blue/80">
              <thead className="text-xs uppercase bg-white/5 text-morning-blue border-b border-dark-olive/40">
                <tr>
                  <th className="px-4 py-3">Driver ID</th>
                  <th className="px-4 py-3">Safety Score</th>
                  <th className="px-4 py-3">Avg Speed</th>
                  <th className="px-4 py-3">Fuel/Energy Efficiency</th>
                  <th className="px-4 py-3">Route Net Margin (P&L)</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-olive/20">
                {[
                  { id: 'DRV-1002', name: 'Marcus L.', score: 98, speed: '84 km/h', eff: '92%', margin: '₹28,500' },
                  { id: 'DRV-1045', name: 'Sarah J.', score: 95, speed: '82 km/h', eff: '89%', margin: '₹22,100' },
                  { id: 'DRV-1188', name: 'Ahmed K.', score: 76, speed: '91 km/h', eff: '65%', margin: '₹9,400' },
                ].map(drv => (
                  <tr key={drv.id} className="hover:bg-white/[0.03]">
                    <td className="px-4 py-3 whitespace-nowrap text-white font-medium">
                      {drv.id} <span className="text-xs text-morning-blue/50 ml-1">({drv.name})</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${drv.score > 90 ? 'text-android-green bg-android-green/10' : 'text-amber-400 bg-amber-400/10'}`}>
                        {drv.score}
                      </div>
                    </td>
                    <td className="px-4 py-3">{drv.speed}</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-black h-1.5 rounded-full mt-1">
                        <div className={`h-full rounded-full ${drv.score > 90 ? 'bg-android-green' : 'bg-amber-400'}`} style={{ width: drv.eff }}></div>
                      </div>
                      <span className="text-xs mt-1 block">{drv.eff} Optimized</span>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-white">{drv.margin}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-xs text-android-green hover:underline cursor-pointer">View Dossier</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
