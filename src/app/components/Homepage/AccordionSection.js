'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

const AccordionSection = () => {
    const [activeAccordion, setActiveAccordion] = useState(0) // First item active by default

    const accordionData = [
        {
            id: 0,
            title: "Local Expertise, Global Standards",
            content: "Our on-ground team brings deep local knowledge and supplier relationships, while adhering to international quality and compliance standards. We understand the nuances of doing business in India and the expectations of global markets.",
            image: "/homepage/local.avif"
        },
        {
            id: 1,
            title: "Ethical & Transparent Practices",
            content: "We prioritise ethical sourcing from India at every step. All factories in our network are vetted for fair labour practices and environmental compliance. You receive full transparency - from cost breakdowns to production updates - ensuring trust and peace of mind.",
            image: "/homepage/ethical.jpg"
        },
        {
            id: 2,
            title: "End-to-End Support",
            content: "From concept through delivery, we manage the entire supply chain for you. Our comprehensive services mean you have a single point of contact overseeing product development, factory communications, quality control, and logistics. We tackle the complexities, so you don’t have to.",
            image: "/homepage/end2end.jpg"
        },
        {
            id: 3,
            title: "Quality Assurance",
            content: "We leave no stone unturned to secure quality. Our team conducts inspections at various levels and testing to ensure your products meet specifications and regulatory requirements. We stand by the quality of every shipment.",
            image: "/homepage/qa.jpg"
        },
        {
            id: 4,
            title: "Timely Delivery & Reliability",
            content: "With proactive order management and contingency planning, we ensure your orders are delivered on time. Our track record of on-time shipments and long-term client partnerships speaks to our reliability and commitment to your success.",
            image: "/homepage/timely.avif"
        },
    ]

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? -1 : index)
    }

    return (
        <section className="min-h-screen bg-primary py-20 flex items-center justify-center">
            <div className="container mx-auto px-8 w-[95%]">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-5xl lg:text-8xl mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        WHY CHOOSE US?

                    </motion.h2>
                    <motion.p
                        className="text-2xl text-secondary/70 mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Choosing Mimaansa as your India sourcing partner means you gain.

                    </motion.p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start w-full">
                    {/* Left Side - Image */}
                    <motion.div
                        className="relative h-[650px] overflow-hidden rounded-lg min-w-1/2"
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
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />

                                {/* Optional overlay for better text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Right Side - Accordion */}
                    <motion.div
                        className="space-y-4 min-w-1/2"
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
                                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none "
                                    onClick={() => toggleAccordion(index)}
                                    // whileHover={{ x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.h3
                                        className="text-2xl lg:text-2xl transition-colors duration-300"
                                        animate={{
                                            color: activeAccordion === index ? 'var(--color-secondary)' : '#27272A'
                                        }}
                                    >
                                        {item.title}
                                    </motion.h3>

                                    {/* Plus/Cross Icon with Smooth Rotation */}
                                    <motion.div
                                        className="relative w-8 h-8 flex items-center justify-center"
                                        animate={{
                                            rotate: activeAccordion === index ? 45 : 0
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        {/* Horizontal line */}
                                        <motion.div
                                            className="absolute w-6 h-0.5 bg-secondary"
                                            initial={{ scaleX: 1 }}
                                            animate={{
                                                backgroundColor: activeAccordion === index ? '#27272A' : '#27272A'
                                            }}
                                        />
                                        {/* Vertical line */}
                                        <motion.div
                                            className="absolute w-0.5 h-6 bg-secondary"
                                            animate={{
                                                scaleY: activeAccordion === index ? 1 : 1,
                                                backgroundColor: activeAccordion === index ? '#27272A' : '#27272A'
                                            }}
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
                                        className="pb-6 pr-12"
                                        initial={{ y: -20 }}
                                        animate={{
                                            y: activeAccordion === index ? 0 : -20
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="text-lg text-secondary/70 leading-relaxed">
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

export default AccordionSection
