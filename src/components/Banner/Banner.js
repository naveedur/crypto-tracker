import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "./Carousel";

import "bootstrap/dist/css/bootstrap.min.css"; // Import the Bootstrap CSS

function Banner() {
  const bannerContainer={ backgroundImage: "url(./banner2.jpg)" };
  const bannerContent={
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25, 
    justifyContent: "space-around" };
    const tagline={ 
      display: "flex", 
      height: "40%", 
      flexDirection: "column", 
      justifyContent: "center", 
      textAlign: "center" };
      const bannerHeading={ 
        fontWeight: "bold", 
        marginBottom: 15, 
        fontFamily: "Montserrat" };
      const bannerText={ 
        color: "darkgrey", 
        textTransform: "capitalize", 
        fontFamily: "Montserrat" }  ;
      const crouselContainer={ 
        height: "50%", 
        display: "flex", 
        alignItems: "center" }

      
  return (
    <div className="banner-container " style={bannerContainer}>
      <Container className="banner-content " style={bannerContent}>
        <div className="tagline" style={tagline}>
          <h2 style={bannerHeading}>Crypto Tracker</h2>
          <p style={bannerText}>Get all the Info regarding your favorite Crypto Currency</p>
        </div>
        <div className="carousel-container" style={crouselContainer}>
          <Carousel />
        </div>
      </Container>
    </div>
  );
}

export default Banner;
