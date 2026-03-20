import { motion } from 'framer-motion';
import { CERTIFICATES_DATA } from '../../constants';

interface CertificationsSectionProps {
  onOpenViewer: (index: number) => void;
}

export default function CertificationsSection({ onOpenViewer }: CertificationsSectionProps) {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a] relative border-y border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-[var(--orange)] uppercase tracking-[0.2em] text-xs mb-4">
            [VERIFIED.CREDENTIALS]
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-white">
            Industry Certifications
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {CERTIFICATES_DATA.slice(0, 8).map((cert, index) => (
            <motion.div
              key={index}
              onClick={() => onOpenViewer(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * index }}
              className="cursor-pointer group p-4 border rounded-none transition-all border-[var(--glass-border)] bg-[var(--obsidian)] hover:border-[var(--orange)] active:border-[var(--orange)] hover:-translate-y-1 active:-translate-y-1"
            >
              <div className="aspect-video relative overflow-hidden flex items-center justify-center p-3 mb-4 bg-[#050505] border border-white/5 grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-500">
                <img 
                  src={cert.src} 
                  alt={cert.title} 
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h4 className="font-display text-sm md:text-base line-clamp-1 group-hover:text-[var(--orange)] transition-colors text-white">
                {cert.title}
              </h4>
              <p className="font-mono text-[10px] md:text-xs text-[var(--zinc-muted)] uppercase tracking-wider mt-2">
                {cert.provider}
              </p>
            </motion.div>
          ))}
        </div>

        {CERTIFICATES_DATA.length > 8 && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => onOpenViewer(0)} 
              className="font-mono text-xs uppercase tracking-[0.2em] px-8 py-3 bg-[var(--obsidian)] border border-[var(--glass-border)] text-white hover:text-[var(--orange)] hover:border-[var(--orange)] transition-colors"
            >
              Access Complete Archive
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
