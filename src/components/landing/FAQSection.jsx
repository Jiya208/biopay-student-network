import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Is BSN really free?',
      answer: 'Yes! BSN is completely free for all students. We believe in making career opportunities accessible to everyone. Premium features may be introduced in the future, but core features will remain free forever.',
    },
    {
      question: 'How do I get verified on the platform?',
      answer: 'You can get verified using your college email address. Simply sign up with your .edu email and follow the verification process. You can also verify through your college ID or LinkedIn profile.',
    },
    {
      question: 'Can I connect with people from other colleges?',
      answer: 'Absolutely! While the platform is college-verified for security, you can connect with verified students and professionals from any college across India. Network across the entire student community.',
    },
    {
      question: 'What if I don\'t have a college email?',
      answer: 'No problem! You can verify using alternative methods like college ID upload, LinkedIn verification, or recommendation from verified members. We ensure everyone gets a fair chance to join.',
    },
    {
      question: 'How does the mentorship matching work?',
      answer: 'Our AI algorithm matches mentees with mentors based on shared interests, career goals, skills, and availability. You can also browse mentor profiles and request connections manually.',
    },
    {
      question: 'Is my data safe on BSN?',
      answer: 'Yes! We use enterprise-grade encryption and security practices. We comply with GDPR and all Indian data protection laws. Your profile data is never shared with third parties without consent.',
    },
    {
      question: 'Can companies post jobs on BSN?',
      answer: 'Yes! We work with top companies and startups. If you\'re a recruiter or company HR, you can post jobs, internships, and create company profiles on our platform.',
    },
    {
      question: 'What can I do with my profile?',
      answer: 'With your profile, you can apply to opportunities, request mentorship, connect with peers, showcase your skills and projects, receive endorsements, and participate in community discussions.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">
          Got questions? We've got answers. Can't find what you're looking for?{' '}
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Contact our support team
          </span>
        </p>
      </motion.div>

      {/* FAQ Accordion */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors"
          >
            <motion.button
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              whileHover={{ backgroundColor: '#f9fafb' }}
              className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors group"
            >
              <span className="flex items-center gap-4 flex-1">
                <motion.div
                  animate={{ rotate: openIndex === index ? 360 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-200 transition-colors"
                >
                  {openIndex === index ? (
                    <FiMinus className="w-4 h-4" />
                  ) : (
                    <FiPlus className="w-4 h-4" />
                  )}
                </motion.div>
                <span>{faq.question}</span>
              </span>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 bg-gray-50"
                >
                  <p className="px-6 py-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-center"
      >
        <h3 className="text-lg font-poppins font-bold text-gray-900 mb-2">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-4">
          Our support team is here to help 24/7
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Contact Support
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FAQSection;
