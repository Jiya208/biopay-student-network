import React from 'react';
import { motion } from 'framer-motion';
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#' },
      { label: 'Security', href: '#' },
    ],
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Code of Conduct', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
    Social: [
      { icon: FiTwitter, href: '#', label: 'Twitter' },
      { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
      { icon: FiInstagram, href: '#', label: 'Instagram' },
      { icon: FiGithub, href: '#', label: 'GitHub' },
    ],
  };

  const contactInfo = [
    { icon: FiMail, text: 'hello@biopaynet.com', label: 'Email' },
    { icon: FiPhone, text: '+91 (XXX) XXX-XXXX', label: 'Phone' },
    { icon: FiMapPin, text: 'New Delhi, India', label: 'Location' },
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="font-poppins font-extrabold text-white text-lg tracking-wider">B</span>
              </div>
              <div>
                <p className="font-poppins font-bold text-lg">BSN</p>
                <p className="text-xs text-gray-400">Student Network</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Connecting the next generation of leaders, innovators, and changemakers.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {footerLinks.Social.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).slice(0, 3).map(([title, links]) => (
            <motion.div key={title} variants={itemVariants}>
              <h3 className="text-white font-poppins font-bold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4, color: '#2563EB' }}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-poppins font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 group cursor-pointer"
                  >
                    <Icon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">{info.label}</p>
                      <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                        {info.text}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-8 border-y border-gray-800"
        >
          <div className="max-w-md mx-auto md:mx-0">
            <h3 className="text-lg font-poppins font-bold mb-3">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates about opportunities and features.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Copyright */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400"
        >
          <p>
            © {currentYear} Biopay Student Network. All rights reserved.
          </p>
          <div className="flex gap-6">
            <motion.a
              href="#"
              whileHover={{ color: '#2563EB' }}
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: '#2563EB' }}
              className="hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: '#2563EB' }}
              className="hover:text-blue-400 transition-colors"
            >
              Cookie Settings
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating Background Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
      />
    </footer>
  );
};

export default LandingFooter;
