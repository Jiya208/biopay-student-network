import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const FAQS = [
  {
    question: 'Is BSN really free for students?',
    answer:
      'Yes. The core experience is free for students, including profile creation, networking, opportunity discovery and access to community-driven resources.',
  },
  {
    question: 'How does profile verification work?',
    answer:
      'Students can verify through their college email and related identity checks so recruiters, mentors and peers can trust who they are interacting with.',
  },
  {
    question: 'Can students connect across different colleges?',
    answer:
      'Absolutely. BSN is designed to connect students beyond a single campus while still maintaining a stronger trust layer than general social platforms.',
  },
  {
    question: 'What if I do not have a college email right now?',
    answer:
      'Alternative verification routes can still support access, allowing the platform to stay inclusive while keeping quality and authenticity high.',
  },
  {
    question: 'How does mentorship matching help?',
    answer:
      'Mentorship is aligned around academic interests, goals and availability so students can reach relevant seniors and professionals more quickly.',
  },
  {
    question: 'Is user data protected?',
    answer:
      'Yes. Privacy, trust and profile control remain core to the platform, with clear settings that help users manage visibility and access confidently.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="landing-container space-y-14">
      <div className="landing-section-heading">
        <span className="landing-eyebrow">Frequently asked questions</span>
        <h2 className="landing-title">Everything students usually ask before they get started.</h2>
        <p className="landing-subtitle">
          Learn how verification, mentorship, access and privacy work before you create your profile.
        </p>
      </div>

      <div className="grid gap-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <article key={faq.question} className="landing-card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
              >
                <span className="text-base font-semibold text-slate-950 md:text-lg">{faq.question}</span>
                <span className="landing-faq-toggle" aria-hidden="true">
                  {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
                </span>
              </button>

              {isOpen && (
                <div id={`faq-panel-${index}`} className="border-t border-slate-200/80 px-6 py-5 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="landing-card p-7 text-center">
        <h3 className="text-xl font-poppins font-semibold tracking-tight text-slate-950">Still have questions?</h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Our team can help with onboarding, verification and understanding the right path for your profile.
        </p>
        <a href="mailto:hello@biopaynet.com" className="landing-button landing-button-secondary mt-6">
          Contact support
        </a>
      </div>
    </div>
  );
};

export default FAQSection;
