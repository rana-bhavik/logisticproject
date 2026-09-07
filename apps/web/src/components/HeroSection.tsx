import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameCount = 240;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const currentFrame = (index: number) => 
      `/frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = render;

    function render() {
      if (images[airpods.frame]) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate scale to cover canvas (object-fit: cover equivalent)
        const hRatio = canvas.width / images[airpods.frame].width;
        const vRatio = canvas.height / images[airpods.frame].height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - images[airpods.frame].width * ratio) / 2;
        const centerShift_y = (canvas.height - images[airpods.frame].height * ratio) / 2;
        
        context.drawImage(
          images[airpods.frame], 
          0, 0, images[airpods.frame].width, images[airpods.frame].height,
          centerShift_x, centerShift_y, images[airpods.frame].width * ratio, images[airpods.frame].height * ratio
        );
      }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        pin: true,
      }
    });

    tl.to(airpods, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
    });

    // Animate text overlays
    tl.fromTo('.hero-text-1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.1)
      .to('.hero-text-1', { opacity: 0, y: -50, duration: 0.1 }, 0.3)
      .fromTo('.hero-text-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.4)
      .to('.hero-text-2', { opacity: 0, y: -50, duration: 0.1 }, 0.6)
      .fromTo('.hero-text-3', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.7);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4">
        <h1 className="hero-text-1 absolute text-5xl md:text-7xl font-bold tracking-tighter opacity-0">
          MOVE EVERYTHING.<br/>KNOW EVERYTHING.
        </h1>
        <h2 className="hero-text-2 absolute text-4xl md:text-6xl font-bold tracking-tight opacity-0 text-gray-200">
          One Connected Platform
        </h2>
        <div className="hero-text-3 absolute flex flex-col items-center opacity-0 mt-32">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            The world moves. We make it intelligent.
          </h2>
          <div className="flex gap-4 pointer-events-auto">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Launch Platform
            </button>
            <button className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
              Explore Network
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading Overlay (Optional, for preloading) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-400 animate-pulse">
        Scroll to Explore
      </div>
    </div>
  );
};

export default HeroSection;
