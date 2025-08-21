'use client'
// components/CustomButton.jsx
import { motion } from "framer-motion";

export default function Button({ children, className = "" }) {
    return (
        <button
            type="button"
            className={`px-4 py-2 text-white rounded-sm transition-colors duration-300 cursor-pointer
                 hover:bg-white hover:text-gray-900 ${className}`}
        >
            {children}
        </button>
    );
}
export function ButtonDark({ children, className = "" }) {
    return (
        <motion.button
            whileHover={{
                scale: 1.0, // slight grow on hover
                backgroundColor: "var(--color-primary)",
                color: "var(--color-secondary)",
            }}
            transition={{
                type: "spring",
                stiffness: 300,  // controls speed
                damping: 20,     // controls bounce
                bounce: 0.2,     // matches your screenshot
                duration: 0.4,   // matches time setting
            }}
            className={`px-4 py-2 rounded bg-secondary text-primary text-lg font-medium
        border border-secondary
        ${className}`}
        >
            {children}
        </motion.button>
    );
}