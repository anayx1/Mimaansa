'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ParallaxFounderSection from './SecondScroll'

const StackingHeroSection = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const section1Scale = useTransform(scrollYProgress, [0, 0], [1.1, 1])
    const section1Y = useTransform(scrollYProgress, [0, 1], [100, 0])

    const messages = [
        "[Scroll for more]",
        "[Scroll for more]",
    ];

    return (
        <div ref={containerRef} className="relative h-[200vh]">
            {/* Hero Section */}
            <section className="sticky top-0 h-screen w-full bg-[url(/about/heroabout.jpg)] bg-cover bg-[center_70%] z-10">
                <div className="h-full w-full bg-black/50">
                    <div className="h-full w-full flex flex-col items-center justify-end px-4 sm:px-6 md:px-8">
                        <div className="max-w-[95%] flex flex-col lg:flex-row lg:justify-between pb-5 gap-4">
                            {/* Title */}
                            <div className="w-full lg:w-2/3 flex items-end">
                                <h2 className="text-white text-4xl sm:text-5xl lg:text-8xl uppercase leading-tight text-center lg:text-left">
                                    About Us
                                </h2>
                            </div>
                            {/* Description + scroll message */}
                            <div className="w-full lg:w-1/3 flex flex-col gap-3 text-center lg:text-left">
                                <span className="text-white text-base sm:text-lg md:text-xl leading-relaxed">
                                    Mimaansa provides comprehensive services at each stage of the sourcing and production process. From apparel sourcing and home textile exports to fashion accessories sourcing in India, we handle it all. Here's a closer look at how we work and what we offer.
                                </span>
                                <div className="overflow-hidden h-[1.5em] inline-block mx-auto lg:mx-0">
                                    <motion.div
                                        initial={{ y: 0 }}
                                        animate={{ y: `-${(messages.length - 1) * 60}%` }}
                                        transition={{
                                            duration: messages.length * 1.2,
                                            delay: 0.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="flex flex-col"
                                    >
                                        {messages.map((msg, i) => (
                                            <span key={i} className="text-white text-sm sm:text-base">
                                                {msg}
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Section */}
            <motion.section
                className="sticky top-0 h-screen bg-[#1a1a1a] text-white z-20 max-w-full"
                style={{
                    scale: section1Scale,
                    y: section1Y,
                    transformOrigin: "top center"
                }}
            >
                <ParallaxFounderSection />
            </motion.section>
        </div>
    )
}

export default StackingHeroSection
