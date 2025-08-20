"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const faqData = [
    {
        id: 1,
        question: "What products does Mimaansa source?",
        answer: "We specialize in sourcing apparel, home furnishings, fabrics, and lifestyle accessories from India—ranging from high-street fashion and workwear to artisanal décor and leather goods."
    },
    {
        id: 2,
        question: "Who can work with Mimaansa?",
        answer: "We collaborate with businesses globally, from independent brands to established retailers. Whether you need low MOQs or large-scale production, we tailor solutions to your business size and goals."
    },
    {
        id: 3,
        question: "How do you ensure quality and ethical production?",
        answer: "We conduct multi-stage quality checks and only partner with ethically vetted factories. Transparency and responsible sourcing are core to our process."
    },
    {
        id: 4,
        question: "Can you support product development and customization?",
        answer: "Yes, from initial concept and material sourcing to sampling and prototyping—we help bring your ideas to life while keeping production feasible."
    },
    {
        id: 5,
        question: "What's the typical timeline for sourcing and production?",
        answer: "We provide clear production schedules and regular updates throughout the process. Timelines vary by product, but we ensure transparency at every stage."
    }
]

export default function FAQSection() {
    const [openItems, setOpenItems] = useState(new Set([1])) // First item open by default

    const toggleItem = (id) => {
        const newOpenItems = new Set(openItems)
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id)
        } else {
            newOpenItems.add(id)
        }
        setOpenItems(newOpenItems)
    }

    return (
        <div className="py-20 bg-stone-100" style={{ backgroundColor: '#f5f1eb' }}>
            <div className="max-w-[90%] mx-auto px-6">
                {/* Header - Exact match */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30, rotate: 3 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 60,
                        mass: 1.5,
                        delay: 0.1,
                    }}
                    viewport={{ once: true, amount: 0.5 }} // Only runs once when 50% in view
                >
                    <h2 className="text-4xl md:text-5xl font-normal text-gray-800 tracking-wide leading-tight">
                        {/* Custom animation for "FREQUENT" */}
                        <motion.span
                        >
                            FREQUENT
                        </motion.span>
                        <br />
                        {/* Custom animation for "ASKED QUESTIONS" */}
                        <motion.span

                        >
                            ASKED QUESTIONS
                        </motion.span>
                    </h2>
                </motion.div>

                {/* FAQ Items - Exact styling */}
                <div className="space-y-0">
                    {faqData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="border border-gray-800 bg-transparent"
                            style={{ borderWidth: "1px" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Question Header */}
                            <motion.button
                                className="w-full px-6 py-5 text-left flex items-center justify-between bg-transparent hover:bg-black/5 transition-colors duration-200"
                                onClick={() => toggleItem(item.id)}
                            >
                                <span className="text-gray-800 font-normal text-lg pr-4 leading-relaxed">{item.question}</span>

                                {/* X Icon - Exact match */}
                                <motion.div
                                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center"
                                    animate={{
                                        rotate: openItems.has(item.id) ? 0 : 45,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <div className="relative w-4 h-4">
                                        {/* X lines */}
                                        <div className="absolute top-1/2 left-1/2 w-4 h-px bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
                                        <div className="absolute top-1/2 left-1/2 w-4 h-px bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 -rotate-45" />
                                    </div>
                                </motion.div>
                            </motion.button>

                            {/* Answer Content */}
                            <AnimatePresence>
                                {openItems.has(item.id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeInOut",
                                            height: { duration: 0.4 },
                                            opacity: { duration: 0.3 },
                                        }}
                                        className="overflow-hidden"
                                    >
                                        {/* Separator line */}
                                        <div className="border-t border-gray-800 mx-6" style={{ borderWidth: "1px" }} />

                                        <div className="px-6 py-5">
                                            <motion.p
                                                className="text-gray-700 leading-relaxed text-lg"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                            >
                                                {item.answer}
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
