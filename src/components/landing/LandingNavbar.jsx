import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import Button from '../common/Button';
import logo from '../../assets/logo.png';

const LandingNavbar = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleSmoothScroll = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200'
          : 'bg-gradient-to-br from-blue-950/40 via-blue-900/30 to-slate-900/20 backdrop-blur-xl border-b border-blue-400/20 hover:border-blue-400/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleSmoothScroll('#hero')}
        >
          <img
            src={logo}
            alt="BSN Logo"
            className="w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]"
          />
          <div className="hidden sm:block">
            <p className="font-poppins font-bold text-lg text-gray-900 tracking-tight">BSN</p>
            <p className="text-xs font-semibold text-blue-600">Student Network</p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll(link.href);
              }}
              whileHover={{ color: '#2563EB' }}
              className="text-gray-600 font-medium text-sm hover:text-blue-600 transition-colors cursor-pointer"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <FiX size={24} className="text-gray-900" />
          ) : (
            <FiMenu size={24} className="text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(link.href);
                  }}
                  className="block px-4 py-2 text-gray-600 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  fullWidth
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleGetStarted();
                  }}
                  fullWidth
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default LandingNavbar;
