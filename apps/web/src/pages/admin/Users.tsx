import React from 'react';
import { Search, Plus, MoreVertical, User, Shield } from 'lucide-react';

const Users: React.FC = () => {
  const users = [
    { id: 1, name: 'Alice Freeman', email: 'alice@globalfreight.com', role: 'Company Admin', company: 'Global Freight Ltd', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@rapidtransit.com', role: 'Dispatcher', company: 'Rapid Transit Co', status: 'Active' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@logistis.com', role: 'Super Admin', company: 'Logistis Internal', status: 'Active' },
    { id: 4, name: 'Diana Prince', email: 'diana@ecologistics.com', role: 'Warehouse Manager', company: 'EcoLogistics', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Users & Roles</h1>
          <p className="text-morning-blue/70">Manage user access, roles, and global permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-android-green text-smoky-black rounded-lg hover:bg-june-bud transition-colors font-semibold text-sm">
          <Plus size={18} />
          Invite User
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-morning-blue/50">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-android-green transition-colors"
            placeholder="Search users by name, email or role..."
          />
        </div>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-morning-blue">
            <thead className="text-xs uppercase bg-black/20 text-morning-blue/70">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-dark-olive/30 flex items-center justify-center text-android-green uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white">{user.name}</div>
                      <div className="text-xs text-morning-blue/60 font-normal">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5">
                      {user.role === 'Super Admin' ? <Shield size={14} className="text-android-green" /> : <User size={14} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.company}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-android-green/10 text-android-green' : 'bg-morning-blue/10 text-morning-blue'
                    }`}>
                      {user.status}
                    </span>
                  </td>
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

export default Users;
