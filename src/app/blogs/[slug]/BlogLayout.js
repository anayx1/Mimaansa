"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function BlogLayout({ blogData }) {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Calculate image width based on scroll position
    const getImageWidth = (imageIndex) => {
        const scrollThreshold = 300 + imageIndex * 200
        const progress = Math.min(scrollY / scrollThreshold, 1)
        const width = 100 - progress * 10 // From 100% to 90%
        return Math.max(width, 90) // Don't go below 90%
    }

    const getImageWidthLast = (imageIndex) => {
        const scrollThreshold = 300 + imageIndex * 200
        const progress = Math.min(scrollY / scrollThreshold, 1)
        const width = 100 - progress * 10 // Shrinks from 100% → 90%
        return Math.max(width, 90) // Never go below 90%
    }
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    // add near your other refs
    const refClosing = useRef(null)
    const { scrollYProgress: progressClosing } = useScroll({
        target: refClosing,
        // starts when the top of the image hits the bottom of the viewport,
        // ends when the bottom of the image hits the top of the viewport
        offset: ["start end", "end start"],
    })
    // 100% -> 90% as it scrolls through
    const widthClosing = useTransform(progressClosing, [0, 1], ["100%", "90%"])

    // For first image in grid
    const { scrollYProgress: progress1 } = useScroll({
        target: ref1,
        offset: ["start end", "end start"],
    })
    const scale1 = useTransform(progress1, [0, 1], [1.5, 1])

    // For second image in grid
    const { scrollYProgress: progress2 } = useScroll({
        target: ref2,
        offset: ["start end", "end start"],
    })
    const scale2 = useTransform(progress2, [0, 1], [1.5, 1])

    return (
        <article className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <header className="px-6 md:px-12 lg:px-24 pt-12 pb-8">
                <time className="text-gray-600 text-sm font-light tracking-wide">{blogData.date}</time>

                <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl  text-gray-900 max-w-5xl">
                    {blogData.title}
                </h1>
            </header>

            {/* Hero Image */}
            <div className="relative overflow-hidden">
                <div className="transition-all duration-700 ease-out mx-auto" style={{ width: `${getImageWidth(0)}%` }}>
                    <Image
                        width={800}
                        height={800}
                        quality={100}
                        src={blogData.heroImage.src || "/placeholder.svg"}
                        alt={blogData.heroImage.alt}
                        className="w-full h-[60vh] md:h-[70vh] object-cover rounded-lg"
                    />
                </div>
            </div>

            {/* First Text Section */}
            <section className="px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-[5%]">
                <div className="space-y-8 text-gray-800">
                    <h3 className="text-[30px] md:text-2xl lg:text-2xl">{blogData.introText}</h3>
                    <div className="space-y-6">
                        <p className="mb-6 text-lg md:text-2xl lg:text-2xl">{blogData.firstParagraph}</p>
                    </div>
                </div>
            </section>

            {/* Two Column Image Grid */}
            <section className="px-6 md:px-12 lg:px-24 py-16">
                <div className="section mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Image */}
                        <div ref={ref1} className="h-[80vh] md:h-[100dvh] overflow-hidden rounded-sm">
                            <motion.img
                                src={blogData.gridImages.left.src}
                                alt={blogData.gridImages.left.alt}
                                className="w-full h-full object-cover"
                                style={{ scale: scale1 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            />
                        </div>

                        {/* Right Image */}
                        <div ref={ref2} className="h-[80vh] md:h-[100dvh] overflow-hidden rounded-sm">
                            <motion.img
                                src={blogData.gridImages.right.src}
                                alt={blogData.gridImages.right.alt}
                                className="w-full h-full object-cover"
                                style={{ scale: scale2 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-[5%]">
                <div className="space-y-8 text-gray-800">
                    <div className="text-base md:text-3xl lg:text-2xl leading-relaxed space-y-6">
                        {blogData.mainContent.map((paragraph, index) => (
                            <p key={index} className="mb-6 text-lg md:text-2xl lg:text-2xl">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing Image */}
            {blogData.closingImage && (
                <div ref={refClosing} className="relative overflow-hidden">
                    <motion.div
                        className="mx-auto transition-all duration-700 ease-out"
                        style={{ width: widthClosing, willChange: "width" }}
                    >
                        <img
                            src={blogData.closingImage.src || "/placeholder.svg"}
                            alt={blogData.closingImage.alt}
                            className="w-full h-[60vh] md:h-[70vh] object-cover rounded-lg"
                        />
                    </motion.div>
                </div>
            )}


            {/* Closing Text */}
            {blogData.closingTextHeading && (
                <section className="px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto">
                    <div className="space-y-8 text-gray-800">
                        <div className="">
                            {blogData.closingTextHeading.map((heading, index) => (
                                <h3 key={index} className="text-[30px] md:text-2xl lg:text-2xl">{heading}</h3>
                            ))}
                        </div>
                        {blogData.closingTextBody.map((body, index) => (
                            <p key={index} className="pb-0 mb-0">{body}</p>
                        ))}
                    </div>
                </section>
            )}
        </article>
    )
}
