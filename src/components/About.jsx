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
      </div>
    </section>
  );
};

export default About;
