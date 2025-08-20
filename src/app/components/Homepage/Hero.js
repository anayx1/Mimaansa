import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ArrowDown, CircleArrowDown } from 'lucide-react'

const Hero = () => {
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })


    // Apply smoothing with useSpring
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,   // responsiveness
        damping: 30,      // how much it resists oscillation
        mass: 0.8
    })



    // // Left image slides to the left on scroll
    // const leftImageX = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '-70%'])
    // // Right image slides to the right on scroll
    // const rightImageX = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '70%'])

    // Left image slides left smoothly
    const leftImageX = useTransform(smoothProgress, [0.1, 0.8], ['0%', '-70%'])
    // Right image slides right smoothly
    const rightImageX = useTransform(smoothProgress, [0.1, 0.8], ['0%', '70%'])


    // Icon opacity: fully visible at top, gone after scrollYProgress > 0.01
    const iconOpacity = useTransform(scrollYProgress, [0, 0.01], [1, 0])

    return (
        <section
            ref={containerRef}
            className='h-[100dvh] flex flex-col md:flex-row relative overflow-hidden'
        >
            {/* Left Image */}
            <motion.div
                initial={{ opacity: 0, scale: 1, rotate: 0, skew: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 18 }}
                style={{ translateX: leftImageX }}
                className='w-full md:w-1/2 h-1/2 md:h-full overflow-hidden'
            >
                <Image
                    src="/heroleft.jpg"
                    alt="Hero Left"
                    width={1920}
                    height={1080}
                    className='w-full h-full object-cover   overflow-hidden'
                />
            </motion.div>

            {/* Right Image */}
            <motion.div
                initial={{ opacity: 0, scale: 1, rotate: 0, skew: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 18 }}
                style={{ translateX: rightImageX }}
                className='w-full md:w-1/2 h-1/2 md:h-full overflow-hidden'
            >
                <Image
                    src="/heroright.jpg"
                    alt="Hero Right"
                    width={1920}
                    height={1080}
                    className='w-full h-full object-cover overflow-hidden'
                />
            </motion.div>

            <motion.div
                style={{ opacity: iconOpacity }}
                className="absolute z-20 left-1/2 -translate-x-1/2 bottom-25 pointer-events-none"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1 }}   // fade in once
                transition={{ duration: 1, delay: 1 }} // control fade in
                exit={{ opacity: 0, y: 60, transition: { type: "spring" } }}
            >
                {/* Looping bounce */}
                <motion.div
                    animate={{ y: [0, 20] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        type: "spring",
                        stiffness: 200,
                        damping: 50,
                        mass: 1,
                    }}
                >
                    <div className="flex items-center justify-center" style={{ width: 80, height: 80 }}>
                        <span className="bg-white rounded-full p-2">
                            <ArrowDown size={24} strokeWidth={1} className="text-black rounded-full" />
                        </span>
                    </div>
                </motion.div>
            </motion.div>



        </section>
    )
}

export default Hero
