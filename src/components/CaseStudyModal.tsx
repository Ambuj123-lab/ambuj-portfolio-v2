import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import LegalAICaseStudy from './LegalAICaseStudy';

interface CaseStudyModalProps {
    caseStudyId: string;
    onClose: () => void;
    isDarkMode?: boolean;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudyId, onClose }) => {
    const [zoomLevel, setZoomLevel] = useState(1);

    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 1.4));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.8));

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="case-study-modal-overlay fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-5xl h-[90vh] shadow-2xl overflow-hidden flex flex-col bg-[var(--obsidian)] border border-[var(--glass-border)]"
                >
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--glass-border)] bg-[#050505]">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[var(--orange)]"></div>
                            <span className="font-mono text-xs uppercase tracking-widest text-[var(--orange)]">
                                Case Study: Legal AI
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Zoom Controls */}
                            <div className="hidden md:flex items-center gap-1 mr-4 bg-white/5 p-1">
                                <button
                                    onClick={handleZoomOut}
                                    className={`p-2 hover:bg-white/10 transition-colors ${zoomLevel <= 0.8 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    title="Zoom Out"
                                >
                                    <ZoomOut size={18} className="text-[var(--zinc-muted)]" />
                                </button>
                                <span className="text-xs w-12 text-center font-mono text-[var(--zinc-muted)]">
                                    {Math.round(zoomLevel * 100)}%
                                </span>
                                <button
                                    onClick={handleZoomIn}
                                    className={`p-2 hover:bg-white/10 transition-colors ${zoomLevel >= 1.4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    title="Zoom In"
                                >
                                    <ZoomIn size={18} className="text-[var(--zinc-muted)]" />
                                </button>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="p-2 bg-[var(--glass-border)] hover:bg-[var(--orange)] hover:text-white text-[var(--zinc-muted)] transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div
                        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-black"
                    >
                        <div
                            style={{
                                transform: `scale(${zoomLevel})`,
                                transformOrigin: 'top center',
                                transition: 'transform 0.2s ease-out'
                            }}
                            className="w-full print:!transform-none"
                        >
                            {caseStudyId === 'legal-ai' && <LegalAICaseStudy />}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default CaseStudyModal;

