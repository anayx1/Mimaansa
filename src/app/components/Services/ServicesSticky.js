"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const cards = [
    {
        title: "SOURCING",
        text: "We start by understanding your product requirements-design, materials, pricing, and compliance. Then, leveraging our vast supplier network, we identify trusted manufacturers or artisans who specialize in your category, from fashion to handcrafted décor. Our team vets each supplier for capability, quality, and ethical standards, ensuring reliability. Acting as your local partner in India, we simplify sourcing and connect you with curated vendors ready to bring your vision to life.",
        img: "/services/sourcing.jpg",
    },
    {
        title: "PRODUCT DEVELOPMENT",
        text: "Turning ideas into real products is our strength. During development, we work closely with you and the supplier to source materials, refine tech packs, and create accurate samples. We ensure clear communication with the factory’s design team so your vision is fully captured. If tweaks are needed, we manage revisions quickly. Our aim: a sample you love, ready for production. We also suggest ways to optimise design for better efficiency and cost-without compromising on quality or style.",
        img: "/services/productdev.jpg",
    },
    {
        title: "NEGOTIATION & PRICING",
        text: "Here skilled negotiation is one of our strengths. Once you approve a sample, we take charge of pricing and terms with the supplier. Drawing on local market insight and bulk buying experience, we secure competitive rates and favourable terms-MOQs, payment, and lead times included. Our firm yet fair approach ensures transparent costing and win-win deals that build lasting supplier relationships. With us handling negotiations, you save time and gain from our expertise in Indian sourcing practices.",
        img: "/services/nego.jpg",
    },
    {
        title: "ORDER MANAGEMENT",
        text: "Once your order is confirmed, we manage production end to end. We launch bulk manufacturing with a clear plan, coordinate materials, track progress, and keep you updated at every key stage. If delays or issues arise, we act quickly-resolving bottlenecks to keep things on schedule. As production wraps up, we handle freight booking, export documents, and shipping. Our hands-on approach ensures smooth execution and timely delivery, from factory floor to final destination.",
        img: "/services/order.jpg",
    },

    {
        title: "Quality Control",
        text: "Quality is central to everything we do. Mimaansa’s inspectors carry out checks at every stage-starting with raw materials and initial samples. During production, we conduct inline inspections to catch issues early, like stitching or colour flaws. After production, we run final checks using AQL standards or your specific requirements, reviewing workmanship, measurements, packaging, and even lab testing when needed. Any defects are corrected before shipment. We also oversee final packing and loading to ensure your order leaves India in top condition.",
        img: "/services/qc.jpg",
    },
];

export default function StackedCards() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    function Card({ card, i, total }) {
        const cardRef = useRef(null);
        const inView = useInView(cardRef, { amount: 0.7, once: false });

        const start = i / total;
        const end = (i + 1) / total;

        const scale = useTransform(scrollYProgress, [start, start + 0.15, end], [1, 1, 0.9]);
        const y = useTransform(
            scrollYProgress,
            [start, start + 0.15, end],
            i === 0 ? ["0%", "0%", "0%"] : ["100%", "0%", "0%"]
        );

        const isOdd = i % 2 === 1;
        const containerFlexDirection = isOdd ? "md:flex-row-reverse" : "md:flex-row";
        const contentWidth = "w-full md:w-1/2";

        return (
            <motion.div
                ref={cardRef}
                key={i}
                className="hidden md:flex absolute top-0 left-0 w-full h-full items-center justify-center"
                style={{
                    y,
                    scale,
                    zIndex: i + 1,
                }}
            >
                <div className={`bg-primary overflow-hidden flex flex-col ${containerFlexDirection} h-full w-full`}>
                    <div className={`relative ${contentWidth} h-64 md:h-full`}>
                        <Image src={card.img} alt={card.title} fill className="object-cover" priority={i === 0} />
                    </div>
                    <div className={`p-6 md:p-10 flex flex-col justify-end items-start ${contentWidth}`}>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="text-4xl md:text-8xl mb-3 leading-snug break-words"
                        >
                            {card.title}
                        </motion.h2>
                        <p className="text-secondary mt-4 md:mt-10">{card.text}</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <>
            {/* Mobile simple scroll */}
            <div className="flex flex-col md:hidden">
                {cards.map((card, i) => (
                    <div key={i} className="flex flex-col mb-10 bg-white">
                        <div className="relative w-full h-64">
                            <Image src={card.img} alt={card.title} fill className="object-cover" />
                        </div>
                        <div className="p-6">
                            <h2 className="text-3xl mb-3">{card.title}</h2>
                            <p className="text-secondary">{card.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop animated scroll */}
            <section
                ref={containerRef}
                className="relative hidden md:block"
                style={{ height: `${cards.length * 100}vh` }}
            >
                <div className="sticky top-0 h-screen overflow-hidden">
                    {cards.map((card, i) => (
                        <Card key={i} card={card} i={i} total={cards.length} />
                    ))}
                </div>
            </section>
        </>
    );
}
