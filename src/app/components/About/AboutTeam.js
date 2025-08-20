"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../Button";

export default function TeamSection() {
    return (
        <section className="bg-secondary text-white px-4 sm:px-6 lg:px-20 min-h-screen py-20">
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
                    <div className="flex flex-col justify-start lg:justify-start mt-0">
                        <p className="text-primary text-lg sm:text-xl leading-relaxed text-center lg:text-left md:mt-10">
                            Our team at Mimaansa is a blend of experienced sourcing professionals,
                            quality inspectors, product developers, and logistics coordinators.
                            We're proud to bring together deep knowledge of India's apparel and
                            home textile industry with international business savvy. From fashion
                            technologists who understand garment construction, to merchandisers
                            skilled in vendor negotiation, to quality control experts well-versed
                            in global standards - each member is committed to ensuring your project
                            succeeds.
                        </p>
                        <div className="flex mt-5">

                            <Button>
                                Read More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
