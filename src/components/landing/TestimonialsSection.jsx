import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      name: 'Aarav Sharma',
      role: 'Software Engineer at Google',
      college: 'IIT Delhi',
      image: '🧑‍💻',
      content: 'BSN helped me network with seniors from my college who were already at tech companies. The mentorship I received was invaluable in landing my dream job.',
      rating: 5,
    },
    {
      name: 'Priya Patel',
      role: 'Product Manager at Flipkart',
      college: 'BITS Pilani',
      image: '👩‍💼',
      content: 'The platform is incredibly well-designed. I found amazing mentorship opportunities and built a strong professional network that I still maintain.',
      rating: 5,
    },
    {
      name: 'Rohan Verma',
      role: 'Data Scientist at Microsoft',
      college: 'Delhi University',
      image: '👨‍🔬',
      content: 'As a recruiter, BSN is my go-to platform to find top talent. The verification system ensures quality and the matching algorithm is spot-on.',
      rating: 5,
    },
    {
      name: 'Anaya Singh',
      role: 'Startup Founder',
      college: 'Mumbai University',
      image: '👩‍🚀',
      content: 'BSN connected me with my co-founders and our first investors. It\'s been instrumental in building our startup ecosystem connections.',
      rating: 5,
    },
    {
      name: 'Vikram Gupta',
      role: 'MBA Student at IIM-A',
      college: 'Delhi School of Economics',
      image: '🎓',
      content: 'The mentorship program accelerated my career transition into management consulting. Highly recommend for anyone serious about their growth.',
      rating: 5,
    },
  ];

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [autoplay, testimonials.length]);

  const goToPrevious = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
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
          Loved by Students & Professionals
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hear from real users who've transformed their careers with BSN.
        </p>
      </motion.div>

      {/* Testimonials Carousel */}
      <div className="relative">
        {/* Main Testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
              {/* Avatar & Info */}
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-4xl flex-shrink-0"
                >
                  {testimonials[activeIndex].image}
                </motion.div>
                <div>
                  <h4 className="text-xl font-poppins font-bold text-gray-900">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-sm text-blue-600 font-semibold">
                    {testimonials[activeIndex].role}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonials[activeIndex].college}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 md:ml-auto">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FiStar className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonial Text */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light italic"
            >
              "{testimonials[activeIndex].content}"
            </motion.blockquote>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setActiveIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-blue-600'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPrevious}
              className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-3 gap-4 md:gap-8 text-center"
      >
        {[
          { number: '4.9/5', label: 'Average Rating' },
          { number: '5000+', label: 'Success Stories' },
          { number: '98%', label: 'Recommend to Friends' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="p-4 rounded-xl bg-blue-50 border border-blue-200"
          >
            <p className="text-2xl font-poppins font-bold text-blue-600 mb-1">
              {stat.number}
            </p>
            <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;
