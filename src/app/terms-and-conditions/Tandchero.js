'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'


const Tandchero = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const section1Scale = useTransform(scrollYProgress, [0, 0], [1.1, 1])
    const section1Y = useTransform(scrollYProgress, [0, 1], [100, 0])

    const messages = [
        "[Scroll for more]",
        "[Scroll for more]",
    ];

    return (<>
        <div ref={containerRef} className="relative h-[200vh]">
            {/* Hero Section */}
            <section className="sticky top-0 h-screen w-full bg-[url(/tandc.jpg)] bg-cover bg-[center_70%] z-10">
                <div className="h-full w-full bg-black/50">
                    <div className="h-full w-full flex flex-col items-center justify-end px-4 sm:px-6 md:px-8">
                        <div className="max-w-[95%] flex flex-col lg:flex-row lg:justify-between pb-5 gap-4">
                            {/* Title */}
                            <div className="w-full lg:w-2/3 flex items-end">
                                <h3 className="text-white text-4xl sm:text-5xl lg:text-8xl uppercase leading-tight text-center lg:text-left">
                                    TERMS AND CONDITIONS                              </h3>
                            </div>
                            {/* Description + scroll message */}
                            <div className="w-full lg:w-1/3 flex flex-col gap-3 text-center lg:text-left">
                                <span className="text-white text-base sm:text-lg md:text-xl leading-relaxed">
                                    Welcome to Mimaansa (hereinafter referred to as "we", "us", or "our"). By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
                                </span>
                                <div className="overflow-hidden h-[1.5em] inline-block mx-auto lg:mx-0">
                                    <motion.div
                                        initial={{ y: 0 }}
                                        animate={{ y: `-${(messages.length - 1) * 60}%` }}
                                        transition={{
                                            duration: messages.length * 1.2,
                                            delay: 0.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="flex flex-col"
                                    >
                                        {messages.map((msg, i) => (
                                            <span key={i} className="text-white text-sm sm:text-base">
                                                {msg}
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Section */}
            <motion.section
                className="sticky top-0 h-screen text-white z-20 max-w-full"
                style={{
                    scale: section1Scale,
                    y: section1Y,
                    transformOrigin: "top center"
                }}
            >
                <section className="bg-primary pt-16 ">

                    <section className="max-w-3xl mx-auto py-10 px-4 space-y-6">
                        <p className="text-sm">Last Updated: July 1, 2025</p>

                        <div>
                            <h3 className=" mb-2">Services offered</h3>
                            <p>
                                Mimansa is a sourcing and export service provider based in India. We help clients
                                identify suppliers, manage production, ensure quality control, and coordinate shipments.
                                Our services are offered on a project or retainer basis, and specific terms will be
                                outlined in individual agreements.
                            </p>
                        </div>

                        <div>
                            <h3 className=" mb-2">Client Responsibilities</h3>
                            <p>
                                Clients are responsible for providing clear product specifications, timelines, and target
                                pricing. Delays in approvals or incomplete information from the client may affect timelines
                                and deliverables.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Intellectual Property</h3>
                            <p>
                                All content displayed on this website, including but not limited to text, graphics, logos,
                                and images, is either created by Mimansa, sourced from royalty-free or paid image platforms
                                (such as Shutterstock, Unsplash, etc.), or provided by past clients for illustrative
                                purposes. Any images or materials shared by clients are used solely for showcasing the
                                nature of our work and are not intended for reproduction or redistribution. The original
                                copyright of such materials remains with the respective owners. We do not claim ownership
                                over client-provided content, and it should not be used elsewhere without prior written
                                permission from the original copyright holder.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Pricing and Payment</h3>
                            <p>
                                Pricing for sourcing services, sampling, and production will be shared through formal
                                quotations. Payments must be made as per agreed terms (usually via wire transfer), and any
                                delays may affect order timelines. All prices are exclusive of taxes, duties, and shipping
                                costs unless specified.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Confidentiality</h3>
                            <p>
                                We respect the confidentiality of all client information and product designs. Both parties
                                agree not to disclose confidential business, pricing, or product data to third parties
                                without prior written consent.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Quality & Compliance</h3>
                            <p>
                                While we act as your sourcing partner, we are not liable for delays caused by acts of God,
                                strikes, or supplier defaults beyond our control. Our liability is limited to the scope of
                                our services and does not extend to lost profits or indirect damages.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Governing Law</h3>
                            <p>
                                These Terms are governed by the laws of India. Any disputes arising from your use of our
                                services shall be subject to the jurisdiction of courts in Delhi NCR, India.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Updates to Terms</h3>
                            <p>
                                Mimansa reserves the right to update these Terms at any time. We encourage users to review
                                this page periodically. Continued use of the website and services indicates acceptance of
                                the revised terms.
                            </p>
                        </div>
                    </section>

                </section>
            </motion.section>
        </div>
        <div className='py-[250px]'></div>
    </>
    )
}

export default Tandchero
