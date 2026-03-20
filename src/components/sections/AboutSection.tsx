import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { SKILLS_LIST } from '../../constants';

interface AboutSectionProps {
  onOpenPWA: () => void;
  isDarkMode: boolean; // Keep for compatibility if needed, though we force dark mostly
}

export default function AboutSection({ onOpenPWA }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = "GenAI Engineer and RAG Systems Specialist with expertise in Domain-Driven Design production-grade RAG systems, commercial-grade LLM optimization, and LLMOps. Leveraging 5+ years of technical experience in Telecom and Tech sectors to build GDPR-compliant, fault-tolerant AI solutions. Successfully transitioned from legacy automation frameworks to GenAI-driven architectures, managing publicly deployed full-stack RAG chatbots processing 10,833 total chunks (8,896 child chunk embeddings stored as 768-dimensional vectors in Qdrant Cloud and 1,937 parent chunks stored as text in Supabase) across 6 Indian legal acts with Langfuse observability, Redis real-time analytics, and Circuit Breaker patterns to ensure high-availability and system resilience. Optimized retrieval precision by implementing parent-child chunking strategy and normalized confidence scoring to ensure transparent and reliable document matching.";
  
  const previewText = "GenAI Engineer and RAG Systems Specialist with expertise in Domain-Driven Design production-grade RAG systems, commercial-grade LLM optimization, and LLMOps. Leveraging 5+ years of technical experience in Telecom and Tech sectors to build GDPR-compliant, fault-tolerant AI solutions...";

  return (
    <section className="py-24 px-6 bg-[var(--obsidian)] relative" id="about">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-[var(--orange)] uppercase tracking-[0.2em] text-xs mb-4">
              [SYSTEM.IDENTITY]
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
              Architecting<br />Intelligent Systems
            </h2>
          </div>
          <div className="space-y-6 leading-relaxed text-[var(--zinc-muted)] font-mono text-sm md:text-base">
            <p className="text-white text-lg font-sans">
              I'm an AI Engineer & Full Stack Developer obsessed with elegant architecture and raw performance.
            </p>
            <div className="relative">
              <p className="text-[var(--zinc-muted)] font-mono text-sm leading-relaxed mb-4">
                {isExpanded ? fullText : previewText}
              </p>
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-[var(--orange)] hover:text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                {isExpanded ? "[- SHOW LESS]" : "[+ READ MORE]"}
              </button>
            </div>
            <button 
              onClick={onOpenPWA} 
              className="mt-8 bg-[var(--obsidian)] border border-[var(--glass-border)] text-[var(--zinc-muted)] hover:text-[var(--orange)] hover:border-[var(--orange)] px-6 py-4 font-mono flex items-center gap-3 transition-colors uppercase tracking-widest text-xs"
            >
              Analyze Portfolio Architecture
              <ChevronRight size={16} className="text-[var(--orange)]" />
            </button>
          </div>
        </div>

        {/* Brutalist Stats Counter */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { number: 8, suffix: '+', label: 'AI Projects Deployed', id: 'ai-projects' },
            { number: 15, suffix: '+', label: 'Technical Certifications', id: 'certs' },
            { number: 5, suffix: '+', label: 'Years Engineering Exp', id: 'exp' },
           ].map((stat, index) => (
            <div key={index} className="bg-[#050505] p-8 md:p-12 border border-[var(--glass-border)] hover:border-[var(--orange)] active:border-[var(--orange)] transition-colors flex flex-col items-center justify-center text-center group">
              <motion.span
                className="text-5xl md:text-7xl font-display font-black text-white group-hover:text-[var(--orange)] transition-colors block mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {stat.number}{stat.suffix}
              </motion.span>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--zinc-muted)] font-mono text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="mt-24">
          <p className="font-mono text-[var(--orange)] uppercase tracking-[0.2em] text-xs mb-8 text-center bg-[#0a0a0a] inline-block px-4 py-2 border border-[var(--glass-border)]">
            [CORE.COMPETENCIES]
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS_LIST.map((skill, index) => (
              <div 
                key={index} 
                className="group border border-[var(--glass-border)] bg-[#0a0a0a] p-6 hover:border-[var(--orange)] active:border-[var(--orange)] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--orange)] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-[var(--orange)] text-xs">{(index + 1).toString().padStart(2, '0')}</span>
                  <i className={`${skill.icon} text-2xl text-[var(--zinc-muted)] group-hover:text-white transition-colors`}></i>
                </div>
                <h4 className="font-display text-xl mb-3 text-white">{skill.category}</h4>
                <p className="font-mono text-xs text-[var(--zinc-muted)] leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
