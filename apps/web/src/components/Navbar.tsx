import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Platform', id: 'platform' },
    { name: 'Solutions', id: 'solutions' },
    { name: 'Intelligence', id: 'intelligence' },
    { name: 'Tracking', id: 'tracking' },
    { name: 'Company', id: 'company' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl px-6 py-3.5 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-[#060a06]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-[#060a06]/75 backdrop-blur-md border border-white/10 shadow-lg'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-tighter text-white">
            LOGISTIS<span className="text-android-green text-2xl leading-none">.</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest text-morning-blue/60 border border-white/10 px-2 py-0.5 rounded-full">
            Autonomous
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-sm font-medium text-morning-blue/80 hover:text-white transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-android-green hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/admin"
            className="text-xs font-semibold uppercase tracking-wider text-morning-blue/70 hover:text-android-green transition-colors px-2 py-1"
          >
            Console
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium text-white hover:text-android-green transition-colors px-3 py-1.5"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1.5 px-4 py-2 bg-android-green text-smoky-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(166,188,54,0.35)]"
          >
            Get Started
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto bg-[#080d08]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-base font-medium text-white/90 hover:text-android-green py-1.5 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 bg-white/5 text-white text-sm font-semibold rounded-xl border border-white/10"
            >
              Enterprise Admin Console
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 bg-white/10 text-white text-sm font-semibold rounded-xl"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 bg-android-green text-smoky-black text-sm font-bold rounded-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
