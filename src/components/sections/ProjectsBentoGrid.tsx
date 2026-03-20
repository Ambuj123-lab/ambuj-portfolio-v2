import { motion } from 'framer-motion';
import type { Project } from '../../types';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectsBentoGridProps {
  projects: Project[];
  isDarkMode: boolean;
  onOpenCaseStudy: (id: string) => void;
  onOpenArchitecture: (src: string) => void;
}

export default function ProjectsBentoGrid({
  projects,
  onOpenCaseStudy,
  onOpenArchitecture
}: ProjectsBentoGridProps) {
  
  // Custom bento grid sizing logic
  const getBentoClasses = (index: number) => {
    // Top 2 projects (like LegalAI and CitizenSafety) take more space
    if (index === 0) return "md:col-span-2 md:row-span-2";
    if (index === 1) return "md:col-span-2";
    if (index === 2) return "md:col-span-1 md:row-span-2";
    if (index === 3) return "md:col-span-1";
    // Everything else standard
    return "md:col-span-1";
  };

  return (
    <section className="py-24 px-6 bg-[var(--obsidian)] relative" id="work">

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <p className="font-mono text-[var(--orange)] uppercase tracking-[0.2em] text-xs mb-4">
            Selected Work [System Blueprints]
          </p>
          <h2 className="text-5xl md:text-6xl font-display text-white">
            Engineering<br />Impact.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
              whileHover="hover"
              className={`group relative overflow-hidden bg-[#050505] border border-[var(--glass-border)] hover:border-[var(--orange)] active:border-[var(--orange)] flex flex-col justify-end transition-all duration-300 ${getBentoClasses(index)}`}
            >
              {/* Background Image / Overlay */}
              <div className="absolute inset-0 grayscale-0 md:grayscale opacity-100 md:opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 bg-[var(--obsidian)]">
                {project.image && (
                    <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                )}
                {/* Fallback Mesh for missing images */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--zinc-muted)_1px,_transparent_1px)] bg-[size:24px_24px] opacity-10"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian)] via-[var(--obsidian)]/90 to-transparent opacity-100 group-hover:opacity-80 transition-opacity"></div>

              {/* Content Box */}
              <motion.div 
                className="relative z-10 p-5 sm:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col h-full justify-between"
              >
                <div className="flex justify-between items-start mb-2">
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-transparent text-[var(--zinc-muted)] hover:text-white transition-all ml-auto">
                    <ExternalLink size={18} />
                  </a>
                </div>

                <div className="mt-auto">
                    <h3 className="font-display text-xl md:text-2xl text-white mb-2 group-hover:text-[var(--orange)] transition-colors leading-tight">
                    {project.title}
                    </h3>
                    
                    <p className="font-mono text-[10px] md:text-xs text-[var(--zinc-muted)] line-clamp-2 md:line-clamp-3 mb-4 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 delay-100 hidden md:block">
                    {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 bg-white/5 text-white border border-white/10">
                            {tag}
                        </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-6">
                        {project.caseStudyId && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); onOpenCaseStudy(project.caseStudyId!); }}
                            className="bg-[var(--obsidian)] border border-[var(--glass-border)] text-white hover:text-[var(--orange)] hover:border-[var(--orange)] px-4 py-2 font-mono flex items-center gap-2 transition-colors uppercase tracking-widest text-[10px]"
                        >
                            Load Case Study 
                            <ArrowRight size={14} />
                        </button>
                        )}

                        {project.architectureDiagram && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); onOpenArchitecture(project.architectureDiagram!); }}
                            className="bg-transparent border border-[var(--glass-border)] text-[var(--zinc-muted)] hover:text-white hover:border-[var(--orange)] px-4 py-2 font-mono flex items-center gap-2 transition-colors uppercase tracking-widest text-[10px]"
                        >
                            View Architecture
                        </button>
                        )}
                    </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
