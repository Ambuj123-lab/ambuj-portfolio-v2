import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

            if (!accessKey) {
                throw new Error("Access key is missing. Please contact the administrator.");
            }

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    ...formData,
                }),
            });

            const result = await response.json();

            if (response.status === 200) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                }, 3000);
            } else {
                throw new Error(result.message || "Something went wrong.");
            }
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || "Something went wrong. Please try again.");
            setTimeout(() => {
                setStatus('idle');
            }, 5000);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-8"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-4xl bg-[var(--obsidian)] border border-[var(--glass-border)] flex flex-col md:flex-row shadow-2xl overflow-hidden"
                >
                    {/* Left Side: Brutalist Text & Close */}
                    <div className="p-8 md:p-12 md:w-2/5 border-b md:border-b-0 md:border-r border-[var(--glass-border)] flex flex-col justify-between bg-[#050505]">
                        <div>
                            <button onClick={onClose} className="p-2 mb-8 bg-[var(--glass-border)] hover:bg-[var(--orange)] hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                            <p className="font-mono text-[var(--orange)] uppercase tracking-widest text-[10px] mb-4">
                                [ SECURE.CHANNEL ]
                            </p>
                            <h3 className="font-display text-4xl sm:text-5xl md:text-3xl lg:text-4xl text-white uppercase tracking-tighter leading-[0.9] mb-4 whitespace-nowrap flex items-center">
                                SEND MESSAGE
                            </h3>
                            <p className="font-mono text-xs text-[var(--zinc-muted)] leading-relaxed">
                                I'll get back to you as soon as possible. Fill in the details to proceed.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="p-8 md:p-12 md:w-3/5 bg-[var(--obsidian)]">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center py-10 text-center"
                            >
                                <CheckCircle2 size={64} className="text-[var(--orange)] mb-6" />
                                <h4 className="font-display text-3xl uppercase text-white tracking-tighter mb-2">Message Sent</h4>
                                <p className="font-mono text-sm text-[var(--zinc-muted)]">
                                    Thank you for reaching out. I'll respond shortly.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 flex flex-col h-full justify-between">
                                <div className="space-y-8">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-[var(--glass-border)] py-4 text-xl text-white font-mono placeholder-transparent focus:outline-none focus:border-[var(--orange)] transition-colors peer"
                                            placeholder="Name"
                                        />
                                        <label htmlFor="name" className="absolute left-0 -top-4 text-[10px] font-mono text-[var(--zinc-muted)] uppercase tracking-widest peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[var(--orange)] transition-all">
                                            Name
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-[var(--glass-border)] py-4 text-xl text-white font-mono placeholder-transparent focus:outline-none focus:border-[var(--orange)] transition-colors peer"
                                            placeholder="Email"
                                        />
                                        <label htmlFor="email" className="absolute left-0 -top-4 text-[10px] font-mono text-[var(--zinc-muted)] uppercase tracking-widest peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[var(--orange)] transition-all">
                                            Email
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <select
                                            id="template"
                                            className="w-full bg-[var(--obsidian)] border-b border-[var(--glass-border)] py-4 text-sm text-[var(--zinc-muted)] font-mono focus:outline-none focus:ring-0 focus:border-[var(--orange)] transition-colors cursor-pointer"
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    setFormData(prev => ({ ...prev, message: e.target.value }));
                                                }
                                                e.target.value = "";
                                            }}
                                            defaultValue=""
                                        >
                                            <option value="" disabled className="bg-[var(--obsidian)] text-[var(--zinc-muted)]">Select a quick message topic (Optional)...</option>
                                            <option value="Hi Ambuj, we're looking for an AI Engineer to build scalable systems. Let's connect!" className="bg-[var(--obsidian)] text-white">Hire for an AI Engineer role</option>
                                            <option value="Hi Ambuj, I'd love to discuss a potential opportunity in Generative AI/Full-Stack." className="bg-[var(--obsidian)] text-white">Generative AI Opportunity</option>
                                            <option value="Hello Ambuj, we have an exciting AI role that matches your profile." className="bg-[var(--obsidian)] text-white">Matching Job Profile</option>
                                            <option value="Hi Ambuj, I would like to discuss a freelance/consulting project." className="bg-[var(--obsidian)] text-white">Freelance / Consulting</option>
                                        </select>
                                    </div>

                                    <div className="relative group">
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={3}
                                            maxLength={500}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-[var(--glass-border)] py-4 text-lg text-white font-mono placeholder-transparent focus:outline-none focus:border-[var(--orange)] transition-colors resize-none peer"
                                            placeholder="Message"
                                        />
                                        <label htmlFor="message" className="absolute left-0 -top-4 text-[10px] font-mono text-[var(--zinc-muted)] uppercase tracking-widest peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[var(--orange)] transition-all">
                                            Message
                                        </label>
                                    </div>
                                </div>

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="flex items-center gap-2 p-4 border border-red-500/30 bg-red-500/5 text-red-500 mt-4 font-mono text-xs"
                                    >
                                        <AlertCircle size={14} />
                                        <span>[ERROR]: {errorMessage}</span>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full mt-8 py-6 bg-[var(--orange)] text-white hover:bg-white hover:text-[var(--obsidian)] border border-[var(--orange)] font-display text-xl uppercase tracking-widest transition-colors flex items-center justify-center gap-4 disabled:opacity-50"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            Executing...
                                        </>
                                    ) : (
                                        <>
                                            SEND MESSAGE <Send size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ContactModal;
