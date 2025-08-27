'use client'
import Image from 'next/image'
import React from 'react'
import Hero from './components/Homepage/Hero'
import Navbar from './components/Navbar'
import About from './components/Homepage/About'
import ScrollColorSection from './components/Homepage/ScrollColorSection'
import ServicesSection from './components/Homepage/ServicesSection'
import ProductCategoriesSection from './components/Homepage/ProductCategoriesSection'
import AccordionSection from './components/Homepage/AccordionSection'
import TimelineComponent from './components/Homepage/TimelineComponent'
import TestimonialCarousel from './components/Homepage/Testimonial'
import MobileTestimonialCarousel from './components/Homepage/TestimonialMobile'
import FAQSection from './components/Homepage/Faq'
import Footer from './components/Homepage/Footer'

const page = () => {
  return (
    <>
      <Hero />
      <About />
      <ScrollColorSection />
      <ServicesSection />
      <ProductCategoriesSection />
      <TimelineComponent />
      <AccordionSection />
      <div>
        {/* Desktop Version */}
        <div className="hidden md:block">
          <TestimonialCarousel />
        </div>

        {/* Mobile Version */}
        <div className="md:hidden">
          <MobileTestimonialCarousel />
        </div>
      </div>
      <FAQSection />
    </>)
}

export default page