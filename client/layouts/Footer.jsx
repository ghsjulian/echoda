import React,{useRef, useState} from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TbBrandYoutube } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import useApp from '../store/useApp';


const Footer = () => {
    const msgRef = useRef(null)
    const {subscribedEmail,isSubscribing} = useApp()
    const [email,setEmail] = useState("")
    const showMessage = (message, type) => {
        if (type) {
            msgRef.current.classList.add("success");
            msgRef.current.textContent = message;
        } else {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = message;
        }
        setTimeout(() => {
            msgRef.current.removeAttribute("class");
            msgRef.current.textContent = "";
        }, 2500);
    };

  return (
  <footer>
  <div className="email-subscription">
            <div class="left">
                <h4>Wanna join with us please subscribe !</h4>
            </div>
            <div id='msg' ref={msgRef}></div>
            <div class="right">
                <div className="email-area">
                    <input
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                        type="email"
                        autocomplete
                        placeholder="Enter Email Address"
                    />
                    <button disabled={isSubscribing} onClick={async(e)=>{e.preventDefault()
                    if(email.trim() === "") return
                        await subscribedEmail(email,setEmail,showMessage)}}>{isSubscribing ? "Processing..." : "Subscribe Now"}</button>
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