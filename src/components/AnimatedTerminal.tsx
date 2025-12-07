import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalLine {
    command: string;
    output: string | string[];
}

const terminalCommands: TerminalLine[] = [
    {
        command: 'echo "Hello, World! 👋"',
        output: 'Namaste! I\'m Ambuj Kumar Tripathi'
    },
    {
        command: 'cat about.txt',
        output: [
            '🚀 AI Engineer | Full Stack Developer | Problem Solver',
            '📍 Building the future, one model at a time'
        ]
    },
    {
        command: 'ls ./superpowers/',
        output: 'LLMs/  RAG/  Chatbots/  React/  Node.js/  Python/'
    },
    {
        command: 'python -c "from brain import creativity; creativity.level"',
        output: '>>> Over 9000 🔥'
    },
    {
        command: 'git log -1 --oneline',
        output: 'a3b2c1d - feat: shipped another awesome project ✨'
    },
    {
        command: 'curl -s api.ambuj.dev/status',
        output: '{"status": "🟢 Open to Work", "coffee_level": "☕☕☕"}'
    },
    {
        command: 'neofetch --short',
        output: [
            '╭─────────────────────────────────╮',
            '│  AMBUJ KUMAR TRIPATHI           │',
            '│  ───────────────────            │',
            '│  OS: AI-First Mindset           │',
            '│  Uptime: 5+ years in tech       │',
            '│  Packages: 19 certifications    │',
            '│  Shell: Creative Problem Solver │',
            '╰─────────────────────────────────╯'
        ]
    },
];

export default function AnimatedTerminal() {
    const [lines, setLines] = useState<{ text: string; isCommand: boolean; isTyping: boolean }[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isTypingCommand, setIsTypingCommand] = useState(true);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        if (currentLineIndex >= terminalCommands.length) {
            const resetTimeout = setTimeout(() => {
                setLines([]);
                setCurrentLineIndex(0);
                setCurrentCharIndex(0);
                setIsTypingCommand(true);
            }, 4000);
            return () => clearTimeout(resetTimeout);
        }

        const currentCommand = terminalCommands[currentLineIndex];

        if (isTypingCommand) {
            if (currentCharIndex < currentCommand.command.length) {
                const timeout = setTimeout(() => {
                    const partialCommand = currentCommand.command.substring(0, currentCharIndex + 1);

                    setLines(prev => {
                        const newLines = [...prev];
                        const lastLineIndex = newLines.length - 1;

                        if (lastLineIndex >= 0 && newLines[lastLineIndex].isTyping) {
                            newLines[lastLineIndex] = { text: `$ ${partialCommand}`, isCommand: true, isTyping: true };
                        } else {
                            newLines.push({ text: `$ ${partialCommand}`, isCommand: true, isTyping: true });
                        }
                        return newLines;
                    });

                    setCurrentCharIndex(prev => prev + 1);
                }, 35 + Math.random() * 50);

                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    const output = currentCommand.output;
                    const outputLines = Array.isArray(output) ? output : [output];

                    setLines(prev => {
                        const newLines = [...prev];
                        const lastLineIndex = newLines.length - 1;
                        if (lastLineIndex >= 0) {
                            newLines[lastLineIndex] = { ...newLines[lastLineIndex], isTyping: false };
                        }
                        outputLines.forEach(line => {
                            newLines.push({ text: line, isCommand: false, isTyping: false });
                        });
                        return newLines;
                    });

                    setIsTypingCommand(false);
                    setCurrentCharIndex(0);
                }, 250);

                return () => clearTimeout(timeout);
            }
        } else {
            const timeout = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setIsTypingCommand(true);
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [currentLineIndex, currentCharIndex, isTypingCommand]);

    const visibleLines = lines.slice(-12);

    return (
        <div className="bg-[#0D0D0D] rounded-2xl overflow-hidden font-mono text-sm border border-[#2D2D2D] shadow-2xl relative">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-[#1A1A1A] to-[#252525] border-b border-[#333]">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-lg shadow-red-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-lg shadow-yellow-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-lg shadow-green-500/30"></div>
                </div>
                <span className="text-[#666] text-xs ml-3 font-medium">ambuj@portfolio:~</span>
                <span className="ml-auto text-[#444] text-xs">zsh</span>
            </div>

            {/* Terminal Body */}
            <div className="p-5 min-h-[320px] max-h-[380px] overflow-hidden">
                <div className="space-y-1.5">
                    {visibleLines.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${line.isCommand ? 'text-[#4ADE80]' : 'text-[#A8A8A8]'} text-[13px] leading-relaxed font-mono`}
                        >
                            {line.text}
                            {line.isTyping && showCursor && (
                                <span className="inline-block w-2.5 h-5 bg-[#4ADE80] ml-0.5 align-middle animate-pulse"></span>
                            )}
                        </motion.div>
                    ))}

                    {lines.length === 0 && (
                        <div className="text-[#4ADE80] text-[13px]">
                            $ {showCursor && <span className="inline-block w-2.5 h-5 bg-[#4ADE80] ml-0.5 align-middle animate-pulse"></span>}
                        </div>
                    )}
                </div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#4ADE80]/5 to-transparent pointer-events-none rounded-2xl"></div>
        </div>
    );
}
