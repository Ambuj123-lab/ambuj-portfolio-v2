import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, User, Briefcase, Mail, Linkedin, Github, Command, ArrowRight } from 'lucide-react';

interface CommandItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    action: () => void;
    category: string;
}

interface CommandPaletteProps {
    onOpenContact?: () => void;
}

export default function CommandPalette({ onOpenContact }: CommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const commands: CommandItem[] = [
        {
            id: 'resume',
            label: 'View Resume',
            icon: <FileText size={18} />,
            action: () => window.open('/resume.pdf', '_blank'),
            category: 'Quick Actions'
        },
        {
            id: 'about',
            label: 'Go to About Section',
            icon: <User size={18} />,
            action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }),
            category: 'Navigation'
        },
        {
            id: 'work',
            label: 'View My Projects',
            icon: <Briefcase size={18} />,
            action: () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }),
            category: 'Navigation'
        },
        {
            id: 'experience',
            label: 'See Experience',
            icon: <Briefcase size={18} />,
            action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }),
            category: 'Navigation'
        },
        {
            id: 'contact',
            label: 'Send a Message',
            icon: <Mail size={18} />,
            action: () => {
                if (onOpenContact) {
                    onOpenContact();
                } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
            },
            category: 'Quick Actions'
        },
        {
            id: 'email',
            label: 'Send Email',
            icon: <Mail size={18} />,
            action: () => window.location.href = 'mailto:kumarambuj8@gmail.com',
            category: 'Quick Actions'
        },
        {
            id: 'linkedin',
            label: 'Open LinkedIn',
            icon: <Linkedin size={18} />,
            action: () => window.open('https://www.linkedin.com/in/ambuj-tripathi-042b4a118/', '_blank'),
            category: 'Social'
        },
        {
            id: 'github',
            label: 'Open GitHub',
            icon: <Github size={18} />,
            action: () => window.open('https://github.com/Ambuj123-lab', '_blank'),
            category: 'Social'
        },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase()) ||
        cmd.category.toLowerCase().includes(search.toLowerCase())
    );

    // Keyboard shortcut: Ctrl+K or Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        if (!isOpen) {
            setSearch('');
        }
    }, [isOpen]);

    const executeCommand = (cmd: CommandItem) => {
        cmd.action();
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                    />

                    {/* Command Palette Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[550px] bg-[var(--obsidian)] shadow-2xl border border-[var(--glass-border)] overflow-hidden z-[101]"
                    >
                        {/* Search Header */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--glass-border)] bg-[#050505]">
                            <Search size={18} className="text-[var(--orange)]" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent text-white placeholder-[var(--zinc-muted)] outline-none text-sm font-mono"
                            />
                            <kbd className="px-2 py-1 bg-[var(--glass-border)] text-[var(--zinc-muted)] font-mono text-[10px] uppercase tracking-wider">ESC</kbd>
                        </div>

                        {/* Commands List */}
                        <div className="max-h-[300px] overflow-y-auto">
                            {filteredCommands.length === 0 ? (
                                <div className="px-5 py-8 text-center text-[var(--zinc-muted)] font-mono text-sm">
                                    No commands found for "{search}"
                                </div>
                            ) : (
                                <>
                                    {['Quick Actions', 'Navigation', 'Social'].map(category => {
                                        const categoryCommands = filteredCommands.filter(c => c.category === category);
                                        if (categoryCommands.length === 0) return null;

                                        return (
                                            <div key={category}>
                                                <div className="px-5 py-2 text-[9px] font-mono text-[var(--zinc-muted)] uppercase tracking-widest border-b border-[var(--glass-border)] bg-[#050505]">
                                                    [{category}]
                                                </div>
                                                {categoryCommands.map((cmd) => (
                                                    <button
                                                        key={cmd.id}
                                                        onClick={() => executeCommand(cmd)}
                                                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 hover:border-l-2 hover:border-l-[var(--orange)] transition-all group border-l-2 border-l-transparent"
                                                    >
                                                        <span className="text-[var(--orange)]">{cmd.icon}</span>
                                                        <span className="text-white flex-1 text-left font-mono text-sm">{cmd.label}</span>
                                                        <ArrowRight size={14} className="text-[var(--glass-border)] group-hover:text-[var(--orange)] group-hover:translate-x-1 transition-all" />
                                                    </button>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 border-t border-[var(--glass-border)] bg-[#050505]">
                            <div className="flex items-center justify-between font-mono text-[10px] text-[var(--zinc-muted)] uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                    <Command size={10} />
                                    <span>Press</span>
                                    <kbd className="px-1.5 py-0.5 bg-[var(--glass-border)] text-[var(--zinc-muted)]">Ctrl</kbd>
                                    <span>+</span>
                                    <kbd className="px-1.5 py-0.5 bg-[var(--glass-border)] text-[var(--zinc-muted)]">K</kbd>
                                    <span>to toggle</span>
                                </div>
                                <span className="text-[var(--orange)]">⚡ Quick Nav</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

