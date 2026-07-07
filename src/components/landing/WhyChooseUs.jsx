import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiGlobe,
  FiZap,
  FiHeart,
  FiTrendingUp,
  FiLock,
} from 'react-icons/fi';

const WhyChooseUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const advantages = [
    {
      icon: FiUsers,
      title: 'Verified Community',
      description: 'Every member is verified through their college, ensuring authenticity and safety.',
      stat: '99.8%',
      statLabel: 'Verified Members',
    },
    {
      icon: FiGlobe,
      title: 'Global Reach',
      description: 'Connect with students and professionals from top colleges across the nation.',
      stat: '500+',
      statLabel: 'Colleges',
    },
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Optimized platform for instant connections and real-time updates.',
      stat: '99.9%',
      statLabel: 'Uptime',
    },
    {
      icon: FiHeart,
      title: 'Student First',
      description: 'Built by students, for students. We understand your unique challenges.',
      stat: '100%',
      statLabel: 'Free',
    },
    {
      icon: FiTrendingUp,
      title: 'Smart Matching',
      description: 'AI-powered algorithms match you with the perfect opportunities and mentors.',
      stat: '95%',
      statLabel: 'Match Accuracy',
    },
    {
      icon: FiLock,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security and privacy controls.',
      stat: 'GDPR',
      statLabel: 'Compliant',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
          Why Choose Biopay Student Network?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're not just another platform. We're built for real student success.
        </p>
      </motion.div>

      {/* Advantages Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {advantages.map((advantage, index) => {
          const Icon = advantage.icon;
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              {/* Background Glow */}
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0.5,
                  scale: isHovered ? 1 : 0.95,
                }}
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"
              />

              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 h-full border border-gray-200 hover:border-blue-300 transition-colors">
                {/* Top Section with Icon & Stat */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-colors"
                  >
                    <Icon className="w-6 h-6 text-blue-600" />
                  </motion.div>

                  {/* Stat Box */}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                    }}
                    className="text-right"
                  >
                    <p className="text-2xl font-poppins font-bold text-blue-600">
                      {advantage.stat}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      {advantage.statLabel}
                    </p>
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-poppins font-bold text-gray-900 mb-2">
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>

                {/* Hover Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 h-1 w-full bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: '50K+', label: 'Active Users' },
            { number: '2K+', label: 'Monthly Placements' },
            { number: '4.9★', label: 'User Rating' },
            { number: '24/7', label: 'Support' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <p className="text-2xl font-poppins font-bold text-blue-600 mb-1">
                {item.number}
              </p>
              <p className="text-sm text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WhyChooseUs;
