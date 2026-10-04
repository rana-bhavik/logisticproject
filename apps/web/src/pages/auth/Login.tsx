import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        throw new Error(data.error || data.message || 'Login failed');
      }

      // Save credentials in session storage / local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role || 'Company Admin');
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Route based on role & redirectPath
      if (data.redirectPath) {
        navigate(data.redirectPath);
      } else if (data.role === 'Super Admin') {
        navigate('/admin');
      } else if (data.role === 'Dispatcher') {
        navigate('/admin/dispatch');
      } else if (data.role === 'Warehouse Manager') {
        navigate('/admin/warehouse');
      } else if (data.role === 'Driver') {
        navigate('/driver');
      } else {
        navigate('/customer');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
        <p className="text-morning-blue/70 text-sm">Enter your enterprise credentials to access your console</p>
      </div>

      {error && (
        <div className="mb-6 p-3.5 bg-red-900/20 border border-red-500/40 rounded-xl text-xs text-red-400 flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 5-Role 1-Click Quick Demo Accounts */}
      <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl space-y-2.5">
        <div className="text-[11px] text-morning-blue/60 uppercase tracking-wider font-semibold">
          ⚡ 1-Click Role Switcher (5 Standard Personas)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill('admin@logistis.com', 'Admin@123456')}
            className="py-1.5 px-2 bg-dark-olive/50 hover:bg-dark-olive border border-android-green/40 rounded-lg text-xs text-white font-medium transition-colors text-center"
          >
            👑 Super Admin
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('client@logistis.com', 'Client@123456')}
            className="py-1.5 px-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-morning-blue/80 hover:text-white font-medium transition-colors text-center"
          >
            🏢 Company Admin
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('dispatcher@logistis.com', 'Dispatch@123456')}
            className="py-1.5 px-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-sky-400 hover:text-white font-medium transition-colors text-center"
          >
            📡 Dispatcher
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('warehouse@logistis.com', 'Warehouse@123456')}
            className="py-1.5 px-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-amber-400 hover:text-white font-medium transition-colors text-center"
          >
            🏭 Warehouse
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('driver@logistis.com', 'Driver@123456')}
            className="py-1.5 px-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-emerald-400 hover:text-white font-medium transition-colors text-center sm:col-span-2 md:col-span-1"
          >
            🚛 Driver Cockpit
          </button>
        </div>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-morning-blue mb-2" htmlFor="email">
            Work Email
          </label>
          <input 
            type="email" 
            id="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@logistis.com"
            className="w-full px-4 py-3 bg-white/5 border border-dark-olive/50 rounded-lg text-white placeholder-morning-blue/40 focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors text-sm"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs uppercase tracking-wider font-semibold text-morning-blue" htmlFor="password">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs text-android-green hover:text-white transition-colors">
              Forgot password?
            </Link>
          </div>
          <input 
            type="password" 
            id="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-white/5 border border-dark-olive/50 rounded-lg text-white placeholder-morning-blue/40 focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors text-sm"
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-android-green text-smoky-black font-bold rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(166,188,54,0.3)] flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Authenticating Session...
            </>
          ) : (
            <>
              Sign in to Console
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
      
      <p className="mt-8 text-center text-xs text-morning-blue/70">
        Don't have an enterprise account?{' '}
        <Link to="/register" className="text-android-green hover:text-white transition-colors font-semibold">
          Request Access
        </Link>
      </p>
    </div>
  );
};

export default Login;
