import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Request Access</h2>
        <p className="text-morning-blue/70">Join the intelligent logistics network</p>
      </div>
      
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-morning-blue mb-2" htmlFor="firstName">
              First Name
            </label>
            <input 
              type="text" 
              id="firstName" 
              className="w-full px-4 py-3 bg-white/5 border border-dark-olive/50 rounded-md text-white focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-morning-blue mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input 
              type="text" 
              id="lastName" 
              className="w-full px-4 py-3 bg-white/5 border border-dark-olive/50 rounded-md text-white focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-morning-blue mb-2" htmlFor="company">
            Company Name
          </label>
          <input 
            type="text" 
            id="company" 
            className="w-full px-4 py-3 bg-white/5 border border-dark-olive/50 rounded-md text-white focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
          />
        </div>

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
        
        <div>
          <label className="block text-sm font-medium text-morning-blue mb-2" htmlFor="password">
            Password
          </label>
          <input 
            type="password" 
            id="password" 
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-white/5 border border-dark-olive/50 rounded-md text-white focus:outline-none focus:border-android-green focus:bg-white/10 transition-colors"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full py-3 px-4 bg-dark-olive text-white font-medium rounded-md hover:bg-android-green hover:text-smoky-black transition-colors focus:outline-none focus:ring-2 focus:ring-android-green focus:ring-offset-2 focus:ring-offset-smoky-black"
        >
          Submit Request
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-morning-blue/70">
        Already have an account?{' '}
        <Link to="/login" className="text-android-green hover:text-june-bud transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
