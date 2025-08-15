import React from 'react'
import LifestyleAccessoriesImageSection from '../components/LifestyleAccessories/LifestyleAccessoriesImageSection'
import LifestyleAccessoriesHero from '../components/LifestyleAccessories/LifestyleAccessoriesHero'
import LifestyleAccessoriesBuiltWithCare from '../components/LifestyleAccessories/LifestyleAccessoriesBuildWithCare'

const page = () => {
    return (
        <>
            {/* <ApparelHero /> */}
            <LifestyleAccessoriesHero />
            <LifestyleAccessoriesImageSection />
            <LifestyleAccessoriesBuiltWithCare />

        </>
    )
}

export default page