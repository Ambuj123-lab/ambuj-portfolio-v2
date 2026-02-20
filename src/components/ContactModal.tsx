import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, isDarkMode }) => {
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
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    onClick={(e) => e.stopPropagation()}
                    className={`relative w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl ${isDarkMode ? 'bg-[#1C1C1C] border-white/10' : 'bg-white border-[#E8E4DB]'
                        }`}
                >
                    {/* Header */}
                    <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-[#E8E4DB]'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#C4785A]/10 flex items-center justify-center">
                                <Send className="w-5 h-5 text-[#C4785A]" />
                            </div>
                            <div>
                                <h3 className={`font-display text-xl ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>
                                    Send a Message
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}`}>
                                    I'll get back to you as soon as possible.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-black/5 text-gray-500'
                                }`}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-10 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h4 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#1C1C1C]'}`}>Message Sent!</h4>
                                <p className={isDarkMode ? 'text-gray-400' : 'text-[#5A5855]'}>
                                    Thank you for reaching out. I'll respond shortly.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#C4785A] transition-all ${isDarkMode
                                                ? 'bg-[#111] border-white/10 text-white placeholder-gray-500 hover:border-white/20'
                                                : 'bg-white border-[#E8E4DB] text-[#1C1C1C] placeholder-gray-400 hover:border-gray-300'
                                                }`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#C4785A] transition-all ${isDarkMode
                                                ? 'bg-[#111] border-white/10 text-white placeholder-gray-500 hover:border-white/20'
                                                : 'bg-white border-[#E8E4DB] text-[#1C1C1C] placeholder-gray-400 hover:border-gray-300'
                                                }`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="message" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Message
                                        </label>
                                        <span className={`text-xs ${formData.message.length > 450 ? 'text-[#C4785A]' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {formData.message.length}/500
                                        </span>
                                    </div>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        maxLength={500}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#C4785A] transition-all resize-none ${isDarkMode
                                                ? 'bg-[#111] border-white/10 text-white placeholder-gray-500 hover:border-white/20'
                                                : 'bg-white border-[#E8E4DB] text-[#1C1C1C] placeholder-gray-400 hover:border-gray-300'
                                            }`}
                                        placeholder="How can I help you?"
                                    />
                                </div>

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-500 text-sm"
                                    >
                                        <AlertCircle size={16} />
                                        <span>{errorMessage}</span>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#C4785A] to-[#E8A87C] text-white font-medium rounded-xl hover:shadow-lg transition-all hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
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
