import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../common/Button';

const FinalCTA = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="relative w-full overflow-hidden py-24 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-300/20 to-blue-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Main Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6"
        >
          Ready to Transform Your Career?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of students who've already found their next big opportunity.
          Your success story starts here.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center gap-2 group px-8 py-4 text-lg rounded-xl"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl"
              size="lg"
            >
              Sign In
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 sm:gap-8"
        >
          {[
            { icon: '✓', label: 'No credit card required' },
            { icon: '🔒', label: 'Your data is safe' },
            { icon: '⚡', label: 'Takes 2 minutes to sign up' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <p className="text-2xl mb-2">{item.icon}</p>
              <p className="text-sm text-gray-600 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Elements Animation */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 right-10 text-4xl opacity-30"
      >
        🚀
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-1/4 left-10 text-4xl opacity-30"
      >
        💡
      </motion.div>
    </div>
  );
};

export default FinalCTA;
