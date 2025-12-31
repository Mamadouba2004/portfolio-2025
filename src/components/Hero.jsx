import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ darkMode }) => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-cyan font-mono mb-4`}
            >
              Hi, my name is Mamadou
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ${darkMode ? 'text-slate-light' : 'text-navy'}`}
            >
              AI Developer &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-400">
                CS Student
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-lg md:text-xl mb-8 max-w-lg ${darkMode ? 'text-slate' : 'text-gray-600'}`}
            >
              Building intelligent systems and solving complex problems with data.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={scrollToProjects}
              className={`px-8 py-4 rounded-lg font-medium border-2 transition-all duration-300 ${
                darkMode 
                  ? 'border-cyan text-cyan hover:bg-cyan/10' 
                  : 'border-navy text-navy hover:bg-navy/10'
              }`}
            >
              View My Work
            </motion.button>
          </motion.div>

          {/* Right - Animated Brain */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative w-96 h-96">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/30 via-blue-500/20 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
              
              {/* Brain container */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Brain SVG */}
                <svg viewBox="0 0 200 200" className="w-72 h-72">
                  {/* Brain outline */}
                  <defs>
                    <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#64ffda" />
                      <stop offset="50%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Simplified brain shape */}
                  <path 
                    d="M100 20 C60 20 30 50 30 90 C30 130 50 160 70 170 C80 175 90 180 100 180 C110 180 120 175 130 170 C150 160 170 130 170 90 C170 50 140 20 100 20" 
                    fill="none" 
                    stroke="url(#brainGradient)" 
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                  
                  {/* Brain folds */}
                  <path d="M60 60 Q80 80 60 100 Q80 120 60 140" fill="none" stroke="url(#brainGradient)" strokeWidth="1.5" opacity="0.7"/>
                  <path d="M140 60 Q120 80 140 100 Q120 120 140 140" fill="none" stroke="url(#brainGradient)" strokeWidth="1.5" opacity="0.7"/>
                  <path d="M80 50 Q100 70 120 50" fill="none" stroke="url(#brainGradient)" strokeWidth="1.5" opacity="0.7"/>
                  <path d="M80 150 Q100 130 120 150" fill="none" stroke="url(#brainGradient)" strokeWidth="1.5" opacity="0.7"/>
                  <path d="M100 40 L100 160" fill="none" stroke="url(#brainGradient)" strokeWidth="1" opacity="0.3"/>
                  
                  {/* Neural nodes */}
                  {[
                    [50, 70], [70, 50], [100, 40], [130, 50], [150, 70],
                    [40, 100], [160, 100],
                    [50, 130], [70, 150], [100, 160], [130, 150], [150, 130],
                    [80, 80], [120, 80], [80, 120], [120, 120], [100, 100]
                  ].map(([cx, cy], i) => (
                    <motion.circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r="3"
                      fill="#64ffda"
                      filter="url(#glow)"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </svg>
              </motion.div>

              {/* Neural connection lines */}
              <motion.div 
                className="absolute top-0 left-1/2 w-px h-24 bg-gradient-to-b from-cyan/60 to-transparent"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute top-16 right-8 w-24 h-px bg-gradient-to-r from-transparent to-purple-400/60"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="absolute bottom-16 left-8 w-20 h-px bg-gradient-to-l from-transparent to-blue-400/60"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
