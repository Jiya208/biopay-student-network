import { FiGlobe, FiHeart, FiLock, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi';

const ADVANTAGES = [
  {
    icon: FiUsers,
    title: 'Verified community',
    description: 'Profiles feel more reliable because the network is built around trusted academic identity.',
    stat: '99.8%',
    label: 'Verified members',
  },
  {
    icon: FiGlobe,
    title: 'Broad campus reach',
    description: 'Students can grow beyond their immediate circle while still staying inside a focused ecosystem.',
    stat: '500+',
    label: 'Institutions',
  },
  {
    icon: FiZap,
    title: 'Fast interaction design',
    description: 'Fast interactions and clear layouts help students explore opportunities without unnecessary friction.',
    stat: '<2s',
    label: 'Perceived speed',
  },
  {
    icon: FiHeart,
    title: 'Student-first product thinking',
    description: 'Every flow is shaped around student goals, from profile building to mentorship and placements.',
    stat: '100%',
    label: 'Student-centric',
  },
  {
    icon: FiTrendingUp,
    title: 'High-signal opportunity discovery',
    description: 'Important actions, proof points and opportunity details stay easy to spot across the experience.',
    stat: '3x',
    label: 'Sharper discovery',
  },
  {
    icon: FiLock,
    title: 'Private by design',
    description: 'Strong privacy controls, verification and moderation keep the network credible and secure.',
    stat: '24/7',
    label: 'Trust mindset',
  },
];

const TRUST_POINTS = [
  { value: '50K+', label: 'Active users' },
  { value: '2K+', label: 'Monthly placements' },
  { value: '4.9★', label: 'Platform rating' },
  { value: '24/7', label: 'Support experience' },
];

const WhyChooseUs = () => {
  return (
    <div className="landing-container space-y-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5">
          <span className="landing-eyebrow">Why students choose BSN</span>
          <h2 className="landing-title text-left">
            Trust, speed and clarity make every important action feel easier.
          </h2>
          <p className="landing-subtitle text-left">
            From verification to discovery, BSN is structured to help students move with confidence across every stage
            of their academic and career journey.
          </p>
          <div className="landing-card p-6">
            <p className="text-sm leading-7 text-slate-600">
              The platform balances credibility with usability so students can focus on real progress, not platform
              complexity.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {ADVANTAGES.map(({ icon: Icon, title, description, stat, label }) => (
            <article key={title} className="landing-card landing-card-interactive p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="landing-icon-wrap">
                  <Icon size={19} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-poppins font-semibold tracking-tight text-slate-950">{stat}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{label}</p>
                </div>
              </div>
              <h3 className="mt-5 text-lg font-poppins font-semibold tracking-tight text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="landing-trust-strip">
        {TRUST_POINTS.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-2xl font-poppins font-semibold tracking-tight text-slate-950">{item.value}</p>
            <p className="mt-1 text-sm text-slate-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
