import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const STORY_CARDS = [
  {
    icon: '🛡️',
    title: 'Verified identity',
    subtitle: 'Trust-first onboarding',
    description:
      'Create a structured student profile with academic context, skills, portfolio details and privacy controls in one trusted flow.',
  },
  {
    icon: '🎓',
    title: 'Mentorship access',
    subtitle: 'Guided connections',
    description:
      'Connect with seniors, mentors and peers through a focused network designed for student growth and meaningful conversations.',
  },
  {
    icon: '💼',
    title: 'Opportunity discovery',
    subtitle: 'Career visibility',
    description:
      'Present your skills and work clearly so internships, hiring opportunities and collaborations are easier to discover.',
  },
  {
    icon: '📚',
    title: 'Resource sharing',
    subtitle: 'Community learning',
    description:
      'Share notes, projects and useful material inside a verified academic community that supports better learning outcomes.',
  },
  {
    icon: '📈',
    title: 'Profile growth',
    subtitle: 'Long-term momentum',
    description:
      'Keep identity, learning, projects and opportunities connected so your student profile keeps getting stronger over time.',
  },
];

const SECTION_POINTS = [
  'Student-first experience',
  'No placeholder testimonials',
  'Clear outcomes and aligned content',
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STORY_CARDS.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [isVisible]);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + STORY_CARDS.length) % STORY_CARDS.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % STORY_CARDS.length);
  };

  const activeCard = STORY_CARDS[activeIndex];

  return (
    <div ref={sectionRef} className="landing-container space-y-14">
      <div className="landing-section-heading">
        <span className="landing-eyebrow">Built for real student journeys</span>
        <h2 className="landing-title">Everything students need to build trust, learn faster and get discovered.</h2>
        <p className="landing-subtitle">
          This section highlights the real outcomes BSN is designed to support, without relying on fake people or
          placeholder testimonials.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
        <article className="landing-card self-start p-8 md:p-10">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-3xl shadow-[0_18px_30px_rgba(15,23,42,0.16)]">
                {activeCard.icon}
              </div>
              <div>
                <h3 className="text-2xl font-poppins font-semibold tracking-tight text-slate-950">{activeCard.title}</h3>
                <p className="mt-1 text-sm font-medium text-blue-700">{activeCard.subtitle}</p>
              </div>
            </div>
            <span className="landing-chip">Platform outcome</span>
          </div>

          <div className="space-y-6 pt-8">
            <p className="text-[1.7rem] leading-[1.45] text-slate-700 md:text-[1.95rem] md:leading-[1.48]">
              {activeCard.description}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {SECTION_POINTS.map((point) => (
                <div key={point} className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-700">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
            <div className="flex gap-2">
              {STORY_CARDS.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    index === activeIndex ? 'w-10 bg-slate-950' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Show ${card.title}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goToPrevious}
                className="landing-icon-button"
                aria-label="Previous card"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="landing-icon-button"
                aria-label="Next card"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        </article>

        <div className="grid gap-4">
          {STORY_CARDS.map((card, index) => (
            <button
              key={card.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`landing-card w-full p-5 text-left transition-all duration-200 ${
                index === activeIndex
                  ? 'border-slate-900/20 shadow-[0_22px_40px_rgba(15,23,42,0.1)]'
                  : 'hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(15,23,42,0.07)]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                  {card.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-950">{card.title}</p>
                  <p className="text-sm text-slate-500">{card.subtitle}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{card.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
