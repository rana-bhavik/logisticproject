import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.footer-content', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="relative bg-[#080d08] py-16 px-8 text-morning-blue z-20 overflow-hidden">
       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 footer-content">
          <div>
             <h3 className="text-2xl font-bold tracking-tighter text-white mb-6">LOGISTIS</h3>
             <p className="opacity-70 text-sm mb-6 max-w-xs">Intelligent global logistics with a natural, sustainable, and technology-focused identity.</p>
          </div>
          <div>
             <h4 className="font-semibold text-white mb-4">Platform</h4>
             <ul className="space-y-2 opacity-70 text-sm">
                <li><a href="#" className="hover:text-june-bud transition-colors">Warehouse</a></li>
                <li><a href="#" className="hover:text-june-bud transition-colors">Transport</a></li>
                <li><a href="#" className="hover:text-june-bud transition-colors">AI Intelligence</a></li>
                <li><a href="#" className="hover:text-june-bud transition-colors">Driver App</a></li>
             </ul>
          </div>
          <div>
             <h4 className="font-semibold text-white mb-4">Company</h4>
             <ul className="space-y-2 opacity-70 text-sm">
                <li><a href="#" className="hover:text-june-bud transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-june-bud transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-june-bud transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-june-bud transition-colors">Contact</a></li>
             </ul>
          </div>
          <div>
             <h4 className="font-semibold text-white mb-4">System Access</h4>
             <div className="space-y-4">
                <a href="/login" className="block w-full text-center px-4 py-2 border border-dark-olive rounded-md hover:bg-dark-olive/20 transition-colors">
                   Client Portal Login
                </a>
                <a href="/login" className="block w-full text-center px-4 py-2 bg-dark-olive text-white rounded-md hover:bg-android-green hover:text-smoky-black transition-colors">
                   Dispatcher Login
                </a>
             </div>
          </div>
       </div>
       <div className="footer-content max-w-7xl mx-auto mt-16 pt-8 border-t border-dark-olive/30 text-sm opacity-50 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2026 Logistis Global. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
       </div>
    </footer>
  );
};

export default Footer;
