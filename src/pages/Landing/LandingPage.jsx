import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import '../../styles/landing.css';
import LandingNavbar from '../../components/landing/LandingNavbar';
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import HowItWorks from '../../components/landing/HowItWorks';
import WhyChooseUs from '../../components/landing/WhyChooseUs';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import FAQSection from '../../components/landing/FAQSection';
import FinalCTA from '../../components/landing/FinalCTA';
import LandingFooter from '../../components/landing/LandingFooter';

const SCROLL_THRESHOLD = 24;

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { settings } = useApp();
  const isDarkMode = settings?.darkMode ?? true;

  useEffect(() => {
    let frameId = 0;

    const updateHeaderState = () => {
      frameId = 0;
      const nextScrolled = window.scrollY > SCROLL_THRESHOLD;
      setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`landing-shell ${isDarkMode ? 'is-dark' : 'is-light'}`}>
      <LandingNavbar isScrolled={isScrolled} />

      <main>
        <section id="hero" className="landing-anchor">
          <HeroSection />
        </section>

        <section id="features" className="landing-anchor landing-section landing-section-muted landing-deferred">
          <FeaturesSection />
        </section>

        <section id="how-it-works" className="landing-anchor landing-section landing-deferred">
          <HowItWorks />
        </section>

        <section id="why-us" className="landing-anchor landing-section landing-section-muted landing-deferred">
          <WhyChooseUs />
        </section>

        <section id="testimonials" className="landing-anchor landing-section landing-deferred">
          <TestimonialsSection />
        </section>

        <section id="faq" className="landing-anchor landing-section landing-section-muted landing-deferred">
          <FAQSection />
        </section>

        <section id="final-cta" className="landing-anchor landing-section landing-deferred">
          <FinalCTA />
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
