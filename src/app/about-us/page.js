'use client'
import React from 'react'
import AboutHero from '../components/About/AboutHero'
import CustomCarousel from '../components/About/AboutOurStory'
import OurStorySection from '../components/About/AboutOurStory'
import AutoplayImageSlider from '../components/About/Mission'
import SimpleMultiColumnSlider from '../components/About/Mission'
import AboutAccordianSection from '../components/About/AboutAccordianSection'
import TeamSection from '../components/About/AboutTeam'
import TrackRecord from '../components/About/TrackRecord'
import AboutScrollSection from '../components/About/AboutScrollSection'

const page = () => {

    return (
        <>
            <AboutHero />
            <OurStorySection />
            <SimpleMultiColumnSlider />
            <AboutAccordianSection />
            <TeamSection />
            <TrackRecord />
            <AboutScrollSection />


        </>
    )
}

export default page