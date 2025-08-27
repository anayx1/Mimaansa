'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

const AboutAccordianSection = () => {
    const [activeAccordion, setActiveAccordion] = useState(0)

    const accordionData = [
        {
            id: 0,
            title: "Integrity & Transparency",
            content: "We believe in honest communication, fair dealings, and total transparency. Clients are kept informed at each step, and we uphold the highest ethical standards in all operations.",
            image: "/about/acc/integrity.png"
        },
        {
            id: 1,
            title: "Quality Commitment",
            content: "We never compromise on quality. From supplier selection to final inspection, we focus on delivering products that meet or exceed expectations. Continuous improvement is part of our culture.",
            image: "/about/acc/quality.png"
        },
        {
            id: 2,
            title: "Client-Centric Approach",
            content: "Your goals are our goals. We listen carefully and tailor our solutions to meet your specific needs. Building long-term relationships with our clients - based on trust and success - is what drives us every day.",
            image: "/about/acc/cc.png"
        },
        {
            id: 3,
            title: "Respect & Fairness",
            content: "We treat all stakeholders - clients, suppliers, and employees - with respect. We choose to work with manufacturers who provide safe working conditions and fair wages, promoting ethical sourcing in every project.",
            image: "/about/acc/respect.png"
        },
        {
            id: 4,
            title: "Collaboration & Innovation",
            content: "Sourcing is a team effort. We collaborate closely with you and with our suppliers, fostering innovation in product development and problem-solving to achieve the best outcomes.",
            image: "/about/acc/collaboration.png"
        },
    ]

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? -1 : index)
    }

    return (
        <section className="min-h-screen bg-primary py-20 sm:py-16 lg:py-20 flex items-center justify-center overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                    <motion.h2
                        className="mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        VALUES
                    </motion.h2>
                    <motion.p
                        className=" text-secondary mx-auto max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Our core values guide every project and partnership
                    </motion.p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start w-full">
                    {/* Left Side - Image */}
                    <motion.div
                        className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] overflow-hidden rounded-lg"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeAccordion}
                                className="absolute inset-0"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <Image
                                    src={accordionData[activeAccordion]?.image || accordionData[0].image}
                                    alt={accordionData[activeAccordion]?.title || accordionData[0].title}
                                    fill
                                    className="object-cover"
                                    quality={100}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Right Side - Accordion */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {accordionData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="border-b border-secondary/20"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Accordion Header */}
                                <motion.button
                                    className="w-full py-4 sm:py-5 lg:py-6 flex items-center justify-between text-left focus:outline-none"
                                    onClick={() => toggleAccordion(index)}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.h3
                                        className="text-lg sm:text-xl md:text-2xl transition-colors duration-300"
                                        animate={{
                                            color: activeAccordion === index ? 'var(--color-secondary)' : '#27272A'
                                        }}
                                    >
                                        {item.title}
                                    </motion.h3>
                                    {/* Plus/Cross Icon */}
                                    <motion.div
                                        className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex items-center justify-center"
                                        animate={{
                                            rotate: activeAccordion === index ? 45 : 0
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <motion.div
                                            className="absolute w-4 sm:w-5 lg:w-6 h-0.5 bg-secondary"
                                        />
                                        <motion.div
                                            className="absolute w-0.5 h-4 sm:h-5 lg:h-6 bg-secondary"
                                        />
                                    </motion.div>
                                </motion.button>

                                {/* Accordion Content */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: activeAccordion === index ? 'auto' : 0,
                                        opacity: activeAccordion === index ? 1 : 0
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                        opacity: { duration: 0.3 }
                                    }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <motion.div
                                        className="pb-4 sm:pb-5 lg:pb-6 pr-4 sm:pr-6 lg:pr-12"
                                        initial={{ y: -20 }}
                                        animate={{
                                            y: activeAccordion === index ? 0 : -20
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="text-sm sm:text-base md:text-md text-secondary leading-relaxed">
                                            {item.content}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutAccordianSection
