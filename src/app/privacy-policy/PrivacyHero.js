'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'


const PrivacyHero = () => {
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
                                    PRIVACY POLICY                             </h3>
                            </div>
                            {/* Description + scroll message */}
                            <div className="w-full lg:w-1/3 flex flex-col gap-3 text-center lg:text-left">
                                <span className="text-white text-base sm:text-lg md:text-xl leading-relaxed">
                                    At Mimaansa, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or interact with us online.
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
                            <h3 className="mb-2">Information We Collect</h3>
                            <p>We may collect the following types of personal data when you visit our website or contact us:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Contact Details: Name, email address, phone number, company name, and country</li>
                                <li>Business Information: Product inquiries, project specifications, sourcing requirements</li>
                                <li>Technical Data: IP address, browser type, pages visited, time spent on the site (via cookies or analytics tools)</li>
                                <li>Communication Data: Messages or emails exchanged with us</li>
                            </ul>
                            <p className="mt-2">We do not collect or store payment details on our website.</p>
                        </div>

                        <div>
                            <h3 className="mb-2">How We Use Your Information</h3>
                            <p>We use the information collected for the following purposes:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>To respond to your inquiries or service requests</li>
                                <li>To communicate regarding your sourcing needs</li>
                                <li>To improve our website and user experience</li>
                                <li>To send relevant updates (only if you’ve opted in)</li>
                                <li>For internal record keeping and client support</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-2">Sharing of Information</h3>
                            <p>We do not sell or rent your personal information. Your data may be shared with:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Our internal team members to serve your needs</li>
                                <li>Trusted third-party service providers (such as shipping agents or QC teams), solely for fulfilling your project</li>
                                <li>Legal authorities if required by law</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-2">Data Security</h3>
                            <p>
                                We implement reasonable security practices to protect your personal information from unauthorized
                                access, misuse, or disclosure. However, no method of online transmission or storage is 100% secure.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Cookies</h3>
                            <p>
                                We may use cookies to understand how visitors use our website and to improve your experience.
                                You can choose to accept or refuse cookies through your browser settings.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Your Rights</h3>
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Access or correct your personal information</li>
                                <li>Request that we delete your data</li>
                                <li>Withdraw consent or opt out of receiving marketing communication</li>
                            </ul>
                            <p className="mt-2">
                                To do so, please contact us at [insert email address].
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Third-Party Links</h3>
                            <p>
                                Our website may contain links to other websites. We are not responsible for the privacy practices
                                or content of those third-party sites.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Updates to Terms</h3>
                            <p>
                                Mimansa reserves the right to update these Terms at any time. We encourage users to review this
                                page periodically. Continued use of the website and services indicates acceptance of the revised
                                terms.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2">Changes to This Policy</h3>
                            <p>
                                We may update this Privacy Policy from time to time. The latest version will always be available
                                on this page with the updated effective date.
                            </p>
                        </div>
                    </section>
                </section>
            </motion.section>
        </div>
        <div className='py-[600px]'></div>
    </>
    )
}

export default PrivacyHero
