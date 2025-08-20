"use client"

import { motion } from "framer-motion"

const testimonialsData = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "UK",
        content: "This platform has completely transformed how we manage our projects. The gains are remarkable.",
        avatar: "/user.avif"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Germany",
        content: "Outstanding service and support. The team goes above and beyond to ensure our success.",
        avatar: "/user.avif"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "USA",
        content: "The results speak for themselves. We've seen a 300% increase in productivity since implementation.",
        avatar: "/user.avif"
    },
    {
        id: 4,
        name: "David Thompson",
        role: "CTO, DataFlow",
        content: "Incredible attention to detail and seamless integration. This is exactly what we needed.",
        avatar: "/user.avif"
    },
    {
        id: 5,
        name: "Lisa Park",
        role: "Director, CreativeStudio",
        content: "The user experience is phenomenal. Our team adopted it immediately without any training.",
        avatar: "/user.avif"
    },
    {
        id: 6,
        name: "James Wilson",
        role: "VP Operations, ScaleUp",
        content: "Best investment we've made this year. The ROI has exceeded all our expectations.",
        avatar: "/user.avif"
    },
    {
        id: 7,
        name: "Maria Garcia",
        role: "Head of Marketing, BrandForce",
        content: "Revolutionary approach to solving complex problems. Highly recommend to any growing business.",
        avatar: "/user.avif"
    },
    {
        id: 8,
        name: "Robert Kim",
        role: "Senior Developer, CodeCraft",
        content: "Clean, intuitive, and powerful. Everything we wanted in a solution and more.",
        avatar: "/user.avif"
    },
    {
        id: 9,
        name: "Amanda Foster",
        role: "Operations Manager, FlowTech",
        content: "The automation features have saved us countless hours. Absolutely game-changing.",
        avatar: "/user.avif"
    },
    {
        id: 10,
        name: "Carlos Mendez",
        role: "Startup Founder, NextGen",
        content: "From day one, this platform has been integral to our growth strategy. Couldn't be happier.",
        avatar: "/user.avif"
    }
]

export default function TestimonialCarousel() {
    // Split testimonials into two rows
    const firstRow = testimonialsData.slice(0, 5)
    const secondRow = testimonialsData.slice(5, 10)

    return (
        <div className="py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Trusted by thousands of businesses worldwide
                    </p>
                </div>
            </div>

            <div className="relative">
                {/* White fade overlays */}
                <div className="absolute left-0 top-0 w-32 md:w-48 h-full bg-gradient-to-r from-[#f8f6f1] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 w-32 md:w-48 h-full bg-gradient-to-l from-[#f8f6f1] to-transparent z-10 pointer-events-none" />

                {/* First Row - Moving Left */}
                <div className="mb-20">
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: [0, -2000]
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear"
                            }
                        }}
                    >
                        {/* Duplicate testimonials for seamless loop */}
                        {[...firstRow, ...firstRow, ...firstRow].map((testimonial, index) => (
                            <TestimonialCard key={`first-${testimonial.id}-${index}`} testimonial={testimonial} />
                        ))}
                    </motion.div>
                </div>

                {/* Second Row - Moving Right */}
                <div>
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: [-2000, 0]
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear"
                            }
                        }}
                    >
                        {/* Duplicate testimonials for seamless loop */}
                        {[...secondRow, ...secondRow, ...secondRow].map((testimonial, index) => (
                            <TestimonialCard key={`second-${testimonial.id}-${index}`} testimonial={testimonial} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

function TestimonialCard({ testimonial }) {
    return (
        <div className="flex-shrink-0 w-80 md:w-md rounded-2xl p-4 md:p-6 shadow-sm border border-black">
            <div className="flex items-start space-x-4">
                <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <h4 className=" text-gray-900 text-lg">
                        {testimonial.name}
                    </h4>
                    <p className="text-gray-700 text-xs md:text-sm mb-3">
                        {testimonial.role}
                    </p>
                </div>
            </div>
            <blockquote className="text-gray-700 text-sm md:text-base leading-relaxed">
                "{testimonial.content}"
            </blockquote>
        </div>
    )
}
