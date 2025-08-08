'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

const ServicesSection = () => {
    const [hoveredService, setHoveredService] = useState(null)

    const services = [
        {
            id: 1,
            title: "Product Sourcing",
            description: "Identify and vet top suppliers and factories across India tailored to your product needs.",
            image: "/homepage/productsourcing.jpg",
        },
        {
            id: 2,
            title: "Product Development",
            description: "Turn ideas into products with coordinated sampling, prototyping, and design refinement.",
            image: "/homepage/productdevelopment.avif",
        },
        {
            id: 3,
            title: "Negotiation & Pricing",
            description: "Secure competitive pricing and favorable terms through expert supplier negotiations.",
            image: "/homepage/negotiation.avif",
        },
        {
            id: 4,
            title: "Order Management",
            description: "Stay on track with end-to-end production oversight and regular progress updates..",
            image: "/homepage/order.avif",
        }
        ,
        {
            id: 5,
            title: "Quality Control",
            description: "Ensure international standards through rigorous inspections and final product audits.",
            image: "/homepage/quality.avif",
        }
    ]

    return (
        <section className="min-h-screen bg-primary py-20">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        OUR SERVICES
                    </motion.h2>
                </div>

                {/* Services List */}
                <div className="space-y-0 relative">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="w-full border-b-[2px] border-gray-300 py-8 sm:py-10 md:py-12 cursor-pointer group relative"
                            onMouseEnter={() => setHoveredService(service)}
                            onMouseLeave={() => setHoveredService(null)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Black background overlay */}
                            <motion.div
                                className="absolute inset-0 bg-[var(--color-secondary)] z-0"
                                initial={{ scaleY: 0, originY: 0 }}
                                animate={{
                                    scaleY: hoveredService?.id === service.id ? 1 : 0
                                }}
                                transition={{
                                    duration: hoveredService?.id === service.id ? 0.3 : 0,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Responsive Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center relative z-10 px-2 sm:px-4 md:px-10">
                                {/* Title */}
                                <div className="md:col-span-3">
                                    <motion.h3
                                        className="text-2xl sm:text-3xl lg:text-4xl"
                                        animate={{
                                            color: hoveredService?.id === service.id ? '#FFFFFF' : '#27272A'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {service.title}
                                    </motion.h3>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-6">
                                    <motion.p
                                        className="text-base sm:text-lg leading-relaxed md:w-[50%] w-full"
                                        animate={{
                                            color: hoveredService?.id === service.id ? '#CCCCCC' : '#000'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {service.description}
                                    </motion.p>
                                </div>

                                {/* View Text */}
                                <div className="md:col-span-2 md:text-right">
                                    <motion.span
                                        className="text-base sm:text-lg font-medium"
                                        animate={{
                                            color: hoveredService?.id === service.id ? '#FFFFFF' : '#27272A'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        View
                                    </motion.span>
                                </div>

                                {/* Inline Image for Mobile/Tablet */}
                                <div className="md:hidden mt-4">
                                    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Floating image for desktop hover */}
                    <AnimatePresence>
                        {hoveredService && (
                            <motion.div
                                className="hidden lg:block absolute top-0 z-50 pointer-events-none"
                                style={{
                                    left: '65%',
                                    top: `${(services.findIndex(s => s.id === hoveredService.id)) * 168 - 40}px`,
                                    transform: 'translateY(-50%)'
                                }}
                                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <div className="relative w-[250px] h-[350px] overflow-hidden shadow-2xl">
                                    <Image
                                        src={hoveredService.image}
                                        alt={hoveredService.title}
                                        fill
                                        className="object-cover"
                                        sizes="350px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent">
                                        <div className="absolute bottom-4 left-4">
                                            <h4 className="text-white text-sm font-medium">
                                                {hoveredService.title}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

export default ServicesSection
