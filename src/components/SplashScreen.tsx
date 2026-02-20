import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    // Auto-hide after 2 seconds (faster loading)
    useEffect(() => {
        const timer = setTimeout(onComplete, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Logo Container */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mb-6"
            >
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-20 h-20 object-contain"
                />
            </motion.div>

            {/* Name */}
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-white text-2xl md:text-3xl font-display font-bold tracking-wide mb-2"
            >
                Ambuj Kumar Tripathi
            </motion.h1>

            {/* Tagline */}
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-[#C4785A] text-sm tracking-widest uppercase mb-10"
            >
                AI Engineer & Full Stack Developer
            </motion.p>

            {/* Premium Progress Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-[#C4785A] via-[#E8A87C] to-[#C4785A] rounded-full"
                    style={{
                        boxShadow: "0 0 20px rgba(196, 120, 90, 0.6)"
                    }}
                />
            </div>

            {/* Loading Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ delay: 0.8, duration: 1.5, repeat: Infinity }}
                className="text-gray-500 text-xs mt-4 tracking-wider"
            >
                Loading Portfolio...
            </motion.p>
        </motion.div>
    );
};

export default SplashScreen;
