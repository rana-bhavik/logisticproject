import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Company Admin');
  const [roleKey, setRoleKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName || 'Enterprise User',
          email: email.trim(),
          password,
          companyName: company.trim() || 'Global Freight Corp',
          role,
          roleKey,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Registration failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role || 'Company Admin');
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      }

      if (data.status === 'Pending') {
        alert('Your internal role request has been received. Please wait for Super Admin approval before logging in.');
        navigate('/login');
      } else {
        navigate(data.redirectPath || '/customer');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to register account. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Request Access</h2>
        <p className="text-morning-blue/70 text-sm">Join the intelligent autonomous logistics network</p>
      </div>

      {error && (
        <div className="mb-6 p-3.5 bg-red-900/20 border border-red-500/40 rounded-xl text-xs text-red-400 flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-morning-blue mb-1" htmlFor="firstName">
              First Name
            </label>
            <input 
              type="text" 
              id="firstName" 
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jane"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-dark-olive/50 rounded-lg text-white text-sm focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-morning-blue mb-1" htmlFor="lastName">
              Last Name
            </label>
            <input 
              type="text" 
              id="lastName" 
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-dark-olive/50 rounded-lg text-white text-sm focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-morning-blue mb-1" htmlFor="company">
            Company Name
          </label>
          <input 
            type="text" 
            id="company" 
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Freight International"
            className="w-full px-3.5 py-2.5 bg-white/5 border border-dark-olive/50 rounded-lg text-white text-sm focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-morning-blue mb-1" htmlFor="role">
            Platform Role
          </label>
          <select 
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white/5 border border-dark-olive/50 rounded-lg text-white text-sm focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
          >
            <option value="Company Admin" className="bg-[#0c120c] text-white">Company Admin (Client)</option>
            <option value="Dispatcher" className="bg-[#0c120c] text-white">Dispatcher</option>
            <option value="Warehouse Manager" className="bg-[#0c120c] text-white">Warehouse Manager</option>
            <option value="Driver" className="bg-[#0c120c] text-white">Driver</option>
            <option value="Super Admin" className="bg-[#0c120c] text-white">Super Admin</option>
          </select>
        </div>

        {role !== 'Company Admin' && (
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-amber-400 mb-1" htmlFor="roleKey">
              Internal Access Key
            </label>
            <input 
              type="text" 
              id="roleKey" 
              required
              value={roleKey}
              onChange={(e) => setRoleKey(e.target.value)}
              placeholder="Provided by Super Admin"
              className="w-full px-3.5 py-2.5 bg-white/5 border border-amber-400/50 rounded-lg text-white text-sm focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-colors"
            />
          </div>
        )}

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-morning-blue mb-1" htmlFor="email">
            Corporate Work Email
          </label>
          <input 
            type="email" 
            id="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane.doe@acmefreight.com"
            className="w-full px-3.5 py-2.5 bg-white/5 border border-dark-olive/50 rounded-lg text-white text-sm focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-morning-blue mb-1" htmlFor="password">
            Set Security Password
          </label>
          <input 
            type="password" 
            id="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 bg-white/5 border border-dark-olive/50 rounded-lg text-white text-sm focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-android-green text-smoky-black font-bold rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(166,188,54,0.3)] flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Provisioning Account...
            </>
          ) : (
            <>
              Submit Registration
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
      
      <p className="mt-8 text-center text-xs text-morning-blue/70">
        Already have an enterprise account?{' '}
        <Link to="/login" className="text-android-green hover:text-white transition-colors font-semibold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
