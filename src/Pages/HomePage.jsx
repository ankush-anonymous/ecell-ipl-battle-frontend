import React from "react";
import HomepageNavbar from "../Components/HomePageNavbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CopyrightIcon from "@mui/icons-material/Copyright";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function HomePage() {
  return (
    <div className="w-screen">
      <div>
        {/* Navbar */}
        <HomepageNavbar />

        {/* Hero Section */}
        <div className="w-screen flex">
          {/* Intro */}
          <div className="w-1/2 flex justify-center items-center">
            {/* Main Content of Intro */}
            <div className="w-full h-1/2 text-white ml-20">
              <div className="w-80 h-48  flex justify-center">
                <img className="w-80 h-72" src="/ipl_logo.png" alt="" />
              </div>
              <div
                className="w-full h-40 inline font-extrabold text-8xl ml-32"
                style={{ fontFamily: "Protest Revolution" }}
              >
                Battle 4.0
                <br />
              </div>
              <div
                className="text-2xl ml-32"
                style={{
                  fontFamily: "Protest Guerrilla",
                  color: "white",
                }}
              >
                Welcome to your favourite IPL Battle Event!
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="w-1/2 flex justify-center items-center p-16">
            <div
              className=""
              style={{
                boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
                borderRadius: "23px",
              }}
            >
              <Slides />
            </div>
          </div>
        </div>

        {/* Rules */}
        <div>
          <div
            className="text-center text-6xl text-white w-screen mt-16"
            style={{ fontFamily: "Protest Revolution" }}
          >
            Rules
            <div className="w-screen h-screen"></div>
          </div>
        </div>

        {/* Footer  */}
        <div
          className="w-screen h-20 mt-auto flex items-center justify-center"
          style={{ backgroundColor: "#B2AEFF" }}
        >
          <div className="w-full sm:w-96 h-20 text-center">
            <p className="text-xl font-bold m-2">Socials</p>
            <a href="https://www.instagram.com/ecell_vitcc/">
              <InstagramIcon fontSize="medium" className="mr-2" />
            </a>
            <a href="">
              <MailOutlineIcon fontSize="medium" className="mr-2" />
            </a>
            <a href="https://www.linkedin.com/in/e-cell-vit-chennai-7620bb248/">
              <LinkedInIcon fontSize="medium" className="mr-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

function Slides() {
  const images = ["Image1.png", "Image2.png", "Image3.png"]; // Assuming images are in public/carousel

  return (
    <Carousel
      showThumbs={false} // Hide thumbnail navigation
      infiniteLoop={true} // Enable continuous looping
      autoPlay={true} // Autoplay the slides
      className="carousel-container" // Add custom class for styling
      style={{
        borderRadius: "23px",
        overflow: "hidden",
      }}
    >
      {images.map((imageName, index) => (
        <div key={index}>
          <img
            src={`/CarouselImages/${imageName}`}
            alt={`Slide ${index + 1}`}
            className="w-full h-full"
            style={{ borderRadius: "23px" }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export { Slides };
