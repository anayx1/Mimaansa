'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

const ParallaxFounderSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768) // md breakpoint
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // Animations
  const rawLeftContentY = useTransform(scrollYProgress, [0, 1], [50, -400])
  const rawImageY = useTransform(scrollYProgress, [0, 1], [-80, 150])

  // Add smoothing with spring
  const leftContentY = useSpring(rawLeftContentY, {
    stiffness: 150,   // lower = smoother
    damping: 20,     // higher = less bounce
    mass: 1        // controls weight of motion
  })


  // const leftContentY = useTransform(scrollYProgress, [0, 1], [200, -400])
  const imageY = useTransform(scrollYProgress, [0, 1], [-80, 150])

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-[#27272a] py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden pb-10"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">

          {/* Left Side - Text */}
          {/* Left Side - Text */}
          <motion.div
            className="space-y-5 sm:space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left"
            style={isMobile ? {} : { y: leftContentY }}
          >
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-primary">
                FOUNDER
              </h2>

              <div
                className="space-y-2 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg text-secondary/80 leading-relaxed 
                 max-w-full sm:max-w-xl mx-auto lg:mx-0"
              >
                <p className="text-primary/70">
                  <strong>Ms. Rafia Jain</strong> is an experienced apparel and textile
                  sourcing specialist with a passion for people and ethical business. With
                  over a decade in India's export industry, she launched Mimaansa to bring
                  professionalism and trust to apparel and home furnishings export. She
                  leads by example, combining industry expertise with warmth and empathy.
                  As a working mother, she balances business leadership with family life,
                  inspiring a people-first culture at Mimaansa. Under her guidance, the
                  Mimaansa team shares her commitment to reliable service and integrity.
                  She remains hands-on with the business, ensuring every partnership
                  reflects Mimaansa's values.
                </p>
              </div>
            </div>
          </motion.div>


          {/* Right Side - Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative h-[280px] md:h-[100dvh] rounded-lg overflow-hidden shadow-xl md:shadow-2xl">
              <motion.div
                className="w-full h-[150%]"
                style={{
                  y: imageY,
                  scale: 1.1,
                }}
              >
                <Image
                  src="/about/aboutowner.avif"
                  alt="Ms. Rafia Jain - Founder of Mimaansa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-3 -left-3 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-secondary/10 rounded-full -z-10"></div>
            <div className="absolute -bottom-3 -right-3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-secondary/5 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ParallaxFounderSection
