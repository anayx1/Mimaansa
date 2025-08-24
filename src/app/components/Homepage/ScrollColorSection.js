'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import CountUp from '../Counter'
import Image from 'next/image'
import Button from '../Button'
import Link from 'next/link'

const stats = [
    { value: 10, suffix: "+", label: "Years of Operations" },
    { value: 50, suffix: "+", label: "Global Clients" },
    { value: 50, suffix: "K+", label: "Units Shipped Annually" },
    { value: 25, suffix: "+", label: "Factory Partners" }
]

const LetterColorChange = () => {
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const text = "We are India based sourcing agency and export partner that specialises in apparel, home furnishings, fabrics, and lifestyle accessories. We help global brands, retailers' and wholesalers source high-quality products from India with ease and confidence. Our team manages every step – from finding the right suppliers to ensuring quality and on-time deliveries – so you can focus on growing your business."

    // Split text into words first
    const words = text.split(' ')

    // Calculate total character count for proper animation timing
    const totalChars = text.length

    return (
        <section className='min-h-screen bg-[#27272A] flex flex-col justify-center items-center'>
            <section ref={containerRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-6xl">
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-6">
                        Ethical Sourcing. Trusted Partnership. Indian Roots.
                    </h1>
                    <span className='w-full flex justify-center items-center'>
                        <p className="text-base sm:text-xl md:text-4xl lg:text-4xl leading-relaxed max-w-5xl text-center">
                            {words.map((word, wordIndex) => {
                                // Calculate the starting character index for this word
                                const wordStartIndex = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0)

                                return (
                                    <span key={wordIndex} className="inline-block mr-1">
                                        {word.split('').map((letter, letterIndex) => {
                                            const globalCharIndex = wordStartIndex + letterIndex

                                            const letterProgress = useTransform(
                                                scrollYProgress,
                                                [
                                                    globalCharIndex / totalChars,
                                                    (globalCharIndex + 1) / totalChars
                                                ],
                                                ['#666666', '#FFFFFF']
                                            )

                                            return (
                                                <motion.span
                                                    key={letterIndex}
                                                    style={{ color: letterProgress }}
                                                    className="inline-block"
                                                >
                                                    {letter}
                                                </motion.span>
                                            )
                                        })}
                                    </span>
                                )
                            })}
                        </p>
                    </span>
                </div>
            </section>


            {/* Stats Section */}
            <section className="w-full flex items-center justify-center md:min-h-[70dvh]">
                <div className="border-t border-b border-white/20 py-10">
                    <div className=" w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-20">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <div className="mb-4">
                                    <CountUp
                                        from={0}
                                        to={stat.value}
                                        suffix={stat.suffix}
                                        duration={2}
                                        className="text-4xl sm:text-5xl lg:text-7xl text-white"
                                    />
                                </div>
                                <p className="text-sm sm:text-base lg:text-xl text-gray-300 font-light leading-tight mx-auto">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="min-h-screen bg-secondary py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-[90%]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <motion.h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  leading-tight text-white"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                Your Trusted <br className='hidden md:block' />Partner for Ethical <br className='hidden md:block' />Sourcing from India
                            </motion.h2>

                            <div className='grid grid-cols-1 sm:grid-cols-2 mt-10 sm:mt-20 gap-6 sm:gap-0'>
                                <div className='flex justify-left items-center text-white text-lg sm:text-xl'>

                                    <Link href='/about-us'>
                                        <Button >
                                            About us
                                        </Button>
                                    </Link>
                                </div>


                                <motion.div
                                    className="space-y-4 sm:space-y-6 text-base sm:text-lg text-secondary/80 leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <p className='text-white'>
                                        Founded by industry experts, Mimaansa bridges the gap between international buyers and India's vast network of manufacturers. We combine local expertise with a warm, professional approach to make overseas sourcing straightforward. With us as your on-ground team in India, you gain access to India's diverse manufacturing base and reliable suppliers, backed by our commitment to ethical sourcing practices
                                    </p>
                                </motion.div>
                            </div>


                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                            className="overflow-hidden h-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-start justify-center lg:justify-end">
                                <Image
                                    src="/homepage/yourtrusted.avif"
                                    alt="Clothing display showcasing our products"
                                    width={800}
                                    height={800}
                                    className="w-full max-w-xs sm:max-w-sm md:max-w-[550px] lg:w-[430px] lg:h-[500px] object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default LetterColorChange
