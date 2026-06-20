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
    initials: "MB"
    role: "AI Engineer · Business Student",
    tagline: "I build intelligent systems that ship.",
    lede: "CIS-BBA student at Baruch College (CUNY) and AI Lead at Apex Forum. I design production-minded AI — RAG pipelines, agents, and evaluation harnesses — alongside data analytics that drive measurable business impact.",
    location: "New York City, NY",
    availability: "Open to Summer 2027 internships",
    currentRole: "AI Lead @ Apex Forum · since Mar 2025",
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
      repo: "https://github.com/Mamadouba2004/vibefinder",
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
      repo: "https://github.com/Mamadouba2004/unofficial-guide-rag",
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
      repo: "https://github.com/Mamadouba2004/retail-logistics-data-quality",
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
      title: "Interruption",
      sub: "Behavioral Health · Mobile App",
      icon: "heart",
      status: "wip",
      statusLabel: "In Progress",
      desc: "Production mobile app implementing the JITAI (Just-In-Time Adaptive Intervention) framework from behavioral health research, with dynamic risk scoring, haptic feedback, and real-time state management across iOS and Android.",
      metrics: [ { b: "JITAI", s: "clinical framework" }, { b: "iOS+", s: "Android" } ],
      tech: ["React Native", "TypeScript", "SQLite"],
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
      repo: "https://github.com/Mamadouba2004/battleship-ai",
      demo: null,
    },
  ],

  experience: [
    {
      when: "Jun 2026 — Aug 2026", mode: "Manhattan, NY",
      role: "Project Management Intern", org: "MTA — HQ Supplier Management",
      bullets: [
        "Analyzing vendor contract utilization and performance trends for the <b>Metropolitan Transportation Authority</b> HQ Supplier Management team.",
        "Tracking deliverables and compliance benchmarks, building <b>Excel and Power BI</b> dashboards to surface supplier performance data.",
        "Supporting process automation and reporting workflows across the supplier management function.",
      ],
    },
    {
      when: "Mar 2025 — Present", mode: "Hybrid",
      role: "Operations Analyst & AI Lead", org: "Apex Forum",
      bullets: [
        "Designed and deployed <b>Copilot Studio</b> and <b>Power Automate</b> AI automation workflows, presenting solutions to cross-functional teams and cutting <b>8+ hours</b> of manual work weekly.",
        "Built Python and Power BI analytics pipelines processing podcast and community-engagement data, surfacing insights that drove <b>30% growth</b> in member participation across 5+ programs.",
        "Delivered findings to senior leadership in structured reports and briefings, driving a <b>25% improvement</b> in team efficiency.",
        "Administers the organization's Microsoft 365 environment — Teams, SharePoint, and Power Automate integrations.",
      ],
    },
    {
      when: "May 2026 — Jun 2026", mode: "Staten Island, NY",
      role: "Tech Entrepreneurship Mentor", org: "CSI Innovation Hub × Verizon",
      bullets: [
        "Facilitated weekly workshops for high-school students on AI tools, business-model design, and pitch storytelling in the <b>Verizon Emerging Tech Impact Program</b>.",
        "Coached student teams to present tech ventures at a live <b>Tech Showcase</b> pitch event.",
      ],
    },
    {
      when: "Mar 2025 — May 2026", mode: "Staten Island, NY · Part-time",
      role: "Student Office Assistant", org: "CUNY College of Staten Island",
      bullets: [
        "Audited 100+ hyperlinks across CGE, ELI, Study Abroad, and ISSS university websites and delivered a color-coded <b>Excel report</b> with confidence ratings to help staff prioritize fixes.",
        "Edited and maintained website content using <b>Drupal CMS</b> and formatted course sites on CUNY Academic Commons.",
        "Co-staffed the <b>Spring 2026 Study Abroad Fair</b>, engaging 100+ student attendees.",
      ],
    },
    {
      when: "Jan 2026 — Jun 2026", mode: "Remote",
      role: "Volunteer Mentor & Project Reviewer", org: "Mouse.org",
      bullets: [
        "Mentored an NYC special-education CS classroom through the <b>AI League</b> program, giving feedback on student app prototypes and pitches.",
        "Served as project reviewer for the <b>Emoti-Con NYC</b> Youth Tech Expo, evaluating student projects across health, civic tech, and community categories.",
      ],
    },
  ],

  education: {
    school: "Baruch College — CUNY",
    degree: "BBA, Computer Information Systems · Data Analytics",
    grad: "Expected May 2028",
    years: "2024 — 2028",
    coursework: ["Data Structures & Algorithms (CIS 4100)", "Object-Oriented Programming I (CIS 3100)", "Business Statistics I (STA 2000)", "Principles of Accounting (ACC 2101)", "Microeconomics (ECO 1001)", "Business Fundamentals (BUS 2000)"],
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
