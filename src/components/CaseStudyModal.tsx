import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import LegalAICaseStudy from './LegalAICaseStudy';

interface CaseStudyModalProps {
    caseStudyId: string;
    onClose: () => void;
    isDarkMode: boolean;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudyId, onClose, isDarkMode }) => {
    const [zoomLevel, setZoomLevel] = useState(1); // 1 = normal, 1.1, 1.2 etc.

    // Prevent background scrolling when modal is open
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
                    onClick={(e) => e.stopPropagation()} // Prevent closing on content click
                    className={`relative w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col
                        ${isDarkMode ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-gray-200'}`}
                >
                    {/* Toolbar */}
                    <div className={`flex items-center justify-between px-6 py-4 border-b print:hidden ${isDarkMode ? 'border-white/10 bg-[#121212]' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                                Case Study: Legal AI
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Zoom Controls */}
                            <div className={`hidden md:flex items-center gap-1 mr-4 bg-black/20 rounded-lg p-1 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                                <button
                                    onClick={handleZoomOut}
                                    className={`p-2 rounded hover:bg-white/10 transition-colors ${zoomLevel <= 0.8 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    title="Zoom Out"
                                >
                                    <ZoomOut size={18} className={isDarkMode ? 'text-white' : 'text-black'} />
                                </button>
                                <span className={`text-xs w-12 text-center ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                                    {Math.round(zoomLevel * 100)}%
                                </span>
                                <button
                                    onClick={handleZoomIn}
                                    className={`p-2 rounded hover:bg-white/10 transition-colors ${zoomLevel >= 1.4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    title="Zoom In"
                                >
                                    <ZoomIn size={18} className={isDarkMode ? 'text-white' : 'text-black'} />
                                </button>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className={`p-2 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors
                                    ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}
                            >
                                <X size={28} />
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div
                        className={`flex-1 overflow-y-auto scrollbar-thin ${isDarkMode ? 'scrollbar-thumb-white/10 scrollbar-track-black' : 'scrollbar-thumb-black/10 scrollbar-track-white'}`}
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
