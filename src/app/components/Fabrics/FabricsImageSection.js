'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ApparelImageSection = () => {
    const [hoveredCard, setHoveredCard] = useState(null)

    const categories = [
        {
            id: 1,
            title: "Apparels",
            description: "Trend-right fashion and durable workwear across womenswear, menswear, and...",
            image: "/homepage/apparels.jpg",
            href: '/apparels'
        },
        {
            id: 2,
            title: "Lifestyle Accessories",
            description: "Distinctive additions to complement your product range – from fashion to handcrafted...",
            image: "/homepage/lifestyle.jpg",
            href: '/lifestyle-accessories'
        },
        {
            id: 3,
            title: "Home Furnishings",
            description: "Beautiful home textiles and decor items, including bedding, bath linens, cushions...",
            image: "/homepage/home.jpg",
            href: '/home-furnishing'
        },
        // {
        //     id: 4,
        //     title: "Fabrics",
        //     description: "Premium quality fabrics sourced from India's textile heritage...",
        //     image: "/homepage/fabrics.jpg",
        //     href: '/fabrics'
        // }
    ]

    return (
        <section className="min-h-screen bg-primary py-16 sm:py-20 mt-190 md:mt-100 md:mb-10 overflow-x-hidden">
            <div className="container mx-auto px-8 md:w-[90%] ">
                {/* Header */}
                <motion.div className="text-center mb-16"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    viewport={{ once: true }}>
                    <motion.h2
                        className="md:text-9xl lg:text-9xl text-6xl mb-6 font-navbar font-medium" >
                        MORE TO EXPLORE
                    </motion.h2>
                    <p>
                        We sources a wide range of products from India's rich manufacturing sectors.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className='w-full flex justify-center items-center'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl ">
                        {categories.map((category, index) => (
                            <Link href={category.href} key={category.id}>
                                <motion.div
                                    className="relative bg-white cursor-pointer overflow-hidden h-[350px] p-2 flex flex-col justify-between"
                                    animate={{
                                        backgroundColor: hoveredCard === category.id ? '#27272A' : '#FFFFFF'
                                    }}
                                    onMouseEnter={() => setHoveredCard(category.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Image Container */}
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
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                    </motion.div>

                                    <motion.div
                                        className="relative p-2"
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        {/* Title */}
                                        <motion.h3
                                            className="text-xl lg:text-2xl font-bold mb-3"
                                            animate={{
                                                color: hoveredCard === category.id ? '#FFFFFF' : '#27272A',
                                                y: hoveredCard === category.id ? 20 : 0
                                            }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {category.title}
                                        </motion.h3>

                                        {/* Description */}
                                        <motion.p
                                            className="text-sm leading-relaxed"
                                            animate={{
                                                opacity: hoveredCard === category.id ? 0 : 1,
                                                height: hoveredCard === category.id ? 0 : 'auto',
                                                marginBottom: hoveredCard === category.id ? '5px' : '12px',
                                                color: hoveredCard === category.id ? '#FFFFFF' : '#666666'
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {category.description}
                                        </motion.p>
                                    </motion.div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ApparelImageSection
