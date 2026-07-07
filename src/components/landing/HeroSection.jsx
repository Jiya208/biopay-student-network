import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiLayers, FiShield, FiUsers } from 'react-icons/fi';
import logo from '../../assets/logo-ui.png';

const HERO_METRICS = [
  { value: '10K+', label: 'Active students' },
  { value: '500+', label: 'Opportunities shared' },
  { value: '150+', label: 'Campuses connected' },
];

const HERO_HIGHLIGHTS = [
  'Verified student identity',
  'Mentorship and hiring in one place',
  'Fast setup with profile-first onboarding',
];

const PREVIEW_ITEMS = [
  {
    icon: FiShield,
    title: 'Verified profile',
    text: 'Build trust instantly with college-backed identity and clean academic proof.',
  },
  {
    icon: FiUsers,
    title: 'Meaningful connections',
    text: 'Meet seniors, peers and recruiters in one focused student-first network.',
  },
  {
    icon: FiLayers,
    title: 'Everything connected',
    text: 'Resources, opportunities, rankings and collaboration stay in one workflow.',
  },
];

const PREVIEW_PANELS = [
  {
    title: 'Verified access',
    label: 'College-backed sign-in',
  },
  {
    title: 'Mentor network',
    label: 'Guided connections',
  },
  {
    title: 'Opportunity-ready',
    label: 'Profile and portfolio flow',
  },
];

const HeroSection = () => {
  const scrollToFeatures = () => {
    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="landing-hero">
      <div className="landing-hero-glow landing-hero-glow-left" aria-hidden="true" />
      <div className="landing-hero-glow landing-hero-glow-right" aria-hidden="true" />

      <div className="landing-container relative z-[1] grid gap-10 pb-12 pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-36">
        <div className="space-y-8">
          <span className="landing-eyebrow landing-eyebrow-dark">
            Built for modern campuses and professional student growth
          </span>

          <div className="space-y-5">
            <h1 className="landing-hero-title landing-hero-title-gradient">
              Build a verified student profile that turns into real connections, mentorship and career momentum.
            </h1>
            <p className="landing-hero-description">
              BioPay Student Network helps students showcase achievements, discover internships, share resources
              and collaborate with confidence through one polished, trusted platform.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/signup" className="landing-button landing-button-primary landing-button-lg">
              Create free account
              <FiArrowRight className="text-base" />
            </Link>
            <button
              type="button"
              onClick={scrollToFeatures}
              className="landing-button landing-button-dark landing-button-lg"
            >
              Explore the platform
            </button>
          </div>

          <ul className="landing-hero-points">
            {HERO_HIGHLIGHTS.map((item) => (
              <li key={item} className="landing-hero-point">
                <FiCheckCircle className="mt-0.5 shrink-0 text-blue-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="landing-hero-metrics">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="landing-stat-card landing-stat-card-hero">
                <div className="landing-stat-value">{metric.value}</div>
                <p className="landing-stat-label">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="landing-card landing-card-hero space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="BSN brand mark"
                className="h-14 w-14 rounded-2xl object-cover shadow-[0_16px_35px_rgba(30,41,59,0.18)]"
                width="56"
                height="56"
                loading="eager"
                decoding="async"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">BSN Dashboard</p>
                <h2 className="text-2xl font-poppins font-semibold tracking-tight text-slate-950">
                  A profile built for trust, visibility and growth.
                </h2>
              </div>
            </div>
            <span className="landing-chip landing-chip-strong">Secure access</span>
          </div>

          <div className="landing-preview-showcase">
            <div className="landing-preview-showcase-header flex flex-wrap items-center justify-between gap-3 pb-4">
              <div>
                <p className="landing-preview-kicker">Verified student access</p>
                <p className="mt-1 text-lg font-semibold text-slate-950">College-backed identity · Skills · Portfolio</p>
              </div>
              <span className="landing-chip landing-chip-dark">Privacy controls enabled</span>
            </div>

            <div className="grid gap-3 pt-4 sm:grid-cols-3">
              {PREVIEW_PANELS.map((panel) => (
                <div key={panel.title} className="landing-preview-panel">
                  <p className="landing-preview-value landing-preview-title">{panel.title}</p>
                  <p className="landing-preview-label">{panel.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {PREVIEW_ITEMS.map(({ icon: Icon, title, text }) => (
              <article key={title} className="landing-surface-card">
                <div className="landing-icon-wrap">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
