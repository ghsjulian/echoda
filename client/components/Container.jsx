import React from "react";

const Container = () => {
    return (
        <div className="container">
            <section id="flyers" className="content-section">
                <h3>Campaign Flyers</h3>
                <div className="flyer-grid">
                    <div className="flyer-card">
                        <img
                            src="https://via.placeholder.com/250x350?text=Flyer+1"
                            alt="Campaign Flyer 1"
                        />
                        <p>Flyer 1: Our Vision</p>
                        <a
                            href="#"
                            className="download-btn"
                            onclick="downloadFile('flyer1.pdf')"
                        >
                            Download PDF
                        </a>
                    </div>
                    <div className="flyer-card">
                        <img
                            src="https://via.placeholder.com/250x350?text=Flyer+2"
                            alt="Campaign Flyer 2"
                        />
                        <p>Flyer 2: Community Plans</p>
                        <a
                            href="#"
                            className="download-btn"
                            onclick="downloadFile('flyer2.pdf')"
                        >
                            Download PDF
                        </a>
                    </div>
                    <div className="flyer-card">
                        <img
                            src="https://via.placeholder.com/250x350?text=Flyer+3"
                            alt="Campaign Flyer 3"
                        />
                        <p>Flyer 3: Economic Growth</p>
                        <a
                            href="#"
                            className="download-btn"
                            onclick="downloadFile('flyer3.pdf')"
                        >
                            Download PDF
                        </a>
                    </div>
                </div>
            </section>

            <section id="manifestos" className="content-section">
                <h3>Manifestos</h3>
                <div className="manifesto-grid">
                    <div className="manifesto-card">
                        <h4>Manifesto 2027</h4>
                        <p>
                            Our comprehensive plan for Agatu's development and
                            emancipation.
                        </p>
                        <a
                            href="#"
                            className="download-btn"
                            onclick="downloadFile('manifesto2027.pdf')"
                        >
                            Download PDF
                        </a>
                    </div>
                    <div className="manifesto-card">
                        <h4>Youth Empowerment</h4>
                        <p>
                            Strategies to engage and empower the youth of Agatu.
                        </p>
                        <a
                            href="#"
                            className="download-btn"
                            onclick="downloadFile('youth_manifesto.pdf')"
                        >
                            Download PDF
                        </a>
                    </div>
                    <div className="manifesto-card">
                        <h4>Economic Development</h4>
                        <p>
                            Our roadmap for sustainable economic growth in
                            Agatu.
                        </p>
                        <a
                            href="#"
                            className="download-btn"
                            onclick="downloadFile('economic_manifesto.pdf')"
                        >
                            Download PDF
                        </a>
                    </div>
                </div>
            </section>

            <section id="contact" className="content-section">
                <h3>Contact Us</h3>
                <p style={{textAlign: "center"}}>
                    Reach out to us for more information or to join our
                    campaign!
                </p>
                <p style={{textAlign: "center"}}>Email: info@agatu2027.org</p>
                <p style={{textAlign: "center"}}>Phone: +234-XXX-XXX-XXXX</p>
            </section>
        </div>
    );
};

export default Container;
