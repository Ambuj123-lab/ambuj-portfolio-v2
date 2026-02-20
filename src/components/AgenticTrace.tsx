import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Database, BrainCircuit, MessageSquare, CheckCircle, Network, Server } from 'lucide-react';

interface Props {
    isDarkMode: boolean;
}

export default function AgenticTrace({ isDarkMode }: Props) {
    const nodes = [
        { id: 1, icon: MessageSquare, label: "User Query", desc: "Non-compete clause?" },
        { id: 2, icon: Network, label: "LangGraph Router", desc: "Intent & Strategy" },
        { id: 3, icon: Database, label: "Vector Search", desc: "ChromaDB / Qdrant" },
        { id: 4, icon: Server, label: "Document Store", desc: "Supabase (Parent Chunks)" },
        { id: 5, icon: BrainCircuit, label: "LLM Generation", desc: "Llama 3 via OpenRouter" },
        { id: 6, icon: CheckCircle, label: "Critic Evaluator", desc: "Hallucination Guard" },
    ];

    // Colors
    const bgClass = isDarkMode ? 'bg-[#111] border-white/10' : 'bg-white border-[#E8E4DB]';
    const textPrimary = isDarkMode ? 'text-white' : 'text-[#1C1C1C]';
    const textSecondary = isDarkMode ? 'text-gray-400' : 'text-[#5A5855]';
    const accent = 'text-[#C4785A]';

    // Premium Staggered Animations
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.5,
            }
        }
    };

    const blockVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", damping: 20, stiffness: 100 }
        }
    };

    return (
        <section className={`py-24 px-4 sm:px-6 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#FAFAFA]'} overflow-hidden`}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="section-eyebrow">Live Observation</p>
                    <h2 className={`text-4xl md:text-5xl font-display mb-4 ${textPrimary}`}>
                        Agentic Execution Trace
                    </h2>
                    <p className={`max-w-2xl mx-auto ${textSecondary}`}>
                        Visualizing how my multi-agent systems process complex queries, route requests, retrieve context via Pinecone/Supabase, and evaluate generations.
                    </p>
                </motion.div>

                <div className="relative w-full mx-auto">
                    {/* Responsive Container */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-2 relative z-10 w-full"
                    >
                        {nodes.map((node, index) => (
                            <div key={node.id} className="relative flex-1 w-full lg:w-auto flex flex-col items-center group">
                                {/* The Component Box */}
                                <motion.div
                                    variants={blockVariants}
                                    className={`w-full max-w-[280px] lg:max-w-full p-5 lg:p-4 rounded-xl border ${bgClass} shadow-lg flex flex-col items-center text-center relative z-20 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(196,120,90,0.15)] group-hover:-translate-y-1 bg-gradient-to-br ${isDarkMode ? 'from-white/[0.02] to-transparent' : 'from-black/[0.01] to-transparent'}`}
                                >
                                    <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center bg-[#C4785A]/10 ${accent} group-hover:scale-110 transition-transform duration-300`}>
                                        <node.icon size={22} className="relative z-10" />
                                        {/* Subtle icon glow */}
                                        <div className="absolute inset-0 bg-[#C4785A] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
                                    </div>
                                    <h3 className={`font-semibold text-sm lg:text-xs 2xl:text-sm mb-1 ${textPrimary}`}>{node.label}</h3>
                                    <p className={`text-xs lg:text-[10px] 2xl:text-xs ${textSecondary}`}>{node.desc}</p>

                                    {/* Continuous Pulse effect wrapper */}
                                    <motion.div
                                        className="absolute inset-0 border border-[#C4785A] rounded-xl opacity-0"
                                        animate={{
                                            opacity: [0, 0.5, 0],
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            delay: index * 0.4,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>

                                {/* Desktop Electric Beam */}
                                {index < nodes.length - 1 && (
                                    <div className="hidden lg:block absolute top-[24px] left-[50%] w-full h-[2px] z-0 overflow-hidden">
                                        <div className={`w-full h-full ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>

                                        {/* Electric Current Animation */}
                                        <motion.div
                                            className="absolute top-1/2 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#C4785A] to-transparent shadow-[0_0_12px_#C4785A] -translate-y-1/2 z-10"
                                            animate={{ left: ["-100%", "200%"] }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: index * 0.5, // Waterfall timing
                                                ease: "linear"
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Mobile/Tablet Downward Beam */}
                                {index < nodes.length - 1 && (
                                    <div className="lg:hidden w-[2px] h-10 relative my-1 z-0 overflow-hidden">
                                        <div className={`w-full h-full flex justify-center ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>

                                        <motion.div
                                            className="absolute left-1/2 w-[2px] h-16 bg-gradient-to-b from-transparent via-[#C4785A] to-transparent shadow-[0_0_12px_#C4785A] -translate-x-1/2 z-10"
                                            animate={{ top: ["-100%", "200%"] }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                delay: index * 0.5,
                                                ease: "linear"
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
