"use client"

import { motion } from "framer-motion"

const testimonialsData = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "UK",
        content: "This platform has completely transformed how we manage our projects. The efficiency gains are remarkable.",
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

export default function MobileTestimonialCarousel() {
    // Split testimonials into two rows for mobile (3 each)
    const firstRow = testimonialsData.slice(0, 3)
    const secondRow = testimonialsData.slice(3, 6)

    return (
        <div className="py-12 bg-gray-50 overflow-hidden md:hidden">
            <div className="px-4 mb-8">
                <div className="text-center">
                    <h2 className="text-2xl font-light text-gray-800 mb-2">
                        What Our Clients Say
                    </h2>
                    <p className="text-base text-gray-600">
                        Trusted by thousands worldwide
                    </p>
                </div>
            </div>

            <div className="relative">
                {/* White fade overlays for mobile */}
                <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                {/* First Row - Moving Left */}
                <div className="mb-6">
                    <motion.div
                        className="flex gap-4"
                        animate={{
                            x: [0, -1200]
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 25,
                                ease: "linear"
                            }
                        }}
                    >
                        {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((testimonial, index) => (
                            <MobileTestimonialCard key={`mobile-first-${testimonial.id}-${index}`} testimonial={testimonial} />
                        ))}
                    </motion.div>
                </div>

                {/* Second Row - Moving Right */}
                <div>
                    <motion.div
                        className="flex gap-4"
                        animate={{
                            x: [-1200, 0]
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 25,
                                ease: "linear"
                            }
                        }}
                    >
                        {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((testimonial, index) => (
                            <MobileTestimonialCard key={`mobile-second-${testimonial.id}-${index}`} testimonial={testimonial} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

function MobileTestimonialCard({ testimonial }) {
    return (
        <div className="flex-shrink-0 w-72 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-3">
                <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm">
                        {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-xs mb-2">
                        {testimonial.role}
                    </p>
                </div>
            </div>
            <blockquote className="text-gray-700 text-sm leading-relaxed mt-3">
                "{testimonial.content}"
            </blockquote>


        </div>
    )
}
