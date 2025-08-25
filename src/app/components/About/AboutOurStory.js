'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const OurStorySection = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false);

    const intervalRef = useRef(null)

    const images = [
        "/about/about2-min.jpg",
        "/about/aboutsec2-min.jpg",
        "/about/aboutsec21-min.jpg",
    ]

    const imageCount = images.length

    const nextSlide = useCallback(() => {
        if (imageCount === 0) return
        setCurrentIndex(prevIndex => (prevIndex + 1) % imageCount)
    }, [imageCount])

    useEffect(() => {
        if (isPlaying && imageCount > 1) {
            intervalRef.current = setInterval(nextSlide, 4000)
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isPlaying, nextSlide, imageCount])

    const handleMouseEnter = () => setIsPlaying(false)
    const handleMouseLeave = () => setIsPlaying(true)
    const handleImageLoad = () => setIsLoading(false)
    const shortText =
        "Mimaansa was founded to connect global businesses with India's rich manufacturing capabilities. Our founder recognized that while India is a top sourcing destination for apparel and textiles, navigating its supplier landscape can be complex for overseas buyers. Mimaansa bridges that gap by combining deep industry experience with local insight to make sourcing reliable and stress-free.";

    const extendedText =
        " Starting as a small team in India’s capital region, we’ve grown into a full-service sourcing and export agency serving clients across the USA, Europe, Australia, and more. Our journey is rooted in integrity, quality, and personal service. We value the strong relationships we’ve built with both clients and trusted Indian manufacturers who share our values. As India’s global sourcing appeal grows, we remain committed to offering dependable, personalized support that makes that opportunity accessible to all.";
    return (
        <section className="min-h-screen bg-primary py-16 sm:py-20 mt-[500px] md:mt-100 md:mb-10 overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
                    {/* Left Side */}
                    <motion.div
                        className="space-y-6 sm:space-y-8 flex flex-col justify-between h-full"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            className="text-center lg:text-left"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            OUR STORY
                        </motion.h2>

                        <motion.div
                            className="space-y-4 sm:space-y-6 md:pb-15"
                        >
                            <motion.p className=" text-secondary text-center lg:text-left">
                                {shortText}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.span
                                            key="extended"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <br />
                                            {extendedText}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.p>

                            {!isExpanded && (
                                <motion.button
                                    className="mx-auto lg:mx-0 mt-6 sm:mt-8 bg-secondary text-primary px-5 sm:px-6 py-2 text-base sm:text-lg hover:bg-primary hover:text-secondary hover:border hover:border-secondary transition-colors duration-300 rounded-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsExpanded(true)}
                                >
                                    Read More
                                </motion.button>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Carousel */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="relative h-[300px] sm:h-[400px] md:h-[650px] lg:h-[700px] overflow-hidden">
                            {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

                            <div className="relative w-full h-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        className="absolute inset-0 w-full h-full"
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.4, 0, 0.2, 1]
                                        }}
                                    >
                                        <Image
                                            src={images[currentIndex]}
                                            alt={`Our story image ${currentIndex + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                                            priority={currentIndex === 0}
                                            quality={90}
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
                                            onLoad={handleImageLoad}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {images.map((image, index) => (
                                index !== currentIndex && (
                                    <div key={index} className="absolute inset-0 opacity-0 pointer-events-none">
                                        <Image
                                            src={image}
                                            alt={`Preload image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                                            priority={false}
                                            quality={90}
                                        />
                                    </div>
                                )
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default OurStorySection
