import { useState, useEffect } from 'react';
import {
    EXPERIENCE_DATA,
    PROJECTS_DATA,
    CERTIFICATES_DATA,
    SKILLS_LIST,
    TYPEWRITER_TITLES,
} from './constants';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Menu, X, ChevronRight, Moon, Sun, Download, ArrowUp } from 'lucide-react';
import ChatWidget from './components/ChatWidget';
import ImageViewer from './components/ImageViewer';
import PWAModal from './components/PWAModal';
import BentoCard from './components/BentoCard';
import AnimatedTerminal from './components/AnimatedTerminal';
import SplashScreen from './components/SplashScreen';
import CommandPalette from './components/CommandPalette';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isPWAOpen, setIsPWAOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showShortcutsHint, setShowShortcutsHint] = useState(true);
    const [readingProgress, setReadingProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme ? savedTheme === 'dark' : true;
        }
        return true;
    });
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showSplash, setShowSplash] = useState(true);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: any) => {
            console.log('👍 beforeinstallprompt fired!');
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                setDeferredPrompt(null);
            });
        } else {
            alert("To install the app:\n1. Click the 'Share' icon (iOS) or Menu (Android/Chrome)\n2. Select 'Add to Home Screen' or 'Install App'");
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
            setShowScrollTop(window.scrollY > 400);

            // Calculate reading progress
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
            setReadingProgress(progress);
            setScrollY(window.scrollY); // For parallax
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Custom cursor glow effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Keyboard shortcuts for navigation (1-4 keys)
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            const sections: { [key: string]: string } = {
                '1': 'work',
                '2': 'about',
                '3': 'experience',
                '4': 'contact'
            };

            if (sections[e.key]) {
                const element = document.getElementById(sections[e.key]);
                element?.scrollIntoView({ behavior: 'smooth' });
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Track active section for navigation highlighting
    useEffect(() => {
        if (showSplash) return;

        const handleScrollSpy = () => {
            const sections = ['work', 'about', 'experience', 'contact'];
            const scrollPosition = window.scrollY + 150;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        setTimeout(handleScrollSpy, 600);

        window.addEventListener('scroll', handleScrollSpy);
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, [showSplash]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleType = () => {
            const currentTitle = TYPEWRITER_TITLES[titleIndex];
            if (isDeleting) {
                setDisplayText(currentTitle.substring(0, displayText.length - 1));
            } else {
                setDisplayText(currentTitle.substring(0, displayText.length + 1));
            }
            if (!isDeleting && displayText === currentTitle) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setTitleIndex((prev) => (prev + 1) % TYPEWRITER_TITLES.length);
            }
        };
        const timer = setTimeout(handleType, isDeleting ? 50 : 100);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, titleIndex]);

    const openViewer = (index: number) => {
        setCurrentImageIndex(index);
        setIsViewerOpen(true);
    };

    const navLinks = [
        { href: '#work', label: 'Work' },
        { href: '#about', label: 'About' },
        { href: '#experience', label: 'Experience' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <>
            {/* Splash Screen */}
            <AnimatePresence>
                {showSplash && (
                    <SplashScreen onComplete={() => setShowSplash(false)} />
                )}
            </AnimatePresence>

            {/* Custom Cursor Glow */}
            <div
                className="cursor-glow hidden md:block"
                style={{ left: cursorPos.x, top: cursorPos.y }}
            />
            <div
                className={`cursor-glow-outer hidden md:block ${isHovering ? 'hovering' : ''}`}
                style={{ left: cursorPos.x, top: cursorPos.y }}
            />

            {/* Main Content - Hidden during splash */}
            <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#F7F5F0] text-[#1C1C1C]'} ${showSplash ? 'opacity-0' : 'opacity-100'}`}>

                {/* Reading Progress Bar */}
                <div
                    className="reading-progress-bar"
                    style={{ width: `${readingProgress}%` }}
                />

                {/* ===== NAVIGATION ===== */}
                <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? (isDarkMode ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-sm border-b border-white/10' : 'bg-[#F7F5F0]/95 backdrop-blur-md shadow-sm')
                    : ''
                    }`}>
                    <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
                        <a href="#" className="flex items-center gap-3 font-display text-xl font-medium">
                            <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-xl object-cover" />
                            Ambuj Kumar Tripathi
                        </a>

                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => {
                                const sectionId = link.href.replace('#', '');
                                const isActive = activeSection === sectionId;
                                return (
                                    <a key={link.href} href={link.href}
                                        className={`text-sm font-medium transition-all duration-300 link-hover ${isActive
                                            ? 'text-[#C4785A]'
                                            : isDarkMode
                                                ? 'text-gray-300 hover:text-white'
                                                : 'text-[#5A5855] hover:text-[#1C1C1C]'
                                            }`}>
                                        {link.label}
                                    </a>
                                );
                            })}
                            <a href="#contact" className="btn btn-primary text-sm">
                                Let's Talk
                            </a>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-black/5 hover:bg-black/10 text-gray-600'}`}
                                aria-label="Toggle Dark Mode"
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                        </div>

                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden p-2 ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: '100%' }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: '100%' }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className={`fixed inset-0 z-40 md:hidden pt-24 px-6 flex flex-col gap-6 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#F7F5F0]'}`}
                            >
                                {navLinks.map((link) => (
                                    <a key={link.href} href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-2xl font-display font-medium border-b pb-4 ${isDarkMode ? 'text-white border-white/10' : 'text-[#1C1C1C] border-[#1C1C1C]/10'}`}>
                                        {link.label}
                                    </a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>

                {/* ===== HERO SECTION ===== */}
                <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                    {/* Decorative Background Elements with Parallax */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Gradient orb top right - moves slower */}
                        <div
                            className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#C4785A]/10 to-transparent rounded-full blur-3xl"
                            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                        ></div>
                        {/* Gradient orb bottom left - moves faster */}
                        <div
                            className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#E8E4DB] to-transparent rounded-full blur-3xl"
                            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
                        ></div>
                        {/* Subtle grid pattern */}
                        <div className="absolute inset-0 opacity-[0.02]" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231C1C1C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                        {/* Floating animated shapes with parallax */}
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-40 left-20 w-4 h-4 bg-[#C4785A]/30 rounded-full"
                            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
                        ></motion.div>
                        <motion.div
                            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute top-60 right-40 w-6 h-6 border-2 border-[#1C1C1C]/10 rounded-lg"
                        ></motion.div>
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-40 left-1/4 w-3 h-3 bg-[#1C1C1C]/10 rounded-full"
                        ></motion.div>
                    </div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-3 gap-12 items-start">

                            {/* Left: Text Content (2 cols) */}
                            <div className="lg:col-span-2 space-y-8">
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="section-eyebrow"
                                >
                                    AI Engineer & Developer
                                </motion.p>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.1]"
                                >
                                    Building intelligent<br />
                                    <span className="text-[#C4785A]">digital experiences</span>
                                </motion.h1>

                                {/* Typewriter */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg text-[#5A5855] max-w-xl"
                                >
                                    <span className={isDarkMode ? "text-white" : "text-[#1C1C1C]"}>{displayText}</span>
                                    <span className="text-[#C4785A] animate-pulse">|</span>
                                </motion.div>

                                {/* Buttons + QR Placeholder */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-wrap items-center gap-4 pt-4"
                                >
                                    <a href="#work" className="btn btn-primary">
                                        View My Work
                                        <ArrowRight size={16} />
                                    </a>
                                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`btn ${isDarkMode ? 'bg-[#1C1C1C] text-white border border-white/20 hover:bg-[#333]' : 'btn-outline'}`}>
                                        <ExternalLink size={16} />
                                        View Resume
                                    </a>

                                    <button
                                        onClick={handleInstallClick}
                                        className={`btn ${isDarkMode ? 'bg-[#1C1C1C] text-white border border-white/20 hover:bg-[#333]' : 'btn-outline'}`}
                                    >
                                        <Download size={16} />
                                        Install App
                                    </button>

                                    <div className="group relative w-20 h-20" title="Scan to view Resume">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C4785A] to-[#E8A87C] rounded-xl opacity-30 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                                        <div className="relative w-full h-full bg-white rounded-xl p-1 flex items-center justify-center overflow-hidden">
                                            <img
                                                src="/qr-code.jpg"
                                                alt="Resume QR"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Social Links with Brand Colors */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex gap-3 pt-6"
                                >
                                    {/* GitHub - Black */}
                                    <a href="https://github.com/Ambuj123-lab" target="_blank" rel="noopener noreferrer"
                                        className="p-3 bg-[#1C1C1C] text-white rounded-full hover:bg-[#333] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                        <Github size={20} />
                                    </a>
                                    {/* LinkedIn - Blue */}
                                    <a href="https://www.linkedin.com/in/ambuj-tripathi-042b4a118/" target="_blank" rel="noopener noreferrer"
                                        className="p-3 bg-[#0A66C2] text-white rounded-full hover:bg-[#004182] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                        <Linkedin size={20} />
                                    </a>
                                    {/* Email - Red */}
                                    <a href="mailto:kumarambuj8@gmail.com"
                                        className="p-3 bg-[#EA4335] text-white rounded-full hover:bg-[#C5221F] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                        <Mail size={20} />
                                    </a>
                                    {/* Resume View Button - Animated */}
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#C4785A] to-[#E8A87C] text-white rounded-full hover:shadow-xl transition-all shadow-lg hover:-translate-y-1 font-medium text-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                        <span className="group-hover:tracking-wider transition-all">View Resume</span>
                                    </a>

                                </motion.div>
                            </div>

                            {/* Right: Terminal + Status */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="lg:col-span-1 space-y-4"
                            >
                                {/* Open to Work - Compact */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-gradient-to-r from-[#1C1C1C] to-[#2D2D2D] p-4 rounded-2xl text-white relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#C4785A]/20 rounded-full blur-2xl"></div>
                                    <div className="relative flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <div>
                                                <span className="text-green-400 text-sm font-medium">Open to Work</span>
                                                <p className="text-white/50 text-xs">AI/ML • Full Stack • Remote</p>
                                            </div>
                                        </div>
                                        <span className="text-[#C4785A] text-2xl">💼</span>
                                    </div>
                                </motion.div>

                                {/* Animated Terminal - Full Width */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <AnimatedTerminal />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===== STATS MARQUEE ===== */}
                <section className={`py-4 overflow-hidden ${isDarkMode ? 'bg-[#111]' : 'bg-[#E8E4DB]'}`}>
                    <div className="stats-marquee-container">
                        <div className="stats-marquee-track">
                            {[...Array(2)].map((_, setIndex) => (
                                <div key={setIndex} className="flex items-center">
                                    <div className={`stats-marquee-item ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                        <span className="text-[#C4785A]">🚀</span> 8+ AI Projects Built
                                    </div>
                                    <div className="stats-marquee-divider"></div>
                                    <div className={`stats-marquee-item ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                        <span className="text-[#C4785A]">🎖️</span> 15+ Certifications
                                    </div>
                                    <div className="stats-marquee-divider"></div>
                                    <div className={`stats-marquee-item ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                        <span className="text-[#C4785A]">🤖</span> LLM & RAG Expert
                                    </div>
                                    <div className="stats-marquee-divider"></div>
                                    <div className={`stats-marquee-item ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                        <span className="text-[#C4785A]">💻</span> Full Stack Developer
                                    </div>
                                    <div className="stats-marquee-divider"></div>
                                    <div className={`stats-marquee-item ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                        <span className="text-[#C4785A]">🌍</span> Open to Remote Work
                                    </div>
                                    <div className="stats-marquee-divider"></div>
                                    <div className={`stats-marquee-item ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                        <span className="text-[#C4785A]">⚡</span> Python & React
                                    </div>
                                    <div className="stats-marquee-divider"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== TECH STACK LOGO MARQUEE ===== */}
                <section className={`py-8 overflow-hidden ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                    <div className="max-w-6xl mx-auto px-6 mb-4">
                        <p className={`text-center text-xs uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-[#5A5855]'}`}>
                            Powered by Industry-Leading Technologies
                        </p>
                    </div>
                    <div className="relative">
                        {/* Gradient overlays */}
                        <div className={`absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${isDarkMode ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`}></div>
                        <div className={`absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${isDarkMode ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent' : 'bg-gradient-to-l from-white to-transparent'}`}></div>

                        <div className="flex animate-marquee">
                            {[...Array(2)].map((_, setIndex) => (
                                <div key={setIndex} className="flex items-center gap-12 px-6">
                                    {[
                                        { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                                        { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                                        { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
                                        { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                                        { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
                                        { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
                                        { name: 'LangChain', logo: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4' },
                                        { name: 'Langfuse', logo: 'https://avatars.githubusercontent.com/u/121682676?s=200&v=4' },
                                        { name: 'ChromaDB', logo: 'https://avatars.githubusercontent.com/u/120325917?s=200&v=4' },
                                        { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
                                    ].map((tech, index) => (
                                        <div
                                            key={`${setIndex}-${index}`}
                                            className="group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110"
                                        >
                                            <img
                                                src={tech.logo}
                                                alt={tech.name}
                                                className="w-8 h-8 object-contain transition-all duration-300 hover:scale-110"
                                            />
                                            <span className={`text-sm font-medium transition-opacity ${isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C]'}`}>
                                                {tech.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== ABOUT SECTION ===== */}
                <section className="py-20 px-6" id="about">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <p className="section-eyebrow">About</p>
                                <h2 className={`text-4xl md:text-5xl font-display mb-6 ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                    Crafting AI solutions<br />with purpose
                                </h2>
                            </div>
                            <div className={`space-y-6 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>
                                <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                    I'm an AI Engineer & Full Stack Developer with a passion for building intelligent systems that solve real problems.
                                </p>
                                <p>
                                    With experience spanning from telecom infrastructure to cutting-edge AI, I bring operational discipline and creative problem-solving to every project. My journey has taken me from fiber optic networks to large language models.
                                </p>
                                <button onClick={() => setIsPWAOpen(true)} className="text-[#C4785A] font-medium flex items-center gap-2 hover:gap-3 transition-all">
                                    Learn about this portfolio
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Animated Stats Counter Cards */}
                        <motion.div
                            className="grid grid-cols-3 gap-4 mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {[
                                { number: 8, suffix: '+', label: 'AI Projects', icon: '🚀' },
                                { number: 15, suffix: '+', label: 'Certifications', icon: '🎖️' },
                                { number: 5, suffix: '+', label: 'Years Exp', icon: '💼' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                                    className={`text-center p-4 md:p-6 rounded-2xl border transition-all hover:scale-105 ${isDarkMode
                                        ? 'bg-[#1C1C1C] border-white/10 hover:border-[#C4785A]/50'
                                        : 'bg-white border-[#E8E4DB] hover:border-[#C4785A]/50'
                                        }`}
                                >
                                    <span className="text-2xl md:text-3xl mb-2 block">{stat.icon}</span>
                                    <motion.span
                                        className="text-3xl md:text-4xl font-display font-bold text-[#C4785A] block"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.span
                                            initial={{ opacity: 1 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            onViewportEnter={() => {
                                                const el = document.getElementById(`counter-${index}`);
                                                if (el && !el.dataset.animated) {
                                                    el.dataset.animated = 'true';
                                                    let current = 0;
                                                    const target = stat.number;
                                                    const duration = 1500;
                                                    const step = target / (duration / 50);
                                                    const interval = setInterval(() => {
                                                        current += step;
                                                        if (current >= target) {
                                                            current = target;
                                                            clearInterval(interval);
                                                        }
                                                        el.textContent = Math.floor(current) + stat.suffix;
                                                    }, 50);
                                                }
                                            }}
                                        >
                                            <span id={`counter-${index}`}>0{stat.suffix}</span>
                                        </motion.span>
                                    </motion.span>
                                    <span className={`text-xs md:text-sm mt-1 block ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Skills Grid - All skills */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            {SKILLS_LIST.map((skill, index) => (
                                <BentoCard key={index} variant={isDarkMode ? 'dark' : 'light'} delay={0.1 * index} className="group border border-transparent hover:border-[#C4785A]/30 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[#C4785A] text-sm font-medium">0{index + 1}</span>
                                        <i className={`${skill.icon} text-xl group-hover:text-[#C4785A] transition-colors ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}></i>
                                    </div>
                                    <h4 className={`font-display text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>{skill.category}</h4>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>{skill.desc}</p>
                                </BentoCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== WORK / PROJECTS SECTION - ALL PROJECTS ===== */}
                <section className={`py-20 px-6 ${isDarkMode ? 'bg-[#050505]' : 'bg-[#F7F5F0]'}`} id="work">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
                            <div>
                                <p className="section-eyebrow !text-[#C4785A]">Selected Work</p>
                                <h2 className={`text-4xl md:text-5xl font-display ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                    Featured Projects
                                </h2>
                            </div>
                            <p className="text-[#5A5855] max-w-md">
                                A collection of {PROJECTS_DATA.length} projects showcasing my expertise in AI, full-stack development, and problem-solving.
                            </p>
                        </div>

                        {/* ALL PROJECTS - No slicing */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {PROJECTS_DATA.map((project, index) => (
                                <motion.a
                                    key={index}
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                                    whileHover={{
                                        scale: 1.02,
                                        y: -5,
                                    }}
                                    className="group block p-4 rounded-xl transition-all duration-300 tilt-card glow-hover"
                                >
                                    <div className="img-reveal mb-5">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full aspect-video object-cover"
                                        />
                                    </div>
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className={`font-display text-xl mb-2 group-hover:text-[#C4785A] transition-colors ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-[#5A5855] line-clamp-2 mb-3">{project.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className={isDarkMode ? "tag-dark" : "tag"}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <ExternalLink size={18} className="text-[#5A5855] group-hover:text-[#C4785A] transition-colors flex-shrink-0" />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== EXPERIENCE SECTION ===== */}
                <section className="py-20 px-6" id="experience" >
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-3 gap-16">
                            <div>
                                <p className="section-eyebrow">Experience</p>
                                <h2 className={`text-4xl font-display mb-4 ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>My Journey</h2>
                                <p className={isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}>
                                    From telecom infrastructure to AI engineering — a diverse career path.
                                </p>
                            </div>

                            <div className="lg:col-span-2 space-y-8">
                                {EXPERIENCE_DATA.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="flex gap-6 group"
                                    >
                                        <div className="pt-2">
                                            <div className="timeline-dot group-hover:scale-125 transition-transform"></div>
                                        </div>
                                        <div className={`flex-1 pb-8 border-b last:border-0 ${isDarkMode ? 'border-white/10' : 'border-[#E8E4DB]'}`}>
                                            <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                                <h4 className={`font-display text-lg ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>{exp.title}</h4>
                                                <span className="text-sm text-[#C4785A] font-medium">{exp.period}</span>
                                            </div>
                                            <p className={`mb-3 ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>{exp.company}</p>
                                            <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>
                                                {exp.achievements.slice(0, 2).map((ach, i) => (
                                                    <li key={i} className="flex gap-2">
                                                        <span className="text-[#C4785A]">→</span>
                                                        {ach}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== CERTIFICATIONS ===== */}
                <section className={`py-20 px-6 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`} >
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="section-eyebrow">Credentials</p>
                            <h2 className={`text-4xl font-display ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>Certifications</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {CERTIFICATES_DATA.slice(0, 8).map((cert, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => openViewer(index)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * index }}
                                    className={`cursor-pointer group p-4 border rounded-xl transition-all ${isDarkMode ? 'border-white/10 hover:bg-[#1C1C1C]' : 'border-[#E8E4DB] hover:bg-[#F7F5F0]'}`}
                                >
                                    <div className={`aspect-video rounded-lg overflow-hidden mb-3 flex items-center justify-center p-3 ${isDarkMode ? 'bg-[#1C1C1C]' : 'bg-[#F7F5F0]'}`}>
                                        <img src={cert.src} alt={cert.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                                    </div>
                                    <h4 className={`text-xs font-medium line-clamp-1 group-hover:text-[#C4785A] transition-colors ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>{cert.title}</h4>
                                    <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-[#5A5855]'}`}>{cert.provider}</p>
                                </motion.div>
                            ))}
                        </div>

                        {CERTIFICATES_DATA.length > 8 && (
                            <div className="text-center mt-8">
                                <button onClick={() => openViewer(0)} className={`btn ${isDarkMode ? 'bg-[#1C1C1C] text-white border border-white/20 hover:bg-[#333]' : 'btn-outline'}`}>
                                    View All Certificates
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* ===== ENGINEERING INSIGHTS SECTION ===== */}
                <section className={`py-20 px-6 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`} id="blog">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
                            <div>
                                <p className="section-eyebrow !text-[#C4785A]">Engineering Insights</p>
                                <h2 className={`text-4xl md:text-5xl font-display ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                    System Design Notes
                                </h2>
                            </div>
                            <p className={`max-w-md ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>
                                Architectural decisions and lessons learned from production AI deployments.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    id: 1,
                                    category: "RAG Systems",
                                    title: "Trust but Verify: Designing Reliable RAG Systems",
                                    content: "Production lessons from building enterprise-grade RAG systems with hallucination control, source citations, circuit breakers, rate-limit–aware embeddings, and real-time PII masking. Focused on reliability, observability, and compliance-first AI design.",
                                    cta: "View System Design",
                                    link: "https://citizen-safety-ai-assistant.vercel.app/"
                                },
                                {
                                    id: 2,
                                    category: "Career Journey",
                                    title: "From Telecom to AI Architect",
                                    content: "How a background in telecom systems, network engineering, and automation shaped my approach to building production AI systems — focusing on data flow, fault tolerance, security, and large-scale deployment of LLM-powered applications.",
                                    cta: "View Architecture Overview",
                                    link: "https://citizen-safety-ai-assistant.vercel.app/"
                                }
                            ].map((post) => (
                                <article key={post.id} className={`group rounded-2xl overflow-hidden border transition-all hover:shadow-xl ${isDarkMode ? 'bg-[#1C1C1C] border-white/10 hover:border-[#C4785A]/50' : 'bg-[#F7F5F0] border-transparent hover:border-[#C4785A]/30'}`}>
                                    <div className="p-6 sm:p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#C4785A]/10 text-[#C4785A]">{post.category}</span>
                                        </div>
                                        <h3 className={`text-xl sm:text-2xl font-display mb-3 group-hover:text-[#C4785A] transition-colors ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                            {post.title}
                                        </h3>
                                        <p className={`mb-6 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>
                                            {post.content}
                                        </p>
                                        <a
                                            href={post.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[#C4785A] font-medium text-sm group-hover:gap-3 transition-all"
                                        >
                                            {post.cta} <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== CONTACT CTA ===== */}
                <section className="py-24 px-6 bg-[#C4785A]" id="contact" >
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-white/70 text-sm uppercase tracking-widest mb-4"
                        >
                            Let's Connect
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6"
                        >
                            Have a project in mind?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/80 text-lg mb-10 max-w-xl mx-auto"
                        >
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <a href="mailto:kumarambuj8@gmail.com" className="btn btn-white" title="kumarambuj8@gmail.com">
                                <Mail size={18} />
                                Email Me
                            </a>
                            <a href="https://www.linkedin.com/in/ambuj-tripathi-042b4a118/" target="_blank" rel="noopener noreferrer" className="btn bg-white/20 text-white hover:bg-white/30">
                                <Linkedin size={18} />
                                LinkedIn
                            </a>
                        </motion.div>

                        {/* LinkedIn Profile Badge - User's Uploaded Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-12"
                        >
                            <a
                                href="https://www.linkedin.com/in/ambuj-tripathi-042b4a118/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src="/linkedin-badge.png"
                                    alt="Ambuj Tripathi LinkedIn Profile"
                                    className="max-w-[350px] w-full"
                                />
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ===== FOOTER ===== */}
                <footer className={`py-8 px-6 border-t ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#1C1C1C] border-[#333]'}`}>
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[#858585] text-sm">
                            © 2025 Ambuj Kumar Tripathi. All rights reserved. (v2.1 PWA Ready)
                        </p>
                        <div className="flex gap-6">
                            <a href="https://github.com/Ambuj123-lab" target="_blank" rel="noopener noreferrer" className="text-[#858585] hover:text-white transition-colors">
                                <Github size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/ambuj-tripathi-042b4a118/" target="_blank" rel="noopener noreferrer" className="text-[#858585] hover:text-[#0A66C2] transition-colors">
                                <Linkedin size={18} />
                            </a>
                            <a href="mailto:kumarambuj8@gmail.com" className="text-[#858585] hover:text-[#EA4335] transition-colors">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </footer>

                {/* Widgets & Modals */}
                <div className="relative z-50">
                    <ChatWidget />
                    <CommandPalette />
                </div>
                <PWAModal isOpen={isPWAOpen} onClose={() => setIsPWAOpen(false)} isDarkMode={isDarkMode} />
                <ImageViewer
                    isOpen={isViewerOpen}
                    onClose={() => setIsViewerOpen(false)}
                    images={CERTIFICATES_DATA}
                    currentIndex={currentImageIndex}
                    onNext={() => setCurrentImageIndex((prev) => (prev + 1) % CERTIFICATES_DATA.length)}
                    onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length)}
                />

                {/* Scroll to Top Button */}
                <AnimatePresence>
                    {showScrollTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            onClick={scrollToTop}
                            className={`fixed bottom-24 right-6 z-40 p-3 rounded-full shadow-lg transition-colors ${isDarkMode ? 'bg-[#C4785A] hover:bg-[#A86548] text-white' : 'bg-[#1C1C1C] hover:bg-[#2D2D2D] text-white'}`}
                            aria-label="Scroll to top"
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ArrowUp size={22} />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Keyboard Shortcuts Hint - Desktop Only */}
                <AnimatePresence>
                    {showShortcutsHint ? (
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            onClick={() => setShowShortcutsHint(false)}
                            className="hidden md:flex fixed bottom-6 left-6 z-50 items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#1C1C1C] to-[#252525] rounded-xl shadow-2xl border border-[#C4785A]/20 cursor-pointer hover:border-[#C4785A]/40 transition-all group"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-[#C4785A] to-[#E8A87C] rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-white text-sm">⌘</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 text-xs">
                                    <kbd className="px-2 py-1 bg-[#C4785A]/20 rounded text-[#C4785A] border border-[#C4785A]/30 font-medium">Ctrl</kbd>
                                    <span className="text-gray-500">+</span>
                                    <kbd className="px-2 py-1 bg-[#C4785A]/20 rounded text-[#C4785A] border border-[#C4785A]/30 font-medium">K</kbd>
                                    <span className="text-gray-400 ml-1">Quick Search</span>
                                </div>
                                <span className="text-gray-500 text-[10px] mt-0.5">Press 1-4 for quick nav</span>
                            </div>
                            <span className="text-gray-500 text-xs group-hover:text-white transition-colors">×</span>
                        </motion.div>
                    ) : (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setShowShortcutsHint(true)}
                            className="hidden md:flex fixed bottom-6 left-6 z-50 w-10 h-10 bg-gradient-to-br from-[#C4785A] to-[#E8A87C] rounded-xl items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            title="Show keyboard shortcuts"
                        >
                            <span className="text-white text-sm">⌘</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default App;
