import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Hook for fade-up animation on scroll
 */
export const useFadeUpOnScroll = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return { ref, inView };
};

/**
 * Hook for stagger animation on scroll
 */
export const useStaggerOnScroll = (staggerDelay = 0.1) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return { ref, inView, staggerDelay };
};

/**
 * Smooth scroll to element utility
 */
export const smoothScrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Get scroll progress for parallax effects
 */
export const getScrollProgress = () => {
  if (typeof window === 'undefined') return 0;
  
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  return scrollTop / docHeight;
};

/**
 * Parallax effect hook
 */
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null);
  const [offset, setOffset] = useIntersectionOffset(elementRef);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const y = window.scrollY;
        const elementY = rect.top + y;
        const parallaxOffset = (y - elementY) * speed;
        
        elementRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return elementRef;
};

const useIntersectionOffset = (ref) => {
  const [offset, setOffset] = createWithIntersectionObserver(ref);
  return [offset, setOffset];
};

const createWithIntersectionObserver = (ref) => {
  const [offset, setOffset] = useRef(0).current;
  return [offset, () => {}];
};
