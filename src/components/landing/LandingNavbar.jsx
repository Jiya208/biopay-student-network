import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import logo from '../../assets/logo-ui.png';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Benefits', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQs', href: '#faq' },
];

const LandingNavbar = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();
  const isDarkMode = settings?.darkMode ?? true;

  const handleSmoothScroll = (href) => {
    setMobileMenuOpen(false);

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleTheme = () => updateSettings('darkMode', !isDarkMode);

  return (
    <header className="landing-navbar" data-scrolled={isScrolled}>
      <div className="landing-container">
        <div className={`landing-navbar-shell ${isScrolled ? 'is-scrolled' : ''} ${mobileMenuOpen ? 'is-open' : ''}`}>
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <button
              type="button"
              onClick={() => handleSmoothScroll('#hero')}
              className="group flex items-center gap-3 text-left"
              aria-label="Go to top"
            >
              <img
                src={logo}
                alt="BSN logo"
                className="h-11 w-11 rounded-2xl object-cover shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition-transform duration-300 group-hover:scale-[1.03]"
                width="44"
                height="44"
                decoding="async"
              />
              <div className="landing-brand-copy hidden min-[420px]:block">
                <p className="landing-brand-title">BioPay Student Network</p>
                <p className="landing-brand-subtitle">Student identity, mentoring and opportunities</p>
              </div>
            </button>

            <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSmoothScroll(link.href);
                  }}
                  className="landing-nav-link"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 xl:flex">
              <button
                type="button"
                onClick={toggleTheme}
                className="landing-theme-toggle"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
              <Link to="/login" className="landing-button landing-button-secondary">
                Log in
              </Link>
              <Link to="/signup" className="landing-button landing-button-primary">
                Get Started
              </Link>
            </div>

            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                className="landing-theme-toggle"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="landing-theme-toggle"
                aria-expanded={mobileMenuOpen}
                aria-controls="landing-mobile-nav"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div id="landing-mobile-nav" className="landing-mobile-panel xl:hidden">
              <div className="grid gap-2 px-4 pb-4 pt-1 sm:px-5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleSmoothScroll(link.href);
                    }}
                    className="landing-mobile-link"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="landing-button landing-button-secondary"
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/signup');
                    }}
                    className="landing-button landing-button-primary"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
