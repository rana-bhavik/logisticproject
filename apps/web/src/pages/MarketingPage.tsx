import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import MarketingHero from '../components/marketing/MarketingHero';
import IntroSection from '../components/marketing/IntroSection';
import CompleteVisibility from '../components/marketing/CompleteVisibility';
import ServicesCards from '../components/marketing/ServicesCards';
import FeaturesBento from '../components/marketing/FeaturesBento';
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
      <section id="platform">
        <CompleteVisibility />
      </section>

      {/* 4. LOGISTICS / SERVICES CARDS & BENTO */}
      <section id="solutions">
        <ServicesCards />
        <FeaturesBento />
        <SupplyChainFlow />
      </section>

      {/* 5. GLOBAL NETWORK & LIVE TRACKING */}
      <section id="tracking">
        <GlobalNetwork />
        <LiveTracking />
      </section>

      {/* 6. AI / INTELLIGENCE SECTION */}
      <section id="intelligence">
        <AiIntelligence />
      </section>

      {/* 7. COMPANY / STATISTICS & CTA */}
      <section id="company">
        <Statistics />
        <CtaSection />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default MarketingPage;
