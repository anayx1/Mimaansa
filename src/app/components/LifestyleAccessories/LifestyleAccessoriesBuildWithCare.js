'use client'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import ApparelLastSection from './LifestyleAccessoriesLastSection'

export default function LifestyleAccessoriesBuiltWithCare() {
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 0.1', 'end 0.8'],
    })

    // numeric scale for font size
    const headingSize = useTransform(scrollYProgress, [0, 1], [70, 40])
    // convert to string with px
    const headingFontSize = useMotionTemplate`${headingSize}px`

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1])

    return (
        <>
            <section
                ref={sectionRef}
                className="relative min-h-screen flex flex-col items-center justify-center bg-[#f9f7f2] md:py-10"
            >
                {/* Heading */}
                <motion.h2
                    // style={{ fontSize: headingFontSize }}
                    className="my-10 text-secondary leading-tight"

                >
                    BUILT WITH CARE
                </motion.h2>

                {/* Fixed Frame */}
                <div className="relative w-full max-w-2xl max-h-[800px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                    <motion.div
                        style={{ scale: imageScale }}
                        className="relative w-full h-full will-change-transform"
                    >
                        <Image
                            src="/products/scroll.jpeg"
                            alt="Built with Care"
                            fill
                            className="object-cover"
                            priority
                            quality={100}
                        />
                    </motion.div>
                </div>
            </section>
            <section className='flex flex-col items-center justify-center'>

                {/* <p className='max-w-6xl text-center'>India's manufacturing strength spans a broad array of goods. At Mimaansa, we focus on three key product categories for our clients - leveraging the country's rich resources and craftsmanship in each area. Whether you want to develop a full fashion line, source artisanal home items, or add unique accessories to your collection, we have the expertise to make it happen.</p> */}

                <ApparelLastSection />
            </section>

        </>
    )
}
