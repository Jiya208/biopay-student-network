import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const CTA_POINTS = [
  'No credit card required',
  'Student-first onboarding',
  'Secure and verified by design',
];

const FinalCTA = () => {
  return (
    <div className="landing-container">
      <div className="landing-cta-panel">
        <div className="landing-cta-glow" aria-hidden="true" />
        <div className="relative z-[1] grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="landing-eyebrow">Final call to action</span>
            <h2 className="landing-cta-title mt-5 text-3xl font-poppins font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to turn your student identity into real momentum?
            </h2>
            <p className="landing-cta-copy mt-5 max-w-2xl text-base leading-8">
              Join a verified student network built to help you showcase your profile, discover better opportunities and
              connect with the people who can move your journey forward.
            </p>
          </div>

          <div className="landing-card landing-cta-card p-7 backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/signup" className="landing-button landing-button-primary w-full justify-center">
                Create account
                <FiArrowRight className="text-base" />
              </Link>
              <Link to="/login" className="landing-button landing-button-dark w-full justify-center">
                Sign in
              </Link>
            </div>

            <ul className="mt-6 space-y-3">
              {CTA_POINTS.map((point) => (
                <li key={point} className="landing-cta-point flex items-start gap-3 text-sm">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-blue-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
