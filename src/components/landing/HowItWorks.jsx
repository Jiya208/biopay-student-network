import { FiCheckCircle } from 'react-icons/fi';

const STEPS = [
  {
    number: '01',
    title: 'Create your profile',
    description: 'Set up a polished academic identity with your skills, interests and goals.',
    details: ['Fast onboarding', 'Role-aware experience', 'Profile completeness guidance'],
  },
  {
    number: '02',
    title: 'Discover the right opportunities',
    description: 'Browse internships, projects, resources and mentorship with less friction and better context.',
    details: ['Clear opportunity cards', 'Cleaner browsing', 'Higher signal-to-noise'],
  },
  {
    number: '03',
    title: 'Connect and collaborate',
    description: 'Reach peers, seniors and recruiters from one workflow that feels connected instead of fragmented.',
    details: ['Networking', 'Team finding', 'Direct interaction flows'],
  },
  {
    number: '04',
    title: 'Track progress and grow',
    description: 'Keep momentum through portfolio updates, mentorship feedback and measurable outcomes.',
    details: ['Merit visibility', 'Learning momentum', 'Career progression'],
  },
];

const HowItWorks = () => {
  return (
    <div className="landing-container space-y-14">
      <div className="landing-section-heading">
        <span className="landing-eyebrow">Simple by design</span>
        <h2 className="landing-title">From profile creation to career momentum in four clear steps.</h2>
        <p className="landing-subtitle">
          Start quickly, find relevant opportunities, build strong relationships and keep your progress visible.
        </p>
      </div>

      <div className="landing-steps-grid">
        {STEPS.map((step) => (
          <article key={step.number} className="landing-card landing-card-interactive landing-step-card">
            <div className="landing-step-number">{step.number}</div>
            <h3 className="mt-6 text-xl font-poppins font-semibold tracking-tight text-slate-950">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>

            <ul className="mt-6 space-y-3">
              {step.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3 text-sm text-slate-600">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-blue-600" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
