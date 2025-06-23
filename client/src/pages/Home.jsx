import React from 'react'
import MainBanner from '../components/MainBanner'
import BestSeller from '../components/BestSeller'
import HomeFirstComp from '../components/HomeFirstComp'
import HomesSecondComp from '../components/HomesSecondComp'
import HomeThirdComp from '../components/HomeThirdComp'
import mainImage from '../Images/mainbanner-image.png';

const Home = () => {
  return (
    <>
      <MainBanner mainImage={mainImage}/>
      <HomeFirstComp/>
      <BestSeller/>
      <HomesSecondComp/>
      <HomeThirdComp/>
    </>
  )
}

export default Home
