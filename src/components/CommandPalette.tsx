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

export default function CommandPalette() {
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
            label: 'Contact Me',
            icon: <Mail size={18} />,
            action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
            category: 'Navigation'
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Command Palette Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[550px] bg-[#1C1C1C] rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-[101]"
                    >
                        {/* Search Header */}
                        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                            <Search size={20} className="text-[#C4785A]" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
                            />
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                                <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">ESC</kbd>
                            </div>
                        </div>

                        {/* Commands List */}
                        <div className="max-h-[300px] overflow-y-auto py-2">
                            {filteredCommands.length === 0 ? (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    No commands found for "{search}"
                                </div>
                            ) : (
                                <>
                                    {['Quick Actions', 'Navigation', 'Social'].map(category => {
                                        const categoryCommands = filteredCommands.filter(c => c.category === category);
                                        if (categoryCommands.length === 0) return null;

                                        return (
                                            <div key={category}>
                                                <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider">
                                                    {category}
                                                </div>
                                                {categoryCommands.map((cmd) => (
                                                    <button
                                                        key={cmd.id}
                                                        onClick={() => executeCommand(cmd)}
                                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                                                    >
                                                        <span className="text-[#C4785A]">{cmd.icon}</span>
                                                        <span className="text-white flex-1 text-left">{cmd.label}</span>
                                                        <ArrowRight size={14} className="text-gray-600 group-hover:text-[#C4785A] group-hover:translate-x-1 transition-all" />
                                                    </button>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-3 border-t border-white/10 bg-white/5">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Command size={12} />
                                    <span>Press</span>
                                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">Ctrl</kbd>
                                    <span>+</span>
                                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">K</kbd>
                                    <span>to toggle</span>
                                </div>
                                <span className="text-[#C4785A]">⚡ Quick Actions</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
