"use client"

import { motion } from "framer-motion"

const testimonialsData = [
    {
        id: 1,
        name: "Emma Lewis",
        role: "UK",
        content: "Mimaansa made sourcing so much easier for us. From fabrics to finished apparel, everything was on time and exactly as we imagined. Their professionalism is unmatched.",
        avatar: "/user.avif"
    },
    {
        id: 2,
        name: "Marco Rossi",
        role: "Italy",
        content: "We wanted artisanal, handmade products for our store, and Mimaansa connected us with the best. Quality and craftsmanship were beyond expectations.",
        avatar: "/user.avif"
    },
    {
        id: 3,
        name: "Riya Sharma ",
        role: "India",
        content: "They understood our brand vision and sourced fabrics that aligned perfectly. The team is reliable, creative, and detail-oriented.",
        avatar: "/user.avif"
    },
    {
        id: 4,
        name: "Jonathan Davis",
        role: "Australia",
        content: "We've been sourcing home furnishings through Mimaansa for over a year. The quality has always been excellent, and deliveries are smooth and hassle-free.",
        avatar: "/user.avif"
    },
    {
        id: 5,
        name: " Sophia Chen",
        role: "Singapore",
        content: "What impressed me most was their transparent communication. We always knew what stage our order was at, and everything arrived exactly as promised.",
        avatar: "/user.avif"
    },
    {
        id: 6,
        name: " David Miller",
        role: "USA",
        content: "Mimaansa has been a true partner in scaling our brand. Their sourcing solutions gave us both cost efficiency and premium quality.",
        avatar: "/user.avif"
    },
    {
        id: 7,
        name: "Ananya Verma",
        role: "India",
        content: "They don't just source — they guide you with design insights, sustainable options, and smart solutions. That's what makes them stand out.",
        avatar: "/user.avif"
    },
    {
        id: 8,
        name: "Carlos Martinez",
        role: "Spain",
        content: "Every collection we sourced through Mimaansa was loved by our customers. Their team ensures that products are market-ready and beautifully made.",
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
