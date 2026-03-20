import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#flipbook', label: 'Flipbook' },
    { href: '#blog', label: 'Insights' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[var(--obsidian)]/80 backdrop-blur-md border-b border-[var(--glass-border)]'
          : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 font-display text-white text-xl font-bold tracking-tight group">
            <div className="w-8 h-8 bg-white text-[var(--obsidian)] flex items-center justify-center font-black group-hover:bg-[var(--orange)] group-hover:text-white transition-colors">
              A
            </div>
            Ambuj
            <span className="text-[var(--orange)]">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a 
                  key={link.href} 
                  href={link.href}
                  className={`font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:text-white ${isActive ? 'text-[var(--orange)]' : 'text-[var(--zinc-muted)]'}`}
                >
                  {link.label}
                </a>
              );
            })}
            
            <a 
              href="#contact" 
              className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--obsidian)] bg-[var(--orange)] hover:bg-white transition-colors px-6 py-2 font-bold ml-4"
            >
              Init_Contact
            </a>
            <button
              onClick={() => { const e = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }); window.dispatchEvent(e); }}
              className="hidden lg:flex items-center gap-1 ml-3 px-2 py-1 border border-[var(--glass-border)] hover:border-[var(--orange)] transition-colors cursor-pointer"
              title="Open Command Palette"
            >
              <kbd className="font-mono text-[10px] text-[var(--zinc-muted)]">Ctrl</kbd>
              <span className="text-[var(--zinc-muted)] text-[10px]">+</span>
              <kbd className="font-mono text-[10px] text-[var(--zinc-muted)]">K</kbd>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-white hover:text-[var(--orange)] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden pt-24 px-6 bg-[var(--obsidian)] border-b border-[var(--glass-border)] flex flex-col gap-8 h-fit pb-12 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl text-white hover:text-[var(--orange)] transition-colors border-b border-[var(--glass-border)] pb-4"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
