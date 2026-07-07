import { Link } from 'react-router-dom';
import logo from '../../assets/logo-ui.png';

const PLATFORM_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const ACCOUNT_LINKS = [
  { label: 'Sign in', to: '/login' },
  { label: 'Create account', to: '/signup' },
];

const FOOTER_NOTES = [
  'Verified student identity',
  'Faster onboarding',
  'Responsive across desktop, tablet and mobile',
];

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="landing-footer">
      <div className="landing-container space-y-12 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.8fr]">
          <div className="space-y-5">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-left"
            >
              <img
                src={logo}
                alt="BSN logo"
                className="h-12 w-12 rounded-2xl object-cover"
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="font-poppins text-lg font-semibold tracking-tight text-slate-950">BioPay Student Network</p>
                <p className="text-sm text-slate-500">A premium, verified ecosystem for student growth</p>
              </div>
            </button>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Build a trusted academic identity, discover meaningful opportunities and connect with a stronger student
              community from one focused platform.
            </p>
            <div className="flex flex-wrap gap-2">
              {FOOTER_NOTES.map((item) => (
                <span key={item} className="landing-chip landing-chip-footer">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">Platform</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleSmoothScroll(link.href);
                    }}
                    className="transition-colors hover:text-slate-950"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">Access and support</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition-colors hover:text-slate-950">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="mailto:hello@biopaynet.com" className="transition-colors hover:text-slate-950">
                  hello@biopaynet.com
                </a>
              </li>
              <li>New Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} BioPay Student Network. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <span>Verified profiles</span>
            <span>Mentorship and opportunities</span>
            <span>Built for modern campuses</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
