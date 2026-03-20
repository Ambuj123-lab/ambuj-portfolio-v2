import { X, Smartphone, Wifi, Zap, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PWAModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PWAModal({ isOpen, onClose }: PWAModalProps) {
    if (!isOpen) return null;

    const features = [
        { icon: <Smartphone size={18} />, title: 'Installable', desc: 'Add to your home screen for quick access' },
        { icon: <Wifi size={18} />, title: 'Works Offline', desc: 'Cached for offline viewing' },
        { icon: <Zap size={18} />, title: 'Lightning Fast', desc: 'Optimized for performance' },
        { icon: <Code size={18} />, title: 'Modern Tech', desc: 'Built with React & PWA standards' },
    ];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="bg-[var(--obsidian)] border border-[var(--glass-border)] rounded-none max-w-md w-full p-8 shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-[var(--zinc-muted)] hover:text-white p-1">
                        <X size={22} />
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-[var(--orange)]/10 rounded-none border border-[var(--orange)]">
                            <Smartphone className="text-[var(--orange)]" size={22} />
                        </div>
                        <h2 className="text-2xl font-display font-medium text-white uppercase tracking-widest">About This App</h2>
                    </div>

                    <p className="text-[var(--zinc-muted)] mb-6 leading-relaxed font-mono text-sm">
                        This portfolio is a <span className="text-[var(--orange)] font-bold uppercase">Progressive Web App</span> —
                        offering an app-like experience right from your browser.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {features.map((f, i) => (
                            <div key={i} className="p-4 bg-[var(--obsidian)] border border-[var(--glass-border)] rounded-none hover:border-[var(--orange)] transition-colors">
                                <div className="text-[var(--orange)] mb-2">{f.icon}</div>
                                <h3 className="font-medium text-sm mb-0.5 text-white font-mono uppercase tracking-wider">{f.title}</h3>
                                <p className="text-xs text-[var(--zinc-muted)] font-mono">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    <button onClick={onClose} className="w-full bg-[var(--obsidian)] text-white border border-[var(--glass-border)] py-4 font-display uppercase tracking-widest hover:bg-[var(--orange)] hover:border-[var(--orange)] transition-colors">
                        Got it!
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
