import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Brain, Database, Terminal } from 'lucide-react';

const projects = [
  {
    title: "Relapse Prevention App",
    tech: "TypeScript & ML",
    description: "Predicting and preventing behavioral relapse using machine learning models.",
    icon: <Brain className="w-6 h-6 text-purple-400" />,
    color: "from-purple-500/20 to-blue-500/20"
  },
  {
    title: "Hospital Management",
    tech: "C++ & Data Structures",
    description: "High-efficiency patient management system with O(1) lookups using Hash Tables.",
    icon: <Database className="w-6 h-6 text-emerald-400" />,
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Retail Logistics AI",
    tech: "Python & Scikit-Learn",
    description: "Quantifying the cost of poor data in retail logistics with anomaly detection.",
    icon: <Terminal className="w-6 h-6 text-orange-400" />,
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "LangChain Agents",
    tech: "LLMs & Python",
    description: "Conversational AI agents capable of complex reasoning built with LangChain.",
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    color: "from-blue-500/20 to-cyan-500/20"
  }
];

const TechBadge = ({ name }) => (
  <span className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 transition-colors">
    {name}
  </span>
);

function App() {
  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight">Mamadou<span className="text-purple-400">.AI</span></span>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">

        {/* Hero Section */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              Building intelligent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                systems.
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl">
              I am an AI Developer & CS Student crafting solutions for real-world problems—from 
              addiction recovery algorithms to logistics optimization.
            </p>

            <div className="flex gap-4 mb-12">
              <a href="https://www.linkedin.com/in/ba-mamadou2004/" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors">
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a href="https://github.com/Mamadouba2004" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/10 font-medium rounded-lg hover:bg-white/20 transition-colors">
                <Github size={20} />
                GitHub
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {["Python", "C++", "TensorFlow", "React", "SQL", "LangChain", "Git"].map(tech => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Grid */}
        <section id="projects">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Selected Work</h2>
            <a href="https://github.com/Mamadouba2004" className="text-sm text-purple-400 hover:text-purple-300">View all →</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-8 rounded-2xl border border-white/10 bg-gradient-to-br ${project.color} hover:border-white/20 transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-[#0a0a0a] m-[1px] rounded-[15px] -z-10" />
                <div className="mb-6">{project.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-purple-400 font-mono mb-4">{project.tech}</p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors cursor-pointer">
                    View Code <Github size={16} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/50 backdrop-blur-xl py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">
            © 2025 Mamadou Ba. Built with React & Tailwind.
          </div>
          <div className="flex gap-6">
             <a href="mailto:Mamadou.Ba@cix.csi.cuny.edu" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
               <Mail size={16} /> Contact Me
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
