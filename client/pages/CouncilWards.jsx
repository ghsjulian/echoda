import React from "react";
import "../styles/council-wards.style.css"

const CouncilWards = () => {
    return (
        <>
            <section className="hero-wards">
                <div className="container">
                    <h1>Agatu Council Wards</h1>
                    <p>
                        10 wards. One vision. Transforming every community by
                        2027.
                    </p>
                </div>
            </section>

            <section className="container wards-content">
                <div className="wards-stats">
                    <div className="stat-card">
                        <h3>10</h3>
                        <p>Total Wards</p>
                    </div>
                    <div className="stat-card">
                        <h3>185K</h3>
                        <p>Population</p>
                    </div>
                    <div className="stat-card">
                        <h3>42</h3>
                        <p>Ongoing Projects</p>
                    </div>
                    <div className="stat-card">
                        <h3>100%</h3>
                        <p>Coverage Goal</p>
                    </div>
                </div>

                <h2 className="section-title">Explore All 10 Wards</h2>
                <div className="wards-grid">
                    <div className="ward-card">
                        <div className="ward-image">
                            <img src="/images/echoda-hero.jpg" alt="Odugbo" />
                        </div>
                        <div className="ward-info">
                            <h3>Ward 1 – Odugbo</h3>
                            <p className="population">Population: 18,500</p>
                            <ul>
                                <li>New 15km road network</li>
                                <li>3 modern boreholes</li>
                                <li>Primary school renovation</li>
                            </ul>
                        </div>
                    </div>
                    <div className="ward-card">
                        <div className="ward-image">
                            <img src="/images/echoda-hero.jpg" alt="Enungu" />
                        </div>
                        <div className="ward-info">
                            <h3>Ward 2 – Enungu</h3>
                            <p className="population">Population: 16,200</p>
                            <ul>
                                <li>Health center upgrade</li>
                                <li>Youth skills center</li>
                                <li>Solar street lights</li>
                            </ul>
                        </div>
                    </div>
                    <div className="ward-card">
                        <div className="ward-image">
                            <img src="/images/echoda-hero.jpg" alt="Obagaji" />
                        </div>
                        <div className="ward-info">
                            <h3>Ward 3 – Obagaji</h3>
                            <p className="population">Population: 19,800</p>
                            <ul>
                                <li>Market expansion</li>
                                <li>Women cooperative hub</li>
                                <li>Electricity grid extension</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CouncilWards;
