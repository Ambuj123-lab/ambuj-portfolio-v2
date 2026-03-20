import { motion } from 'framer-motion';
import { EXPERIENCE_DATA } from '../../constants';

export default function ExperienceTimeline() {
  return (
    <section className="py-24 px-6 bg-[var(--obsidian)] relative" id="experience">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16 md:mb-24">
          <p className="font-mono text-[var(--orange)] uppercase tracking-[0.2em] text-xs mb-4 flex items-center gap-3">
             <span className="w-4 h-4 rounded-sm bg-[var(--orange)] inline-block"></span>
             Operational History
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white">
            Professional<br />Timeline.
          </h2>
        </div>

        <div className="relative border-l-2 border-[var(--glass-border)] ml-4 md:ml-0 md:pl-8 space-y-16">
          {EXPERIENCE_DATA.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[37px] md:-left-[41px] top-1 w-4 h-4 md:w-5 md:h-5 rounded-sm bg-[var(--obsidian)] border-2 border-[var(--glass-border)] group-hover:bg-[var(--orange)] group-hover:border-[var(--orange)] transition-colors duration-300"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                <h3 className="font-display text-2xl md:text-3xl text-white group-hover:text-[var(--orange)] transition-colors">
                  {exp.title}
                </h3>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--zinc-muted)] whitespace-nowrap bg-white/5 py-1 px-3 border border-white/10 rounded-full md:rounded-none md:border-0 md:bg-transparent md:px-0">
                  {exp.period}
                </span>
              </div>
              
              <div className="font-mono text-sm text-[var(--orange)] mb-6 uppercase tracking-wider">
                {exp.company}
              </div>

              <div className="bg-[#0a0a0a] border border-[var(--glass-border)] p-6 md:p-8 hover:border-[var(--orange)]/50 active:border-[var(--orange)]/50 transition-colors">
                <ul className="space-y-4 font-mono text-sm text-[var(--zinc-muted)]">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-[var(--orange)] mt-1 opacity-70">▹</span>
                      <span className="leading-relaxed">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
