import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageViewerProps {
    isOpen: boolean;
    onClose: () => void;
    images: { src: string; title: string }[];
    currentIndex: number;
    onNext: () => void;
    onPrev: () => void;
}

export default function ImageViewer({ isOpen, onClose, images, currentIndex, onNext, onPrev }: ImageViewerProps) {
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            onNext();
        }
        if (isRightSwipe) {
            onPrev();
        }
    };
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen || images.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-[#1C1C1C]/95 flex items-center justify-center touch-none"
                onClick={onClose}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white p-2">
                    <X size={26} />
                </button>

                <div className="absolute top-6 left-6 text-white/60 text-sm font-medium bg-white/10 px-4 py-2 rounded-full">
                    {currentIndex + 1} / {images.length}
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="absolute left-4 md:left-8 text-white/60 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all"
                >
                    <ChevronLeft size={32} />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="absolute right-4 md:right-8 text-white/60 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all"
                >
                    <ChevronRight size={32} />
                </button>

                <div className="flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-4 rounded-xl shadow-2xl max-w-[90vw]"
                    >
                        <img
                            src={images[currentIndex].src}
                            alt={images[currentIndex].title}
                            loading="lazy"
                            className="max-w-full max-h-[70vh] object-contain rounded-lg"
                        />
                    </motion.div>
                    <h3 className="text-white font-display text-lg">{images[currentIndex].title}</h3>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
