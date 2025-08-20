"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const AnimatedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null)
  const hoverTimeoutRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setOpenMobileSubmenu(null) // Close any open mobile submenu when main menu closes
  }

  const handleMouseEnter = (index) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setHoveredItem(index)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null)
    }, 150)
  }

  const handleSubmenuMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }

  const handleSubmenuMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null)
    }, 150)
  }

  const handleSubmenuClick = () => {
    setIsMenuOpen(false) // Close the entire navbar when submenu item is clicked
    setHoveredItem(null) // Hide submenu
    setOpenMobileSubmenu(null) // Close mobile submenu
  }

  const handleMobileMenuItemClick = (item, index) => {
    if (item.subMenu) {
      // Toggle mobile submenu
      setOpenMobileSubmenu(openMobileSubmenu === index ? null : index)
    } else {
      // Close navbar for regular menu items
      setIsMenuOpen(false)
    }
  }

  const menuItems = [
    { menu: "HOME", link: "/" },
    { menu: "ABOUT", link: "/about-us" },
    { menu: "SERVICES", link: "/services" },
    {
      menu: "PRODUCTS",
      link: "/products",
      subMenu: [
        { title: "APPAREL", link: "/apparels" },
        { title: "LIFESTYLE ACCESSORIES", link: "/lifestyle-accessories" },
        { title: "HOME FURNISHING", link: "/home-furnishing" },
        { title: "FABRICS", link: "/fabrics" },
      ]
    },
    { menu: "BLOGS", link: "/blogs" },
    { menu: "CONTACT", link: "/contact" },
  ]

  const socialLinks = [
    { title: "INSTAGRAM", href: "https://instagram.com" },
    { title: "X", href: "https://x.com" },
    { title: "THREADS", href: "https://threads.net" },
    { title: "FACEBOOK", href: "https://facebook.com" },
    { title: "YOUTUBE", href: "https://youtube.com" },
    { title: "LINKEDIN", href: "https://linkedin.com" },
    { title: "TERMS & CONDITIONS", href: "/terms" },
    { title: "PRIVACY POLICY", href: "/privacy" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // gap between each item's animation
        delayChildren: 0.1, // delay before first starts
      },
    },
  }

  const submenuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.15, ease: "easeInOut" },
    },
  }

  const submenuItemVariants = {
    hidden: { opacity: 0, x: -20, y: 8 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: { opacity: 0, x: -15, transition: { duration: 0.15, ease: "easeInOut" } },
  }

  // Individual item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[10000] w-full flex justify-center items-center h-12"
        animate={{
          backgroundColor: isMenuOpen ? "#27272A" : "#ffffff",
        }}
        transition={{
          duration: isMenuOpen ? 0.6 : 0.4,
          ease: [0.22, 1, 0.36, 1],
          delay: isMenuOpen ? 0.1 : 0,
        }}
      >
        <div className="w-[98%] h-full flex items-center justify-center">
          <div className="flex items-center justify-between px-6 py-4 w-full">
            {/* Logo */}
            <div className="h-auto">
              <span className="text-3xl font-navbar tracking-wide">MIMAANSA</span>
            </div>

            {/* Hamburger Menu Button - 2 lines */}
            <button
              onClick={toggleMenu}
              className="relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none z-[10001] mr-8"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block absolute text-bold"
                style={{ transformOrigin: "center center", height: "2px" }}
                animate={
                  isMenuOpen
                    ? { rotate: 45, y: 0, width: 34, x: 0, backgroundColor: "#ffffff" }
                    : { rotate: 0, y: -5, width: 48, x: 0, backgroundColor: "#000000" }
                }
                transition={{ duration: 0.4, delay: isMenuOpen ? 0.2 : 0 }}
              />
              <motion.span
                className="block absolute text-bold"
                style={{ transformOrigin: "center center", height: "2px" }}
                animate={
                  isMenuOpen
                    ? { rotate: -45, y: 0, width: 34, x: 0, backgroundColor: "#ffffff" }
                    : { rotate: 0, y: 5, width: 38, x: -4, backgroundColor: "#000000" }
                }
                transition={{ duration: 0.4, delay: isMenuOpen ? 0.2 : 0 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#27272A] text-white z-[9998]"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6">
                <div></div>
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
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12 overflow-auto">
                {/* Menu Items */}
                <div className="lg:col-span-1">
                  <h2 className="text-sm font-medium text-white mb-8 md:ml-5">MENU</h2>
                  {/* Animate container */}
                  <motion.div
                    className="space-y-3 relative z-[10002]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {menuItems.map((item, index) => (
                      <motion.div key={item.menu} className="relative group" variants={itemVariants}>
                        <div className="flex items-center gap-4">
                          {/* HR line - hidden by default, expands on hover */}
                          <hr className="w-0 group-hover:w-20 h-[1px] bg-white transition-all duration-500 pointer-events-none" />

                          <div
                            className="relative"
                            onMouseEnter={() => item.subMenu && handleMouseEnter(index)}
                            onMouseLeave={() => item.subMenu && handleMouseLeave()}
                          >
                            <motion.div
                              className="relative flex items-center gap-4"
                              whileHover={{ x: 20 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                              {item.subMenu ? (
                                // For items with submenu, use button on mobile, Link on desktop
                                <div className="flex items-center gap-4">
                                  <Link
                                    href={item.link}
                                    className="hidden lg:block text-4xl lg:text-5xl font-light text-white transition-colors relative"
                                  >
                                    <span className="text-7xl font-light text-white">{item.menu}</span>
                                  </Link>

                                  <button
                                    onClick={() => handleMobileMenuItemClick(item, index)}
                                    className="lg:hidden block text-4xl lg:text-5xl font-light text-white transition-colors relative"
                                  >
                                    <span className="text-7xl font-light text-white">{item.menu}</span>
                                  </button>
                                </div>
                              ) : (
                                // For regular items, always use Link
                                <Link
                                  href={item.link}
                                  onClick={() => handleMobileMenuItemClick(item, index)}
                                  className="block text-4xl lg:text-5xl font-light text-white transition-colors relative"
                                >
                                  <span className="text-7xl font-light text-white">{item.menu}</span>
                                </Link>
                              )}

                              {item.subMenu && (
                                <motion.svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="text-white"
                                  animate={{
                                    rotate: (hoveredItem === index || openMobileSubmenu === index) ? 180 : 0
                                  }}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                  <path
                                    d="M6 9l6 6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </motion.svg>
                              )}
                            </motion.div>

                            {/* Desktop Submenu - Hover Based */}
                            <AnimatePresence mode="wait">
                              {item.subMenu && hoveredItem === index && (
                                <motion.div
                                  key="desktop-submenu"
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  variants={submenuVariants}
                                  className="absolute left-full top-0 ml-4 hidden lg:flex flex-col bg-white backdrop-blur-sm rounded-xl shadow-2xl border border-gray-100 p-6 space-y-2 min-w-[320px] z-[10005]"
                                  style={{ transformOrigin: "left top" }}
                                  onMouseEnter={handleSubmenuMouseEnter}
                                  onMouseLeave={handleSubmenuMouseLeave}
                                >
                                  {/* Bridge element to prevent hover gaps */}
                                  <div className="absolute right-full top-0 w-6 h-full bg-transparent" />

                                  {item.subMenu.map((sub, subIndex) => (
                                    <motion.div key={subIndex} variants={submenuItemVariants} className="relative">
                                      <Link
                                        href={sub.link}
                                        onClick={handleSubmenuClick}
                                        className="block text-lg font-medium text-gray-700 hover:text-black transition-all duration-200 py-3 px-4 rounded-lg hover:bg-gray-50 relative overflow-hidden group/item"
                                      >
                                        <motion.div
                                          className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
                                          initial={{ x: "-100%" }}
                                          whileHover={{ x: 0 }}
                                          transition={{ duration: 0.3, ease: "easeOut" }}
                                        />
                                        <span className="relative z-10">{sub.title}</span>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Mobile Submenu - Click Based */}
                            <AnimatePresence>
                              {item.subMenu && openMobileSubmenu === index && (
                                <motion.div
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  variants={submenuVariants}
                                  className="mt-4 space-y-2 lg:hidden bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 z-[10003]"
                                >
                                  {item.subMenu.map((sub, subIndex) => (
                                    <motion.div key={subIndex} variants={submenuItemVariants}>
                                      <Link
                                        href={sub.link}
                                        onClick={handleSubmenuClick}
                                        className="block text-lg font-medium text-gray-200 hover:text-white transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white/10"
                                      >
                                        {sub.title}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Office Address */}
                <div className="flex-col justify-evenly flex ">
                  <div className="lg:col-span-1 flex flex-col lg:flex-row justify-between">
                    <div className="lg:col-span-1 mb-8 lg:mb-0">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <h2 className="text-xl font-medium text-gray-200 mb-8">OFFICE ADDRESS</h2>
                        <div className="space-y-3 text-lg text-wsshite">
                          <p className="text-gray-200 text-2xl lg:text-4xl">A-904 Kenwood</p>
                          <p className="text-gray-200 text-2xl lg:text-4xl">Apartment</p>
                          <p className="text-gray-200 text-2xl lg:text-4xl">Charmwood Village</p>
                          <p className="text-gray-200 text-2xl lg:text-4xl">FARIDABAD 121009</p>
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
                        <div className="space-y-8 text-lg">
                          <div>
                            <p className="text-gray-200 text-2xl lg:text-4xl mb-3">Contact:</p>
                            <p className="text-gray-200 text-2xl lg:text-4xl">+ 91 99 1092-4032</p>
                          </div>
                          <div>
                            <p className="text-gray-200 text-2xl lg:text-4xl mb-3">Email:</p>
                            <p className="text-gray-200 text-2xl lg:text-4xl">info@mimaansa.com</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  {/* Footer */}
                  <div className=" pt-5">
                    <hr className="bg-white w-[90%] h-[1px]" />
                    <motion.div
                      className="flex gap-2 mt-15 flex-col lg:flex-row justify-between items-start space-y-6 lg:space-y-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {/* Social Links */}
                      <div className="flex flex-wrap gap-3 lg:gap-6 text-sm">
                        {socialLinks.map((link, index) => (
                          <Link
                            key={index}
                            href={link.href}
                            className="relative group text-gray-200 hover:text-gray-300 transition-colors text-base lg:text-lg font-navbar"
                          >
                            {link.title}
                            <span
                              className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-200 transition-all duration-400 group-hover:w-full"
                            />
                          </Link>
                        ))}
                      </div>
                    </motion.div>

                    {/* Copyright Footer */}
                    <motion.div
                      className="mt-8 text-gray-200 text-base lg:text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      © 2025 Mimaansa &nbsp;&nbsp; All rights reserved &nbsp;&nbsp; Crafted by Vikava Labs
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