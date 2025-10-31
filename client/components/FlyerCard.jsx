import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import useApp from "../store/useApp"

const FlyerCard = ({ flyer }) => {
    const navigate = useNavigate()
    const {downloadFlyer} = useApp()
    return (
        <div className="flyer-card">
            <img src="/flyers.png" alt={flyer?.title} />
            <p>{flyer?.title}</p>
            <NavLink onClick={(e)=>{
                downloadFlyer(flyer?._id,navigate)
            }} to="#" className="download-btn">
                Download Flyer(PDF)
            </NavLink>
        </div>
    );
};

export default FlyerCard;
