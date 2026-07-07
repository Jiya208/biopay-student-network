import React, { useState, useEffect } from 'react';
import LandingNavbar from '../../components/landing/LandingNavbar';
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import HowItWorks from '../../components/landing/HowItWorks';
import WhyChooseUs from '../../components/landing/WhyChooseUs';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import FAQSection from '../../components/landing/FAQSection';
import FinalCTA from '../../components/landing/FinalCTA';
import LandingFooter from '../../components/landing/LandingFooter';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden">
      {/* Navbar */}
      <LandingNavbar isScrolled={isScrolled} />

      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section with gradient background */}
        <section id="hero" className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
          <HeroSection />
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-white">
          <FeaturesSection />
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-blue-50 via-slate-50 to-white">
          <HowItWorks />
        </section>

        {/* Why Choose Us */}
        <section id="why-us" className="py-20 px-4 bg-white">
          <WhyChooseUs />
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-white via-blue-50 to-white">
          <TestimonialsSection />
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 px-4 bg-white">
          <FAQSection />
        </section>

        {/* Final CTA */}
        <section id="final-cta">
          <FinalCTA />
        </section>
      </main>

      {/* Footer */}
      <footer>
        <LandingFooter />
      </footer>
    </div>
  );
};

export default LandingPage;
