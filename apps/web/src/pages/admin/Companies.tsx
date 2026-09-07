import React from 'react';
import { Search, Plus, MoreVertical, Building2 } from 'lucide-react';

const Companies: React.FC = () => {
  const companies = [
    { id: 1, name: 'Global Freight Ltd', status: 'Active', plan: 'Enterprise', users: 145, joined: '2025-10-12' },
    { id: 2, name: 'Rapid Transit Co', status: 'Active', plan: 'Professional', users: 32, joined: '2025-11-05' },
    { id: 3, name: 'EcoLogistics', status: 'Suspended', plan: 'Starter', users: 12, joined: '2026-01-20' },
    { id: 4, name: 'Prime Delivery Inc', status: 'Active', plan: 'Enterprise', users: 890, joined: '2026-02-15' },
    { id: 5, name: 'Nexus Supply Chain', status: 'Active', plan: 'Professional', users: 64, joined: '2026-03-01' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Company Management</h1>
          <p className="text-morning-blue/70">Manage all registered client companies on the platform.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-android-green text-smoky-black rounded-lg hover:bg-june-bud transition-colors font-semibold text-sm">
          <Plus size={18} />
          Add Company
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-morning-blue/50">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-android-green transition-colors"
            placeholder="Search companies by name or ID..."
          />
        </div>
        <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-android-green">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Suspended</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/5 rounded-xl backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-morning-blue">
            <thead className="text-xs uppercase bg-black/20 text-morning-blue/70">
              <tr>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Active Users</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-dark-olive/30 flex items-center justify-center text-android-green">
                      <Building2 size={16} />
                    </div>
                    {company.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      company.status === 'Active' ? 'bg-android-green/10 text-android-green' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{company.plan}</td>
                  <td className="px-6 py-4">{company.users}</td>
                  <td className="px-6 py-4">{company.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-morning-blue/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Companies;
