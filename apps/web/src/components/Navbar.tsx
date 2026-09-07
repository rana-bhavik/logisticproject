import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent mix-blend-difference">
      <div className="text-2xl font-bold tracking-tighter text-white">
        LOGISTIS
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
        <a href="#platform" className="hover:text-white transition-colors">Platform</a>
        <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
        <a href="#intelligence" className="hover:text-white transition-colors">Intelligence</a>
        <a href="#tracking" className="hover:text-white transition-colors">Tracking</a>
        <a href="#company" className="hover:text-white transition-colors">Company</a>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium">
        <a href="/login" className="text-white hover:text-white/80 transition-colors">Log in</a>
        <button className="px-5 py-2.5 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
