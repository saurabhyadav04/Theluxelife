import React from 'react'
import MainBanner from '../components/MainBanner'
import mainImage from '../Images/weddingbanner.png';
import BestSeller from '../components/BestSeller'
import HomeFirstComp from '../components/HomeFirstComp';
import HomesSecondComp from '../components/HomesSecondComp';
import HomeThirdComp from '../components/HomeThirdComp'
function Corporate() {
  return (
    <div>
     <MainBanner mainImage={mainImage}/>
     <HomeFirstComp/>
     <BestSeller/>
     <HomesSecondComp/>
     <HomeThirdComp/>
    </div>
  )
}

export default Corporate
