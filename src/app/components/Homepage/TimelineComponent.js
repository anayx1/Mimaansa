'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const timelineData = [
    {
        id: "01",
        title: "INITIAL CONSULTATION",
        description: "We discuss your product needs, design ideas, and target prices."
    },
    {
        id: "02",
        title: "SUPPLIER MATCHING",
        description: "We shortlist trusted manufacturers that best fit your requirements (materials, scale, certifications) and obtain sample prototypes."
    },
    {
        id: "03",
        title: "QUOTATION & NEGOTIATION",
        description: "We present pricing from suppliers and negotiate terms to get you the best value while maintaining quality."
    },
    {
        id: "04",
        title: "PRODUCTION & ORDER MANAGEMENT",
        description: "Once you confirm, we oversee the entire sampling and production process, providing regular updates and addressing any issues promptly to keep everything on track."
    },
    {
        id: "05",
        title: "QUALITY ASSURANCE & DELIVERY",
        description: "Our inspectors perform quality control checks during and after production. We ensure compliance with your standards and arrange secure packaging, shipping, and all export documentation for a smooth delivery."
    }
]

export default function TimelineComponent() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.3", "end 0.7"]
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-6 tracking-wide">
                        PROCESS SNAPSHOT
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Our 5-step sourcing process ensures transparency and efficiency at every stage.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div ref={containerRef} className="relative">
                    {/* Desktop Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 bg-gray-300 h-full hidden md:block">
                        <motion.div
                            className="w-full bg-gray-800 origin-top"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Mobile Timeline Line */}
                    <div className="absolute left-6 transform -translate-x-0.5 w-0.5 bg-gray-300 h-full md:hidden">
                        <motion.div
                            className="w-full bg-gray-800 origin-top"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-15 md:space-y-15">
                        {timelineData.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                index={index}
                                isEven={index % 2 !== 0}
                                scrollYProgress={scrollYProgress}
                                totalItems={timelineData.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function TimelineItem({ item, index, isEven, scrollYProgress, totalItems }) {
  // Set threshold for each item in the range [0, 1]
  // For the last item, extend the threshold to cover the final scroll range
  const itemThreshold =
    index === totalItems - 1
      ? 1
      : index / (totalItems - 1)

  // Define the active range for this item
  const activeRangeStart = Math.max(0, itemThreshold - (index === totalItems - 1 ? 0.25 : 0.1))
  const activeRangeEnd = itemThreshold

  // Use useTransform to create a smooth active state based on scrollYProgress within active range
  const isActive = useTransform(scrollYProgress, [activeRangeStart, activeRangeEnd], [0, 1])

  // Animate colors and opacity based on isActive
  const textOpacity = useTransform(isActive, [0, 1], [0.4, 1])
  const titleColor = useTransform(isActive, [0, 1], ["rgb(156, 163, 175)", "rgb(31, 41, 55)"])
  const descriptionColor = useTransform(isActive, [0, 1], ["rgb(156, 163, 175)", "rgb(75, 85, 99)"])
  const numberColor = useTransform(isActive, [0, 1], ["rgb(156, 163, 175)", "rgb(107, 114, 128)"])
  const dotScale = useTransform(isActive, [0, 1], [0.8, 1.2])
  const dotColor = useTransform(isActive, [0, 1], ["rgb(156, 163, 175)", "rgb(31, 41, 55)"])

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Desktop Layout */}
            <div className="hidden md:block">
                <div className="flex items-center relative">
                    {isEven ? (
                        <>
                            {/* Content Left */}
                            <div className="w-1/2 pr-16">
                                <motion.div
                                    className="text-right"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    style={{ opacity: textOpacity }}
                                >
                                    <motion.span
                                        className="text-sm font-medium mb-3 block tracking-wider"
                                        style={{ color: numberColor }}
                                    >
                                        {item.id}
                                    </motion.span>
                                    <motion.h3
                                        className="text-2xl lg:text-xl mb-4 tracking-wide leading-tight"
                                        style={{ color: titleColor }}
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p
                                        className="leading-relaxed text-base lg:text-lg"
                                        style={{ color: descriptionColor }}
                                    >
                                        {item.description}
                                    </motion.p>
                                </motion.div>
                            </div>

                            {/* Timeline Dot */}
                            <motion.div
                                className="absolute left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center w-3 h-3 rounded-full border-4 border-gray-50 shadow-sm"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                viewport={{ once: true }}
                                style={{
                                    backgroundColor: dotColor,
                                    scale: dotScale
                                }}
                            />

                            {/* Empty Right */}
                            <div className="w-1/2" />
                        </>
                    ) : (
                        <>
                            {/* Empty Left */}
                            <div className="w-1/2" />

                            {/* Timeline Dot */}
                            <motion.div
                                className="absolute left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center w-3 h-3 rounded-full border-4 border-gray-50 shadow-sm"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                viewport={{ once: true }}
                                style={{
                                    backgroundColor: dotColor,
                                    scale: dotScale
                                }}
                            />

                            {/* Content Right */}
                            <div className="w-1/2 pl-16">
                                <motion.div
                                    className="text-left"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    style={{ opacity: textOpacity }}
                                >
                                    <motion.span
                                        className="text-sm font-medium mb-3 block tracking-wider"
                                        style={{ color: numberColor }}
                                    >
                                        {item.id}
                                    </motion.span>
                                    <motion.h3
                                        className="text-2xl lg:text-3xl font-light mb-4 tracking-wide leading-tight"
                                        style={{ color: titleColor }}
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p
                                        className="leading-relaxed text-base lg:text-lg"
                                        style={{ color: descriptionColor }}
                                    >
                                        {item.description}
                                    </motion.p>
                                </motion.div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
                <div className="flex items-start relative">
                    {/* Timeline Dot */}
                    <motion.div
                        className="absolute left-6 transform -translate-x-1/2 z-10 flex items-center justify-center w-3 h-3 rounded-full border-4 border-gray-50 shadow-sm mt-1"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        viewport={{ once: true }}
                        style={{
                            backgroundColor: dotColor,
                            scale: dotScale
                        }}
                    />

                    {/* Content */}
                    <motion.div
                        className="ml-16 flex-1"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{ opacity: textOpacity }}
                    >
                        <motion.span
                            className="text-sm font-medium mb-3 block tracking-wider"
                            style={{ color: numberColor }}
                        >
                            {item.id}
                        </motion.span>
                        <motion.h3
                            className="text-xl sm:text-2xl font-light mb-4 tracking-wide leading-tight"
                            style={{ color: titleColor }}
                        >
                            {item.title}
                        </motion.h3>
                        <motion.p
                            className="leading-relaxed text-sm sm:text-base"
                            style={{ color: descriptionColor }}
                        >
                            {item.description}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
