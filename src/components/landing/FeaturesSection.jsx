import {
  FiAward,
  FiBriefcase,
  FiMessageCircle,
  FiShield,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';

const FEATURES = [
  {
    icon: FiUsers,
    title: 'Student community network',
    description:
      'Discover peers, mentors and alumni in a trusted environment built specifically for academic growth.',
    eyebrow: 'Network',
  },
  {
    icon: FiBriefcase,
    title: 'Job and internship discovery',
    description:
      'Discover relevant openings faster with structured listings, strong context and clearer next steps.',
    eyebrow: 'Opportunities',
  },
  {
    icon: FiAward,
    title: 'Mentorship journeys',
    description:
      'Match with seniors and professionals who can guide projects, interviews and long-term career planning.',
    eyebrow: 'Mentorship',
  },
  {
    icon: FiTrendingUp,
    title: 'Skill and portfolio growth',
    description:
      'Showcase your work, track progress and keep your academic identity strong and recruiter-ready.',
    eyebrow: 'Growth',
  },
  {
    icon: FiMessageCircle,
    title: 'Focused collaboration',
    description:
      'Keep discussions, questions and team-finding aligned around real academic and project workflows.',
    eyebrow: 'Collaboration',
  },
  {
    icon: FiShield,
    title: 'Verification and trust layer',
    description:
      'Reduce noise and increase confidence through verification, moderated interactions and profile authenticity.',
    eyebrow: 'Trust',
  },
];

const FeaturesSection = () => {
  return (
    <div className="landing-container space-y-14">
      <div className="landing-section-heading">
        <span className="landing-eyebrow">Everything important, connected elegantly</span>
        <h2 className="landing-title">Everything students need to grow, connect and get discovered.</h2>
        <p className="landing-subtitle">
          BSN brings academic identity, opportunity discovery, mentorship and collaboration into one premium,
          easy-to-navigate experience.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description, eyebrow }) => (
          <article key={title} className="landing-card landing-card-interactive p-7">
            <div className="landing-icon-wrap">
              <Icon size={20} />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{eyebrow}</p>
            <h3 className="mt-3 text-xl font-poppins font-semibold tracking-tight text-slate-950">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
