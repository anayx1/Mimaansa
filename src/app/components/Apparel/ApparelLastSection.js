// components/ServicesIntro.jsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ApparelLastSection() {

  const text =
    "India's manufacturing strength spans a broad array of goods. At Mimaansa, we focus on three key product categories for our clients - leveraging the country's rich resources and craftsmanship in each area. Whether you want to develop a full fashion line, source artisanal home items, or add unique accessories to your collection, we have the expertise to make it happen.";

  const words = text.split(" ");
  const [hasMounted, setHasMounted] = useState(false);

  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);

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
    <section className=" px-4 text-center py-10">
      <div className="max-w-6xl mx-auto py-20">
        {/* {hasMounted && (
          <motion.span
            className="text-center text-secondary "

            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {words.map((word, i) => (
              <motion.p
                key={i}
                variants={wordVariants}
                className="inline-block mr-2 text-secondary text-center"
              >
                {word}
              </motion.p>
            ))}
          </motion.span>
        )} */}
        <p>
          India's manufacturing strength spans a broad array of goods. At Mimaansa, we focus on three key product categories for our clients - leveraging the country's rich resources and craftsmanship in each area. Whether you want to develop a full fashion line, source artisanal home items, or add unique accessories to your collection, we have the expertise to make it happen.
        </p>
      </div>
    </section>
  );
}
