import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../common/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-blue-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 hover:border-blue-400 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-semibold text-blue-700">Welcome to the Future of Campus Networking</span>
          </motion.div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-white mb-6 leading-tight"
        >
          Connect, Learn & Grow <br />
          <motion.span
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: '100% 50%' }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 200%' }}
          >
            Together
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          The ultimate platform connecting students, mentors, and recruiters. Find opportunities, build relationships, and unlock your potential in one thriving network.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center gap-2 group"
              size="lg"
            >
              Get Started Now
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => {
                const element = document.querySelector('#features');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline"
              size="lg"
              className="border-2 border-white/40 hover:border-white/80 hover:bg-white/10 text-white"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-blue-400/30"
        >
          {[
            { number: '10K+', label: 'Active Students' },
            { number: '500+', label: 'Opportunities' },
            { number: '100%', label: 'Success Rate' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <p className="text-2xl sm:text-3xl font-poppins font-bold text-blue-300 mb-2">
                {stat.number}
              </p>
              <p className="text-xs sm:text-sm text-blue-200/70">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-blue-200/70">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-blue-300 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
