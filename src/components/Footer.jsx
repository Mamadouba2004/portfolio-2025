import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

const Footer = ({ darkMode }) => {
  return (
    <footer id="contact" className={`py-16 border-t ${
      darkMode 
        ? 'border-white/5 bg-navy/50' 
        : 'border-gray-200 bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-slate-light' : 'text-navy'}`}>
            Let's Build Something Together
          </h3>
          <p className={`max-w-md mx-auto mb-6 ${darkMode ? 'text-slate' : 'text-gray-600'}`}>
            I'm currently looking for Summer 2026 internship opportunities in AI/ML and software engineering.
          </p>
          <a 
            href="mailto:Mamadou.Ba@CIX.CSI.CUNY.EDU?subject=Let's Talk AI"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan text-navy font-medium hover:bg-cyan/90 transition-colors"
          >
            <FiMail size={18} />
            Get In Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <motion.a
            href="https://github.com/Mamadouba2004"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className={`p-3 rounded-full transition-colors ${
              darkMode 
                ? 'text-slate hover:text-cyan hover:bg-white/5' 
                : 'text-gray-600 hover:text-navy hover:bg-gray-200'
            }`}
            aria-label="GitHub"
          >
            <FiGithub size={24} />
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/mamadouba"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className={`p-3 rounded-full transition-colors ${
              darkMode 
                ? 'text-slate hover:text-cyan hover:bg-white/5' 
                : 'text-gray-600 hover:text-navy hover:bg-gray-200'
            }`}
            aria-label="LinkedIn"
          >
            <FiLinkedin size={24} />
          </motion.a>
          
          <motion.a
            href="mailto:Mamadou.Ba@CIX.CSI.CUNY.EDU"
            whileHover={{ y: -3 }}
            className={`p-3 rounded-full transition-colors ${
              darkMode 
                ? 'text-slate hover:text-cyan hover:bg-white/5' 
                : 'text-gray-600 hover:text-navy hover:bg-gray-200'
            }`}
            aria-label="Email"
          >
            <FiMail size={24} />
          </motion.a>
          
          <motion.a
            href="#"
            whileHover={{ y: -3 }}
            className={`p-3 rounded-full transition-colors ${
              darkMode 
                ? 'text-slate hover:text-cyan hover:bg-white/5' 
                : 'text-gray-600 hover:text-navy hover:bg-gray-200'
            }`}
            aria-label="Download Resume"
          >
            <FiDownload size={24} />
          </motion.a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className={`text-sm ${darkMode ? 'text-slate/60' : 'text-gray-400'}`}>
            © 2025 Mamadou Ba. All rights reserved.
          </p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-slate/40' : 'text-gray-300'}`}>
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
