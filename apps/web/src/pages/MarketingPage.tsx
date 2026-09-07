import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import MarketingHero from '../components/marketing/MarketingHero';
import IntroSection from '../components/marketing/IntroSection';
import CompleteVisibility from '../components/marketing/CompleteVisibility';
import ServicesCards from '../components/marketing/ServicesCards';
import SupplyChainFlow from '../components/marketing/SupplyChainFlow';
import GlobalNetwork from '../components/marketing/GlobalNetwork';
import AiIntelligence from '../components/marketing/AiIntelligence';
import LiveTracking from '../components/marketing/LiveTracking';
import Statistics from '../components/marketing/Statistics';
import CtaSection from '../components/marketing/CtaSection';
import Footer from '../components/marketing/Footer';

gsap.registerPlugin(ScrollTrigger);

function MarketingPage() {
  useEffect(() => {
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical', 
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="font-sans relative bg-smoky-black text-white">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <MarketingHero />

      {/* 2. ABOUT / INTRO SECTION */}
      <IntroSection />

      {/* 3. PLATFORM / COMPLETE VISIBILITY */}
      <CompleteVisibility />

      {/* 4. LOGISTICS / SERVICES CARDS */}
      <ServicesCards />

      {/* 5. SUPPLY CHAIN FLOW */}
      <SupplyChainFlow />

      {/* 6. GLOBAL NETWORK / MAP */}
      <GlobalNetwork />

      {/* 7. AI / INTELLIGENCE SECTION */}
      <AiIntelligence />

      {/* 8. REAL-TIME TRACKING SECTION */}
      <LiveTracking />

      {/* 9. STATISTICS SECTION */}
      <Statistics />

      {/* 10. CTA SECTION */}
      <CtaSection />

      {/* 11. FOOTER */}
      <Footer />
    </div>
  );
}

export default MarketingPage;
