import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MarketingHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 240;

  useGSAP(() => {
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

    // Phase 1: Text 1 fades out smoothly
    tl.to('.text-block-1', {
      opacity: 0,
      y: -50,
      duration: 0.15,
      ease: 'power2.inOut',
    }, 0.15);

    // Phase 2: Text 2 fades in, stays, then fades out
    tl.fromTo('.text-block-2', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
      0.3
    )
    .to('.text-block-2', {
      opacity: 0,
      y: -50,
      duration: 0.15,
      ease: 'power2.inOut',
    }, 0.55);

    // Phase 3: Text 3 fades in along with buttons
    tl.fromTo('.text-block-3', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
      0.7
    )
    .fromTo('.hero-btn', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.1, stagger: 0.1, ease: 'back.out(2)' }, 
      0.8
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />
      
      {/* Dark overlay for text readability over frames - fading up from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d08] via-[#080d08]/40 to-transparent z-10" />
      
      <div className="absolute inset-0 z-20 pointer-events-none">
        
        {/* TEXT BLOCK 1 */}
        <div className="text-block-1 absolute bottom-16 md:bottom-24 left-8 md:left-24 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4">
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">MOVE EVERYTHING.</span><br/>
            <span className="bg-gradient-to-r from-android-green to-june-bud bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(166,188,54,0.4)]">KNOW EVERYTHING.</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/90 drop-shadow-lg max-w-2xl font-light">
            The intelligent platform connecting your entire supply chain.
          </p>
        </div>

        {/* TEXT BLOCK 2 */}
        <div className="text-block-2 absolute bottom-16 md:bottom-24 left-8 md:left-24 max-w-4xl opacity-0">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4">
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">REAL-TIME</span><br/>
            <span className="bg-gradient-to-r from-android-green to-june-bud bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(166,188,54,0.4)]">TELEMETRY.</span>
          </h2>
          <p className="text-xl md:text-3xl text-white/90 drop-shadow-lg max-w-2xl font-light">
            Monitor thousands of assets with pinpoint precision.
          </p>
        </div>

        {/* TEXT BLOCK 3 */}
        <div className="text-block-3 absolute bottom-16 md:bottom-24 left-8 md:left-24 max-w-4xl opacity-0">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            THE WORLD MOVES.
          </h2>
          <p className="text-xl md:text-3xl text-white/90 mb-10 drop-shadow-lg max-w-2xl font-light">
            We make it intelligent. <span className="text-android-green font-semibold">Command your supply chain today.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto">
            <button className="hero-btn opacity-0 px-10 py-5 text-lg bg-android-green text-smoky-black font-bold rounded-xl hover:bg-june-bud transition-all hover:scale-105 shadow-[0_0_30px_rgba(166,188,54,0.5)]">
              Launch Platform
            </button>
            <button className="hero-btn opacity-0 px-10 py-5 text-lg bg-smoky-black/50 border border-android-green/50 text-white font-semibold rounded-xl hover:bg-android-green/10 transition-all hover:scale-105 backdrop-blur-md">
              Explore Network
            </button>
          </div>
        </div>

      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-400 animate-pulse z-20">
        Scroll to Explore
      </div>
    </section>
  );
};

export default MarketingHero;
