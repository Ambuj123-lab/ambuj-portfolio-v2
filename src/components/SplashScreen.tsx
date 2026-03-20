import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 400); // Small delay after hitting 100
                    return 100;
                }
                return p + Math.floor(Math.random() * 15) + 5; // Random jumps for hacker feel
            });
        }, 150);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[var(--obsidian)] flex flex-col justify-between p-6 md:p-12 overflow-hidden origin-center"
            initial={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ 
                opacity: 0, 
                scale: 1.5, 
                rotate: 15, 
                filter: "blur(10px)" 
            }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // Good-Fella easing
        >
            {/* Top Bar */}
            <div className="flex justify-between items-start w-full">
                <span className="font-mono text-xs text-[var(--zinc-muted)] uppercase tracking-widest">
                    AK-TRIPATHI // SYSTEM INITIALIZING
                </span>
                <span className="font-mono text-xs text-[var(--orange)] uppercase tracking-widest animate-pulse">
                    REC
                </span>
            </div>

            {/* Massive Center Percentage */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <motion.div 
                    className="font-display text-[15vw] md:text-[18vw] leading-none text-white font-black tracking-tighter"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {Math.min(progress, 100)}<span className="text-[var(--orange)]">.</span>
                </motion.div>
                <p className="font-mono text-xs md:text-sm text-[var(--zinc-muted)] tracking-[0.3em] uppercase mt-4">
                    Compiling Portfolio Assets
                </p>
            </div>

            {/* Bottom Bar loader */}
            <div className="w-full flex items-center justify-between">
                <span className="font-mono text-[10px] text-[var(--zinc-muted)] uppercase">V3.0.0</span>
                <div className="flex-1 max-w-sm ml-8 h-[1px] bg-[var(--glass-border)] relative">
                    <motion.div 
                        className="absolute left-0 top-0 h-full bg-[var(--orange)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 0.2 }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default SplashScreen;
