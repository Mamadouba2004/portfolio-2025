import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiPython, SiCplusplus, SiJavascript, SiTypescript,
  SiTensorflow, SiPytorch, SiScikitlearn,
  SiGit, SiDocker, SiPostgresql, SiReact, SiNodedotjs, SiFastapi
} from 'react-icons/si';
import { FiCloud, FiBarChart2, FiLink } from 'react-icons/fi';

const techCategories = [
  {
    title: "Languages",
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" }
    ]
  },
  {
    title: "AI/ML",
    items: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "LangChain", icon: FiLink, color: "#1C3C3C" },
      { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E" }
    ]
  },
  {
    title: "Tools & Frameworks",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "SQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Power BI", icon: FiBarChart2, color: "#F2C811" },
      { name: "Azure", icon: FiCloud, color: "#0078D4" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" }
    ]
  }
];

const TechStack = ({ darkMode }) => {
  return (
    <section id="tech" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-slate-light' : 'text-navy'}`}>
            Technologies I Work With
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className={`p-6 rounded-2xl border backdrop-blur-xl ${
                darkMode 
                  ? 'bg-navy-light/30 border-white/10' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <h3 className={`text-sm font-mono uppercase tracking-wider mb-6 ${
                darkMode ? 'text-cyan' : 'text-navy'
              }`}>
                {category.title}
              </h3>
              
              <div className="grid grid-cols-4 gap-4">
                {category.items.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    whileHover={{ scale: 1.15, y: -5 }}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div 
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        darkMode 
                          ? 'bg-navy group-hover:bg-navy-light' 
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}
                    >
                      <tech.icon 
                        size={28} 
                        style={{ color: tech.color }}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span className={`text-xs font-medium text-center ${
                      darkMode ? 'text-slate' : 'text-gray-600'
                    }`}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
