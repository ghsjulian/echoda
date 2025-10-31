import React from "react";
import useApp from "../store/useApp"


const Hero = () => {
    const {settings} = useApp()
    const hero = settings?.hero
    
    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>{hero?.heroHeading}</h1>
                    <h2>
                        {hero?.heroSubHeading}
                    </h2>
                    <p>
                        {hero?.heroDescription}
                    </p>

                    <div className="btn">
                        <a href="#flyers" className="cta-button">
                            Explore Our Campaign
                        </a>
                        <a className="contact" href="#contact">Get In Touch</a>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={hero?.heroImage?.url} alt="Agatu Campaign" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
