'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SecondSection from './LifestyleAccessoriesSecondSection'
import Image from 'next/image'


const images = [
    "/products/lifestyle/lifestyle1.jpeg",
    "/products/lifestyle/lifestyle2.jpeg",
    "/products/lifestyle/lifestyle3.jpeg",
    "/products/lifestyle/lifestyle4.jpeg",
    "/products/lifestyle/lifestyle5.jpeg",
    "/products/lifestyle/lifestyle6.jpeg",
    "/products/lifestyle/lifestyle7.jpeg",
    "/products/lifestyle/lifestyle8.jpeg",
    "/products/lifestyle/lifestyle9.jpeg",
    "/products/lifestyle/lifestyle10.jpeg",

]

const images2 = [
    "/products/lifestyle/lifestyle10.jpeg",
    "/products/lifestyle/lifestyle11.jpeg",
    "/products/lifestyle/lifestyle12.jpeg",
    "/products/lifestyle/lifestyle13.jpeg",
    "/products/lifestyle/lifestyle14.jpeg",
    "/products/lifestyle/lifestyle15.jpeg",
    "/products/lifestyle/lifestyle16.jpeg",
    "/products/lifestyle/lifestyle17.jpeg",
    "/products/lifestyle/lifestyle18.jpeg",
]



const LifestyleAccessoriesHero = () => {
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
                                <span className="text-white text-base sm:text-lg md:text-xl leading-relaxed text-left">
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
                                <h2 className="text-primary font-bold">Lifestyle Accessories
                                </h2>
                                <p className="text-primary">

                                    Under lifestyle accessories, we encompass a broad range of products that add style and personality to everyday life. This includes fashion accessories - such as leather handbags, canvas totes, scarves, belts, and jewellery - as well as home and wellness accents like artisanal candles, ceramic décor, or eco-friendly items. India's diverse artisan communities and modern workshops produce unique accessories that blend contemporary appeal with cultural character. Whether you need hand-embroidered shawls from Kashmir, jute tote bags from Kolkata, or costume jewellery from Jaipur, we have sources for each. Our team pays special attention to detail and finish in accessories, knowing these items often serve as statement pieces for a brand. By handling your fashion accessories sourcing in India, Mimaansa ensures you receive distinctive, high-quality pieces that stand out in your collection - all while meeting safety standards (for example, lead-free metal in jewellery) and your target price points.
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

export default LifestyleAccessoriesHero

