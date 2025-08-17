"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import BlogsHero from "../components/Blogs/BlogsHero"
import { getAllBlogs } from "@/libs/blogData"

const page = () => {
    const [hoveredCard, setHoveredCard] = useState(null)
    const router = useRouter()

    const handleCardClick = (slug) => {
        router.push(`/blogs/${slug}`)
    }

    const blogs = getAllBlogs()

    return (
        <>
            <BlogsHero />
            <section className=" bg-primary py-16 sm:py-20 md:mb-10 overflow-x-hidden">
                <div className="section mx-auto px-8">
                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.slug}
                                className="relative bg-white cursor-pointer overflow-hidden h-[350px] p-2 flex flex-col justify-between"
                                animate={{
                                    backgroundColor: hoveredCard === blog.slug ? "#27272A" : "#FFFFFF",
                                }}
                                onMouseEnter={() => setHoveredCard(blog.slug)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => handleCardClick(blog.slug)}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Image Container - Height changes on hover */}
                                <motion.div
                                    className="relative w-full overflow-hidden"
                                    animate={{
                                        height: hoveredCard === blog.slug ? "180px" : "100px",
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <Image
                                        src={blog.card?.image || "/placeholder.svg"}
                                        alt={blog.title}
                                        fill
                                        className="object-cover object-[center_30%]"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                </motion.div>

                                <motion.div className="relative p-2" transition={{ duration: 0.4, ease: "easeInOut" }}>
                                    {/* Title - Moves down when description hides */}
                                    <motion.h3
                                        className="text-[18px] mb-3"
                                        animate={{
                                            color: hoveredCard === blog.slug ? "#FFFFFF" : "#27272A",
                                            y: hoveredCard === blog.slug ? 20 : 0,
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {blog.title}
                                    </motion.h3>

                                    {/* Description - Hides on hover */}
                                    <motion.p
                                        className="text-[14px] text-secondary/70"
                                        animate={{
                                            opacity: hoveredCard === blog.slug ? 0 : 1,
                                            height: hoveredCard === blog.slug ? 0 : "auto",
                                            marginBottom: hoveredCard === blog.slug ? "5px" : "12px",
                                            color: hoveredCard === blog.slug ? "#FFFFFF" : "#666666",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {(() => {
                                            const description = blog.card?.description || ""
                                            const words = description.split(" ")
                                            if (words.length > 15) {
                                                return words.slice(0, 15).join(" ") + "..."
                                            }
                                            return description
                                        })()}
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
