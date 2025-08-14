'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const ParallaxFounderSection = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const leftContentY = useTransform(scrollYProgress, [0, 1], [200, -300])
    const imageY = useTransform(scrollYProgress, [0, 1], [-150, 150])

    return (
        <section
            ref={containerRef}
            className="min-h-screen bg-[#27272a] py-16 sm:py-20 md:py-32 overflow-hidden"
        >
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
                    
                    {/* Left Side - Text */}
                    <motion.div
                        className="space-y-6 sm:space-y-8 order-2 lg:order-1"
                        style={{ y: leftContentY }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-4 sm:space-y-6">
                            <motion.h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary"
                                viewport={{ once: true }}
                            >
                                FOUNDER
                            </motion.h2>

                            <motion.div
                                className="space-y-3 sm:space-y-4 text-base sm:text-lg text-secondary/80 leading-relaxed"
                                viewport={{ once: true }}
                            >
                                <p className="text-primary/70">
                                    <strong>Ms. Rafia Jain</strong> is an experienced apparel and textile sourcing specialist with a passion for people and ethical business. With over a decade in India's export industry, she launched Mimaansa to bring professionalism and trust to apparel and home furnishings export. She leads by example, combining industry expertise with warmth and empathy. As a working mother, she balances business leadership with family life, inspiring a people-first culture at Mimaansa. Under her guidance, the Mimaansa team shares her commitment to reliable service and integrity. She remains hands-on with the business, ensuring every partnership reflects Mimaansa's values.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Image */}
                    <div className="relative order-1 lg:order-2">
                        <div className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
                            <motion.div
                                className="w-full h-[150%]"
                                style={{
                                    y: imageY,
                                    scale: 1.1
                                }}
                            >
                                <Image
                                    src="/about/aboutowner.avif"
                                    alt="Ms. Rafia Jain - Founder of Mimaansa"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-secondary/10 rounded-full -z-10"></div>
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-secondary/5 rounded-full -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ParallaxFounderSection
