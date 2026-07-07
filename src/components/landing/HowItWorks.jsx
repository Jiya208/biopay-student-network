import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up and build your comprehensive profile with skills, interests, and goals.',
      details: ['Quick setup', 'Profile verification', 'Skill endorsements'],
    },
    {
      number: '02',
      title: 'Discover Opportunities',
      description: 'Browse thousands of internships, jobs, and mentorship opportunities matched to you.',
      details: ['Smart matching', 'Real-time alerts', 'Personalized feed'],
    },
    {
      number: '03',
      title: 'Connect & Collaborate',
      description: 'Network with peers, get mentored, and build meaningful professional relationships.',
      details: ['Direct messaging', 'Video calls', 'Group projects'],
    },
    {
      number: '04',
      title: 'Succeed & Grow',
      description: 'Track your progress, receive feedback, and unlock new opportunities continuously.',
      details: ['Analytics dashboard', 'Career coaching', 'Achievement rewards'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-gray-900 mb-4">
          Simple & Effective Process
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get started in minutes and begin your journey to success.
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        {/* Desktop Timeline Line */}
        <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="relative"
            >
              {/* Step Card */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full">
                {/* Number Badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 text-white font-poppins font-bold text-xl shadow-lg shadow-blue-500/30"
                >
                  {step.number}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-poppins font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Details List */}
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Arrow - Desktop Only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-24 z-10">
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight className="w-6 h-6 text-blue-400" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
      >
        <p className="text-lg font-semibold text-gray-900 mb-4">
          Ready to start your journey?
        </p>
        <p className="text-gray-600">
          Join thousands of students already transforming their careers on BSN.
        </p>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
