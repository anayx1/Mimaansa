// components/ServicesIntro.jsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ServicesIntro() {
  const text =
    "We provide comprehensive services at each stage of the sourcing and production process. From apparel sourcing and home textile exports to fashion accessories sourcing in India, we handle it all. Here’s a closer look at how we work and what we offer.";

  const words = text.split(" ");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07, // delay between words
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="bg-secondary px-4 md:px-8 lg:px-16 min-h-screen text-center py-20">
      <div className="max-w-5xl mx-auto py-20">
        {hasMounted && (
          <motion.span
            className="text-center text-primary "
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {words.map((word, i) => (
              <motion.p
                key={i}
                variants={wordVariants}
                className="inline-block mr-2 text-primary text-center text-4xl leading-relaxed "
              >
                {word}
              </motion.p>
            ))}
          </motion.span>
        )}
      </div>
    </section>
  );
}
