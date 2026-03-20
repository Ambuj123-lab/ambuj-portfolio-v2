import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Database, BrainCircuit, MessageSquare, CheckCircle, Network, Server } from 'lucide-react';


export default function AgenticTrace() {
    const nodes = [
        { id: 1, icon: MessageSquare, label: "User Query", desc: "Non-compete clause?" },
        { id: 2, icon: Network, label: "LangGraph Router", desc: "Intent & Strategy" },
        { id: 3, icon: Database, label: "Vector Search", desc: "ChromaDB / Qdrant" },
        { id: 4, icon: Server, label: "Document Store", desc: "Supabase (Parent Chunks)" },
        { id: 5, icon: BrainCircuit, label: "LLM Generation", desc: "Llama 3 via OpenRouter" },
        { id: 6, icon: CheckCircle, label: "Critic Evaluator", desc: "Hallucination Guard" },
    ];

    // Colors
    const bgClass = 'bg-[#050505] border-[var(--glass-border)]';
    const textPrimary = 'text-white';
    const textSecondary = 'text-[var(--zinc-muted)]';
    const accent = 'text-[var(--orange)]';

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
        <section className="py-24 px-4 sm:px-6 bg-[var(--obsidian)] overflow-hidden">
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
                                    className={`w-full max-w-[280px] lg:max-w-full p-5 lg:p-4 border ${bgClass} shadow-2xl flex flex-col items-center text-center relative z-20 transition-all duration-300 group-hover:border-[var(--orange)] group-hover:-translate-y-1 bg-gradient-to-br from-white/[0.02] to-transparent`}
                                >
                                    <div className={`w-12 h-12 rounded-none border border-[var(--glass-border)] mb-3 flex items-center justify-center bg-[var(--obsidian)] ${accent} group-hover:bg-[var(--orange)] group-hover:text-white transition-all duration-300`}>
                                        <node.icon size={22} className="relative z-10" />
                                        {/* Subtle icon glow */}
                                        <div className="absolute inset-0 bg-[var(--orange)] blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                    </div>
                                    <h3 className={`font-semibold text-sm lg:text-xs 2xl:text-sm mb-1 ${textPrimary}`}>{node.label}</h3>
                                    <p className={`text-xs lg:text-[10px] 2xl:text-xs ${textSecondary}`}>{node.desc}</p>

                                    {/* Continuous Pulse effect wrapper */}
                                    <motion.div
                                        className="absolute inset-0 border border-[var(--orange)] opacity-0"
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
                                    <div className="hidden lg:block absolute top-[24px] left-[50%] w-full h-[1px] z-0 overflow-hidden">
                                        <div className="w-full h-full bg-[var(--glass-border)]"></div>

                                        {/* Electric Current Animation */}
                                        <motion.div
                                            className="absolute top-1/2 h-[1px] w-24 bg-gradient-to-r from-transparent via-[var(--orange)] to-transparent shadow-[0_0_12px_var(--orange)] -translate-y-1/2 z-10"
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
                                    <div className="lg:hidden w-[1px] h-10 relative my-1 z-0 overflow-hidden">
                                        <div className="w-full h-full flex justify-center bg-[var(--glass-border)]"></div>

                                        <motion.div
                                            className="absolute left-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--orange)] to-transparent shadow-[0_0_12px_var(--orange)] -translate-x-1/2 z-10"
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
