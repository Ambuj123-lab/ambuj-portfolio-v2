import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'light' | 'dark' | 'accent';
    delay?: number;
    id?: string;
}

export default function BentoCard({
    children,
    className = "",
    variant = 'light',
    delay = 0,
    id
}: CardProps) {

    const variantClass = {
        light: 'card-light',
        dark: 'card-dark',
        accent: 'card-accent'
    };

    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={`p-6 md:p-8 ${variantClass[variant]} ${className}`}
        >
            {children}
        </motion.div>
    );
}
