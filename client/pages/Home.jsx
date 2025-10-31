import React from 'react'
import Hero from "../components/Hero"
import CampaignFlyers from "../components/CampaignFlyers"
import Blogs from "../components/Blogs"

const Home = () => {
  return (
    <>
    <Hero/>
    <div className="container">
    <CampaignFlyers/>
    <Blogs/>
    </div>
    </>
  )
}

export default Home