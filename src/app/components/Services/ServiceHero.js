'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ServicesIntro from './ServicesIntro'

const ServiceHero = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    const section1Scale = useTransform(scrollYProgress, [0, 0], [1.1, 1])
    const section1Y = useTransform(scrollYProgress, [0, 1], [100, 0])

    const messages = ['[Scroll for more]', '[Scroll for more]']

    return (
        <div ref={containerRef} className="relative h-[200vh]">
            {/* Hero Section */}
            <section className="sticky top-0 h-screen w-full bg-[url(/services/servicehero.jpg)] bg-cover bg-[center_70%] z-10">
                <div className="h-full w-full bg-black/50">
                    <div className="h-full w-full flex flex-col items-center justify-end px-4 sm:px-6 md:px-8">
                        <div className="max-w-[95%] flex flex-col lg:flex-row lg:justify-between pb-3 gap-4">
                            {/* Title */}
                            <div className="w-full lg:w-2/3 flex items-end">
                                <h2 className="text-white uppercase leading-tight lg:text-left">
                                    OUR SERVICES & PROCESS
                                </h2>
                            </div>

                            {/* Description + scroll message */}
                            <div className="w-full lg:w-1/3 flex flex-col gap-3 text-center lg:text-left justify-end">
                                {/* rely on global base/sm sizes; only nudge at md/lg if needed */}
                                <span className="text-white leading-relaxed md:text-lg lg:text-xl">
                                    We help fashion brands create responsibly—with transparency, intention, and impact at every step.
                                </span>

                                <div className="overflow-hidden h-[1.5em] inline-block mx-auto lg:mx-0">
                                    <motion.div
                                        initial={{ y: 0 }}
                                        animate={{ y: `-${(messages.length - 1) * 100}%` }}
                                        transition={{
                                            duration: messages.length * 1.2,
                                            delay: 0.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className="flex flex-col"
                                    >
                                        {messages.map((msg, i) => (
                                            <span
                                                key={i}
                                                className="text-white whitespace-nowrap md:text-base lg:text-lg"
                                            >
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
                    transformOrigin: 'top center',
                }}
            >
                <ServicesIntro />
            </motion.section>
        </div>
    )
}

export default ServiceHero
