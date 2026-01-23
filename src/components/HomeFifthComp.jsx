import React from "react";
import open from "../Images/open.png";
import infuse from "../Images/infuse.png";
import enjoy from "../Images/enjoy.png";
import video from '../Images/video.gif'
function HomeFifthComp() {
  return (
  <div class="m-0 p-0 bg-[#042f6f] h-screen flex justify-center items-center min-h-full">
  <div role="main" aria-label="Open Infuse Enjoy interactive section"
    class="w-[90vw] max-w-full h-[300px] flex items-center justify-center gap-[60px] flex-col sm:flex-row sm:h-[300px]">
    <div class="flex-1 flex justify-center items-center">
      <img
        src={video}
        width="1000"
        height="1000"
        alt="Dummy GIF"
        class="max-w-full h-auto"
      />
    </div>

    <div aria-hidden="true" class="w-[80%] h-[2px] bg-white sm:w-[3px] sm:h-[100%]"></div>

    <div class="flex-1 flex flex-col gap-[25px] w-full items-center sm:items-start">
      <img src={open} alt="Open" class="w-[400px] h-auto" />
      <img src={infuse} alt="Infuse" class="w-[400px] h-auto" />
      <img src={enjoy} alt="Enjoy" class="w-[400px] h-auto" />
    </div>
    
  </div>
</div>

  );
}

export default HomeFifthComp;
