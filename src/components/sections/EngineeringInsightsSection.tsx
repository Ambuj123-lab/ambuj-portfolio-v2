import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface EngineeringInsightsSectionProps {
  onOpenArchitecture: (src: string) => void;
}

export default function EngineeringInsightsSection({ onOpenArchitecture }: EngineeringInsightsSectionProps) {
  return (
    <section className="py-24 px-6 bg-[var(--obsidian)] relative" id="blog">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-16">
          <div>
            <p className="font-mono text-[var(--orange)] uppercase tracking-[0.2em] text-xs mb-4">
              [SYSTEM.DOCUMENTATION]
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-white">
              Engineering<br />Insights
            </h2>
          </div>
          <p className="max-w-xl text-sm md:text-base font-mono text-[var(--zinc-muted)]">
            Architectural decisions, observability patterns, and hard-earned lessons from production deployments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Articles */}
          <div className="flex flex-col gap-6">
            {[
              {
                id: 1,
                category: "RAG Systems",
                title: "Trust but Verify: Designing Reliable RAG Architectures",
                content: "Production lessons from building enterprise-grade RAG systems with hallucination control, exact source citations, circuit breakers, rate-limit–aware embeddings, and real-time PII masking. Focused on reliability, observability, and compliance-first AI design.",
                cta: "Analyze System Output",
                link: "https://indian-legal-ai-expert.onrender.com/"
              },
              {
                id: 2,
                category: "Observability",
                title: "Trust Through Transparency: Real-Time System Monitoring",
                content: "Live production monitoring dashboard tracking uptime percentages, response times, incident history, and service health across deployed applications. Demonstrates commitment to reliability engineering, observability, and transparent incident management.",
                cta: "View Telemetry Stream",
                link: "https://stats.uptimerobot.com/4tYmSQnuBE"
              }
            ].map((post) => (
              <motion.article 
                key={post.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-[#0a0a0a] border border-[var(--glass-border)] hover:border-[var(--orange)] active:border-[var(--orange)] transition-colors p-8"
              >
                <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center border-l border-b border-[var(--glass-border)] group-hover:bg-[var(--orange)] group-hover:border-[var(--orange)] transition-colors">
                  <ArrowRight size={14} className="text-[var(--zinc-muted)] group-hover:text-white transition-colors" />
                </div>
                
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--orange)] mb-4 block">
                  [{post.category}]
                </span>
                
                <h3 className="text-xl sm:text-2xl font-display mb-4 text-white group-hover:text-[var(--orange)] transition-colors">
                  {post.title}
                </h3>
                
                <p className="mb-8 text-sm font-mono text-[var(--zinc-muted)] leading-relaxed">
                  {post.content}
                </p>
                
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white border-b border-[var(--orange)] pb-1 hover:text-[var(--orange)] transition-colors"
                >
                  {post.cta}
                </a>
              </motion.article>
            ))}
          </div>

          {/* Right Column: Sticky Architecture Diagram */}
          <div className="lg:sticky lg:top-24 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer bg-[#050505] border border-[var(--glass-border)] hover:border-[var(--orange)] active:border-[var(--orange)] transition-all"
              onClick={() => onOpenArchitecture('/projects/LegalAI_architecture_animated.svg')}
            >
              <div className="p-4 border-b border-[var(--glass-border)] flex items-center justify-between bg-[#0a0a0a]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-[var(--zinc-muted)]">
                    LegalAI_Architecture.svg
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--orange)] opacity-0 group-hover:opacity-100 transition-opacity">
                  [EXPAND]
                </span>
              </div>
              
              <div className="aspect-[4/3] w-full flex items-center justify-center p-4 relative grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-700">
                <img
                  src="/projects/LegalAI_architecture_animated.svg"
                  alt="Legal AI Production Architecture"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
