"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ButtonDark } from "../Button"
import { usePathname } from "next/navigation"   // ✅ FIXED


export default function Footer() {
    const pathname = usePathname()
    // Don't show footer on /admin and /login
    if (pathname === "/admin" || pathname === "/login") {
        return null
    }


    return (
        <footer
            className="bg-secondary text-white min-h-screen flex flex-col justify-center relative py-3"
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
                        <h2 className="text-3xl md:text-4xl font-normal text-white mb-8 leading-relaxed max-w-6xl mx-auto px-4">
                            Are you ready to simplify your sourcing from India?
                        </h2>
                        <Link href={'/contact-us'}>

                            <ButtonDark className="font-navbar">Contact Us</ButtonDark>
                        </Link>

                    </motion.div>

                    {/* Info + Logo Section */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 w-full mt-10">
                        {/* Contact Info */}
                        <div className="flex flex-col items-center justify-center gap-0 text-center text-white">
                            <span className="text-white font-medium font-navbar ">CONTACT INFO</span>
                            <span className="text-white font-navbar text-base">+91 9910924032</span>
                            <span className="text-white font-navbar text-base">info@mimaansa.com</span>
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
                                className="w-[220px] md:w-[300px] h-auto"
                            />
                        </motion.div>

                        {/* Links */}
                        <div className="flex flex-col items-center lg:items-end justify-center gap-1 text-center text-white">
                            <span className="w-auto flex flex-col space-y-2">

                                <Link href="/terms-and-conditions" className="text-base text-white hover:text-gray-300 transition-colors font-navbar relative group">
                                    TERMS & CONDITIONS
                                    <span
                                        className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-200 transition-all duration-400 group-hover:w-full"
                                    />
                                </Link>
                                <Link href="/privacy-policy" className="text-base text-white hover:text-gray-300 transition-colors font-navbar relative group text-center">
                                    PRIVACY POLICY
                                    <span
                                        className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-200 transition-all duration-400 group-hover:w-full"
                                    />
                                </Link>
                            </span>
                        </div>
                    </section>

                    {/* Description */}
                    {/* <motion.p
                        className="text-white text-base lg:text-md leading-relaxed max-w-5xl mx-auto text-center mt-12 lg:mt-16 px-4"
                    >
                        Let's start a conversation. Whether you're a growing brand or an established retailer, Mimaansa is here to
                        support your journey. Get in touch with us today to discuss your needs and discover how we can deliver the
                        perfect sourcing solution.
                    </motion.p> */}
                </div>

                {/* Footer Bottom */}
                <div className="pt-3">
                    {/* Social Links */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-5 items-center mb-4"

                    >

                        <Link
                            href={'/contact-us'}
                            className="uppercase relative group text-gray-200 hover:text-gray-300 transition-colors text-lg font-navbar"
                        >
                            Instagram

                            <span
                                className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-200 transition-all duration-400 group-hover:w-full"
                            />
                        </Link>
                        <Link
                            href={'/contact-us'}
                            className="uppercase relative group text-gray-200 hover:text-gray-300 transition-colors text-lg font-navbar"
                        >
                            Linkedin
                            <span
                                className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-200 transition-all duration-400 group-hover:w-full"
                            />
                        </Link>
                        <Link
                            href={'/contact-us'}
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
                        className="text-center">
                        <Link href={'https://vikavalabs.com/'} target="_blank">
                            <p className="text-white text-xs  tracking-wider ">CRAFTED BY <em className="underline">VIKAVA LABS</em></p>
                        </Link>
                        <span className="text-white/70 text-[8px] text-center w-full mt-5">
                            Images featured on this website remain the intellectual property of the respective clients/buyers. Mimaansa claims no ownership over them
                        </span>
                    </motion.div>
                </div>
            </div>
        </footer>
    )
}
