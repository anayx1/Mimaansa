"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ButtonDark } from "../Button"
// import Button from "./ui/button"

export default function Footer() {
    return (
        <footer
            className="bg-secondary text-white min-h-screen flex flex-col justify-center relative py-10"
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
                        <ButtonDark className="font-navbar">Contact Us</ButtonDark>

                    </motion.div>

                    {/* Info + Logo Section */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 w-full mt-10">
                        {/* Contact Info */}
                        <div className="flex flex-col items-center lg:items-start justify-center gap-1 text-center lg:text-left text-white">
                            <p className="text-white font-medium mb-1  font-navbar">CONTACT INFO</p>
                            <p className="text-white font-navbar">+91 9910924032</p>
                            <p className="text-white font-navbar">info@mimaansa.com</p>
                        </div>

                        {/* Logo */}
                        <motion.div
                            className="flex justify-center items-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src={"/logo.avif"}
                                width={1000}
                                height={1000}
                                alt="logo"
                                className="w-[220px] sm:w-[280px] md:w-[350px] h-auto"
                            />
                        </motion.div>

                        {/* Links */}
                        <div className="flex flex-col items-center lg:items-end justify-center gap-1 text-center lg:text-right text-white">
                            <Link href="/terms-and-conditions" className="text-white hover:text-gray-300 transition-colors font-navbar">
                                TERMS & CONDITIONS
                            </Link>
                            <Link href="/privacy-policy" className="text-white hover:text-gray-300 transition-colors font-navbar">
                                PRIVACY POLICY
                            </Link>
                        </div>
                    </section>

                    {/* Description */}
                    <motion.p
                        className="text-white text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl mx-auto text-center mt-12 lg:mt-16 px-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Let's start a conversation. Whether you're a growing brand or an established retailer, Mimaansa is here to
                        support your journey. Get in touch with us today to discuss your needs and discover how we can deliver the
                        perfect sourcing solution.
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

                        <Link
                            href={'#'}
                            className="uppercase relative group text-gray-200 hover:text-gray-300 transition-colors text-lg font-navbar"
                        >
                            Instagram

                            <span
                                className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-200 transition-all duration-400 group-hover:w-full"
                            />
                        </Link>
                        <Link
                            href={'#'}
                            className="uppercase relative group text-gray-200 hover:text-gray-300 transition-colors text-lg font-navbar"
                        >
                            Linkedin
                            <span
                                className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-200 transition-all duration-400 group-hover:w-full"
                            />
                        </Link>
                        <Link
                            href={'#'}
                            className="uppercase relative group text-gray-200 hover:text-gray-300 transition-colors text-lg font-navbar"
                        >
                            TWITTER
                            <span
                                className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-200 transition-all duration-400 group-hover:w-full"
                            />
                        </Link>
                    </motion.div>

                    {/* Copyright */}
                    <motion.div
                        className="text-center "
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        viewport={{ once: true }}
                    >
                        <Link href={'https://vikavalabs.com/'} target="_blank">
                            <p className="text-white text-xs sm:text-sm tracking-wider ">CRAFTED BY VIKAVA LABS</p>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </footer>
    )
}
