import Image from 'next/image'
import React from 'react'


const images = [
    "/products/apperal/apperal.jpg", "/products/apperal/apperal2.jpg",
    "/products/apperal/apperal3.jpg", "/products/apperal/apperal4.jpg",
    "/products/apperal/apperal5.jpg", "/products/apperal/apperal6.jpg",
    "/products/apperal/apperal7.jpg", "/products/apperal/apperal8.jpg",
]
const images2 = [
    "/products/apperal/apperal8.jpg", "/products/apperal/apperal9.jpg",
    "/products/apperal/apperal10.jpg", "/products/apperal/apperal11.jpg",
    "/products/apperal/apperal12.jpg", "/products/apperal/apperal13.jpg",
    "/products/apperal/apperal14.jpg", "/products/apperal/apperal15.jpg",
]

export default function SecondSection() {
    return (
        <section className="bg-secondary pt-16 ">
            <div className=" mx-auto">
                {/* HEADER GRID */}
                <div className='w-full flex justify-center items-center'>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12 section">
                        <h2 className="text-primary mb-4">Apparels</h2>
                        <p className="text-primary">
                            India is a hub for apparel production – from cotton basics to intricate, embellished garments. We source apparel across all segments: casual wear, formal wear, activewear, and more. Our network includes factories adept at handling various textiles like cotton, silk, denim, and sustainable fabrics. We ensure quality at every step, whether it’s a large run of organic cotton T-shirts or a high-fashion capsule collection. Thanks to India’s position as one of the world’s top textile and apparel producers, we can meet a range of needs – from high-volume orders for established brands to small-batch production for independent labels or designs requiring special handwork. The result is clothing that matches your design and quality standards, delivered ready for your market.
                        </p>
                    </div>
                </div>
                {/* IMAGE GRID */}
                <div className="w-full overflow-hidden pt-10 relative">
                    <div className="flex animate-marquee">
                        {[...images, ...images].map((image, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] px-1"
                            >
                                <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                                    <Image
                                        src={image}
                                        alt={`Mission ${index}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                                        quality={100}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full overflow-hidden pt-8 relative">
                    <div className="flex animate-marquee-reverse">
                        {[...images2, ...images2].map((image, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] px-1"
                            >
                                <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                                    <Image
                                        src={image}
                                        alt={`Mission ${index}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                                        quality={85}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 50s linear infinite;
    width: max-content;
  }
  @keyframes marquee-reverse {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .animate-marquee-reverse {
    animation: marquee-reverse 50s linear infinite;
    width: max-content;
  }
`}</style>
            </div>
        </section>
    )
}