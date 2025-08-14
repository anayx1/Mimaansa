"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Button from "../Button"

export default function Footer() {
    return (
        <footer
            className="bg-[#27272A] text-white min-h-screen flex flex-col justify-center relative py-10"
            style={{ backgroundColor: '#2a2a2a' }}
        >
            <div className="w-full max-w-7xl mx-auto px-6 flex-1 flex flex-col justify-center">

                {/* Main Content */}
                <div className="flex flex-col items-center justify-center flex-1">

                    {/* Call to Action */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-8 leading-relaxed max-w-5xl mx-auto px-4">
                            Are you ready to simplify your sourcing and
                            <br className="hidden md:block" />
                            manufacturing in India?
                        </h2>
                        <Button>Contact Us</Button>
                    </motion.div>

                    {/* Info + Logo Section */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mt-10">
                        {/* Contact Info */}
                        <div className="flex flex-col items-center justify-center gap-1 text-center text-primary">
                            <p className="text-primary">Contact Info</p>
                            <p className="text-primary">+91 9910924032</p>
                            <p className="text-primary">info@mimaansa.com</p>
                        </div>

                        {/* Logo */}
                        <motion.div
                            className="flex justify-center items-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src={'/logo.avif'}
                                width={1000}
                                height={1000}
                                alt="logo"
                                className="w-[220px] sm:w-[280px] md:w-[350px] h-auto"
                            />
                        </motion.div>

                        {/* Links */}
                        <div className="flex flex-col items-center justify-center gap-1 text-center text-primary">
                            <Link href="/terms-conditions">Terms & Conditions</Link>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                        </div>
                    </section>

                    {/* Description */}
                    <motion.p
                        className="text-white text-base sm:text-lg md:text-xl leading-relaxed max-w-5xl mx-auto text-center mt-16 px-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Let's start a conversation. Whether you're a growing brand or an established retailer, Mimaansa is here to support your journey. Get in touch with us today to discuss your needs and discover how we can deliver the perfect sourcing solution.
                    </motion.p>
                </div>

                {/* Footer Bottom */}
                <div className="py-10">
                    {/* Social Links */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-5 items-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <a href="#" className="text-white text-sm sm:text-md tracking-wider">
                            INSTAGRAM
                        </a>
                        <a href="#" className="text-white text-sm sm:text-md tracking-wider">
                            LINKEDIN
                        </a>
                        <a href="#" className="text-white text-sm sm:text-md tracking-wider">
                            TWITTER
                        </a>
                    </motion.div>

                    {/* Copyright */}
                    <motion.div
                        className="text-center pt-4 border-t border-gray-700"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white text-xs sm:text-sm tracking-wider">
                            CRAFTED BY Vikava Labs
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    )
}
