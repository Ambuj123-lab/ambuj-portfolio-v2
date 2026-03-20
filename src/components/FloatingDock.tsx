import { ArrowUp } from 'lucide-react';

export default function FloatingDock() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex flex-col gap-3">
      {/* Scroll To Top */}
      <button onClick={scrollToTop} className="p-3 bg-[#0a0a0a] md:bg-transparent border border-white/20 md:border-[var(--glass-border)] text-[var(--zinc-muted)] hover:text-white hover:border-[var(--orange)] hover:bg-[#0a0a0a] transition-all shadow-2xl hover:-translate-y-1">
        <ArrowUp size={20} className="hover:text-[var(--orange)]" />
      </button>
    </div>
  );
}
