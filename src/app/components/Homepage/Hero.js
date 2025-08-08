import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const Hero = () => {
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Left image slides to the left
    const leftImageX = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '-70%'])

    // Right image slides to the right
    const rightImageX = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '70%'])

    return (
        <section
            ref={containerRef}
            className='h-[100dvh] flex flex-col md:flex-row relative overflow-hidden'
        >
            {/* Left Image */}
            <motion.div
                style={{ translateX: leftImageX }}
                className='w-full md:w-1/2 h-1/2 md:h-full overflow-hidden'
            >
                <Image
                    src="/heroleft.avif"
                    alt="Hero Left"
                    width={1920}
                    height={1080}
                    className='w-full h-full object-cover   overflow-hidden'
                />
            </motion.div>

            {/* Right Image */}
            <motion.div
                style={{ translateX: rightImageX }}
                className='w-full md:w-1/2 h-1/2 md:h-full overflow-hidden'
            >
                <Image
                    src="/heroright.avif"
                    alt="Hero Right"
                    width={1920}
                    height={1080}
                    className='w-full h-full object-cover overflow-hidden'
                />
            </motion.div>
        </section>
    )
}

export default Hero
