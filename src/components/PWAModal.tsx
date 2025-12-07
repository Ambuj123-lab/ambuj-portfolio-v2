import { X, Smartphone, Wifi, Zap, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PWAModalProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
}

export default function PWAModal({ isOpen, onClose, isDarkMode }: PWAModalProps) {
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
                className="fixed inset-0 z-[60] bg-[#1C1C1C]/60 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className={`${isDarkMode ? 'bg-[#1C1C1C] border border-white/10' : 'bg-white'} rounded-2xl max-w-md w-full p-8 shadow-2xl relative`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className={`absolute top-4 right-4 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-[#5A5855] hover:text-[#1C1C1C]'} p-1`}>
                        <X size={22} />
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-[#C4785A]/10 rounded-xl">
                            <Smartphone className="text-[#C4785A]" size={22} />
                        </div>
                        <h2 className={`text-2xl font-display font-medium ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>About This App</h2>
                    </div>

                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'} mb-6 leading-relaxed`}>
                        This portfolio is a <span className="text-[#C4785A] font-medium">Progressive Web App</span> —
                        offering an app-like experience right from your browser.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {features.map((f, i) => (
                            <div key={i} className={`p-4 ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-[#F7F5F0]'} rounded-xl`}>
                                <div className="text-[#C4785A] mb-2">{f.icon}</div>
                                <h3 className={`font-medium text-sm mb-0.5 ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>{f.title}</h3>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    <button onClick={onClose} className="w-full btn btn-primary justify-center">
                        Got it!
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
