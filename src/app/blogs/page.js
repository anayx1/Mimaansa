'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import BlogsHero from '../components/Blogs/BlogsHero'

const page = () => {
    const [hoveredCard, setHoveredCard] = useState(null)

    const categories = [
        {
            id: 1,
            title: "Why MOQs Exist: A Guide for Conscious Brands",
            description: "You're starting a thoughtful, slow fashion brand. You're designing intentionally. You're sourcing ethically….",
            image: "/blogs/blogs8.jpg",
        },
        {
            id: 2,
            title: "The Journey of a Product: From Idea to Shipment with Mimaansa",
            description: "When you're building a product line or launching a new collection, the road from idea to final shipment can feel overwhelming. That’s where …",
            image: "/blogs/blogs7.jpg",
        },
        {
            id: 3,
            title: "Small Is Powerful: The Rise of Small Batch Production in Fashion",
            description: "The fashion world is shifting—and fast. Gone are the days when bigger meant better. Today, forward-thinking brands are embracing a new …",
            image: "/blogs/blogs9.jpg",
        },
        {
            id: 4,
            title: "Small Batches, Big Impact: Why Limited Production is the Future of Fashion",
            description: "In an industry built on speed and scale, choosing to grow slow can feel radical. But for today's conscious brands, small batch production isn’t a…",
            image: "/blogs/blogs10.jpeg",
        },
        {
            id: 5,
            title: "From Fabric to Footprint: Why Sustainable Materials Matter in Fashion",
            description: "As a brand founder, you've probably asked: “How can I make my products more sustainable?”…",
            image: "/blogs/blogs6.jpg",
        },
        {
            id: 6,
            title: "From Clicks to Consciousness: How to Educate Your Customers About Slow Fashion",
            description: "You've poured your values into your clothing—ethics, sustainability, artistry….",
            image: "/blogs/blogs1.png",
        },
    ];

    return (
        <>
            <BlogsHero />
            <section className="min-h-screen bg-primary py-16 sm:py-20 md:mb-10 overflow-x-hidden">
                <div className="section mx-auto px-8    ">
                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                className="relative bg-white cursor-pointer overflow-hidden h-[350px] p-2 flex flex-col justify-between"
                                animate={{
                                    backgroundColor: hoveredCard === category.id ? '#27272A' : '#FFFFFF'
                                }}
                                onMouseEnter={() => setHoveredCard(category.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Image Container - Height changes on hover, NO overlay here */}
                                <motion.div
                                    className="relative w-full overflow-hidden"
                                    animate={{
                                        height: hoveredCard === category.id ? '180px' : '100px'
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        className="object-cover object-[center_30%]"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                </motion.div>

                                <motion.div
                                    className="relative p-2"
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    {/* Title - Moves down when description hides */}
                                    <motion.h3
                                        className="text-[18px] mb-3"
                                        animate={{
                                            color: hoveredCard === category.id ? '#FFFFFF' : '#27272A',
                                            y: hoveredCard === category.id ? 20 : 0 // Moves down
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {category.title}
                                    </motion.h3>

                                    {/* Description - Hides on hover */}
                                    <motion.p
                                        className="text-[14px] text-secondary/70"
                                        animate={{
                                            opacity: hoveredCard === category.id ? 0 : 1,
                                            height: hoveredCard === category.id ? 0 : 'auto',
                                            marginBottom: hoveredCard === category.id ? '5px' : '12px',
                                            color: hoveredCard === category.id ? '#FFFFFF' : '#666666'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {(() => {
                                            const words = category.description.split(' ');
                                            if (words.length > 15) {
                                                return words.slice(0, 15).join(' ') + '...';
                                            }
                                            return category.description;
                                        })()}
                                    </motion.p>

                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>)
}

export default page