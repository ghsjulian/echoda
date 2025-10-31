import React, { useEffect } from "react";
import "../styles/about.style.css";
import useApp from "../store/useApp";

const About = () => {
    const { isgettingSettings, settings } = useApp();
    const about = settings?.aboutPage;
    const teamMembers = settings?.teamMembers;

    return (
        <>
            <section
                style={{
                    background: `linear-gradient(rgba(10, 61, 98, 0.85), rgba(10, 61, 98, 0.85)),url(${about?.bannerImage?.url}) center/cover no-repeat`
                }}
                className="hero-about"
            >
                <div className="container">
                    <h1>{about?.bannerHeading}</h1>
                    <p>{about?.bannerText}</p>
                </div>
            </section>
            <main className="container about-content">
                <section className="bio-grid">
                    <div className="bio-text">
                        <p>{about?.aboutDescription}</p>
                    </div>
                    <div className="bio-image">
                        <img src={about?.aboutImage?.url} alt="Echoda Jnr" />
                    </div>
                </section>
                <h2 className="section-title">Our Core Vision</h2>
                <div className="vision-list">
                    <div className="vision-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                        >
                            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3V400h64v85.3c0 17.7-14.3 32-32 32s-32-14.3-32-32zM416 485.3V400h64v85.3c0 17.7-14.3 32-32 32s-32-14.3-32-32z" />
                        </svg>
                        <h4>Unity & Inclusion</h4>
                        <p>Bringing all 10 wards together under one vision.</p>
                    </div>
                    <div className="vision-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M243.4 2.6l-176 88C56.5 94.4 48 105.5 48 118.3V224c0 46.7 23.2 90.2 61.9 116.4l176 110.1c6.9 4.3 14.9 6.5 23.1 6.5s16.2-2.2 23.1-6.5l176-110.1C546.8 314.2 570 270.7 570 224V118.3c0-12.8-8.5-23.9-19.4-27.7l-176-88c-11-5.5-23.9-5.5-34.9 0zM256 66.1l144 72v68.8l-144-72-144 72V66.1l144-72zM128 198.5v67.1l112 70V198.5l-112-70zm256 0v137.1l112-70V198.5l-112 70zM144 304.4v63.6c0 8.3 4.3 15.9 11.4 20.2L272 467.8V384l-128-80zm224 0v79.8l116.6-72.8c7.1-4.4 11.4-11.9 11.4-20.2v-63.6l-128 80z" />
                        </svg>
                        <h4>Education First</h4>
                        <p>Free quality education for every child in Agatu.</p>
                    </div>
                    <div className="vision-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                        >
                            <path d="M575.8 255.5c0 18.2-14.8 33-33 33H544v80c0 17.7-14.3 32-32 32h-32v-80h-96v80h-32v-80H256v80h-32v-80H128v80H96c-17.7 0-32-14.3-32-32v-80H32.2c-18.2 0-33-14.8-33-33C-.8 221.3 14 206.5 32.2 206.5H64v-80c0-17.7 14.3-32 32-32h32v80h96v-80h32v80h96v-80h32v80h96v-80h32c17.7 0 32 14.3 32 32v80h32.8c18.2 0 33 14.8 33 33z" />
                        </svg>
                        <h4>Infrastructure</h4>
                        <p>
                            Roads, water, electricity — connecting every
                            village.
                        </p>
                    </div>
                    <div className="vision-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M512 80c0-18-14.3-34.6-38.4-48c-29.6-16.3-72.4-31.9-128-45.3C288 0 256 0 256 0s-32 0-85.3 6.7C115.2 20.1 72.4 35.7 42.9 52c-24.1 13.4-38.4 29.9-38.4 48 0 13.7 0 32 0 48 0 18 14.3 34.6 38.4 48 29.6 16.3 72.4 31.9 128 45.3C224 256 256 256 256 256s32 0 85.3-6.7c55.6-13.4 98.4-29 128-45.3 24.1-13.4 38.4-29.9 38.4-48 0-13.7 0-32 0-48z" />
                        </svg>
                        <h4>Economic Growth</h4>
                        <p>
                            Jobs, skills training, and youth entrepreneurship.
                        </p>
                    </div>
                </div>

                <h2 className="section-title">Meet Our Team</h2>
                <div className="team-grid">
                {teamMembers?.length>0 && teamMembers?.map((member,index)=>{
                    return (
                        <div className="team-card">
                        <img src={member?.memberImage?.url} alt={member?.memberName} />
                        <h4>{member?.memberName}</h4>
                        <p>{member?.memberAbout}</p>
                    </div>
                    )
                })
                }
                </div>
            </main>
        </>
    );
};

export default About;
