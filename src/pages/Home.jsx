import React from 'react'
import { Helmet } from "react-helmet";

import MainBanner from '../components/MainBanner'
import BestSeller from '../components/BestSeller'
import HomeFirstComp from '../components/HomeFirstComp'
import HomesSecondComp from '../components/HomesSecondComp'
import HomeThirdComp from '../components/HomeThirdComp'
import mainImage from '../Images/mainbanner-image.png';
// import mainImage from '../Images/luxelife-banner.png'; 
// import MainBannerlohri from '../components/MainBannerlohri';

// import mainImage from '../Images/new main banner.jpg';
const Home = () => {
  return (
    <>
      {/* ✅ Canonical tag for SEO */}
      <Helmet>
        <link rel="canonical" href="https://luxelifegifting.com/" />
      </Helmet>
      
      <MainBanner mainImage={mainImage}/>
      {/* <MainBannerlohri mainImage={mainImage}/> */}
      <HomeFirstComp/>
      <BestSeller/>
      <HomesSecondComp/>
      <HomeThirdComp/>
    </>
  )
}

export default Home
