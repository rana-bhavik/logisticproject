import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export const useReveal = (options?: gsap.AnimationVars & { trigger?: any }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!elementRef.current) return;
    
    gsap.from(elementRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: options?.trigger || elementRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...options
    });
  }, { scope: elementRef });
  
  return elementRef;
};
