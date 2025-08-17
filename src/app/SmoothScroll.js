"use client";
import { useRef, useLayoutEffect, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export default function SmoothScroll({ children }) {
    const contentRef = useRef(null);
    const [scrollHeight, setScrollHeight] = useState(0);

    useLayoutEffect(() => {
        if (contentRef.current) {
            setScrollHeight(contentRef.current.scrollHeight);
        }
    }, [children]);

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        mass: 0.1,
    });

    const y = useTransform(smoothProgress, (value) =>
        value * -((scrollHeight || 0) - window.innerHeight)
    );

    return (
        <>
            {/* Spacer for scrollbar */}
            <div style={{ height: scrollHeight }} />

            {/* motion layer (smooth scroll) */}
            <motion.div
                ref={contentRef}
                style={{
                    y,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    willChange: "transform",
                }}
            >
                {/* ✅ NEW: make one wrapper without transforms */}
                <div className="no-transform-wrapper" style={{ transform: "none" }}>
                    {children}
                </div>
            </motion.div>
        </>
    );
}
