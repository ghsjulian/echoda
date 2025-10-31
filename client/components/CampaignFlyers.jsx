import React from "react";
import FlyerCard from "./FlyerCard";
import useApp from "../store/useApp"


const CampaignFlyers = () => {
    const {flyers} = useApp()
    return (
        <section id="flyers" className="content-section">
            <h3>Our Campaign Flyers</h3>
            <div className="flyer-grid">
                { 
                    flyers && flyers?.length >0 && 
                    flyers?.map((item,index) => {
                        return <FlyerCard key={index} flyer={item} /> ;
                    })
                }
            </div>
        </section>
    );
};

export default CampaignFlyers;
