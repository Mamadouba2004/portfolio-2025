import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import { HiOutlineChartBar, HiOutlineChat, HiOutlineHeart, HiOutlineOfficeBuilding } from 'react-icons/hi';

const projects = [
  {
    title: "Chatbot with LangChain",
    description: "Intelligent conversational AI using LangChain agents and RAG architecture for context-aware responses",
    tech: ["Python", "LangChain", "OpenAI API", "Vector DB"],
    github: "https://github.com/Mamadouba2004/ai-projects",
    icon: <HiOutlineChat className="w-8 h-8" />,
    status: "In Progress"
  },
  {
    title: "Relapse Prevention App",
    description: "ML-powered behavioral health application to predict and prevent relapse patterns using TypeScript and machine learning",
    tech: ["TypeScript", "Machine Learning", "Healthcare"],
    github: "https://github.com/Mamadouba2004/relapse-prevention-app",
    icon: <HiOutlineHeart className="w-8 h-8" />,
    status: "In Progress"
  },
  {
    title: "Hospital Management System",
    description: "High-performance patient management using Hash Tables (O(1) lookup) and Priority Queues for OR scheduling with starvation prevention",
    tech: ["C++", "Data Structures", "Algorithms"],
    github: "https://github.com/Mamadouba2004/hospital-management-system",
    icon: <HiOutlineOfficeBuilding className="w-8 h-8" />,
    status: "Completed"
  },
  {
    title: "Retail Logistics Cost Analysis",
    description: "Data science project quantifying financial impact of poor data quality using ML anomaly detection and business impact analysis",
    tech: ["Python", "pandas", "scikit-learn", "Power BI"],
    github: "https://github.com/Mamadouba2004/data-science-final-project",
    icon: <HiOutlineChartBar className="w-8 h-8" />,
    status: "Completed"
  }
];

const ProjectCard = ({ project, index, darkMode }) => {
  const isCompleted = project.status === "Completed";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
        darkMode 
          ? 'bg-navy-light/50 border-white/10 hover:border-cyan/30 hover:shadow-lg hover:shadow-cyan/10' 
          : 'bg-white/80 border-gray-200 hover:border-navy/30 hover:shadow-xl'
      }`}
    >
      {/* Status Badge */}
      <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
        isCompleted 
          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
      }`}>
        {project.status}
      </span>

      {/* Icon */}
      <div className={`mb-4 ${darkMode ? 'text-cyan' : 'text-navy'}`}>
        {project.icon}
      </div>

      {/* Title */}
      <h3 className={`text-xl font-bold mb-2 group-hover:text-cyan transition-colors ${
        darkMode ? 'text-slate-light' : 'text-navy'
      }`}>
        {project.title}
      </h3>

      {/* Description */}
      <p className={`text-sm mb-4 leading-relaxed ${darkMode ? 'text-slate' : 'text-gray-600'}`}>
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, i) => (
          <span 
            key={i}
            className={`px-2 py-1 text-xs font-mono rounded ${
              darkMode ? 'bg-navy text-cyan/80' : 'bg-gray-100 text-navy'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 mt-auto pt-4">
        <a 
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
            darkMode 
              ? 'border-cyan/50 text-cyan hover:bg-cyan/10 hover:border-cyan' 
              : 'border-navy/50 text-navy hover:bg-navy/10 hover:border-navy'
          }`}
          aria-label={`View ${project.title} on GitHub`}
        >
          <FiGithub size={18} />
          <span>View Code</span>
        </a>
      </div>
    </motion.div>
  );
};

const Projects = ({ darkMode }) => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-slate-light' : 'text-navy'}`}>
            <span className="text-cyan font-mono text-xl mr-2">02.</span>
            Projects I've Built
          </h2>
          <p className={`max-w-2xl ${darkMode ? 'text-slate' : 'text-gray-600'}`}>
            A collection of AI/ML and software engineering projects showcasing my expertise in building intelligent systems.
          </p>
        </motion.div>

        {/* Project Grid - 2x2 on desktop, single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
