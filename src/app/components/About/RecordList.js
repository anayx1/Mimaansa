"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const rows = [
    {
        number: "01",
        title: "EXPERIENCE",
        text: "Decade of combined industry experience in sourcing and exports.",
    },
    {
        number: "02",
        title: "GLOBAL REACH",
        text: "Projects delivered to over a dozen countries, with major markets in the US, Europe, and Australia.",
    },
    {
        number: "03",
        title: "SUPPLIER NETWORK",
        text: "A curated network of 50+ vetted factories across India, enabling us to source a broad variety of products with confidence in production quality and capabilities.",
    },
    {
        number: "04",
        title: "QUALITY MILESTONES",
        text: "98% on-time delivery rate and <1% product rejection rate in the past year – reflecting our commitment to consistency and deadline adherence.",
    },
    {
        number: "05",
        title: "SUSTAINABILITY",
        text: "We have facilitated numerous sustainable sourcing initiatives – from organic cotton apparel collections to eco-friendly home textiles – aligning with our clients’ sustainability goals.",
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const rowVariants = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0, transition: { ease: "easeInOut", duration: 0.8 } },
};

export default function  AnimatedList() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-8 section md:py-20 py-10 overflow-hidden h-auto"
        >
            {rows.map((row, index) => (
                <motion.div
                    key={index}
                    variants={rowVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 border-b border-secondary pb-5"
                >
                    {/* Left side: number + title */}
                    <div className="flex items-start gap-4">
                        <p className="text-secondary  text-sm md:text-xl ">{row.number}</p>

                        <h3 className="leading-snug break-words  text-3xl md:text-[40px]">{row.title}</h3>
                    </div>

                    {/* Right side: description */}
                    <div className="md:col-span-2">
                        <p className="text-secondary">{row.text}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
