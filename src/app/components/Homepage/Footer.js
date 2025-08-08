"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-[#27272A] text-white min-h-screen flex flex-col justify-center relative py-10" style={{ backgroundColor: '#2a2a2a' }}>
            <div className="w-full max-w-7xl mx-auto px-6 flex-1 flex flex-col justify-center">

                {/* Main Content Container */}
                <div className="flex flex-col items-center justify-center flex-1">

                    {/* Call to Action */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-5xl font-normal text-white mb-8 leading-relaxed max-w-5xl mx-auto">
                            Are you ready to simplify your sourcing and<br />manufacturing in India?
                        </h2>
                        <motion.button
                            className="px-6 py-2 text-white font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm  tracking-wide"

                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Us
                        </motion.button>
                    </motion.div>

                    {/* Logo Section */}
                    <section className="grid grid-cols-3 w-full mt-10">
                        <div className="col-span-1 flex flex-col items-center justify-center gap-1">
                            <p className="text-white text-center">
                                Contact Info
                            </p>
                            <p className="text-white text-center">
                                +91 9910924032
                            </p>
                            <p className="text-white text-center">
                                info@mimaansa.com
                            </p>

                        </div>
                        <motion.div
                            className="text-center mb-16 col-span-1 flex justify-center items-center"

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
                                className="w-[350px] h-auto"

                            />
                        </motion.div>
                        <div className="col-span-1 flex flex-col items-center justify-center gap-1">

                            <Link href="/terms-conditions" className="text-white text-center">Terms & Conditions</Link>
                            <Link href="/privacy-policy" className="text-white text-center">Privacy Pollicy</Link>
                        </div>
                    </section>

                    {/* Description */}
                    <motion.p
                        className="text-white text-xl leading-relaxed max-w-5xl mx-auto text-center mt-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Let's start a conversation. Whether you're a growing brand or an established retailer, Mimaansa is here to support your journey. Get in touch with us today to discuss your needs and discover how we can deliver the perfect sourcing solution.
                    </motion.p>

                </div>

                {/* Footer Bottom Section */}
                <div className="py-10">
                    {/* Three Column Layout */}
                    <div className="flex justify-between items-center mb-8 w-full">


                        {/* Social Links - Center */}
                        <motion.div
                            className="flex justify-center gap-5 items-center mb-8 md:mb-0 mx-auto md:mx-0 w-full"

                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <a href="#" className="text-white transition-colors text-md tracking-wider">
                                INSTAGRAM
                            </a>
                            <a href="#" className="text-white transition-colors text-md tracking-wider">
                                LINKEDIN
                            </a>
                            <a href="#" className="text-white transition-colors text-md tracking-wider">
                                TWITTER
                            </a>
                        </motion.div>


                    </div>

                    {/* Copyright */}
                    <motion.div
                        className="text-center pt-4 border-t border-gray-700"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white text-sm tracking-wider">
                            CRAFTED BY Vikava Labs
                        </p>
                    </motion.div>
                </div>

            </div>
        </footer >
    )
}
