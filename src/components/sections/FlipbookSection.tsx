import { motion } from 'framer-motion';

export default function FlipbookSection() {
  return (
    <section id="flipbook" className="py-24 px-6 bg-[var(--obsidian)] relative border-t border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[var(--orange)] uppercase tracking-widest text-sm">System Documentation</span>
            <div className="h-[1px] flex-grow bg-[var(--glass-border)]"></div>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tighter">
            Legal RAG <span className="text-[var(--orange)]">Flipbook</span>
          </h2>
          <p className="font-mono text-[var(--zinc-muted)] mt-6 max-w-2xl leading-relaxed">
            A comprehensive guide to building production-grade AI systems, detailing the architecture, chunking strategies, and vector database management of the Indian Legal AI project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-[4/3] md:aspect-video border border-[var(--glass-border)] bg-[#050505] p-2 hover:border-[var(--orange)] transition-colors duration-500"
        >
          <iframe 
            allowFullScreen={true}
            scrolling="no" 
            className="w-full h-full border border-[var(--glass-border)]" 
            src="https://heyzine.com/flip-book/ed3d91f887.html"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
