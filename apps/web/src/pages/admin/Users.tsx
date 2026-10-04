import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, User, Shield, CheckCircle2 } from 'lucide-react';
import { io } from 'socket.io-client';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();

    const socket = io(API_BASE.replace('/api', ''));
    
    socket.on('new_user_registration', (newUser) => {
      const currentUserRole = localStorage.getItem('role');
      const currentUserObj = JSON.parse(localStorage.getItem('user') || '{}');
      
      // If Super Admin, just inject it
      if (currentUserRole === 'Super Admin') {
        setUsers(prev => {
          if (prev.find(u => u._id === newUser._id)) return prev;
          return [newUser, ...prev];
        });
      } 
      // If Company Admin, only inject if the company matches
      else if (currentUserRole === 'Company Admin' && newUser.companyId?._id === currentUserObj.companyId) {
        setUsers(prev => {
          if (prev.find(u => u._id === newUser._id)) return prev;
          return [newUser, ...prev];
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        alert('Your session was invalid or offline. You are being redirected to log in securely.');
        window.location.href = '/login';
      } else {
        alert('API Failed! Status: ' + res.status);
        console.error('Failed to fetch users, status:', res.status);
      }
    } catch (error: any) {
      alert('Network Error when fetching users: ' + error.message);
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        fetchUsers(); // Refresh list
      }
    } catch (error) {
      console.error('Failed to approve user', error);
    }
  };

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
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-morning-blue/70">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-morning-blue/70">
                    No users found.
                  </td>
                </tr>
              ) : (
                users
                  .filter(user => user.status === 'Pending' || user.role === 'Super Admin' || user.role === 'Company Admin')
                  .map((user) => (
                  <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
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
                  <td className="px-6 py-4">{user.companyId?.name || 'Logistis Internal'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-android-green/10 text-android-green' : 
                      user.status === 'Pending' ? 'bg-amber-400/10 text-amber-400' : 'bg-morning-blue/10 text-morning-blue'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    {user.status === 'Pending' && (
                      <button 
                        onClick={() => handleApprove(user._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-android-green/10 text-android-green text-xs font-bold rounded hover:bg-android-green hover:text-black transition-colors cursor-pointer border border-android-green/30"
                      >
                        <CheckCircle2 size={14} />
                        Approve
                      </button>
                    )}
                    <button className="p-2 text-morning-blue/50 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
