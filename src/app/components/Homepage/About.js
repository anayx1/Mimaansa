import React from 'react'

const About = () => {
    return (
        <section className='w-full min-h-screen flex justify-center items-center px-4 py-12'>
            <div className='max-w-5xl flex flex-col justify-center items-center text-center'>
                <h1 className='text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-navbar font-medium leading-tight'>
                    MIMAANSA
                </h1>
                <p className='text-base sm:text-lg md:text-xl text-gray-700 mt-4'>
                    Meaning “deep reflection” or “critical inquiry,” 
                    <br className='hidden md:block' /> 
                    Mimaansa reflects a commitment to ethical 
                    <br className='hidden md:block' />
                    sourcing and thoughtful, value-driven partnerships.
                </p>
                <button className="bg-[var(--color-secondary)] text-white py-3 px-6 rounded mt-10 hover:opacity-90 transition">
                    Explore More
                </button>
            </div>
        </section>
    )
}

export default About
