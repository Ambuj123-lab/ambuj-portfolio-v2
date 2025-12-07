import { useState, useEffect } from 'react';
import {
    EXPERIENCE_DATA,
    PROJECTS_DATA,
    CERTIFICATES_DATA,
    SKILLS_LIST,
    TYPEWRITER_TITLES,
} from './constants';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Menu, X, ChevronRight, Moon, Sun, Download } from 'lucide-react';
import ChatWidget from './components/ChatWidget';
import ImageViewer from './components/ImageViewer';
import PWAModal from './components/PWAModal';
import BentoCard from './components/BentoCard';
import AnimatedTerminal from './components/AnimatedTerminal';
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
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme ? savedTheme === 'dark' : true;
        }
        return true;
    });
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

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
        }
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#F7F5F0] text-[#1C1C1C]'}`}>

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
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href}
                                className={`text-sm transition-colors link-hover ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-[#5A5855] hover:text-[#1C1C1C]'}`}>
                                {link.label}
                            </a>
                        ))}
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

                        {/* PWA Install Button */}
                        {deferredPrompt && (
                            <button
                                onClick={handleInstallClick}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-[#C4785A] to-[#E8A87C] text-white rounded-lg hover:opacity-90 transition-all animate-pulse"
                            >
                                <Download size={14} />
                                Install Portfolio
                            </button>
                        )}
                    </div>

                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="md:hidden bg-white border-t border-[#E8E4DB] p-6 space-y-4"
                        >
                            {navLinks.map((link) => (
                                <a key={link.href} href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-lg font-medium">
                                    {link.label}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ===== HERO SECTION ===== */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Gradient orb top right */}
                    <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#C4785A]/10 to-transparent rounded-full blur-3xl"></div>
                    {/* Gradient orb bottom left */}
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#E8E4DB] to-transparent rounded-full blur-3xl"></div>
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.02]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231C1C1C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                    {/* Floating animated shapes */}
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-40 left-20 w-4 h-4 bg-[#C4785A]/30 rounded-full"
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

                    {/* Skills Grid - All skills */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
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
                                transition={{ delay: 0.1 * index }}
                                className="group block"
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

            {/* ===== BLOG SECTION ===== */}
            <section className={`py-20 px-6 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`} id="blog">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
                        <div>
                            <p className="section-eyebrow !text-[#C4785A]">Thoughts & Insights</p>
                            <h2 className={`text-4xl md:text-5xl font-display ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                Latest Articles
                            </h2>
                        </div>
                        <p className={`max-w-md ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>
                            Exploring the intersection of AI, software engineering, and the future of tech.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                id: 1,
                                category: "AI & Code",
                                date: "Dec 8, 2025",
                                title: "The Trust But Verify Approach",
                                content: "We're living in exciting times! AI has moved from being just another tool to becoming our actual coding partner. But here's the thing – with great power comes great responsibility. It's crucial to understand that while AI can generate code at lightning speed, the role of the developer shifts to one of architect and auditor. We must verify every line, understand the logic, and ensure security compliance. This shift requires a new mindset, one where we treat AI suggestions as a junior developer's PR - promising, but needing review."
                            },
                            {
                                id: 2,
                                category: "Career",
                                date: "Nov 24, 2025",
                                title: "From Telecom to AI Architect",
                                content: "My journey reflects relentless self-learning, pragmatic AI integrations and hands-on deployment of LLMs in production. Known for building open-source projects. Starting in the telecom industry gave me a strong foundation in systems engineering and network architecture. Transitioning to AI wasn't just about learning new syntax; it was about understanding data flow, model architecture, and the ethical implications of automated decision-making. Today, I architect systems that leverage the best of both worlds."
                            }
                        ].map((post) => (
                            <article key={post.id} className={`group rounded-2xl overflow-hidden border transition-all hover:shadow-xl ${isDarkMode ? 'bg-[#1C1C1C] border-white/10 hover:border-[#C4785A]/50' : 'bg-[#F7F5F0] border-transparent hover:border-[#C4785A]/30'}`}>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#C4785A]/10 text-[#C4785A]">{post.category}</span>
                                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{post.date}</span>
                                    </div>
                                    <h3 className={`text-2xl font-display mb-3 group-hover:text-[#C4785A] transition-colors ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                        {post.title}
                                    </h3>
                                    <p className={`mb-6 ${expandedArticle === post.id ? '' : 'line-clamp-3'} ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>
                                        {post.content}
                                    </p>
                                    <button
                                        onClick={() => setExpandedArticle(expandedArticle === post.id ? null : post.id)}
                                        className="flex items-center gap-2 text-[#C4785A] font-medium text-sm group-hover:gap-3 transition-all"
                                    >
                                        {expandedArticle === post.id ? 'Read Less' : 'Read Article'} <ArrowRight size={16} />
                                    </button>
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
                        <a href="mailto:ambujraj248@gmail.com" className="btn btn-white">
                            <Mail size={18} />
                            Email Me
                        </a>
                        <a href="https://www.linkedin.com/in/ambuj-tripathi-042b4a118/" target="_blank" rel="noopener noreferrer" className="btn bg-white/20 text-white hover:bg-white/30">
                            <Linkedin size={18} />
                            LinkedIn
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className={`py-8 px-6 border-t ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#1C1C1C] border-[#333]'}`}>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#858585] text-sm">
                        © 2025 Ambuj Kumar Tripathi. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="https://github.com/Ambuj123-lab" target="_blank" rel="noopener noreferrer" className="text-[#858585] hover:text-white transition-colors">
                            <Github size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/ambuj-tripathi-042b4a118/" target="_blank" rel="noopener noreferrer" className="text-[#858585] hover:text-[#0A66C2] transition-colors">
                            <Linkedin size={18} />
                        </a>
                        <a href="mailto:ambujraj248@gmail.com" className="text-[#858585] hover:text-[#EA4335] transition-colors">
                            <Mail size={18} />
                        </a>
                    </div>
                </div>
            </footer>

            {/* Widgets & Modals */}
            <div className="relative z-50">
                <ChatWidget />
            </div>
            <PWAModal isOpen={isPWAOpen} onClose={() => setIsPWAOpen(false)} />
            <ImageViewer
                isOpen={isViewerOpen}
                onClose={() => setIsViewerOpen(false)}
                images={CERTIFICATES_DATA}
                currentIndex={currentImageIndex}
                onNext={() => setCurrentImageIndex((prev) => (prev + 1) % CERTIFICATES_DATA.length)}
                onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length)}
            />
        </div>
    );
}

export default App;
