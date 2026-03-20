import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Data
import { PROJECTS_DATA, CERTIFICATES_DATA } from './constants';

// Sections
import Navigation from './components/sections/Navigation';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsBentoGrid from './components/sections/ProjectsBentoGrid';
import ExperienceTimeline from './components/sections/ExperienceTimeline';
import CertificationsSection from './components/sections/CertificationsSection';
import EngineeringInsightsSection from './components/sections/EngineeringInsightsSection';
import FlipbookSection from './components/sections/FlipbookSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';

// Modals and Widgets
import ChatWidget from './components/ChatWidget';
import ImageViewer from './components/ImageViewer';
import PWAModal from './components/PWAModal';
import ArchitectureModal from './components/ArchitectureModal';
import CaseStudyModal from './components/CaseStudyModal';
import ContactModal from './components/ContactModal';
import CommandPalette from './components/CommandPalette';
import AgenticTrace from './components/AgenticTrace';
import SplashScreen from './components/SplashScreen';
import FloatingDock from './components/FloatingDock';
import { useMicroSounds } from './hooks/useMicroSounds';

export default function App() {
    // ---- STATE MANAGEMENT ----
    const [activeSection, setActiveSection] = useState('');
    const [showSplash, setShowSplash] = useState(true);
    
    // Modals
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPWAOpen, setIsPWAOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [archImage, setArchImage] = useState<string | null>(null);
    const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);

    // Micro Sounds
    const { playHover, playClick } = useMicroSounds();

    // Forced Dark Mode for Premium Technical Brutalism
    const isDarkMode = true;

    // ---- EFFECTS ----
    useEffect(() => {
        // Enforce dark mode class on html
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = 'var(--obsidian)';

        // Global Sound Effects
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button')) {
                playHover();
            }
        };
        const handleMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button')) {
                playClick();
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button')) {
                playClick();
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        
        // Track Scroll Spy for Navigation
        const handleScrollSpy = () => {
            const sections = ['work', 'about', 'experience', 'flipbook', 'blog', 'contact'];
            const scrollPosition = window.scrollY + 200;

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

        window.addEventListener('scroll', handleScrollSpy);
        return () => {
            window.removeEventListener('scroll', handleScrollSpy);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('touchstart', handleTouchStart);
        };
    }, [playClick, playHover]);

    // PWA Install Prompt
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
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
            deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
        } else {
            alert("To install the app:\n1. Click the 'Share' icon (iOS) or Menu (Android/Chrome)\n2. Select 'Add to Home Screen' or 'Install App'");
        }
    };

    return (
        <div className="app-container">
            {/* Splash Screen */}
            <AnimatePresence>
                {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
            </AnimatePresence>

            {/* Main Application Shell */}
            <div className={`transition-opacity duration-500 min-h-screen ${showSplash ? 'opacity-0' : 'opacity-100'} bg-[var(--obsidian)] text-white font-sans selection:bg-[var(--orange)] selection:text-[var(--obsidian)]`}>
                
                <Navigation activeSection={activeSection} />

                <main>
                    <HeroSection 
                        onContactClick={() => setIsContactModalOpen(true)} 
                        onInstallClick={handleInstallClick} 
                    />
                    
                    <div className="bg-[#050505] border-y border-[var(--glass-border)]">
                      <AgenticTrace />
                    </div>

                    <ProjectsBentoGrid 
                        projects={PROJECTS_DATA} 
                        isDarkMode={isDarkMode}
                        onOpenCaseStudy={(id) => setActiveCaseStudyId(id)}
                        onOpenArchitecture={(src) => setArchImage(src)}
                    />

                    <AboutSection 
                        onOpenPWA={() => setIsPWAOpen(true)} 
                        isDarkMode={isDarkMode} 
                    />

                    <ExperienceTimeline />

                    <FlipbookSection />

                    <CertificationsSection 
                        onOpenViewer={(index) => {
                            setCurrentImageIndex(index);
                            setIsViewerOpen(true);
                        }} 
                    />

                    <EngineeringInsightsSection 
                        onOpenArchitecture={(src) => setArchImage(src)} 
                    />

                    <ContactSection 
                        onOpenContact={() => setIsContactModalOpen(true)} 
                    />
                </main>

                <Footer onOpenContact={() => setIsContactModalOpen(true)} />

                {/* Overlays / Widgets */}
                <ChatWidget />
                <CommandPalette onOpenContact={() => setIsContactModalOpen(true)} />
                <FloatingDock />
                
                <PWAModal isOpen={isPWAOpen} onClose={() => setIsPWAOpen(false)} />
                
                <ImageViewer
                    isOpen={isViewerOpen}
                    onClose={() => setIsViewerOpen(false)}
                    images={CERTIFICATES_DATA}
                    currentIndex={currentImageIndex}
                    onNext={() => setCurrentImageIndex((prev) => (prev + 1) % CERTIFICATES_DATA.length)}
                    onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length)}
                />
                
                {archImage && (
                    <ArchitectureModal
                        imageSrc={archImage}
                        onClose={() => setArchImage(null)}
                        isDarkMode={isDarkMode}
                    />
                )}
                
                {activeCaseStudyId && (
                    <CaseStudyModal
                        caseStudyId={activeCaseStudyId}
                        onClose={() => setActiveCaseStudyId(null)}
                        isDarkMode={isDarkMode}
                    />
                )}
                
                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                />
            </div>
        </div>
    );
}
