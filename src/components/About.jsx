import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMapPin, FiBriefcase } from 'react-icons/fi';
import headshotImg from '../assets/mamadou-headshot.png';

const About = ({ darkMode }) => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-slate-light' : 'text-navy'}`}>
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative group">
              <div className={`w-64 h-64 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                darkMode 
                  ? 'border-cyan/50 group-hover:border-cyan' 
                  : 'border-navy/50 group-hover:border-navy'
              }`}>
                <img 
                  src={headshotImg} 
                  alt="Mamadou Ba - AI Developer and Computer Science Student"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative border */}
              <div className={`absolute -inset-4 rounded-full border-2 -z-10 transition-all duration-300 ${
                darkMode 
                  ? 'border-cyan/20 group-hover:border-cyan/40' 
                  : 'border-navy/20 group-hover:border-navy/40'
              }`} />
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <div className={`space-y-4 mb-8 ${darkMode ? 'text-slate' : 'text-gray-600'}`}>
              <p className="text-lg leading-relaxed">
                CS junior at <span className={darkMode ? 'text-cyan' : 'text-navy font-medium'}>CUNY College of Staten Island</span> with 
                expertise in AI automation, data science, and algorithmic problem-solving.
              </p>
              
              <p className="leading-relaxed">
                Currently serving as <span className={darkMode ? 'text-cyan' : 'text-navy font-medium'}>Operations Analyst & AI Lead at Apex Forum</span>, 
                where I've deployed AI solutions that eliminate 8+ hours of manual work weekly.
              </p>
              
              <p className="leading-relaxed">
                Pursuing quantitative finance roles while building intelligent systems that deliver measurable business impact.
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className={`flex items-center gap-2 ${darkMode ? 'text-slate' : 'text-gray-600'}`}>
                <FiMapPin className="text-cyan" />
                <span>New York City, NY</span>
              </div>
              <div className={`flex items-center gap-2 ${darkMode ? 'text-slate' : 'text-gray-600'}`}>
                <FiBriefcase className="text-cyan" />
                <span>Open for Summer 2026</span>
              </div>
            </div>

            {/* Download Resume Button */}
            <motion.a
              href="/portfolio-2025/Mamadou_Ba_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border-2 transition-all duration-300 ${
                darkMode 
                  ? 'border-cyan text-cyan hover:bg-cyan/10' 
                  : 'border-navy text-navy hover:bg-navy/10'
              }`}
            >
              <FiDownload size={18} />
              Download Resume
            </motion.a>
          </motion.div>
        </div>

        {/* GitHub Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-slate-light' : 'text-navy'}`}>
            GitHub Activity
          </h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://github.com/Mamadouba2004"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-navy-light/50 border-cyan/30 hover:border-cyan text-slate-light' 
                  : 'bg-white border-gray-200 hover:border-navy text-gray-800'
              }`}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <div className="text-left">
                <div className="font-semibold">@Mamadouba2004</div>
                <div className={`text-sm ${darkMode ? 'text-slate' : 'text-gray-500'}`}>View my repositories</div>
              </div>
            </motion.a>
            
            <motion.a
              href="https://github.com/Mamadouba2004?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-navy-light/50 border-cyan/30 hover:border-cyan text-slate-light' 
                  : 'bg-white border-gray-200 hover:border-navy text-gray-800'
              }`}
            >
              <svg className="w-8 h-8 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <div className="text-left">
                <div className="font-semibold">Projects</div>
                <div className={`text-sm ${darkMode ? 'text-slate' : 'text-gray-500'}`}>Browse all repos</div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
