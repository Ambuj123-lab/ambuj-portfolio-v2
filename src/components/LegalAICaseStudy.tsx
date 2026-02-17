import React, { useState } from 'react';
import { Printer } from 'lucide-react';

/* ─── Reusable helpers ─── */
const Img: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
    <div className="my-4 overflow-hidden rounded-lg border border-[#333]">
        <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
    </div>
);
const Cap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-sm text-[#858585] italic border-l-2 border-[#C4785A] pl-3 py-1 mt-1 mb-4">{children}</p>
);
const Cd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <code className="bg-[#333] px-1 rounded text-[#C4785A] text-xs">{children}</code>
);
const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-[#161616] p-5 rounded-xl border border-[#333] hover:border-[#555] transition-colors">
        <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
        {children}
    </div>
);

const TECH_PHASE1 = ['React + Vite', 'FastAPI', 'LangChain', 'ChromaDB', 'Llama 3.3 70B', 'Jina AI Embeddings', 'DeepSeek R1 (671B)', 'Microsoft Presidio', 'spaCy', 'MongoDB Atlas', 'Upstash Redis', 'Langfuse'];
const TECH_PHASE2 = ['LangGraph', 'Qdrant Cloud', 'Supabase', 'FastAPI', 'Qwen 3 235B', 'MongoDB Atlas', 'Langfuse', 'Redis', 'React + Vite', 'Google OAuth 2.0', 'Presidio (PII)', 'spaCy'];

const TechChips: React.FC<{ items: string[] }> = ({ items }) => (
    <div className="flex flex-wrap gap-2 mt-3">
        {items.map((t) => (
            <span key={t} className="px-3 py-1.5 bg-[#252525] border border-[#333] rounded-full text-xs text-[#C4785A] font-medium">{t}</span>
        ))}
    </div>
);

/* ════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════ */
const LegalAICaseStudy: React.FC = () => {
    const [language, setLanguage] = useState<'en' | 'hi'>('en');

    return (
        <div className="case-study-root max-w-4xl mx-auto px-4 md:px-8 py-10 text-[#E0E0E0] font-sans selection:bg-[#C4785A] selection:text-white relative">

            {/* ═══ Print-Optimized Styles ═══ */}
            <style>{`
                @media print {
                    /* Reset page */
                    @page {
                        size: A4;
                        margin: 15mm 12mm 20mm 12mm;
                    }

                    /* Hide everything outside case study */
                    body > *:not(.case-study-modal-overlay) { display: none !important; }
                    .case-study-modal-overlay { position: static !important; overflow: visible !important; height: auto !important; }
                    .case-study-modal-overlay > div { position: static !important; overflow: visible !important; height: auto !important; max-height: none !important; background: white !important; }

                    /* Root container */
                    .case-study-root {
                        color: #1a1a1a !important;
                        background: white !important;
                        padding: 0 !important;
                        max-width: 100% !important;
                        font-size: 11pt !important;
                        line-height: 1.5 !important;
                    }

                    /* All text black */
                    .case-study-root * {
                        color: #1a1a1a !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    /* Headings */
                    .case-study-root h1 {
                        font-size: 22pt !important;
                        background: none !important;
                        -webkit-background-clip: unset !important;
                        background-clip: unset !important;
                        -webkit-text-fill-color: #1a1a1a !important;
                        color: #1a1a1a !important;
                        margin-bottom: 8px !important;
                        page-break-after: avoid !important;
                    }
                    .case-study-root h2 {
                        font-size: 16pt !important;
                        color: #1a1a1a !important;
                        border-bottom: 2px solid #C4785A !important;
                        padding-bottom: 4px !important;
                        margin-bottom: 12px !important;
                        page-break-after: avoid !important;
                    }
                    .case-study-root h2 span {
                        color: #C4785A !important;
                    }
                    .case-study-root h3 {
                        font-size: 13pt !important;
                        color: #1a1a1a !important;
                        page-break-after: avoid !important;
                    }

                    /* Author name keeps accent color */
                    .case-study-root p[class*="text-[#C4785A]"] {
                        color: #C4785A !important;
                    }

                    /* Body text */
                    .case-study-root p, .case-study-root li, .case-study-root span, .case-study-root div {
                        color: #333 !important;
                    }
                    .case-study-root strong {
                        color: #1a1a1a !important;
                        font-weight: 700 !important;
                    }

                    /* Cards and sections */
                    .case-study-root div[class*="bg-[#1A1A1A]"],
                    .case-study-root div[class*="bg-[#161616]"],
                    .case-study-root div[class*="bg-gradient"] {
                        background: #f8f8f8 !important;
                        border: 1px solid #ddd !important;
                        border-radius: 8px !important;
                        padding: 12px !important;
                        page-break-inside: avoid !important;
                    }
                    .case-study-root div[class*="bg-black/20"],
                    .case-study-root div[class*="bg-black"] {
                        background: #f0f0f0 !important;
                        border: 1px solid #ddd !important;
                    }

                    /* Code elements */
                    .case-study-root code {
                        background: #e8e8e8 !important;
                        color: #C4785A !important;
                        padding: 1px 4px !important;
                        border-radius: 3px !important;
                        font-size: 9pt !important;
                    }

                    /* Tech chips */
                    .case-study-root span[class*="rounded-full"] {
                        background: white !important;
                        border: 1px solid #C4785A !important;
                        color: #C4785A !important;
                        font-size: 8pt !important;
                        padding: 2px 8px !important;
                    }

                    /* Phase badges */
                    .case-study-root span[class*="bg-[#333]"] {
                        background: #555 !important;
                        color: white !important;
                        -webkit-print-color-adjust: exact !important;
                    }
                    .case-study-root span[class*="bg-[#C4785A]"] {
                        background: #C4785A !important;
                        color: white !important;
                        -webkit-print-color-adjust: exact !important;
                    }

                    /* Captions - keep accent border */
                    .case-study-root p[class*="border-l-2"] {
                        border-left: 3px solid #C4785A !important;
                        color: #666 !important;
                        font-size: 9pt !important;
                    }

                    /* Images */
                    .case-study-root img {
                        max-width: 100% !important;
                        height: auto !important;
                        page-break-inside: avoid !important;
                        border: 1px solid #ddd !important;
                        border-radius: 6px !important;
                    }
                    .case-study-root div[class*="overflow-hidden"] {
                        overflow: visible !important;
                        page-break-inside: avoid !important;
                    }

                    /* Sections - page breaks */
                    .case-study-root section {
                        page-break-before: auto !important;
                        page-break-inside: avoid !important;
                    }
                    .case-study-root section:nth-of-type(n+2) {
                        page-break-before: always !important;
                    }

                    /* Grids stay as grids */
                    .case-study-root .grid {
                        display: grid !important;
                        page-break-inside: avoid !important;
                    }

                    /* Stats numbers */
                    .case-study-root div[class*="font-mono"] {
                        color: #1a1a1a !important;
                        font-weight: 700 !important;
                    }

                    /* Footer border */
                    .case-study-root > div:last-child {
                        border-top: 1px solid #ddd !important;
                        color: #888 !important;
                    }

                    /* Lists */
                    .case-study-root ul, .case-study-root ol {
                        page-break-inside: avoid !important;
                    }

                    /* Scale grid numbers keep prominence */
                    .case-study-root div[class*="text-xs"][class*="uppercase"] {
                        color: #888 !important;
                        font-size: 8pt !important;
                    }
                }
            `}</style>

            {/* Print Watermark */}
            <div className="hidden print:flex fixed inset-0 z-[100] pointer-events-none items-center justify-center opacity-[0.06] select-none">
                <div className="transform -rotate-45 text-5xl font-bold text-black whitespace-nowrap leading-loose">
                    PROPERTY OF AMBUJ KUMAR TRIPATHI<br />DO NOT COPY OR REPRODUCE
                </div>
            </div>
            <div className="hidden print:block fixed bottom-4 left-0 right-0 text-center text-xs text-black opacity-40">
                &copy; 2026 Ambuj Kumar Tripathi | All Rights Reserved
            </div>

            {/* ═══ Controls Bar ═══ */}
            <div className="flex justify-between items-center mb-8 print:hidden sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm py-3 z-40 border-b border-[#333] -mx-4 md:-mx-8 px-4 md:px-8">
                <div className="flex items-center gap-1 bg-[#1A1A1A] rounded-lg p-1 border border-[#333]">
                    <button onClick={() => setLanguage('en')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${language === 'en' ? 'bg-[#C4785A] text-white shadow-lg' : 'text-[#858585] hover:text-white'}`}>English</button>
                    <button onClick={() => setLanguage('hi')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${language === 'hi' ? 'bg-[#C4785A] text-white shadow-lg' : 'text-[#858585] hover:text-white'}`}>Hindi</button>
                </div>
                <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-[#252525] hover:bg-[#333] rounded-lg text-sm text-white transition-colors border border-[#333]">
                    <Printer size={16} /><span className="hidden sm:inline">Print PDF</span>
                </button>
            </div>

            {/* ╔═══════════════════════════════════╗ */}
            {/* ║       ENGLISH VERSION             ║ */}
            {/* ╚═══════════════════════════════════╝ */}
            {language === 'en' && (
                <div>
                    {/* Header */}
                    <div className="mb-10 border-b border-[#333] pb-8">
                        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-[#A0A0A0] bg-clip-text text-transparent mb-4 leading-tight">
                            Building Production-Grade Legal RAG System
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                            <div>
                                <p className="text-[#C4785A] font-semibold text-lg">By Ambuj Kumar Tripathi</p>
                                <p className="text-[#858585] text-sm">AI Engineer &amp; Architect</p>
                            </div>
                            <p className="text-[#858585] text-sm italic max-w-sm">How we evolved from a 512MB RAM Chatbot to a Scalable AI Legal Assistant.</p>
                        </div>
                    </div>

                    {/* Architecture Diagram */}
                    <Img src="/projects/LegalAI_architecture.png" alt="System Architecture" />
                    <Cap>Full System Architecture: React Frontend &rarr; FastAPI Backend &rarr; LangGraph Orchestrator &rarr; Qdrant Vector DB</Cap>

                    {/* ═══ 1. EVOLUTION ═══ */}
                    <section className="mb-16 mt-12">
                        <h2 className="text-2xl font-bold text-white mb-6"><span className="text-[#C4785A] mr-2">1.</span>The Evolution: Two Projects, One Mission</h2>
                        <p className="text-lg text-[#B0B0B0] mb-8">This isn't just another RAG tutorial. This is a story of <strong className="text-white">evolution</strong> &mdash; from a resource-starved prototype to a production-grade legal AI system.</p>

                        {/* ── PHASE 1: Citizen Safety AI ── */}
                        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333] mb-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-[#333] text-white text-xs font-bold px-3 py-1 rounded">PHASE 1</span>
                                <h3 className="text-xl font-bold text-white">Citizen Safety AI &mdash; The 512MB Battlefield</h3>
                            </div>
                            <p className="text-[#B0B0B0] mb-4">Our first project was built under brutal constraints: <strong className="text-white">512MB RAM (Free Tier)</strong>, 8 government legal PDFs (Consumer Protection Act, IPC, CrPC), and zero budget for paid APIs.</p>

                            {/* What We Built */}
                            <div className="mb-6 p-4 bg-black/20 rounded-lg">
                                <p className="text-[#C4785A] font-semibold mb-3">What We Built:</p>
                                <ul className="space-y-2 text-sm text-[#B0B0B0]">
                                    <li>- Full-Stack RAG chatbot with <strong className="text-white">multi-turn conversation</strong> (sliding window: last 6 MongoDB-stored messages).</li>
                                    <li>- Indexed 8 government PDFs into <strong className="text-white">721 semantic chunks</strong> using dual-indexing architecture with metadata tagging.</li>
                                    <li>- Achieved <strong className="text-white">sub-5-second</strong> end-to-end response times and <strong className="text-white">70-85% confidence scores</strong>.</li>
                                    <li>- <strong className="text-white">Trilingual NLP</strong> (English, Hindi, Hinglish) using <strong>DeepSeek R1 (671B MoE)</strong> with automatic language detection via spaCy.</li>
                                    <li>- Automated emergency response disclaimers for critical safety scenarios (mental health, violence) with <strong className="text-white">112/100 helpline suggestions</strong>.</li>
                                </ul>
                            </div>

                            {/* Challenges & Solutions */}
                            <p className="text-[#C4785A] font-semibold mb-3">Challenges We Conquered:</p>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <Card title="Cost Optimization Strategy">
                                    <ul className="text-sm text-[#B0B0B0] space-y-2">
                                        <li>- ChromaDB vector database <strong>pre-built during deployment</strong> and persisted to disk (Pickle Serialization).</li>
                                        <li>- Evaluated <strong>Google Gemini vs Jina AI</strong> embeddings &rarr; selected <strong className="text-white">Jina</strong> for high-throughput (10M tokens quota).</li>
                                        <li>- Batched embedding with rate-limit-aware delays (<strong>15 docs/batch, 10s intervals</strong>).</li>
                                        <li>- Result: <strong className="text-white">~500K tokens</strong> at build time vs ~200 tokens/query.</li>
                                    </ul>
                                </Card>
                                <Card title="Reliability &amp; Fault Tolerance">
                                    <ul className="text-sm text-[#B0B0B0] space-y-2">
                                        <li>- <strong>Circuit Breaker</strong> (<Cd>pybreaker</Cd>): Max 5 consecutive LLM failures.</li>
                                        <li>- <strong>SlowAPI</strong> rate limiting: 20 req/min per user.</li>
                                        <li>- Exponential backoff retry (1s, 2s, 4s) for Jina AI &amp; LLM calls.</li>
                                        <li>- RESTful <Cd>/health</Cd> endpoints supporting GET/HEAD.</li>
                                    </ul>
                                </Card>
                                <Card title="Production Debugging">
                                    <ul className="text-sm text-[#B0B0B0] space-y-2">
                                        <li>- Resolved critical <strong className="text-white">ChromaDB 0.6.x telemetry deadlock</strong> (PostHog integration bug).</li>
                                        <li>- Traced root cause via Render deployment logs + <Cd>tracemalloc</Cd>.</li>
                                        <li>- Fixed by removing conflicting package, pinning <Cd>chromadb==0.4.24</Cd>, migrating to <Cd>langchain_community.vectorstores</Cd>.</li>
                                    </ul>
                                </Card>
                                <Card title="Security &amp; Privacy (GDPR)">
                                    <ul className="text-sm text-[#B0B0B0] space-y-2">
                                        <li>- <strong>OAuth 2.0 + JWT</strong> (HS256, 7-day expiry).</li>
                                        <li>- <strong>Microsoft Presidio + spaCy</strong> PII masking: custom Indian regex (Aadhaar, +91 mobile, email).</li>
                                        <li>- Regex-based profanity filter for content moderation.</li>
                                        <li>- MongoDB TTL indexes for <strong>30-day auto-deletion</strong> (GDPR compliance).</li>
                                    </ul>
                                </Card>
                            </div>

                            <Card title="Observability &amp; Analytics">
                                <ul className="text-sm text-[#B0B0B0] space-y-2">
                                    <li>- <strong>Langfuse</strong> for distributed tracing (LLM request monitoring, response latency, token usage).</li>
                                    <li>- <strong>Upstash Redis</strong> for real-time user analytics (15-min sliding window via <Cd>ZADD/ZREMRANGEBYSCORE</Cd>).</li>
                                    <li>- MongoDB feedback collection (thumbs up/down ratings, query pattern analysis).</li>
                                    <li>- Incremental Indexing: Temp PDF uploads (<Cd>is_temporary: True</Cd>), max 10 files, 50MB/session.</li>
                                </ul>
                            </Card>

                            <div className="mt-4">
                                <p className="text-[#858585] text-xs mb-2">Phase 1 Tech Stack:</p>
                                <TechChips items={TECH_PHASE1} />
                            </div>
                        </div>

                        {/* ── PHASE 2: Constitution AI Expert ── */}
                        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-6 rounded-xl border border-[#C4785A]/30">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-[#C4785A] text-white text-xs font-bold px-3 py-1 rounded">PHASE 2</span>
                                <h3 className="text-xl font-bold text-white">Constitution AI Expert &mdash; The Evolution</h3>
                                <span className="bg-[#C4785A]/20 text-[#C4785A] text-xs px-2 py-1 rounded ml-auto">PRODUCTION</span>
                            </div>
                            <p className="text-[#B0B0B0] mb-6">Taking every lesson from Phase 1, we rebuilt the entire system for the <strong className="text-white">Indian Legal Framework</strong>. Here is what changed:</p>

                            {/* What Changed - Grid */}
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-black/20 p-4 rounded-lg">
                                    <p className="text-[#858585] text-xs uppercase tracking-wider mb-1">Phase 1</p>
                                    <p className="text-white font-mono text-xl">721 <span className="text-sm text-[#858585]">chunks</span></p>
                                    <p className="text-[#858585] text-sm">8 PDFs, ChromaDB, Flat chunking</p>
                                </div>
                                <div className="bg-black/20 p-4 rounded-lg border border-[#C4785A]/20">
                                    <p className="text-[#C4785A] text-xs uppercase tracking-wider mb-1">Phase 2</p>
                                    <p className="text-white font-mono text-xl">10,833 <span className="text-sm text-[#858585]">chunks</span></p>
                                    <p className="text-[#858585] text-sm">Multiple Acts, Qdrant Cloud, Parent-Child</p>
                                </div>
                            </div>

                            {/* Scale Detail */}
                            <div className="mb-6">
                                <p className="text-white font-semibold mb-2">Scale Breakdown:</p>
                                <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-lg text-sm">
                                    <div>
                                        <div className="text-[#858585] text-xs uppercase tracking-wider">Vector DB (Qdrant Cloud)</div>
                                        <div className="text-white font-mono text-lg">8,896</div>
                                        <div className="text-[#858585]">Child Chunks (Search Optimized)</div>
                                    </div>
                                    <div>
                                        <div className="text-[#858585] text-xs uppercase tracking-wider">DocStore (Supabase)</div>
                                        <div className="text-white font-mono text-lg">1,937</div>
                                        <div className="text-[#858585]">Parent Chunks (Full Context)</div>
                                    </div>
                                </div>
                                <Img src="/projects/supabase.png" alt="Supabase Registry" />
                                <Cap>Supabase Registry Table &mdash; 1,937 Parent Chunks stored for full context retrieval.</Cap>
                            </div>

                            {/* Storage: Qdrant */}
                            <div className="mb-6">
                                <p className="text-white font-semibold mb-2">Storage: ChromaDB &rarr; Qdrant Cloud</p>
                                <p className="text-[#B0B0B0] text-sm mb-2">No more memory crashes. Cloud-native vector search with metadata payloads.</p>
                                <Img src="/projects/LegalAI_Qdrant_Console.jpg" alt="Qdrant Console" />
                                <Cap><strong>Production Payload in Qdrant.</strong> Notice <Cd>chunk_type: "child"</Cd> and <Cd>parent_chunk_index: 10</Cd>. This linkage retrieves small 400-char chunks but delivers full 2000-char context. (Engineered by <strong>Ambuj Kumar Tripathi</strong>)</Cap>
                                <Img src="/projects/metadata.jpeg" alt="Metadata Linkage" />
                                <Cap>Metadata linkage showing parent-child relationship in vector payloads.</Cap>
                            </div>

                            {/* Knowledge Graph */}
                            <div className="mb-6">
                                <p className="text-white font-semibold mb-2">Knowledge Graph Visualization</p>
                                <Img src="/projects/vector graph.jpeg" alt="Knowledge Graph" />
                                <Cap>Knowledge Graph: Central nodes connected to child nodes representing the Constitution&apos;s structure.</Cap>
                            </div>

                            {/* Key Upgrades list */}
                            <div className="bg-black/20 p-4 rounded-lg">
                                <p className="text-[#C4785A] font-semibold mb-3">Key Upgrades from Phase 1:</p>
                                <ul className="space-y-2 text-sm text-[#B0B0B0]">
                                    <li>- <strong className="text-white">Orchestration:</strong> Simple Chains &rarr; <strong>LangGraph</strong> (Cyclic reasoning, state machines).</li>
                                    <li>- <strong className="text-white">Chunking:</strong> Flat chunking &rarr; <strong>Parent-Child Chunking</strong> (2000-char parents, 400-char children).</li>
                                    <li>- <strong className="text-white">Storage:</strong> Local ChromaDB &rarr; <strong>Qdrant Cloud</strong> + <strong>Supabase</strong> DocStore.</li>
                                    <li>- <strong className="text-white">LLM:</strong> Llama 3.3 70B &rarr; <strong>Qwen 3 235B</strong> (larger context window).</li>
                                    <li>- <strong className="text-white">Retrieval:</strong> Top-3 &rarr; <strong>Top-15 High-Recall</strong> with deduplication.</li>
                                    <li>- <strong className="text-white">Sync Engine:</strong> SHA-256 hash-based incremental sync.</li>
                                    <li>- <strong className="text-white">Streaming:</strong> Server-Sent Events (SSE) for real-time response.</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <p className="text-[#858585] text-xs mb-2">Phase 2 Tech Stack:</p>
                                <TechChips items={TECH_PHASE2} />
                            </div>
                        </div>
                    </section>

                    {/* ═══ 2. CHALLENGES (Phase 2 specific) ═══ */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-8"><span className="text-[#C4785A] mr-2">2.</span>Phase 2: Core Engineering Challenges</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card title='#1 "Lost in Middle" Problem'>
                                <p className="text-[#B0B0B0] text-sm mb-2"><strong>Problem:</strong> Small chunks of the Constitution lost context. AI gave fragmented answers.</p>
                                <p className="text-[#B0B0B0] text-sm"><strong>Solution:</strong> <strong className="text-[#C4785A]">Parent-Child Chunking</strong>. Parents: 2000-char (full context), Children: 400-char (precise search). Accuracy: <strong className="text-white">60% &rarr; 92%</strong>.</p>
                            </Card>
                            <Card title="#2 High-Recall Retrieval">
                                <p className="text-[#B0B0B0] text-sm mb-2"><strong>Problem:</strong> Standard Top-3 retrieval missed related legal clauses and provisos.</p>
                                <p className="text-[#B0B0B0] text-sm"><strong>Solution:</strong> <strong className="text-[#C4785A]">Top-15 Child Chunks</strong> with deduplication. 15 small child chunks map to ~3-4 unique parent sections. Legal domain demands high recall.</p>
                            </Card>
                            <Card title="#3 Multi-Turn Memory">
                                <p className="text-[#B0B0B0] text-sm mb-2"><strong>Problem:</strong> Users ask follow-ups (&quot;What is the punishment for that?&quot;).</p>
                                <p className="text-[#B0B0B0] text-sm"><strong>Solution:</strong> <strong className="text-[#C4785A]">MongoDB Atlas + Sliding Window</strong>. Last 6 messages stored. Feedback loop (&quot;Was this helpful?&quot;) for RLHF data.</p>
                            </Card>
                            <Card title="#4 Sync Engine">
                                <p className="text-[#B0B0B0] text-sm mb-2"><strong>Problem:</strong> Re-indexing entire corpus on every update is wasteful.</p>
                                <p className="text-[#B0B0B0] text-sm"><strong>Solution:</strong> <strong className="text-[#C4785A]">SHA-256 Hash-Based Sync</strong>. Only changed documents get re-indexed. Zero redundant embedding API calls.</p>
                            </Card>
                        </div>
                    </section>

                    {/* ═══ 3. SECURITY ═══ */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6"><span className="text-[#C4785A] mr-2">3.</span>Enterprise Security &amp; Privacy</h2>
                        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333]">
                            <p className="text-[#B0B0B0] mb-4">We treated this like a banking app, not a demo.</p>
                            <ul className="list-disc list-outside ml-6 space-y-3 text-[#B0B0B0]">
                                <li><strong className="text-white">Auth:</strong> Google OAuth 2.0 + JWT (HS256, 7-day session).</li>
                                <li><strong className="text-white">PII Masking:</strong> <strong>Microsoft Presidio + spaCy</strong> (<Cd>en_core_web_sm</Cd>) detects and masks Indian Phone Numbers (<Cd>+91...</Cd>), Aadhaar, and Names <strong>before the LLM sees them</strong>.</li>
                                <li><strong className="text-white">Incremental Indexing:</strong> User-uploaded PDFs tagged <Cd>is_temporary=True</Cd>. Auto-deleted on logout. Core &quot;Brain&quot; stays untouched.</li>
                            </ul>
                            <div className="mt-6 grid md:grid-cols-2 gap-4">
                                <div>
                                    <Img src="/projects/Presidio.png" alt="Presidio Pipeline" />
                                    <Cap>Presidio PII Detection Pipeline &mdash; Entities masked before reaching the LLM.</Cap>
                                </div>
                                <div>
                                    <Img src="/projects/PII Compliance.jpeg" alt="PII Compliance" />
                                    <Cap>PII Compliance Dashboard &mdash; Real-time masking status.</Cap>
                                </div>
                            </div>
                            <Img src="/projects/presision.jpeg" alt="Precision Metrics" />
                            <Cap>Precision metrics for PII entity detection (Phone, Aadhaar, Names).</Cap>
                        </div>
                    </section>

                    {/* ═══ 4. ARCHITECTURE DEEP DIVE ═══ */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6"><span className="text-[#C4785A] mr-2">4.</span>Architecture Deep Dive</h2>
                        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333]">
                            <ol className="list-decimal list-outside ml-6 space-y-3 text-[#B0B0B0]">
                                <li><strong className="text-white">Ingestion:</strong> User uploads PDF &rarr; <strong>Unstructured.io</strong> parses &rarr; <strong>Parent-Child Splitter</strong>.</li>
                                <li><strong className="text-white">Storage:</strong> Child Vectors &rarr; <strong>Qdrant Cloud</strong>; Parent Metadata &rarr; <strong>Supabase</strong>.</li>
                                <li><strong className="text-white">Retrieval:</strong> <strong>Hybrid Search</strong> (Keyword + Semantic) &rarr; Top-15 children &rarr; Deduplicated parents.</li>
                                <li><strong className="text-white">Guardrails:</strong> PII Masking &rarr; LLM (Qwen 3 235B) &rarr; Output Validation.</li>
                            </ol>
                        </div>
                    </section>

                    {/* ═══ 5. OBSERVABILITY ═══ */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6"><span className="text-[#C4785A] mr-2">5.</span>Observability &amp; Tracing</h2>
                        <Img src="/projects/langfuse.png" alt="Langfuse Tracing" />
                        <Cap>Langfuse Distributed Tracing &mdash; Visualizing a RAG trace: Retrieval ~200ms, Generation ~1.2s.</Cap>
                    </section>

                    {/* ═══ 6. CONCLUSION ═══ */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6"><span className="text-[#C4785A] mr-2">6.</span>Conclusion &amp; Future Roadmap</h2>
                        <p className="text-[#B0B0B0] mb-4">This project proves that <strong className="text-white">Vertical AI</strong> (Specialized AI) is the future. By combining <strong>LangGraph&apos;s reasoning</strong> with <strong>Qdrant&apos;s speed</strong>, we can democratize legal access in India.</p>
                        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333]">
                            <p className="text-white font-semibold mb-3">Next Steps:</p>
                            <ul className="list-disc list-outside ml-6 space-y-2 text-[#B0B0B0]">
                                <li>Adding <strong>Voice Mode</strong> (Audio-to-Text).</li>
                                <li><strong>Multi-lingual Support</strong> (Hindi/Tamil legal docs).</li>
                            </ul>
                        </div>
                    </section>
                </div>
            )}

            {/* ╔═══════════════════════════════════╗ */}
            {/* ║       HINDI VERSION (MIRROR)      ║ */}
            {/* ╚═══════════════════════════════════╝ */}
            {language === 'hi' && (
                <div>
                    {/* Header */}
                    <div className="mb-10 border-b border-[#333] pb-8">
                        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-[#A0A0A0] bg-clip-text text-transparent mb-4 leading-tight">
                            Production-Grade Legal RAG System
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                            <div>
                                <p className="text-[#C4785A] font-semibold text-lg">By Ambuj Kumar Tripathi</p>
                                <p className="text-[#858585] text-sm">AI Engineer &amp; Architect</p>
                            </div>
                            <p className="text-[#858585] text-sm italic max-w-sm">512MB RAM के Chatbot से Scalable AI Legal Assistant तक का सफर।</p>
                        </div>
                    </div>

                    {/* Architecture Diagram */}
                    <Img src="/projects/LegalAI_architecture.png" alt="System Architecture" />
                    <Cap>Full System Architecture: React Frontend &rarr; FastAPI Backend &rarr; LangGraph Orchestrator &rarr; Qdrant Vector DB</Cap>

                    {/* ═══ 1. सफर ═══ */}
                    <section className="mb-16 mt-12">
                        <h2 className="text-2xl font-bold text-white mb-6"><span className="text-[#C4785A] mr-2">1.</span>हमारा सफर: दो प्रोजेक्ट्स, एक मिशन</h2>
                        <p className="text-lg text-[#B0B0B0] mb-8">यह सिर्फ एक ट्यूटोरियल नहीं, बल्कि एक <strong className="text-white">Evolution</strong> की कहानी है &mdash; एक resource-starved prototype से production-grade legal AI system तक।</p>

                        {/* ── PHASE 1: Citizen Safety AI ── */}
                        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333] mb-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-[#333] text-white text-xs font-bold px-3 py-1 rounded">PHASE 1</span>
                                <h3 className="text-xl font-bold text-white">Citizen Safety AI &mdash; 512MB का युद्धक्षेत्र</h3>
                            </div>
                            <p className="text-[#B0B0B0] mb-4">पहला प्रोजेक्ट बहुत कठिन परिस्थितियों में बना: <strong className="text-white">512MB RAM (Free Tier)</strong>, 8 सरकारी कानूनी PDFs (Consumer Protection Act, IPC, CrPC), और paid APIs का बजट शून्य।</p>

                            {/* What We Built */}
                            <div className="mb-6 p-4 bg-black/20 rounded-lg">
                                <p className="text-[#C4785A] font-semibold mb-3">हमने क्या बनाया:</p>
                                <ul className="space-y-2 text-sm text-[#B0B0B0]">
                                    <li>- Full-Stack RAG chatbot &mdash; <strong className="text-white">multi-turn conversation</strong> (sliding window: last 6 MongoDB-stored messages).</li>
                                    <li>- 8 सरकारी PDFs को <strong className="text-white">721 semantic chunks</strong> में index किया (dual-indexing + metadata tagging).</li>
                                    <li>- <strong className="text-white">5 सेकंड से कम</strong> response time और <strong className="text-white">70-85% confidence scores</strong> हासिल किए।</li>
                                    <li>- <strong className="text-white">Trilingual NLP</strong> (English, Hindi, Hinglish) &mdash; <strong>DeepSeek R1 (671B MoE)</strong> से automatic language detection via spaCy.</li>
                                    <li>- Critical safety scenarios (mental health, violence) के लिए automated emergency disclaimers + <strong className="text-white">112/100 helpline suggestions</strong>.</li>
                                </ul>
                            </div>

                            {/* Challenges */}
                            <p className="text-[#C4785A] font-semibold mb-3">चैलेंजेज और समाधान:</p>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <Card title="Cost Optimization Strategy">
                                    <ul className="text-sm text-[#B0B0B0] space-y-2">
                                        <li>- ChromaDB को <strong>deployment के दौरान pre-build</strong> करके disk पर persist किया (Pickle Serialization).</li>
                                        <li>- <strong>Google Gemini vs Jina AI</strong> embeddings evaluate किए &rarr; <strong className="text-white">Jina</strong> select किया (10M tokens quota).</li>
                                        <li>- Batched embedding: Rate-limit-aware delays (<strong>15 docs/batch, 10s intervals</strong>).</li>
                                        <li>- Result: Build time पर <strong className="text-white">~5 लाख tokens</strong> vs query पर ~200 tokens.</li>
                                    </ul>
                                </Card>
                                <Card title="Reliability &amp; Fault Tolerance">
                                    <ul className="text-sm text-[#B0B0B0] space-y-2">
                                        <li>- <strong>Circuit Breaker</strong> (<Cd>pybreaker</Cd>): Max 5 consecutive LLM failures.</li>
                                        <li>- <strong>SlowAPI</strong> rate limiting: 20 req/min per user.</li>
                                        <li>- Exponential backoff retry (1s, 2s, 4s) Jina AI &amp; LLM calls के लिए।</li>
                                        <li>- RESTful <Cd>/health</Cd> endpoints (GET/HEAD support).</li>
                                    </ul>
                                </Card>
                                <Card title="Production Debugging">
                                    <ul className="text-sm text-[#B0B0B0] space-y-2">
                                        <li>- Critical <strong className="text-white">ChromaDB 0.6.x telemetry deadlock</strong> (PostHog bug) resolve किया।</li>
                                        <li>- Render deployment logs + <Cd>tracemalloc</Cd> से root cause trace किया।</li>
                                        <li>- Fix: Conflicting package हटाया, <Cd>chromadb==0.4.24</Cd> pin किया, <Cd>langchain_community.vectorstores</Cd> पर migrate किया।</li>
                                    </ul>
                                </Card>
                                <Card title="Security &amp; Privacy (GDPR)">
                                    <ul className="text-sm text-[#B0B0B0] space-y-2">
                                        <li>- <strong>OAuth 2.0 + JWT</strong> (HS256, 7-day expiry).</li>
                                        <li>- <strong>Microsoft Presidio + spaCy</strong> PII masking: custom Indian regex (Aadhaar, +91, email).</li>
                                        <li>- Regex-based profanity filter (content moderation).</li>
                                        <li>- MongoDB TTL indexes &mdash; <strong>30-day auto-deletion</strong> (GDPR compliance).</li>
                                    </ul>
                                </Card>
                            </div>

                            <Card title="Observability &amp; Analytics">
                                <ul className="text-sm text-[#B0B0B0] space-y-2">
                                    <li>- <strong>Langfuse</strong> &mdash; distributed tracing (LLM request monitoring, response latency, token usage).</li>
                                    <li>- <strong>Upstash Redis</strong> &mdash; real-time user analytics (15-min sliding window, <Cd>ZADD/ZREMRANGEBYSCORE</Cd>).</li>
                                    <li>- MongoDB feedback collection (thumbs up/down, query pattern analysis).</li>
                                    <li>- Incremental Indexing: Temp PDF uploads (<Cd>is_temporary: True</Cd>), max 10 files, 50MB/session.</li>
                                </ul>
                            </Card>

                            <div className="mt-4">
                                <p className="text-[#858585] text-xs mb-2">Phase 1 Tech Stack:</p>
                                <TechChips items={TECH_PHASE1} />
                            </div>
                        </div>

                        {/* ── PHASE 2: Constitution AI Expert ── */}
                        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-6 rounded-xl border border-[#C4785A]/30">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-[#C4785A] text-white text-xs font-bold px-3 py-1 rounded">PHASE 2</span>
                                <h3 className="text-xl font-bold text-white">Constitution AI Expert &mdash; The Evolution</h3>
                                <span className="bg-[#C4785A]/20 text-[#C4785A] text-xs px-2 py-1 rounded ml-auto">PRODUCTION</span>
                            </div>
                            <p className="text-[#B0B0B0] mb-6">Phase 1 के हर सबक को लेकर, हमने पूरा system <strong className="text-white">Indian Legal Framework</strong> के लिए rebuild किया। यहाँ बताया गया है क्या बदला:</p>

                            {/* Comparison Grid */}
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-black/20 p-4 rounded-lg">
                                    <p className="text-[#858585] text-xs uppercase tracking-wider mb-1">Phase 1</p>
                                    <p className="text-white font-mono text-xl">721 <span className="text-sm text-[#858585]">chunks</span></p>
                                    <p className="text-[#858585] text-sm">8 PDFs, ChromaDB, Flat chunking</p>
                                </div>
                                <div className="bg-black/20 p-4 rounded-lg border border-[#C4785A]/20">
                                    <p className="text-[#C4785A] text-xs uppercase tracking-wider mb-1">Phase 2</p>
                                    <p className="text-white font-mono text-xl">10,833 <span className="text-sm text-[#858585]">chunks</span></p>
                                    <p className="text-[#858585] text-sm">Multiple Acts, Qdrant Cloud, Parent-Child</p>
                                </div>
                            </div>

                            {/* Scale Detail */}
                            <div className="mb-6">
                                <p className="text-white font-semibold mb-2">Scale Breakdown:</p>
                                <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-lg text-sm">
                                    <div>
                                        <div className="text-[#858585] text-xs uppercase tracking-wider">Vector DB (Qdrant Cloud)</div>
                                        <div className="text-white font-mono text-lg">8,896</div>
                                        <div className="text-[#858585]">Child Chunks (Search Optimized)</div>
                                    </div>
                                    <div>
                                        <div className="text-[#858585] text-xs uppercase tracking-wider">DocStore (Supabase)</div>
                                        <div className="text-white font-mono text-lg">1,937</div>
                                        <div className="text-[#858585]">Parent Chunks (Full Context)</div>
                                    </div>
                                </div>
                                <Img src="/projects/supabase.png" alt="Supabase Registry" />
                                <Cap>Supabase Registry Table &mdash; 1,937 Parent Chunks full context retrieval के लिए store किए गए।</Cap>
                            </div>

                            {/* Qdrant */}
                            <div className="mb-6">
                                <p className="text-white font-semibold mb-2">Storage: ChromaDB &rarr; Qdrant Cloud</p>
                                <p className="text-[#B0B0B0] text-sm mb-2">अब memory crashes नहीं होते। Cloud-native vector search with metadata payloads.</p>
                                <Img src="/projects/LegalAI_Qdrant_Console.jpg" alt="Qdrant Console" />
                                <Cap><strong>Qdrant Production Payload.</strong> <Cd>chunk_type: "child"</Cd> और <Cd>parent_chunk_index: 10</Cd> &mdash; यह metadata linkage 400-char search chunks को 2000-char full context से जोड़ता है। (Engineered by <strong>Ambuj Kumar Tripathi</strong>)</Cap>
                                <Img src="/projects/metadata.jpeg" alt="Metadata Linkage" />
                                <Cap>Metadata linkage &mdash; Parent-Child relationship vector payloads में।</Cap>
                            </div>

                            {/* Knowledge Graph */}
                            <div className="mb-6">
                                <p className="text-white font-semibold mb-2">Knowledge Graph Visualization</p>
                                <Img src="/projects/vector graph.jpeg" alt="Knowledge Graph" />
                                <Cap>Knowledge Graph: संविधान की संरचना &mdash; Central nodes connected to child nodes.</Cap>
                            </div>

                            {/* Key Upgrades */}
                            <div className="bg-black/20 p-4 rounded-lg">
                                <p className="text-[#C4785A] font-semibold mb-3">Phase 1 से Key Upgrades:</p>
                                <ul className="space-y-2 text-sm text-[#B0B0B0]">
                                    <li>- <strong className="text-white">Orchestration:</strong> Simple Chains &rarr; <strong>LangGraph</strong> (Cyclic reasoning, state machines).</li>
                                    <li>- <strong className="text-white">Chunking:</strong> Flat chunking &rarr; <strong>Parent-Child Chunking</strong> (2000-char parents, 400-char children).</li>
                                    <li>- <strong className="text-white">Storage:</strong> Local ChromaDB &rarr; <strong>Qdrant Cloud</strong> + <strong>Supabase</strong> DocStore.</li>
                                    <li>- <strong className="text-white">LLM:</strong> Llama 3.3 70B &rarr; <strong>Qwen 3 235B</strong> (larger context window).</li>
                                    <li>- <strong className="text-white">Retrieval:</strong> Top-3 &rarr; <strong>Top-15 High-Recall</strong> with deduplication.</li>
                                    <li>- <strong className="text-white">Sync Engine:</strong> SHA-256 hash-based incremental sync.</li>
                                    <li>- <strong className="text-white">Streaming:</strong> Server-Sent Events (SSE) for real-time response.</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <p className="text-[#858585] text-xs mb-2">Phase 2 Tech Stack:</p>
                                <TechChips items={TECH_PHASE2} />
                            </div>
                        </div>
                    </section>

                    {/* ═══ 2. Phase 2 Challenges ═══ */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-8"><span className="text-[#C4785A] mr-2">2.</span>Phase 2: Core Engineering Challenges</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card title='#1 "Lost in Middle" Problem'>
                                <p className="text-[#B0B0B0] text-sm mb-2"><strong>दिक्कत:</strong> संविधान के छोटे chunks में AI context खो देता था।</p>
                                <p className="text-[#B0B0B0] text-sm"><strong>समाधान:</strong> <strong className="text-[#C4785A]">Parent-Child Chunking</strong>. Parents: 2000-char, Children: 400-char. Accuracy: <strong className="text-white">60% &rarr; 92%</strong>.</p>
                            </Card>
                            <Card title="#2 High-Recall Retrieval">
                                <p className="text-[#B0B0B0] text-sm mb-2"><strong>दिक्कत:</strong> Standard Top-3 retrieval related legal clauses miss कर देता था।</p>
                                <p className="text-[#B0B0B0] text-sm"><strong>समाधान:</strong> <strong className="text-[#C4785A]">Top-15 Child Chunks</strong> with deduplication. Legal domain में high recall ज़रूरी है।</p>
                            </Card>
                            <Card title="#3 Multi-Turn Memory">
                                <p className="text-[#B0B0B0] text-sm mb-2"><strong>दिक्कत:</strong> Users follow-up पूछते हैं (&quot;उसकी सज़ा क्या है?&quot;).</p>
                                <p className="text-[#B0B0B0] text-sm"><strong>समाधान:</strong> <strong className="text-[#C4785A]">MongoDB Atlas + Sliding Window</strong>. Last 6 messages store. Feedback loop for RLHF.</p>
                            </Card>
                            <Card title="#4 Sync Engine">
                                <p className="text-[#B0B0B0] text-sm mb-2"><strong>दिक्कत:</strong> हर update पर पूरा corpus re-index करना wasteful था।</p>
                                <p className="text-[#B0B0B0] text-sm"><strong>समाधान:</strong> <strong className="text-[#C4785A]">SHA-256 Hash-Based Sync</strong>. सिर्फ बदले हुए documents re-index होते हैं।</p>
                            </Card>
                        </div>
                    </section>

                    {/* ═══ 3. Security ═══ */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6"><span className="text-[#C4785A] mr-2">3.</span>Enterprise Security &amp; Privacy</h2>
                        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333]">
                            <p className="text-[#B0B0B0] mb-4">हमने इसे banking app की तरह treat किया, demo की तरह नहीं।</p>
                            <ul className="list-disc list-outside ml-6 space-y-3 text-[#B0B0B0]">
                                <li><strong className="text-white">Auth:</strong> Google OAuth 2.0 + JWT (HS256, 7-day session).</li>
                                <li><strong className="text-white">PII Masking:</strong> <strong>Microsoft Presidio + spaCy</strong> (<Cd>en_core_web_sm</Cd>) &mdash; यूजर के फोन नंबर (<Cd>+91...</Cd>), आधार, और नाम को <strong>LLM से पहले mask</strong> करता है।</li>
                                <li><strong className="text-white">Incremental Indexing:</strong> User-uploaded PDFs (<Cd>is_temporary=True</Cd>) लॉगआउट पर auto-delete। Core &quot;Brain&quot; सुरक्षित रहता है।</li>
                            </ul>
                            <div className="mt-6 grid md:grid-cols-2 gap-4">
                                <div>
                                    <Img src="/projects/Presidio.png" alt="Presidio Pipeline" />
                                    <Cap>Presidio PII Detection Pipeline &mdash; Entities को LLM तक पहुँचने से पहले mask करता है।</Cap>
                                </div>
                                <div>
                                    <Img src="/projects/PII Compliance.jpeg" alt="PII Compliance" />
                                    <Cap>PII Compliance Dashboard &mdash; Real-time masking status.</Cap>
                                </div>
                            </div>
                            <Img src="/projects/presision.jpeg" alt="Precision Metrics" />
                            <Cap>PII Entity Detection Precision Metrics (Phone, Aadhaar, Names).</Cap>
                        </div>
                    </section>

                    {/* ═══ 4. Architecture Deep Dive ═══ */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6"><span className="text-[#C4785A] mr-2">4.</span>Architecture Deep Dive</h2>
                        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333]">
                            <ol className="list-decimal list-outside ml-6 space-y-3 text-[#B0B0B0]">
                                <li><strong className="text-white">Ingestion:</strong> User PDF upload करता है &rarr; <strong>Unstructured.io</strong> parse करता है &rarr; <strong>Parent-Child Splitter</strong>.</li>
                                <li><strong className="text-white">Storage:</strong> Child Vectors &rarr; <strong>Qdrant Cloud</strong>; Parent Metadata &rarr; <strong>Supabase</strong>.</li>
                                <li><strong className="text-white">Retrieval:</strong> <strong>Hybrid Search</strong> (Keyword + Semantic) &rarr; Top-15 children &rarr; Deduplicated parents.</li>
                                <li><strong className="text-white">Guardrails:</strong> PII Masking &rarr; LLM (Qwen 3 235B) &rarr; Output Validation.</li>
                            </ol>
                        </div>
                    </section>

                    {/* ═══ 5. Observability ═══ */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6"><span className="text-[#C4785A] mr-2">5.</span>Observability &amp; Tracing</h2>
                        <Img src="/projects/langfuse.png" alt="Langfuse Tracing" />
                        <Cap>Langfuse Distributed Tracing &mdash; RAG trace: Retrieval ~200ms, Generation ~1.2s.</Cap>
                    </section>

                    {/* ═══ 6. Conclusion ═══ */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6"><span className="text-[#C4785A] mr-2">6.</span>Conclusion &amp; Future Roadmap</h2>
                        <p className="text-[#B0B0B0] mb-4">यह प्रोजेक्ट साबित करता है कि <strong className="text-white">Vertical AI</strong> (Specialized AI) ही भविष्य है। <strong>LangGraph की reasoning</strong> और <strong>Qdrant की speed</strong> को मिलाकर, हम भारत में legal access को democratize कर सकते हैं।</p>
                        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333]">
                            <p className="text-white font-semibold mb-3">अगले कदम:</p>
                            <ul className="list-disc list-outside ml-6 space-y-2 text-[#B0B0B0]">
                                <li><strong>Voice Mode</strong> (Audio-to-Text) जोड़ना।</li>
                                <li><strong>Multi-lingual Support</strong> (Hindi/Tamil legal docs).</li>
                            </ul>
                        </div>
                    </section>
                </div>
            )}

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-[#333] text-center text-[#858585] text-sm italic print:text-black">
                &copy; 2026 Ambuj Kumar Tripathi. All rights reserved. | Indian Legal AI Framework
            </div>
        </div>
    );
};

export default LegalAICaseStudy;
