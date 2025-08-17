"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimatedNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const menuItems = [
        { menu: 'HOME', link: '/' },
        { menu: 'ABOUT', link: '/about-us' },
        { menu: 'SERVICES', link: '/services' },
        { menu: 'PRODUCTS', link: '/products' },
        { menu: 'BLOGS', link: '/blogs' },
    ]

    const socialLinks = [
        'INSTAGRAM',
        'X',
        'THREADS',
        'FACEBOOK',
        'YOUTUBE',
        'LINKEDIN'
    ]
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // gap between each item’s animation
                delayChildren: 0.1, // delay before first starts
            },
        },
    };

    // Individual item animation
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };
    return (
        <>
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50  w-full flex justify-center items-center h-12 ${isMenuOpen ? 'bg-[#27272A]' : 'bg-[var(--color-primary)]'}`}>
                <div className='w-[98%] h-full flex items-center justify-center'>
                    <div className="flex items-center justify-between px-6 py-4 w-full">
                        {/* Logo */}
                        <div className='h-auto'>
                            <span className='text-3xl font-navbar tracking-wide'>MIMAANSA</span>
                        </div>

                        {/* Hamburger Menu Button - 2 lines */}
                        <button
                            onClick={toggleMenu}
                            className="relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none z-50 mr-8"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                className="block absolute text-bold"
                                style={{ transformOrigin: 'center center', height: '2px' }}
                                animate={isMenuOpen
                                    ? { rotate: 45, y: 0, width: 34, x: 0, backgroundColor: '#ffffff' }
                                    : { rotate: 0, y: -5, width: 48, x: 0, backgroundColor: '#000000' }
                                }
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="block absolute text-bold"
                                style={{ transformOrigin: 'center center', height: '2px' }}
                                animate={isMenuOpen
                                    ? { rotate: -45, y: 0, width: 34, x: 0, backgroundColor: '#ffffff' }
                                    : { rotate: 0, y: 5, width: 38, x: -4, backgroundColor: '#000000' }
                                }
                                transition={{ duration: 0.3 }}
                            />
                        </button>




                    </div>
                </div>
            </nav>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence >
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-[#27272A] text-white z-40"
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        <div className="h-full flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6">
                                <button
                                    onClick={toggleMenu}
                                    className="w-8 h-8 flex items-center justify-center"
                                    aria-label="Close menu"
                                >
                                    <motion.div
                                        className="relative w-6 h-6"
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <span className="absolute inset-0 w-6 h-0.5 bg-white top-1/2 transform -translate-y-1/2 rotate-45" />
                                        <span className="absolute inset-0 w-6 h-0.5 bg-white top-1/2 transform -translate-y-1/2 -rotate-45" />
                                    </motion.div>
                                </button>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">
                                {/* Menu Items */}
                                <div className="lg:col-span-1">
                                    <h2 className="text-sm font-medium text-white mb-8">MENU</h2>
                                    {/* Animate container */}
                                    <motion.div
                                        className="space-y-6"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="show"
                                    >
                                        {menuItems.map((item, index) => (
                                            <motion.div
                                                key={item.menu}
                                                className="relative group"
                                                variants={itemVariants}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {/* HR line - hidden by default, expands on hover */}
                                                    <hr className="w-0 group-hover:w-20 h-[1px] bg-white transition-all duration-500 pointer-events-none" />

                                                    <motion.a
                                                        href={item.link}
                                                        className="block text-4xl lg:text-5xl font-light text-white transition-colors relative"
                                                        whileHover={{ x: 20 }}
                                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                                    >
                                                        <span className="text-7xl font-light text-white">{item.menu}</span>
                                                    </motion.a>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                </div>
                                {/* Office Address */}
                                <div className='flex-col justify-evenly flex '>
                                    <div className='lg:col-span-1 flex justify-between'>
                                        <div className="lg:col-span-1">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                            >
                                                <h2 className="text-xl font-medium text-gray-200 mb-8">OFFICE ADDRESS</h2>
                                                <div className="space-y-2 text-lg text-white">
                                                    <p className='text-gray-200 text-4xl'>A-904 Kenwood</p>
                                                    <p className='text-gray-200 text-4xl'>Apartment</p>
                                                    <p className='text-gray-200 text-4xl'>Charmwood Village</p>
                                                    <p className='text-gray-200 text-4xl'>FARIDABAD 121009</p>
                                                </div>
                                            </motion.div>
                                        </div>
                                        {/* Contact Info */}
                                        <div className="lg:col-span-1">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                            >
                                                <h2 className="text-sm font-medium text-gray-200 mb-8">CONTACT INFO</h2>
                                                <div className="space-y-4 text-lg">
                                                    <div>
                                                        <p className="text-gray-200 text-4xl">Contact:</p>
                                                        <p className='text-gray-200 text-4xl'>+ 91 99 1092-4032</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-200 text-4xl">Email:</p>
                                                        <p className='text-gray-200 text-4xl'>info@mimaansa.com</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                    {/* Footer */}
                                    <div className=" pt-5">
                                        <hr className='bg-white w-[90%] h-[1px]' />
                                        <motion.div
                                            className="flex gap-2 mt-5 lg:flex-row justify-between items-start space-y-6 lg:space-y-0"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.6 }}
                                        >
                                            {/* Social Links */}
                                            <div className="flex flex-wrap gap-6 text-sm">
                                                {socialLinks.map((link) => (
                                                    <a
                                                        key={link}
                                                        href="#"
                                                        className="text-gray-200 hover:text-gray-300 transition-colors text-2xl"
                                                    >
                                                        {link}
                                                    </a>
                                                ))}
                                            </div>

                                            {/* Legal Links */}
                                            {/* <div className="flex gap-6 text-sm">
                                                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                                    TERMS & CONDITIONS
                                                </a>
                                                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                                    PRIVACY POLICY
                                                </a>
                                            </div> */}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default AnimatedNavbar
