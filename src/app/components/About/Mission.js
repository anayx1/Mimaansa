'use client'
import React from 'react'
import Image from 'next/image'

const ContinuousMarqueeSlider = () => {
    const images = [
        "/about/mission/mission1.avif", "/about/mission/mission2.avif",
        "/about/mission/mission3.avif", "/about/mission/mission4.avif",
        "/about/mission/mission5.avif", "/about/mission/mission7.avif",
        "/about/mission/mission8.avif",
    ]

    return (
        <>
            <section className='w-full flex justify-center items-center py-10 overflow-hidden'>
                <div className='w-[95%] flex flex-col md:flex-row justify-between items-center gap-5'>
                    <div className='md:w-2/3'>
                        <h2 className="">MISSION</h2>
                    </div>
                    <div className='md:w-1/3 mt-5 md:mt-0'>
                        <p className='text-center md:text-left'>
                            Our mission is to empower global brands with seamless, responsible sourcing from India. We strive to deliver value through quality products, ethical practices, and end-to-end support - enabling our clients to succeed in their markets while making a positive impact via fair and sustainable sourcing.
                        </p>
                    </div>
                </div>
            </section>

            <div className="w-full overflow-hidden py-8 relative">
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
                    animation: marquee 40s linear infinite;
                    width: max-content;
                }
            `}</style>
        </>
    )
}

export default ContinuousMarqueeSlider
