import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TbBrandYoutube } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";



const Footer = () => {
  return (
  <footer>
  <div className="email-subscription">
            <div class="left">
                <h4>Wanna join with us please subscribe !</h4>
            </div>
            <div class="right">
                <div className="email-area">
                    <input
                        type="email"
                        autocomplete
                        placeholder="Enter Email Address"
                    />
                    <button>Subscribe Now</button>
                </div>
            </div>
        </div>
            <div className="footer-content">
                <div className="footer-links">
                    <a href="#home">Home</a>
                    <a href="#flyers">Flyers</a>
                    <a href="#manifestos">Manifestos</a>
                    <a href="#contact">Contact</a>
                </div>
                <p>&copy; 2025 AGATU EMANCIPATION 2027. All Rights Reserved.</p>
                <div className="social-icons">
                    <a href="#" aria-label="Facebook"><FaFacebook size={25}/></a>
                    <a href="#" aria-label="Twitter"><FaInstagram size={25}/></a>
                    <a href="#" aria-label="Instagram"><FaLinkedin size={25}/></a>
                    <a href="#" aria-label="Instagram"><FaXTwitter size={25}/></a>
                    <a href="#" aria-label="Instagram"><TbBrandYoutube size={25}/></a>
                </div>
            </div>
        </footer>
  )
}

export default Footer