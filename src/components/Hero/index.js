import React from 'react'
import { HeroContainer, BgImage, HeroContent, HeroSlogan, HeroBtn, HeroBtnLink } from "./HeroElements";

const Hero = () => {
    return (
        <HeroContainer>
            <BgImage />
            <HeroContent>
                <HeroSlogan>Giving you the best companies to apply to.</HeroSlogan>
                <HeroBtn>
                    <HeroBtnLink to="/jobs">Start your search</HeroBtnLink>
                </HeroBtn>
            </HeroContent>
        </HeroContainer>
    )
}

export default Hero
