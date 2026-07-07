import React from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiBriefcase,
  FiAward,
  FiTrendingUp,
  FiMessageCircle,
  FiShield,
} from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    {
      icon: FiUsers,
      title: 'Community Network',
      description: 'Connect with thousands of students, mentors, and industry professionals in a thriving ecosystem.',
    },
    {
      icon: FiBriefcase,
      title: 'Job & Internship Board',
      description: 'Explore curated opportunities from top companies and startups. Apply directly and track progress.',
    },
    {
      icon: FiAward,
      title: 'Mentorship Program',
      description: 'Get paired with experienced mentors who guide you through challenges and accelerate your growth.',
    },
    {
      icon: FiTrendingUp,
      title: 'Skill Development',
      description: 'Access learning resources, courses, and workshops to build in-demand skills.',
    },
    {
      icon: FiMessageCircle,
      title: 'Real-time Chat',
      description: 'Communicate with peers, mentors, and recruiters through integrated messaging.',
    },
    {
      icon: FiShield,
      title: 'Verified Community',
      description: 'Join a safe, verified network with college-based verification and trust scores.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
          Powerful Features Built for Success
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to navigate your career journey and build meaningful connections.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 40px rgba(37, 99, 235, 0.1)',
              }}
              className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 transition-all duration-300 group"
            >
              {/* Icon Container */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-6 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors"
              >
                <Icon className="w-7 h-7 text-blue-600" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-poppins font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FeaturesSection;
