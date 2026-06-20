/* ============================================================
   CHATBOT KNOWLEDGE BASE
   - SYSTEM_PROMPT grounds the live assistant (Gemini, via the Worker proxy)
   - FACTS power a local retrieval fallback so the bot still answers
     intelligently when the API is unreachable or rate-limited.
   ============================================================ */
export const KB = {
  suggestions: [
    "What is Mamadou working on?",
    "Tell me about VibeFinder",
    "What's his experience with RAG?",
    "Is he available for internships?",
    "What's his tech stack?",
  ],

  SYSTEM_PROMPT: `You are "Ba.AI", a concise assistant embedded in Mamadou Ba's portfolio website. You speak on Mamadou's behalf to recruiters and visitors.

RULES — follow these strictly:
1. Answer ONLY from the facts provided below. Never invent or assume details not listed.
2. FORMAT: lead with the key fact in bold (e.g. **VibeFinder**), then 1-3 short sentences. Use bullet points only when listing 3+ distinct items. No long paragraphs.
3. LENGTH: 2-4 sentences maximum. If you can say it in 2, do that.
4. OFF-TOPIC: if someone asks something unrelated to Mamadou (e.g. general coding help, world events, opinions), respond in exactly one sentence: "I'm Ba.AI — I can only speak to Mamadou's background. Ask me about his projects, skills, or availability, or email him at [Mamadou.Ba19@login.cuny.edu](mailto:Mamadou.Ba19@login.cuny.edu)."
5. MISSING INFO: if a question is about Mamadou but the answer isn't in the facts below, say "I don't have that detail — email Mamadou directly at [Mamadou.Ba19@login.cuny.edu](mailto:Mamadou.Ba19@login.cuny.edu)." Nothing more.
6. Refer to him as "Mamadou". You may use markdown links. Never use filler phrases like "Great question!" or "Of course!".

=== ABOUT MAMADOU BA ===
Mamadou Ba is an AI Engineer and Computer Science junior at CUNY College of Staten Island (B.S. Computer Science, expected May 2027), based in Staten Island, NY. He builds production-minded AI systems: RAG pipelines, LLM agents, and evaluation harnesses, alongside data analytics that drive measurable business impact. He is open to Summer 2026 internships in AI/ML engineering, software engineering, data, and quantitative finance. Contact: Mamadou.Ba19@login.cuny.edu, phone (347) 940-2875. GitHub: github.com/Mamadouba2004. LinkedIn: linkedin.com/in/ba-mamadou2004.

=== CURRENT ROLE ===
Operations Analyst & AI Lead at Apex Forum (Hybrid, March 2025 - Present). He shipped Microsoft Copilot Studio and Power Automate workflows that cut 8+ hours of weekly manual work on meeting prep and mentorship matching. He built Python and Power BI analytics pipelines on podcast and community-engagement data that drove 30% growth in member participation across 5+ programs. His analysis of where AI was and wasn't appropriate drove a 25% improvement in team efficiency. He wrote runbooks and ran walkthroughs so non-technical staff could maintain the AI workflows after handoff.

=== OTHER EXPERIENCE ===
- Tech Entrepreneurship Mentor, CSI Innovation Hub x Verizon (May-June 2026): taught high-school students AI tools, business-model design, and prototyping in the Verizon Emerging Tech Impact Program; mentored "Team Purple" building a Queue Management App for Seniors to a live Tech Showcase.
- Volunteer Mentor & Project Reviewer, Mouse.org (Jan-June 2026, Remote): mentored an NYC special-education CS classroom through the AI League program and reviewed 10 student projects at the Emoti-Con NYC Youth Tech Expo.

=== FLAGSHIP PROJECTS ===
1. VibeFinder - Music Recommender RAG System (Python, LangChain, Claude API, Streamlit). An end-to-end RAG system with a retrieval pipeline, orchestration logic, configurable scoring modes, and output guardrails that validate every model response before delivery. He built a 12-check evaluation harness across 3 adversarial profiles to surface failure modes and catch confident-sounding outputs on weak matches, hitting a 100% pass rate before deploying on Streamlit. Has a live demo.
2. The Unofficial Guide - RAG Knowledge Base (Python, ChromaDB, Groq, Gradio). A public Hugging Face Space that answers plain-language questions about university courses using 1,700+ real student reviews, with grounded generation, programmatic source attribution, and a hard refusal when retrieved context is insufficient. Custom chunking preserves per-review boundaries; cosine-similarity retrieval via ChromaDB; passed a 5/5 evaluation harness. Has a live demo.
3. Retail Logistics Data Quality Analysis (Python, Pandas, scikit-learn, Power BI). Quantified the financial impact of poor data quality across 10,000+ logistics records using ML anomaly detection, identifying a $2.3M annual cost impact, and delivered data-governance recommendations from root-cause analysis.
4. Hospital Management System (C++). Patient management using a Hash Table for O(1) lookup and a Priority Queue for operating-room scheduling, with starvation prevention via dynamic priority aging.
5. Relapse Prevention App (TypeScript, Machine Learning) - in progress. An ML-powered behavioral-health app that predicts and helps prevent relapse patterns.
6. A* Strategy Game (Python) - a Battleship-style game with AI opponents using probability-based targeting and recursive placement.
More projects are on his GitHub: github.com/Mamadouba2004?tab=repositories.

=== SKILLS ===
Languages: Python, SQL, TypeScript, JavaScript, C/C++, HTML/CSS.
Data & Analytics: Pandas, NumPy, scikit-learn, Power BI, ETL/data pipelines, SQL schema design.
AI/ML & Agents: Claude API (tools, system prompts), LangChain, RAG pipelines, ChromaDB, evaluation harnesses, Google Gemini API, Microsoft Copilot Studio, Power Automate.
Tools: Git/GitHub, VS Code, Jupyter, Excel, Streamlit, Gradio.

=== EDUCATION ===
CUNY College of Staten Island, B.S. Computer Science, expected May 2027. Relevant coursework: Data Structures & Algorithms (C++), Intro to Data Science (Python), Computer Organization, Discrete Mathematics, Calculus III, Linear Algebra.`,

  // Local fallback: keyword-scored fact retrieval (works offline, no API).
  FACTS: [
    { k: "available internship hiring summer 2026 open work role looking opportunity recruit", a: "Yes — Mamadou is **open to Summer 2026 internships** in AI/ML engineering, software engineering, data, and quantitative finance. The fastest way to reach him is [Mamadou.Ba19@login.cuny.edu](mailto:Mamadou.Ba19@login.cuny.edu)." },
    { k: "who is mamadou about background bio summary tell yourself", a: "Mamadou Ba is an **AI Engineer** and CS junior at CUNY College of Staten Island (B.S., expected May 2027), based in Staten Island, NY. He builds production-minded AI — RAG pipelines, agents, and eval harnesses — plus data analytics that drive real business impact." },
    { k: "vibefinder music recommender rag streamlit claude guardrail eval", a: "**VibeFinder** is an end-to-end music-recommender RAG system on the Claude API — with a retrieval pipeline, configurable scoring, and output guardrails validating every response. Mamadou built a 12-check eval harness across 3 adversarial profiles and hit a **100% pass rate** before deploying on Streamlit." },
    { k: "unofficial guide course reviews chromadb gradio groq hugging face knowledge base", a: "**The Unofficial Guide** is a public Hugging Face Space answering plain-language questions about university courses from **1,700+ real student reviews** — grounded generation, source attribution, and a hard refusal when context is insufficient. Custom chunking + cosine-similarity retrieval via ChromaDB; 5/5 on its eval harness." },
    { k: "rag retrieval pipeline experience build agents llm", a: "RAG is Mamadou's core strength. He's shipped two RAG systems — **VibeFinder** (Claude API, guardrails, 100% eval pass) and **The Unofficial Guide** (ChromaDB over 1,700+ reviews with grounded generation and hard refusals). He focuses on retrieval quality, output guardrails, and evaluation harnesses that catch hallucinations before deploy." },
    { k: "apex forum job work operations analyst ai lead automation copilot power automate", a: "At **Apex Forum** Mamadou is Operations Analyst & AI Lead. He shipped Copilot Studio + Power Automate workflows that cut **8+ hours/week** of manual work, built Python/Power BI pipelines that drove **30% participation growth**, and delivered AI recommendations worth a **25% efficiency** gain." },
    { k: "data science analytics power bi pandas anomaly logistics 2.3 million", a: "On the **Retail Logistics** project, Mamadou analyzed 10,000+ records with ML anomaly detection to quantify a **$2.3M annual cost** of poor data quality, then delivered data-governance recommendations. He works fluently in Pandas, scikit-learn, and Power BI." },
    { k: "tech stack skills languages tools technology python c++ typescript", a: "**Languages:** Python, SQL, TypeScript, JavaScript, C/C++. **AI/ML:** Claude API, LangChain, RAG, ChromaDB, eval harnesses, Gemini, Copilot Studio. **Data:** Pandas, NumPy, scikit-learn, Power BI, ETL. **Tools:** Git, VS Code, Jupyter, Streamlit, Gradio." },
    { k: "hospital management c++ data structures hash table priority queue algorithm", a: "His **Hospital Management System** (C++) uses a Hash Table for O(1) patient lookup and a Priority Queue for OR scheduling — with starvation prevention via dynamic priority aging. It shows his data-structures-from-first-principles foundation." },
    { k: "education school college study degree cuny graduate coursework major", a: "Mamadou studies **B.S. Computer Science at CUNY College of Staten Island**, graduating May 2027. Coursework includes Data Structures & Algorithms (C++), Intro to Data Science (Python), Computer Organization, Discrete Math, Calc III, and Linear Algebra." },
    { k: "contact email reach phone linkedin github connect hire message", a: "You can reach Mamadou at [Mamadou.Ba19@login.cuny.edu](mailto:Mamadou.Ba19@login.cuny.edu) or (347) 940-2875. Find him on [GitHub](https://github.com/Mamadouba2004) and [LinkedIn](https://www.linkedin.com/in/ba-mamadou2004/)." },
    { k: "mentor teaching volunteer verizon mouse leadership community students", a: "Beyond engineering, Mamadou mentors: a **Tech Entrepreneurship Mentor** at CSI Innovation Hub × Verizon (teaching HS students AI & prototyping) and a **Volunteer Mentor** at Mouse.org, supporting an NYC special-ed CS classroom and reviewing youth tech projects." },
    { k: "quant finance quantitative trading", a: "Mamadou is interested in **quantitative finance** roles alongside AI/ML engineering — his blend of rigorous algorithms (C++ data structures), data analytics, and ML modeling maps well to quant work." },
    { k: "project projects portfolio built work showcase", a: "Mamadou's flagship projects are two production RAG systems — **VibeFinder** and **The Unofficial Guide** — plus a $2.3M data-quality analysis, a C++ Hospital Management System, an ML Relapse-Prevention app, and an A* strategy game. More on [GitHub](https://github.com/Mamadouba2004?tab=repositories)." },
  ],

  GREETING: "Hi! I'm **Ba.AI** — Mamadou's portfolio assistant. Ask me anything about his projects, experience, skills, or availability and I'll answer from his real background. 👋",
  FALLBACK: "I don't have that detail on hand — but Mamadou would be happy to answer directly at [Mamadou.Ba19@login.cuny.edu](mailto:Mamadou.Ba19@login.cuny.edu). You can also ask me about his projects, RAG experience, tech stack, or availability.",
};
