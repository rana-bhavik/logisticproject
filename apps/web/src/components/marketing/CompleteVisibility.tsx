import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CompleteVisibility: React.FC = () => {
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
      `/truck-frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const scrollState = { frame: 0 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = render;

    function render() {
      if (images[scrollState.frame]) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate scale to cover canvas (object-fit: cover equivalent)
        const hRatio = canvas.width / images[scrollState.frame].width;
        const vRatio = canvas.height / images[scrollState.frame].height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - images[scrollState.frame].width * ratio) / 2;
        const centerShift_y = (canvas.height - images[scrollState.frame].height * ratio) / 2;
        
        context.drawImage(
          images[scrollState.frame], 
          0, 0, images[scrollState.frame].width, images[scrollState.frame].height,
          centerShift_x, centerShift_y, images[scrollState.frame].width * ratio, images[scrollState.frame].height * ratio
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

    // Scrub through frames
    tl.to(scrollState, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
    });

    // Smooth float up for text block early in the scroll
    tl.from('.visibility-text-block', {
      opacity: 0,
      y: 50,
      duration: 0.2,
      ease: 'power3.out',
    }, 0.1);

    // Fade out text block near the end of scroll
    tl.to('.visibility-text-block', {
      opacity: 0,
      y: -50,
      duration: 0.2,
      ease: 'power3.inOut',
    }, 0.7);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />
      
      {/* Dark overlay for text readability (gradient from left to right) */}
      <div className="absolute inset-0 bg-gradient-to-r from-smoky-black/80 via-smoky-black/30 to-transparent mix-blend-multiply z-10" />
      
      <div className="absolute inset-0 z-20 flex items-center justify-start px-8 md:px-24 pointer-events-none">
        
        <div className="visibility-text-block max-w-2xl text-left pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 drop-shadow-2xl">
            Complete Visibility
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-10 leading-relaxed drop-shadow-md">
            Our intelligent platform connects your entire supply chain, from the warehouse to the last mile, in a unified ecosystem. Every asset, every movement, instantly accessible.
          </p>
          <button className="px-8 py-4 text-lg bg-dark-olive/80 text-white font-medium border border-dark-olive rounded-lg hover:bg-dark-olive transition-all backdrop-blur-sm shadow-lg">
            Discover Platform
          </button>
        </div>

      </div>
    </section>
  );
};

export default CompleteVisibility;
