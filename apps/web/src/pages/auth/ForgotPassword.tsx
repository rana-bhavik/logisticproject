import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Reset Password</h2>
        <p className="text-morning-blue/70 text-sm">Enter your enterprise email and we'll send recovery credentials.</p>
      </div>

      {submitted ? (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3">
            <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white">Reset Link Dispatched</div>
              <p className="text-xs text-morning-blue/80 mt-1">
                If an enterprise account exists for <strong className="text-white">{email}</strong>, you will receive password recovery instructions shortly.
              </p>
            </div>
          </div>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-dark-olive hover:bg-android-green hover:text-smoky-black text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            Return to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-6">
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
              placeholder="name@company.com"
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
                Dispatching Link...
              </>
            ) : (
              'Send Recovery Link'
            )}
          </button>

          <p className="mt-6 text-center text-xs text-morning-blue/70">
            Remembered your password?{' '}
            <Link to="/login" className="text-android-green hover:text-white transition-colors font-semibold">
              Back to Sign In
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
