'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'


const images = [
    "/products/fabrics/fabrics.jpg",
    "/products/fabrics/fabrics1.jpg",
    "/products/fabrics/fabrics2.jpg",
    "/products/fabrics/fabrics3.jpg",
    "/products/fabrics/fabrics4.jpg",
    "/products/fabrics/fabrics5.jpg",
    "/products/fabrics/fabrics6.jpg",
    "/products/fabrics/fabrics7.jpg",
    "/products/fabrics/fabrics8.jpg",
    "/products/fabrics/fabrics9.jpg",
    "/products/fabrics/fabrics10.jpg",
]
const images2 = [
    "/products/fabrics/fabrics11.jpg",
    "/products/fabrics/fabrics12.jpg",
    "/products/fabrics/fabrics13.jpg",
    "/products/fabrics/fabrics14.jpg",
    "/products/fabrics/fabrics15.jpg",
    "/products/fabrics/fabrics16.jpg",
    "/products/fabrics/fabrics17.jpg",
    "/products/fabrics/fabrics18.jpg",
    "/products/fabrics/fabrics19.jpg",
]


const FurnitureHero = () => {
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

    return (<>
        <div ref={containerRef} className="relative h-[200vh]">
            {/* Hero Section */}
            <section className="sticky top-0 h-screen w-full bg-[url(/products/productbg.jpg)] bg-cover bg-[center_70%] z-10">
                <div className="h-full w-full bg-black/50">
                    <div className="h-full w-full flex flex-col items-center justify-end px-4 sm:px-6 md:px-8">
                        <div className="max-w-[95%] flex flex-col lg:flex-row lg:justify-between pb-5 gap-4">
                            {/* Title */}
                            <div className="w-full lg:w-2/3 flex items-end">
                                <h2 className="text-white text-4xl sm:text-5xl lg:text-8xl uppercase leading-tight text-center lg:text-left">
                                    PRODUCTS                                </h2>
                            </div>
                            {/* Description + scroll message */}
                            <div className="w-full lg:w-1/3 flex flex-col gap-3 text-center lg:text-left">
                                <span className="text-white text-base text-left sm:text-lg md:text-xl leading-relaxed">
                                    We focus on four key product categories - apparel, home textiles, fabrics and fashion accessories - combining India's craftsmanship with global quality standards to meet diverse sourcing needs.
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
                <section className="bg-secondary pt-16 ">

                    <div className=" mx-auto">
                        {/* HEADER GRID */}
                        <div className='w-[95%] flex justify-center items-center mx-auto'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12 section">
                                <h2 className="text-primary font-bold">Fabrics</h2>
                                <p className="text-primary">
                                    We offer a curated range of premium fabrics tailored for global buyers. Our collection includes silk, cotton, linen, viscose, and high-performance blends, all sourced from trusted mills across India. Whether you're seeking base fabrics for fashion, furnishings, or accessories, we provide materials that meet both aesthetic and technical requirements. We also specialize in custom fabric development, offering exclusive prints, embroidery, dyeing, and finishes—perfect for boutique labels and larger brands looking to stand out. With flexibility in minimum order quantities and sample swatch development, our range is ideal for apparel, home décor, and lifestyle brands. At Mimaansa, we help you source the right fabric not just for today's trends, but with a focus on long-term quality, sustainability, and appeal.
                                </p>
                            </div>
                        </div>
                        {/* IMAGE GRID */}
                        <div className="w-full overflow-hidden pt-8 relative">
                            <div className="flex animate-marquee-reverse">
                                {[...images2, ...images2].map((image, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] px-1"
                                    >
                                        <div className="relative h-[400px] lg:h-[300px] overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={`Mission ${index}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                                                quality={100}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full overflow-hidden pt-10 relative">
                            <div className="flex animate-marquee">
                                {[...images, ...images].map((image, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] px-1"
                                    >
                                        <div className="relative h-[400px] lg:h-[300px] overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={`Mission ${index}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                                                quality={100}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <style jsx>{`
                 @keyframes marquee {
                   0% { transform: translateX(0); }
                   100% { transform: translateX(-50%); }
                 }
                 .animate-marquee {
                   animation: marquee 50s linear infinite;
                   width: max-content;
                 }
                 @keyframes marquee-reverse {
                   0% { transform: translateX(-50%); }
                   100% { transform: translateX(0); }
                 }
                 .animate-marquee-reverse {
                   animation: marquee-reverse 50s linear infinite;
                   width: max-content;
                 }
               `}</style>
                    </div>
                </section>
            </motion.section>
        </div>
        <div className='py-[250px]'></div>
    </>
    )
}

export default FurnitureHero
