import { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            transition={{ delay: 2, type: "spring" }}
                            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#1C1C1C] to-[#2D2D2D] text-white px-5 py-3 rounded-full text-sm font-medium shadow-xl border border-white/10"
                        >
                            <Sparkles size={14} className="text-[#C4785A]" />
                            Chat with my AI
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                >
                    {/* Glow ring */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C4785A] to-[#E8956A] rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>

                    {/* Button */}
                    <div className="relative bg-gradient-to-br from-[#1C1C1C] to-[#2D2D2D] text-white p-4 rounded-full shadow-2xl border border-white/10">
                        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                    </div>

                    {/* Pulse animation when closed */}
                    {!isOpen && (
                        <span className="absolute top-0 right-0 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4785A] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C4785A]"></span>
                        </span>
                    )}
                </motion.button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-28 right-6 z-50 w-[92vw] md:w-[400px] h-[550px] rounded-3xl overflow-hidden shadow-2xl"
                        style={{
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 50px rgba(196, 120, 90, 0.15)'
                        }}
                    >
                        {/* Glass border effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/20 to-transparent p-[1px]">
                            <div className="w-full h-full bg-[#0A0A0A] rounded-3xl overflow-hidden flex flex-col">

                                {/* Premium Header */}
                                <div className="bg-gradient-to-r from-[#1C1C1C] via-[#252525] to-[#1C1C1C] p-5 border-b border-white/5">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            {/* Animated Avatar */}
                                            <div className="relative">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#C4785A] to-[#E8956A] rounded-2xl flex items-center justify-center shadow-lg">
                                                    <Sparkles size={20} className="text-white" />
                                                </div>
                                                {/* Online indicator */}
                                                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center">
                                                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30 animate-ping"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[#1C1C1C]"></span>
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white text-base">Ambuj's AI</h3>
                                                <p className="text-xs text-green-400 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                                    Online • Ready to help
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="text-white/40 hover:text-white p-2 hover:bg-white/10 rounded-xl transition-all"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Chat Content */}
                                <iframe
                                    src="https://ambuj-resume-bot.onrender.com"
                                    className="w-full flex-1 border-0 bg-[#0F0F0F]"
                                    title="Chat with Ambuj's AI"
                                />

                                {/* Footer hint */}
                                <div className="bg-gradient-to-r from-[#1A1A1A] to-[#1C1C1C] px-4 py-3 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-white/30 text-xs">
                                        <Send size={12} />
                                        <span>Ask me anything about Ambuj's experience...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
