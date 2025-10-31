import React from "react";

const Contact = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>Get in touch anytime with us</h1>
                    <h2>Let's discuss about your topic today!</h2>
                    <div className="contact-form">
                        <label>Enter Full Name : </label>
                        <input type="text" placeholder="Enter Full Name" />
                        <label>Enter Email Address :</label>
                        <input type="email" placeholder="Enter Email Address" />
                        <label>Write A Message :</label>
                        <textarea placeholder="Write A Message..."></textarea>
                        <button>Send Now</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="/images/echoda-hero.jpg" alt="Agatu Campaign" />
                </div>
            </div>
        </section>
    );
};

export default Contact;
