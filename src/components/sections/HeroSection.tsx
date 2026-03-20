import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TYPEWRITER_TITLES } from '../../constants';
import { Download, Github, Linkedin, Mail, FileText } from 'lucide-react';

interface HeroSectionProps {
  onContactClick: () => void;
  onInstallClick: () => void;
}

const HERO_STATS = [
  { label: 'TOTAL CHUNKS', value: '10,833', sub: 'across 6 legal acts' },
  { label: 'CHILD VECTORS', value: '8,896', sub: '768-dim in Qdrant' },
  { label: 'PARENT CHUNKS', value: '1,937', sub: 'text in Supabase' },
  { label: 'CACHE STRATEGY', value: 'SHA-256', sub: 'sub-100ms repeat' },
  { label: 'TOKENS SAVED', value: '300K+', sub: 'per deployment' },
  { label: 'COMPLIANCE', value: 'GDPR', sub: '30-day TTL' },
];

export default function HeroSection({ onContactClick, onInstallClick }: HeroSectionProps) {
  const { scrollY } = useScroll();
  
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const yMove = useTransform(scrollY, [0, 500], [0, 100]);

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleType = () => {
      const currentTitle = TYPEWRITER_TITLES[titleIndex];
      if (isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
      }
      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TYPEWRITER_TITLES.length);
      }
    };
    const timer = setTimeout(handleType, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center pt-20 px-6 overflow-hidden bg-[var(--obsidian)]">
      
      <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[var(--orange)] uppercase tracking-[0.2em] text-xs sm:text-sm mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[var(--orange)]"></span>
              AI Engineer & Developer
            </p>
          </motion.div>

          <motion.div
            style={{ scale, opacity, y: yMove }}
            className="origin-left"
          >
            <h1 className="font-display text-[3rem] md:text-[5rem] lg:text-[6vw] leading-[0.9] tracking-tighter mix-blend-difference mb-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--zinc-muted)]">
                {displayText}
                <span className="animate-pulse ml-2 text-[var(--orange)]">_</span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-mono text-[var(--zinc-muted)] text-sm md:text-base max-w-xl leading-relaxed mt-8 border-l border-[var(--glass-border)] pl-4"
          >
            Transforming complex challenges into elegant, production-ready AI systems and full-stack web applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-8"
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white text-[var(--obsidian)] px-6 py-3 rounded-none font-mono text-sm uppercase font-bold hover:bg-[var(--orange)] hover:text-white transition-colors">
              <FileText size={16} className="group-hover:-translate-y-1 transition-transform" />
              View Resume
            </a>
            <a href="https://ambuj-rag-docs.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-[var(--glass-border)] text-white px-6 py-3 rounded-none font-mono text-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
              Engineering Docs
            </a>
            
            <button
              onClick={onInstallClick}
              className="flex items-center gap-3 border border-[var(--glass-border)] text-white px-6 py-3 rounded-none font-mono text-sm hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors"
            >
              <Download size={16} />
              Install App
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 pt-8"
          >
            <a href="https://github.com/Ambuj123-lab" target="_blank" rel="noopener noreferrer" className="text-[var(--zinc-muted)] hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ambuj-tripathi-042b4a118/" target="_blank" rel="noopener noreferrer" className="text-[var(--zinc-muted)] hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <button onClick={onContactClick} className="text-[var(--zinc-muted)] hover:text-[var(--orange)] transition-colors">
              <Mail size={20} />
            </button>
          </motion.div>
        </div>

        {/* Stats Panel - Replaces Terminal */}
        <div className="hidden lg:flex lg:col-span-5 justify-end">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full max-w-md border border-[var(--glass-border)] hover:border-[var(--orange)] bg-[#050505] relative transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[var(--glass-border)] px-5 py-3">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-[var(--orange)]"></div>
                <span className="font-mono text-[10px] text-[var(--orange)] uppercase tracking-widest">System Metrics</span>
              </div>
              <span className="font-mono text-[10px] text-[var(--zinc-muted)] animate-pulse">● LIVE</span>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2">
              {HERO_STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.15 }}
                  className="px-5 py-4 border-b border-r border-[var(--glass-border)] last:border-r-0 even:border-r-0 group hover:bg-[#0a0a0a] hover:border-[var(--orange)] transition-all duration-300"
                >
                  <p className="font-mono text-[9px] text-[var(--zinc-muted)] uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="font-display text-2xl text-white group-hover:text-[var(--orange)] transition-colors leading-none mb-1">{stat.value}</p>
                  <p className="font-mono text-[9px] text-[var(--zinc-muted)]">{stat.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 flex justify-between items-center">
              <span className="font-mono text-[9px] text-[var(--zinc-muted)] uppercase tracking-widest">Production RAG Pipeline</span>
              <span className="font-mono text-[9px] text-[var(--orange)]">v2.0</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
