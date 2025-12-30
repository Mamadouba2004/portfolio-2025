import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { HiOutlineChartBar, HiOutlineChat, HiOutlineHeart, HiOutlineOfficeBuilding, HiOutlinePhotograph } from 'react-icons/hi';

const projects = [
  {
    title: "AI-Powered Sentiment Analyzer",
    description: "Fine-tuned BERT model for sentiment analysis with 95% accuracy on unstructured feedback data",
    tech: ["Python", "TensorFlow", "BERT", "NLP"],
    github: "https://github.com/Mamadouba2004/ai-projects",
    live: "#",
    icon: <HiOutlineChartBar className="w-8 h-8" />,
    featured: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
  },
  {
    title: "Image Classifier (PyTorch)",
    description: "Deep learning image classification model using transfer learning with PyTorch",
    tech: ["Python", "PyTorch", "Computer Vision"],
    github: "https://github.com/Mamadouba2004/ai-projects",
    live: "#",
    icon: <HiOutlinePhotograph className="w-8 h-8" />
  },
  {
    title: "Chatbot with LangChain",
    description: "Intelligent conversational AI using LangChain agents and RAG architecture",
    tech: ["Python", "LangChain", "OpenAI API", "Vector DB"],
    github: "https://github.com/Mamadouba2004/ai-projects",
    icon: <HiOutlineChat className="w-8 h-8" />
  },
  {
    title: "Relapse Prevention App",
    description: "ML-powered behavioral health application to predict and prevent relapse patterns",
    tech: ["TypeScript", "Machine Learning", "Healthcare"],
    github: "https://github.com/Mamadouba2004/relapse-prevention-app",
    icon: <HiOutlineHeart className="w-8 h-8" />,
    status: "In Progress"
  },
  {
    title: "Hospital Management System",
    description: "High-performance patient management using Hash Tables (O(1) lookup) and Priority Queues for OR scheduling",
    tech: ["C++", "Data Structures", "Algorithms"],
    github: "https://github.com/Mamadouba2004/hospital-management-system",
    icon: <HiOutlineOfficeBuilding className="w-8 h-8" />
  },
  {
    title: "Retail Logistics Cost Analysis",
    description: "Data science project quantifying financial impact of poor data quality using ML anomaly detection",
    tech: ["Python", "pandas", "scikit-learn", "Power BI"],
    github: "https://github.com/Mamadouba2004/data-science-final-project",
    icon: <HiOutlineChartBar className="w-8 h-8" />
  }
];

const ProjectCard = ({ project, index, darkMode }) => {
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
      {project.status && (
        <span className="absolute top-4 right-4 px-2 py-1 text-xs font-mono rounded bg-cyan/20 text-cyan">
          {project.status}
        </span>
      )}

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
      <div className="flex gap-4">
        {project.github && (
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 text-sm transition-colors ${
              darkMode ? 'text-slate hover:text-cyan' : 'text-gray-600 hover:text-navy'
            }`}
            aria-label={`View ${project.title} on GitHub`}
          >
            <FiGithub size={18} />
            <span>Code</span>
          </a>
        )}
        {project.live && (
          <a 
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 text-sm transition-colors ${
              darkMode ? 'text-slate hover:text-cyan' : 'text-gray-600 hover:text-navy'
            }`}
            aria-label={`View ${project.title} live demo`}
          >
            <FiExternalLink size={18} />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

const FeaturedProject = ({ project, darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 rounded-3xl overflow-hidden border backdrop-blur-xl ${
        darkMode 
          ? 'bg-navy-light/30 border-white/10' 
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 md:h-auto overflow-hidden">
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <span className="text-cyan font-mono text-sm mb-2">Featured Project</span>
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-slate-light' : 'text-navy'}`}>
            {project.title}
          </h3>
          <p className={`mb-4 ${darkMode ? 'text-slate' : 'text-gray-600'}`}>
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, i) => (
              <span 
                key={i}
                className={`px-3 py-1 text-sm font-mono rounded-full ${
                  darkMode ? 'bg-cyan/10 text-cyan' : 'bg-navy/10 text-navy'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                darkMode 
                  ? 'border-cyan text-cyan hover:bg-cyan/10' 
                  : 'border-navy text-navy hover:bg-navy/10'
              }`}
            >
              <FiGithub size={18} />
              View Code
            </a>
            {project.live && (
              <a 
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan text-navy font-medium hover:bg-cyan/90 transition-colors"
              >
                <FiExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ darkMode }) => {
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

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

        {/* Featured Project */}
        {featuredProject && <FeaturedProject project={featuredProject} darkMode={darkMode} />}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
