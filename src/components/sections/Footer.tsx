import { Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  return (
    <footer className="py-8 px-6 bg-[#050505] border-t border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
        
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--zinc-muted)]">
            © 2026 Ambuj Kumar Tripathi. All rights reserved. [V3.0]
          </p>
          <a
            href="https://stats.uptimerobot.com/4tYmSQnuBE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--zinc-muted)] hover:text-[#22c55e] transition-colors"
            title="Live uptime monitoring (5-min checks)"
          >
            <span className="w-1.5 h-1.5 bg-[#22c55e] border border-[#22c55e]/50 rounded-sm animate-pulse"></span>
            System_Status: Operational
          </a>
        </div>

        <div className="flex gap-6 items-center">
          <a href="https://github.com/Ambuj123-lab" target="_blank" rel="noopener noreferrer" className="text-[var(--zinc-muted)] hover:text-[var(--orange)] transition-colors">
            <Github size={16} />
          </a>
          <a href="https://www.linkedin.com/in/ambuj-tripathi-042b4a118/" target="_blank" rel="noopener noreferrer" className="text-[var(--zinc-muted)] hover:text-[var(--orange)] transition-colors">
            <Linkedin size={16} />
          </a>
          <button onClick={onOpenContact} className="text-[var(--zinc-muted)] hover:text-[var(--orange)] transition-colors">
            <Mail size={16} />
          </button>
        </div>
        
      </div>
    </footer>
  );
}
