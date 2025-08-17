'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'


const images = [
    "/products/furnishing/homefurnishing.jpg",
    "/products/furnishing/homefurnishing1.jpg",
    "/products/furnishing/homefurnishing2.jpeg",
    "/products/furnishing/homefurnishing3.jpeg",
    "/products/furnishing/homefurnishing4.jpeg",
    "/products/furnishing/homefurnishing5.jpeg",
    "/products/furnishing/homefurnishing6.jpeg",
    "/products/furnishing/homefurnishing7.jpeg",
    "/products/furnishing/homefurnishing8.jpeg",
    "/products/furnishing/homefurnishing9.jpeg",
    "/products/furnishing/homefurnishing10.jpeg",
]
const images2 = [
    "/products/furnishing/homefurnishing11.jpeg",
    "/products/furnishing/homefurnishing12.jpeg",
    "/products/furnishing/homefurnishing13.jpeg",
    "/products/furnishing/homefurnishing14.jpeg",
    "/products/furnishing/homefurnishing15.jpeg",
    "/products/furnishing/homefurnishing16.jpeg",
    "/products/furnishing/homefurnishing17.jpeg",
    "/products/furnishing/homefurnishing18.jpeg",
]


const FabricsHero = () => {
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
                                <h2 className="text-primary font-bold">Home Furnishings</h2>
                                <p className="text-primary">
                                    With its rich heritage in textiles, India offers an incredible variety of home furnishings. We help you source everything from soft home textiles {'(bedsheets, quilts, towels)'} to decorative items (cushion covers, table linens, curtains) and even floor coverings like dhurrie rugs and carpets. Our suppliers are based in renowned textile hubs such as Panipat, bhadohi , Jaipur, and Karur - regions famed for weaving, printing, and artisanal craftsmanship. Whether you seek contemporary designs or traditional touches, we connect you with producers who excel in those styles. Mimaansa ensures that all home textile products are made to international quality standards, using azo-free dyes and durable fabrics. As proactive home textile exporters from India, we also keep an eye on emerging trends and sustainable materials - like organic cotton bedding or recycled yarn throws - to support your product development with fresh ideas.
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

export default FabricsHero
