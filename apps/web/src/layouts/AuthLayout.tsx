import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AuthLayout: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const phrases = [
    "Intelligent supply chain visibility.",
    "Real-time fleet telemetry.",
    "AI-powered delay predictions."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-smoky-black text-morning-blue flex">
      {/* Left side - Branding/Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-dark-olive overflow-hidden">
        <div className="absolute inset-0 bg-smoky-black/40 z-10" />
        <motion.img 
          src="/images/marketing-3.png" 
          alt="Logistics background" 
          className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white">LOGISTIS</Link>
          <motion.div 
            className="max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="h-24">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={textIndex}
                  className="text-4xl font-bold text-white mb-4 leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  {phrases[textIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
            <p className="text-morning-blue/80 text-lg">
              Manage your fleet, track shipments in real-time, and leverage AI to predict demand and delays.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Forms */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 md:px-24 py-12 relative overflow-y-auto">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white">LOGISTIS</Link>
        </div>
        <motion.div 
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
