/* ============================================================
   PORTFOLIO CONTENT — single source of truth.
   Edit values here to update the whole site.
   ⚠️ Confirm the repo/demo URLs marked "TODO" and paste exact links.
   ============================================================ */

// Asset paths resolve correctly in both dev ("/") and prod ("/portfolio-2025/")
const BASE = import.meta.env.BASE_URL;

export const PORTFOLIO = {
  identity: {
    name: "Mamadou Ba",
    initials: "MB",
    role: "AI Engineer · CS Student",
    tagline: "I build intelligent systems that ship.",
    lede: "CS junior at CUNY College of Staten Island and AI Lead at Apex Forum. I design production-minded AI — RAG pipelines, agents, and evaluation harnesses — plus data analytics that drive measurable business impact.",
    location: "Staten Island, NY",
    availability: "Open to Summer 2026 internships",
    email: "Mamadou.Ba19@login.cuny.edu",
    phone: "(347) 940-2875",
    github: "https://github.com/Mamadouba2004",
    linkedin: "https://www.linkedin.com/in/ba-mamadou2004/",
    resume: BASE + "assets/Mamadou_Ba_Resume.pdf",
    headshot: BASE + "assets/mamadou-headshot.jpg",
  },

  heroMeta: [
    { n: "8+ hrs", l: "saved / week via automation" },
    { n: "$2.3M", l: "cost impact quantified" },
    { n: "100%", l: "RAG eval pass rate" },
  ],

  pillars: [
    { ic: "spark", h: "AI / Agents & RAG", p: "Claude API tools & system prompts, LangChain, ChromaDB retrieval, output guardrails, and evaluation harnesses that catch failure modes before deploy." },
    { ic: "chart", h: "Data & Analytics", p: "Python, Pandas, scikit-learn and Power BI pipelines — anomaly detection, ETL, and analysis that turns messy data into business decisions." },
    { ic: "code", h: "Software & Algorithms", p: "C/C++ data structures, hash tables and priority queues, TypeScript apps — efficient, correct systems built from first principles." },
  ],

  projects: [
    {
      featured: true,
      title: "VibeFinder",
      sub: "Music Recommender · RAG System",
      icon: "music",
      status: "live",
      statusLabel: "Live Demo",
      desc: "End-to-end RAG system on the Claude API with a retrieval pipeline, orchestration logic, configurable scoring modes, and output guardrails that validate every model response before delivery.",
      metrics: [ { b: "12", s: "check eval harness" }, { b: "3", s: "adversarial profiles" }, { b: "100%", s: "pass rate pre-deploy" } ],
      tech: ["Python", "LangChain", "Claude API", "Streamlit"],
      repo: "https://github.com/Mamadouba2004/applied-ai-system-project",
      demo: "https://vibefinder-rag.streamlit.app/",
    },
    {
      featured: true,
      title: "The Unofficial Guide",
      sub: "RAG Knowledge Base · Hugging Face",
      icon: "book",
      status: "live",
      statusLabel: "Live Demo",
      desc: "Public Hugging Face Space answering plain-language questions about university courses from 1,700+ real student reviews — grounded generation, programmatic source attribution, and a hard refusal when retrieved context is insufficient.",
      metrics: [ { b: "1,700+", s: "student reviews" }, { b: "5/5", s: "eval accuracy" }, { b: "0", s: "hallucinations" } ],
      tech: ["Python", "ChromaDB", "Groq", "Gradio"],
      repo: "https://github.com/Mamadouba2004/codepath-ai201-module1",
      demo: "https://huggingface.co/spaces/adouu/uw-course-guide",
    },
    {
      title: "Retail Logistics Data Quality",
      sub: "Data Science · Business Impact",
      icon: "chart",
      status: "done",
      statusLabel: "Completed",
      desc: "Quantified the financial impact of poor data quality across 10,000+ logistics records using ML anomaly detection, then delivered data-governance recommendations from root-cause analysis.",
      metrics: [ { b: "10k+", s: "records analyzed" }, { b: "$2.3M", s: "annual cost found" } ],
      tech: ["Python", "Pandas", "scikit-learn", "Power BI"],
      repo: "https://github.com/Mamadouba2004/data-science-final-project",
      demo: null,
    },
    {
      title: "Hospital Management System",
      sub: "Data Structures · C++",
      icon: "hospital",
      status: "done",
      statusLabel: "Completed",
      desc: "High-performance patient management using a Hash Table for O(1) lookup and a Priority Queue for OR scheduling, with starvation prevention via dynamic priority aging.",
      metrics: [ { b: "O(1)", s: "patient lookup" }, { b: "C++", s: "from first principles" } ],
      tech: ["C++", "Data Structures", "Algorithms"],
      repo: "https://github.com/Mamadouba2004/hospital-management-system",
      demo: null,
    },
    {
      title: "Relapse Prevention App",
      sub: "ML · Behavioral Health",
      icon: "heart",
      status: "wip",
      statusLabel: "In Progress",
      desc: "ML-powered behavioral-health application that predicts and helps prevent relapse patterns, built with a TypeScript front end and a machine-learning core.",
      metrics: [ { b: "TS", s: "+ ML core" }, { b: "Health", s: "real-world use" } ],
      tech: ["TypeScript", "Machine Learning", "Healthcare"],
      repo: "https://github.com/Mamadouba2004/relapse-prevention-app",
      demo: null,
    },
    {
      title: "A* Strategy Game",
      sub: "AI Opponents · Algorithms",
      icon: "target",
      status: "done",
      statusLabel: "Completed",
      desc: "A Battleship-style strategy game with AI opponents featuring probability-based targeting and recursive placement algorithms.",
      metrics: [ { b: "A*", s: "search + heuristics" }, { b: "AI", s: "probabilistic targeting" } ],
      tech: ["Python", "Algorithms", "Game AI"],
      repo: "https://github.com/Mamadouba2004/astar-game",
      demo: null,
    },
  ],

  experience: [
    {
      when: "Mar 2025 — Present", mode: "Hybrid",
      role: "Operations Analyst & AI Lead", org: "Apex Forum",
      bullets: [
        "Shipped <b>Copilot Studio</b> and <b>Power Automate</b> workflows that cut <b>8+ hours</b> of weekly manual work on meeting prep and mentorship matching.",
        "Built Python and Power BI analytics pipelines processing podcast and community-engagement data, surfacing insights that drove <b>30% growth</b> in member participation across 5+ programs.",
        "Analyzed where AI automation was — and wasn't — appropriate, delivering recommendations to senior leadership that drove a <b>25% improvement</b> in team efficiency.",
        "Ran small-group walkthroughs plus runbooks so non-technical staff could maintain AI workflows after handoff.",
      ],
    },
    {
      when: "May 2026 — Jun 2026", mode: "Staten Island, NY",
      role: "Tech Entrepreneurship Mentor", org: "CSI Innovation Hub × Verizon",
      bullets: [
        "Facilitated weekly sessions for high-school students in the <b>Verizon Emerging Tech Impact Program</b> — teaching AI tools, business-model design, market research, and product prototyping.",
        "Mentored Team Purple in designing a Queue Management App for Seniors, from problem identification through user-centered design to a final live <b>Tech Showcase</b> presentation.",
      ],
    },
    {
      when: "Jan 2026 — Jun 2026", mode: "Remote",
      role: "Volunteer Mentor & Project Reviewer", org: "Mouse.org",
      bullets: [
        "Mentored an NYC special-education CS classroom at P721Q JFK Jr. School through the <b>AI League</b> program, giving feedback on student app prototypes and pitches.",
        "Served as a project reviewer for the <b>Emoti-Con NYC</b> Youth Tech Expo, evaluating 10 student projects across health, civic tech, and community categories.",
      ],
    },
  ],

  education: {
    school: "CUNY — College of Staten Island",
    degree: "B.S. Computer Science",
    grad: "Expected May 2027",
    coursework: ["Data Structures & Algorithms (C++)", "Intro to Data Science (Python)", "Computer Organization", "Discrete Mathematics", "Calculus III", "Linear Algebra"],
  },

  tech: [
    { cat: "Languages", items: ["Python", "SQL", "TypeScript", "JavaScript", "C / C++", "HTML / CSS"] },
    { cat: "Data & Analytics", items: ["Pandas", "NumPy", "scikit-learn", "Power BI", "ETL pipelines", "SQL schema design"] },
    { cat: "AI / ML & Agents", items: ["Claude API", "LangChain", "RAG pipelines", "ChromaDB", "Eval harnesses", "Gemini API", "Copilot Studio", "Power Automate"] },
    { cat: "Tools", items: ["Git / GitHub", "VS Code", "Jupyter", "Excel", "Streamlit", "Gradio"] },
  ],

  // Recommendation letters. `source` links to the full letter (PDF in
  // public/assets/letters/, or an online recommendation URL). `via` is an
  // optional small label (e.g. "LinkedIn") for online references.
  letters: [
    {
      name: "Seyi Fakoya",
      title: "Program Facilitator, Emerging Tech Impact Program · CSI Innovation Hub",
      quote: "Mamadou brought a rare combination of technical understanding and deep empathy to his mentorship. I recommend him without reservation — he is exactly the kind of mentor every program hopes to find.",
      source: BASE + "assets/letters/seyi-fakoya-gamr.pdf",
    },
    {
      name: "Jasmine Cardona",
      title: "Executive Director, Economic Development & Community Partnerships · CUNY CSI",
      quote: "Mamadou exemplifies the qualities of an effective leader and mentor: accountability, adaptability, collaboration, and a genuine desire to uplift others. I strongly recommend him without reservation.",
      source: BASE + "assets/letters/jasmine-cardona-csi.pdf",
    },
    {
      name: "Christian Perticone",
      title: "ELI Director, Center for Global Engagement · CUNY CSI",
      quote: "He possesses an incredible combination of 'hard' and 'soft' skills. He quickly grasps the greater purpose of tasks and improves on them with thoughtful, creative solutions. If you're lucky enough to bring him onto your team, you'll find a contributor who understands both the big picture and the granular details.",
      via: "LinkedIn",
    },
  ],
};
