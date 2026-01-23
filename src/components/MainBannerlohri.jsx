import React from "react";

function MainBannerlohri({ mainImage }) {
  return (
    <section
      style={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <img
        src={mainImage}
        alt="Lohri Banner"
        className="lohri-banner-img"
        style={{
          width: "100%",
          paddingTop:"65px",
          height: "auto",
          display: "block",
        }}
      />

      <style>
        {`
          @media (max-width: 768px) {
            .lohri-banner-img {
              padding-top: 60px;
            }
          }
        `}
      </style>
    </section>
  );
}

export default MainBannerlohri;
