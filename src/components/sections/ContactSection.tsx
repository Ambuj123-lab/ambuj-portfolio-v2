import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

interface ContactSectionProps {
  onOpenContact: () => void;
}

export default function ContactSection({ onOpenContact }: ContactSectionProps) {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a] border-t border-[var(--glass-border)]" id="contact">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[var(--obsidian)] border border-[var(--glass-border)] p-10 md:p-16 relative overflow-hidden group"
        >
           {/* Abstract scanline effect */}
           <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

          <div className="text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[var(--orange)] uppercase tracking-[0.2em] text-xs mb-6"
            >
              [CONNECTION.INITIATED]
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-display text-white mb-8 group-hover:text-[var(--zinc-muted)] transition-colors"
            >
              Open to New<br />
              <span className="text-[var(--zinc-muted)] group-hover:text-white transition-colors">Opportunities.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-base font-mono text-[var(--zinc-muted)] max-w-xl mx-auto mb-12"
            >
              Seeking full-time roles as a Gen AI Architect or ML Engineer. Let's engineer scalable intelligence together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={onOpenContact}
                className="font-mono text-xs uppercase tracking-widest bg-[var(--orange)] text-[var(--obsidian)] px-8 py-4 font-bold hover:bg-white transition-colors border-2 border-transparent"
              >
                Execute_Contact_Form
              </button>

              <button
                onClick={onOpenContact}
                className="font-mono text-xs uppercase tracking-widest flex items-center gap-3 bg-transparent border border-[var(--glass-border)] text-[var(--zinc-muted)] px-8 py-4 hover:border-white hover:text-white transition-colors"
              >
                <Mail size={16} />
                SMTP_Protocol
              </button>

              <a
                href="https://www.linkedin.com/in/ambuj-tripathi-042b4a118/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest flex items-center gap-3 bg-transparent border border-[#0A66C2]/30 text-[#0A66C2] px-8 py-4 hover:bg-[#0A66C2] hover:text-white transition-colors"
              >
                <Linkedin size={16} />
                Network_Handshake
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 flex justify-center"
            >
              <a
                href="https://www.linkedin.com/in/ambuj-tripathi-042b4a118/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-[var(--glass-border)] p-2 bg-[#050505] hover:border-[#0A66C2] active:border-[#0A66C2] transition-colors"
              >
                <img
                  src="/linkedin-badge.png"
                  alt="Ambuj Tripathi LinkedIn Profile"
                  className="max-w-[300px] w-full grayscale-0 md:grayscale hover:grayscale-0 transition-all duration-500"
                />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
