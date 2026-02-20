import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    imageSrc: string;
    onClose: () => void;
    isDarkMode: boolean;
}

export default function ArchitectureModal({ imageSrc, onClose, isDarkMode }: Props) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const MIN_SCALE = 0.5;
    const MAX_SCALE = 5;
    const ZOOM_STEP = 0.3;

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    // Scroll to zoom
    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        setScale(prev => Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta)));
    }, []);

    // Mouse drag to pan
    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale <= 1) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    // Touch support for mobile pinch & drag
    const lastTouchDist = useRef<number | null>(null);
    const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            lastTouchDist.current = Math.sqrt(dx * dx + dy * dy);
        } else if (e.touches.length === 1 && scale > 1) {
            lastTouchCenter.current = {
                x: e.touches[0].clientX - position.x,
                y: e.touches[0].clientY - position.y,
            };
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && lastTouchDist.current !== null) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const delta = (dist - lastTouchDist.current) * 0.01;
            setScale(prev => Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta)));
            lastTouchDist.current = dist;
        } else if (e.touches.length === 1 && lastTouchCenter.current && scale > 1) {
            setPosition({
                x: e.touches[0].clientX - lastTouchCenter.current.x,
                y: e.touches[0].clientY - lastTouchCenter.current.y,
            });
        }
    };

    const handleTouchEnd = () => {
        lastTouchDist.current = null;
        lastTouchCenter.current = null;
        handleDoubleTap();
    };

    // Double tap to zoom
    const lastTapTime = useRef<number>(0);
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;
        if (now - lastTapTime.current < DOUBLE_TAP_DELAY) {
            if (scale > 1) {
                resetView();
            } else {
                setScale(2.5); // Zoom to 2.5x
                // Center zoom on tap position if possible, otherwise center
                // Simplified: just zoom in
            }
        }
        lastTapTime.current = now;
    };

    const resetView = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex flex-col"
                style={{ backgroundColor: isDarkMode ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.9)' }}
            >
                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.1)', background: isDarkMode ? '#0a0a0a' : '#111' }}>
                    <div>
                        <h2 className="text-white font-semibold text-base sm:text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                            System Architecture
                        </h2>
                        <p className="text-gray-500 text-xs">Production RAG Pipeline — End-to-End Flow</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Zoom Controls */}
                        <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1 border border-white/10">
                            <button onClick={() => setScale(prev => Math.max(MIN_SCALE, prev - ZOOM_STEP))}
                                className="text-white/70 hover:text-white px-2 py-0.5 text-lg font-medium transition-colors">−</button>
                            <span className="text-white/60 text-xs min-w-[40px] text-center">{Math.round(scale * 100)}%</span>
                            <button onClick={() => setScale(prev => Math.min(MAX_SCALE, prev + ZOOM_STEP))}
                                className="text-white/70 hover:text-white px-2 py-0.5 text-lg font-medium transition-colors">+</button>
                        </div>
                        <button onClick={resetView}
                            className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded border border-white/10 hover:border-white/30 transition-colors hidden sm:block">
                            Reset
                        </button>
                        <button onClick={onClose}
                            className="ml-2 w-11 h-11 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors text-lg"
                            title="Close (Esc)">
                            ✕
                        </button>
                    </div>
                </div>

                {/* Diagram Viewport */}
                <div
                    ref={containerRef}
                    className="flex-1 overflow-hidden"
                    style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="w-full h-full flex items-center justify-center p-4 sm:p-8"
                        style={{ minHeight: '100%' }}>
                        <img
                            src={imageSrc}
                            alt="System Architecture Diagram"
                            loading="lazy"
                            draggable={false}
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                                transformOrigin: 'center center',
                                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                userSelect: 'none',
                                borderRadius: '12px',
                                filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.6))',
                            }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-t"
                    style={{ borderColor: 'rgba(255,255,255,0.1)', background: isDarkMode ? '#0a0a0a' : '#111' }}>
                    <span className="text-gray-600 text-xs">Built by Ambuj Kumar Tripathi</span>
                    <span className="text-gray-600 text-xs hidden sm:block">Scroll to zoom · Drag to pan · Esc to close</span>
                    {/* Mobile zoom controls */}
                    <div className="flex sm:hidden items-center gap-2">
                        <button onClick={() => setScale(prev => Math.max(MIN_SCALE, prev - ZOOM_STEP))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white text-lg">−</button>
                        <span className="text-white/60 text-xs">{Math.round(scale * 100)}%</span>
                        <button onClick={() => setScale(prev => Math.min(MAX_SCALE, prev + ZOOM_STEP))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white text-lg">+</button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
