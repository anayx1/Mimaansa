'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SecondSection from './SecondSection'
import Image from 'next/image'


const images = [
    "/products/apperal/apperal1.jpg",
    "/products/apperal/apperal2.jpg",
    "/products/apperal/apperal8.jpg",
    "/products/apperal/apperal9.jpg",
    "/products/apperal/apperal7.jpg",
    "/products/apperal/apperal3.jpg",
    "/products/apperal/apperal6.jpg",
    "/products/apperal/apperal4.jpg",
    "/products/apperal/apperal5.jpg",
    "/products/apperal/apperal11.jpg",
    "/products/apperal/apperal10.jpg",
]

const images2 = [
    "/products/apperal/apperal12.jpg",
    "/products/apperal/apperal18.jpg",
    "/products/apperal/apperal15.jpg",
    "/products/apperal/apperal13.jpg",
    "/products/apperal/apperal16.jpg",
    "/products/apperal/apperal14.jpg",
    "/products/apperal/apperal17.jpg",

]



const ApparelHero = () => {
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
                                <span className="text-white text-base sm:text-lg md:text-xl leading-relaxed">
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
                        <div className='w-full flex justify-center items-center'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12 section">
                                <h2 className="text-primary font-bold">Apparels</h2>
                                <p className="text-primary">
                                    India is a hub for apparel production - from cotton basics to intricate, embellished garments. We source apparel across all segments: casual wear, formal wear, activewear, and more. Our network includes factories adept at handling various textiles like cotton, silk, denim, and sustainable fabrics. We ensure quality at every step, whether it’s a large run of organic cotton T-shirts or a high-fashion capsule collection. Thanks to India’s position as one of the world’s top textile and apparel producers, we can meet a range of needs – from high-volume orders for established brands to small-batch production for independent labels or designs requiring special handwork. The result is clothing that matches your design and quality standards, delivered ready for your market.
                                </p>
                            </div>
                        </div>
                        {/* IMAGE GRID */}
                        <div className="w-full overflow-hidden pt-10 relative">
                            <div className="flex animate-marquee">
                                {[...images, ...images].map((image, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] px-1"
                                    >
                                        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
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
                        <div className="w-full overflow-hidden pt-8 relative">
                            <div className="flex animate-marquee-reverse">
                                {[...images2, ...images2].map((image, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] px-1"
                                    >
                                        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={`Mission ${index}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                                                quality={85}
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

export default ApparelHero
