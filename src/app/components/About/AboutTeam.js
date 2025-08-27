"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Button from "../Button";
import { useState } from "react";

export default function     TeamSection() {
    const [isExpanded, setIsExpanded] = useState(false);

    const shortText =
        "Our team at Mimaansa is a blend of experienced sourcing professionals, quality inspectors, product developers, and logistics coordinators. We’re proud to bring together deep knowledge of India’s apparel and home textile industry with international business savvy. From fashion technologists who understand garment construction, to merchandisers skilled in vendor negotiation, to quality control experts well-versed in global standards – each member is committed to ensuring your project succeeds.";

    const extendedText =
        " We operate as an extension of your own team on the ground. With English-speaking staff and regional experts, we eliminate language barriers and cultural misunderstandings that can complicate overseas sourcing. When you work with Mimaansa, you gain a dedicated partner who is as passionate about your products as you are."
    return (
        <section className="bg-secondary text-white px-6 lg:px-20 min-h-screen py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[auto_auto_auto] gap-12 items-start py-20">

                {/* Image */}
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:w-[450px] aspect-[3/4] mx-auto lg:mx-0">
                    <Image
                        src="/about/commit.jpg"
                        alt="Team working"
                        fill
                        quality={90}
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Vertical Line with Commitment/Trust */}
                <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl tracking-wide text-primary mb-6">
                        Commitment
                    </span>
                    <div className="relative w-px h-[300px] sm:h-[400px] md:h-[600px] bg-transparent">
                        <motion.div
                            className="absolute top-1/2 left-0 w-px bg-gray-500 origin-center -translate-y-1/2"
                            initial={{ height: "70%" }}
                            whileInView={{ height: "100%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                        ></motion.div>
                    </div>
                    <span className="text-3xl tracking-wide text-primary mt-6">
                        Trust
                    </span>
                </div>

                {/* TEAM Content */}
                <div className="flex flex-col max-w-xl justify-evenly h-full ">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl text-primary tracking-wider text-center lg:text-left">
                        TEAM
                    </h2>
                    <motion.div
                        className="space-y-4 sm:space-y-6 md:pb-15"
                    >
                        <motion.p className=" text-primary text-center lg:text-left">
                            {shortText}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.span
                                        className="text-primary"
                                        key="extended"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <br />
                                        {extendedText}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.p>

                        {!isExpanded && (
                            <motion.button
                                className="mx-auto lg:mx-0 mt-6 sm:mt-8 bg-secondary text-primary px-5 sm:px-6 py-2 text-base sm:text-lg hover:bg-primary hover:text-secondary hover:border hover:border-secondary transition-colors duration-300 rounded-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsExpanded(true)}
                            >
                                Read More
                            </motion.button>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
