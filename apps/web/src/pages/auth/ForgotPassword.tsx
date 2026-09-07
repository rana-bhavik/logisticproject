import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-morning-blue/70">Enter your email and we'll send you recovery instructions.</p>
      </div>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-morning-blue mb-2" htmlFor="email">
            Work Email
          </label>
          <input 
            type="email" 
            id="email" 
            placeholder="name@company.com"
            className="w-full px-4 py-3 bg-white/5 border border-dark-olive/50 rounded-md text-white focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full py-3 px-4 bg-dark-olive text-white font-medium rounded-md hover:bg-android-green hover:text-smoky-black transition-colors focus:outline-none focus:ring-2 focus:ring-android-green focus:ring-offset-2 focus:ring-offset-smoky-black"
        >
          Send Reset Link
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-morning-blue/70">
        Remembered your password?{' '}
        <Link to="/login" className="text-android-green hover:text-june-bud transition-colors">
          Back to sign in
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
