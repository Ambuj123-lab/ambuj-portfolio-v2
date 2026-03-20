
import type { Experience, Project, Certificate } from './types';

// <!-- PASTE YOUR BASE64 STRING HERE BELOW inside the quotes if you want -->
export const RESUME_QR_BASE64 = "";

export const TYPEWRITER_TITLES = [
  "GenAI Solution & RAG Architect.",
  "Production-Grade LLMOps Specialist.",
  "Dual-Indexing Architecture Engineer.",
  "GDPR-Compliant AI Pipeline Builder.",
  "Fault-Tolerant Deployment Orchestrator."
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'expHogarth',
    title: 'AI Prompt Engineer',
    company: 'Hogarth Worldwide (A WPP Company)',
    location: 'Remote, India',
    period: 'Sept 2025 – Oct 2025',
    icon: 'fas fa-robot',
    color: 'pink',
    achievements: [
      'Engineered and optimized prompts for commercial-grade generative AI models (Flux, SDXL) within strict 72-77 token limits for brand-compliant visual outputs.',
      'Conducted systematic model validation and adversarial testing, identifying critical limitations including instruction adherence failures and hallucination patterns.',
      'Developed Smart AI Prompt Builder tool to standardize prompt creation workflows, featuring intelligent keyword matching for 8 problem categories.',
      'Developed prompt refinement methodology translating subjective feedback into quantifiable technical adjustments.',
      'Collaborated with cross-functional teams to define AI integration protocols and QA standards.'
    ],
    techStack: ['Flux/SDXL', 'Prompt Engineering', 'Adversarial Testing', 'Model Validation', 'QA Protocols']
  },
  {
    id: 'expBT',
    title: 'Associate Engineer - Fibre & Network Delivery (Applied AI)',
    company: 'British Telecom Global Services Pvt. Ltd.',
    location: 'Gurugram, India',
    period: 'Jan 2022 – Aug 2024',
    icon: 'fas fa-network-wired',
    color: 'blue',
    achievements: [
      '🏆 "Top Performer" Award (Sept 2022) for innovative problem-solving initiatives.',
      'Led FTTP network planning using GIS tools, reducing deployment time by 15%.',
      'Streamlined network estimation workflows by automating data extraction from Piper database, reducing manual effort by 60%.',
      'Collaborated on transition from manual processes to Autotron-based automation pipeline.',
      'Explored AI-powered document intelligence tools using Gemini 1.5 Flash API for automated extraction from network specifications.',
      'Prototyped conversational AI interface using Gradio enabling stakeholders to query network deployment metrics.',
      'Coordinated cross-functional teams achieving 98% quality assurance compliance.'
    ],
    techStack: ['GIS Tools', 'Python', 'Gemini 1.5 Flash API', 'Gradio', 'Excel Automation', 'Piper Database']
  },
  {
    id: 'expTata',
    title: 'Operations & Maintenance Engineer',
    company: 'Tata Communications Transformation Services',
    location: 'Lucknow, India',
    period: 'Nov 2021 – Jan 2022',
    icon: 'fas fa-server',
    color: 'green',
    achievements: [
      'Optimized network performance and monitoring systems, reducing downtime by 10% through comprehensive data analysis.',
      'Managed billing systems for OSP/ISP services with 100% accuracy using systematic quality control.',
      'Improved Field Engineer SLA compliance, achieving 98% TAT through workflow optimization.'
    ],
    techStack: ['ServiceNow', 'Orion', 'Network Monitoring', 'Excel Advanced Functions']
  },
  {
    id: 'expAnnu',
    title: 'Optical Fiber Execution Engineer',
    company: 'Annu Infra Construct India Pvt. Ltd.',
    location: 'Kolkata, India',
    period: 'Dec 2017 – Jun 2018',
    icon: 'fas fa-tools',
    color: 'orange',
    achievements: [
      'Executed fiber optic deployment projects for Ministry of Defense across 3 states with complete security compliance.',
      'Ensured 100% compliance with security protocols and technical specifications through rigorous QA.',
      'Reduced project delays by 20% through effective vendor coordination and resource optimization.'
    ],
    techStack: ['Fiber Optic Deployment', 'Ministry of Defense', 'Security Compliance', 'Vendor Management']
  },
  {
    id: 'expTCS',
    title: 'System Administrator',
    company: 'Tata Consultancy Services',
    location: 'Noida, India',
    period: 'Oct 2013 – Nov 2014',
    icon: 'fas fa-server',
    color: 'indigo',
    achievements: [
      'Managed revenue systems for Delhi Jal Board, ensuring 99% uptime through proactive monitoring.',
      'Trained 20+ portal users on system optimization and best practices.',
      'Supported eMigrate portal (Ministry of Overseas Affairs) with document verification processes.'
    ],
    techStack: ['System Administration', 'Revenue Systems', 'User Training', 'Process Automation']
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    title: 'Indian Legal AI | Production RAG',
    image: '/projects/LegalAI_architecture_animated.svg',
    icon: 'fas fa-balance-scale',
    description: 'Production-grade Legal AI with LangGraph orchestration, Parent-Child chunking on Qdrant Cloud, PII masking (Presidio + spaCy), Google OAuth 2.0, SSE streaming, Circuit Breaker pattern, Langfuse observability, and SHA-256 hash-based Sync Engine. Built with React, FastAPI, Qwen 3 235B.',
    tags: ['LangGraph', 'Qdrant', 'FastAPI', 'Presidio', 'Langfuse', 'OAuth 2.0'],
    demoLink: 'https://indian-legal-ai-expert.onrender.com/',
    architectureDiagram: '/projects/LegalAI_architecture_animated.svg',
    caseStudyId: 'legal-ai',
    presentationLink: '/legal-ai-case-study.html',
    impact: ['8,896 child vectors', '300K tokens saved', 'Zero orphaned vectors', 'GDPR-compliant']
  },
  {
    title: 'Citizen Safety AI | Enterprise RAG System',
    image: '/projects/citizen-safety-architecture_animated.svg',
    icon: 'fas fa-shield-alt',
    description: 'Production-grade RAG chatbot featuring real-time PII masking (Microsoft Presidio), Google OAuth 2.0 authentication, source-cited responses, and GDPR-compliant 30-day data TTL. Implemented batched embeddings with rate-limit awareness and Circuit Breaker pattern for fault tolerance. Built using React, FastAPI, LangChain, ChromaDB, and Llama 3.3 70B.',
    tags: ['RAG', 'LangChain', 'FastAPI', 'ChromaDB', 'Presidio', 'OAuth 2.0'],
    demoLink: 'https://citizen-safety-ai-assistant.vercel.app/',
    architectureDiagram: '/projects/citizen-safety-architecture_animated.svg',
    impact: ['30-day GDPR TTL', 'PII masked in real-time', 'Circuit Breaker fault-tolerant', 'Batched embeddings']
  },
  {
    title: 'Geo Narrator AI',
    image: '/projects/geo-narrator.png',
    icon: 'fas fa-globe-asia',
    description: 'AI-Powered Geospatial Intelligence Platform that transforms any location into a rich narrative experience. Discover history, culture, architecture, and hidden stories using advanced AI.',
    tags: ['Geospatial AI', 'Google Gemini', 'React', 'Maps API'],
    demoLink: 'https://geo-narrator-ai.onrender.com/',
    impact: ['Any location worldwide', 'Gemini-powered stories', 'Real-time enrichment']
  },
  {
    title: 'Chain Reaction Multi Agent System',
    image: '/projects/chain-reaction.png',
    icon: 'fas fa-project-diagram',
    description: 'Advanced Agentic Workflow Engine. Features zero-latency orchestration, multi-agent reasoning, and serverless architecture. A system designed for complex autonomous tasks.',
    tags: ['Multi-Agent', 'AI Orchestration', 'Serverless', 'System Design'],
    demoLink: 'https://chainreaction-agent.onrender.com/',
    impact: ['Zero-latency orchestration', 'Multi-agent reasoning', 'Serverless scale']
  },
  {
    title: 'LLM-Integrated Chatbot (Meta Llama 3.3 70B)',
    image: 'https://i.postimg.cc/2jqbq57F/Whats-App-Image-2025-09-03-at-21-21-22.jpg',
    icon: 'fas fa-robot',
    description: 'Built scalable chatbot, stateless design, OpenRouter API, 25% faster query time for 100+ users. Integrated secure OpenRouter API with rate limiting and CORS. Implemented front-end to send full chatHistory as JSON with each request.',
    tags: ['Llama 3.3 70B', 'OpenRouter API', 'Python', 'JavaScript', 'Render.com'],
    demoLink: 'https://ambuj-resume-bot.onrender.com/',
    impact: ['25% faster query time', '100+ simultaneous users', 'Rate-limited & secure']
  },
  {
    title: 'PromptBuilder by Ambuj',
    image: '/projects/smart-prompt-builder.png',
    icon: 'fas fa-magic',
    description: 'User-friendly web tool making AI accessible to non-technical users. Generates ready-to-use prompts for ChatGPT, Gemini, and Claude. Features a "Grok Prompt Laboratory" interface.',
    tags: ['HTML', 'CSS', 'JS', 'Netlify', 'Prompt Engineering'],
    demoLink: 'https://ambuj-prompt-nexus.onrender.com/',
    impact: ['Non-technical friendly', 'ChatGPT · Gemini · Claude', 'Zero setup needed']
  },
  {
    title: 'Chatbot | IBM WatsonX Assistant',
    image: '/projects/ibm-chatbot.png',
    icon: 'fas fa-cube',
    description: 'Created conversational AI chatbot with 95% intent recognition for 50+ daily queries. Developed 50+ intent dataset for natural dialogue flow. Integrated as "Ambuj Resume Analysis Bot".',
    tags: ['IBM WatsonX', 'HTML5', 'CSS3', 'Netlify'],
    demoLink: 'https://ambuj-ai-profile.netlify.app/',
    impact: ['95% intent recognition', '50+ daily queries', '50+ intent dataset']
  },
  {
    title: 'Professional Task Management System | Privacy-First PWA',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    icon: 'fas fa-tasks',
    description: 'Offline-first Task Manager built with React 18 & Tailwind CSS. Features localStorage-based state management, Service Workers, and JSON export/import. Speech + Audio APIs for smart feedback.',
    tags: ['React Hooks', 'Service Worker', 'Speech API', 'Local Storage', 'PWA'],
    demoLink: 'https://ambuj-to-do-tool.netlify.app/',
    impact: ['100% offline capable', 'Speech API integration', 'Installable PWA']
  }
];



export const CERTIFICATES_DATA: Certificate[] = [
  { src: 'certificates/nvidia-rag-llm.png', title: 'Building RAG Agents with LLMs', provider: 'NVIDIA Deep Learning Institute', category: 'NVIDIA' },
  { src: 'certificates/google-prompt-vertex-ai.png', title: 'Prompt Design in Vertex AI', provider: 'Google Cloud Skills Boost', category: 'Google' },
  { src: 'certificates/google-gemini-imagen.png', title: 'Build AI Apps with Gemini & Imagen', provider: 'Google Cloud Skills Boost', category: 'Google' },
  { src: 'certificates/google-vertex-ai-gemini.png', title: 'Generative AI with Vertex AI', provider: 'Google Cloud Skills Boost', category: 'Google' },
  { src: 'certificates/google-website-gcp.png', title: 'Build a Website on Google Cloud', provider: 'Google Cloud Skills Boost', category: 'Google' },
  { src: 'certificates/google-tensorflow-images.png', title: 'Classify Images with TensorFlow', provider: 'Google Cloud Skills Boost', category: 'Google' },
  { src: 'certificates/google-gemini-streamlit.png', title: 'GenAI Apps with Gemini & Streamlit', provider: 'Google Cloud Skills Boost', category: 'Google' },
  { src: 'certificates/ibm-ai-fundamentals.png', title: 'AI Fundamentals', provider: 'IBM WatsonX', category: 'IBM' },
  { src: 'certificates/ibm-generative-ai.png', title: 'Generative AI in Action', provider: 'IBM WatsonX', category: 'IBM' },
  { src: 'certificates/ibm-deep-learning.png', title: 'Deep Learning Essentials', provider: 'IBM WatsonX', category: 'IBM' },
  { src: 'certificates/ibm-chatbot-level1.png', title: 'Build Your Own Chatbot - Level 1', provider: 'IBM WatsonX', category: 'IBM' },
  { src: 'certificates/python-data-science.png', title: 'Python for Data Science', provider: 'IBM WatsonX', category: 'IBM' },
  { src: 'certificates/aws-solutions-architecture.png', title: 'AWS Solutions Architecture Simulation', provider: 'Amazon Web Services', category: 'Industry' },
  { src: 'certificates/deloitte-data-analytics.png', title: 'Data Analytics Virtual Experience', provider: 'Deloitte', category: 'Industry' },
  { src: 'certificates/pwc-digital-assurance.png', title: 'Digital Assurance & Transparency', provider: 'PwC', category: 'Industry' },
  { src: 'certificates/siemens-forage.png', title: 'Siemens Forage Completion Program', provider: 'Siemens AG', category: 'Industry' },
  { src: 'certificates/linux-ethical-ai.png', title: 'Ethical Principles for Conversational AI', provider: 'The Linux Foundation', category: 'Industry' },
  { src: 'certificates/datacom-ai-workplace.png', title: 'Partnering with AI in the Workplace', provider: 'Datacom - Forage', category: 'Industry' },
  { src: 'certificates/tata-genai-analytics.png', title: 'GenAI Powered Data Analytics', provider: 'Tata iQ - Forage', category: 'Industry' }
];

export const SKILLS_LIST = [
  { category: "Architecture & LLMOps", icon: "fas fa-network-wired", desc: "RAG System Design, LLMOps, FastAPI, Circuit Breaker, Retry Logic, OAuth 2.0, JWT, LangGraph, Pinecone, Qdrant Cloud" },
  { category: "AI & Prompt Engineering", icon: "fas fa-brain", desc: "LLMs (DeepSeek R1, Llama 3.3 70B, Qwen), Semantic Search, LangChain, LangFuse, Multi-Modal AI, Red Teaming" },
  { category: "Tech Stack", icon: "fas fa-code", desc: "Python (Async), JavaScript ES6+, React 18, FastAPI, Tailwind CSS, Web APIs" },
  { category: "Tools & Cloud", icon: "fas fa-cloud", desc: "Microsoft Presidio, SpaCy, MongoDB Atlas, Upstash Redis, Render, Vercel, Docker, Koyeb" },
  { category: "Specialized Contexts", icon: "fas fa-shield-alt", desc: "GDPR Compliance, PII Masking, Rate Limiting (SlowAPI), Parent-Child Chunking, Web Speech API" }
];
