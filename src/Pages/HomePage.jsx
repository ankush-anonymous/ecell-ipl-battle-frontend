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
    <div style={{ maxWidth: "1280px" }}>
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
                  <img
                    className="w-80 h-72"
                    src="https://res.cloudinary.com/drxezxie3/image/upload/v1709746962/ipl_logo_ruru0n.png"
                    alt=""
                  />
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
            <div className="w-1/2 flex justify-center items-center p-24">
              <div
                className=""
                style={{
                  boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
                  borderRadius: "23px",
                  width: "100%", // Ensure full width within the parent container
                  height: "100%", // Ensure full height within the parent container
                  overflow: "hidden",
                }}
              >
                <Slides />
              </div>
            </div>
          </div>

          {/* Rules */}
          <div>
            <div
              className="text-center text-6xl text-white w-screen mt-20"
              style={{ fontFamily: "Protest Revolution" }}
            >
              Flow of Game
              {/* Rounds  */}
              <div className="w-screen text-5xl my-24">
                {/* heading  */}

                {/* Round 1 */}
                <div
                  className="w-1/3 border rounded-xl p-3 mx-auto"
                  style={{
                    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
                    borderRadius: "23px",
                  }}
                >
                  <div className="w-full text-orange-600">Round 1</div>
                  <div className="text-2xl text-gray-400">
                    Score Highest to select your team first!
                  </div>

                  <div
                    className="w-full mt-6 text-5xl"
                    style={{
                      fontFamily: "Protest Riot",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <span className=" text-yellow-500">30</span> MCQ's <br />
                    <span className=" text-yellow-500">30</span> Points
                    <br />
                    <span className=" text-yellow-500">15</span> Minutes
                    <br />
                  </div>
                </div>
                <div className="h-32  flex items-center justify-center">
                  <img
                    className="w-24 h-20"
                    src="https://res.cloudinary.com/drxezxie3/image/upload/v1709747422/icons8-arrow-100_1_wgofub.png"
                    alt=""
                  />
                </div>

                {/* Round 2  */}
                <div
                  className="w-1/2 border rounded-xl p-3 mx-auto"
                  style={{
                    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
                    borderRadius: "23px",
                  }}
                >
                  <div className="w-full text-orange-600">Round 2</div>
                  <div className="text-2xl text-gray-400">
                    The Bidding Round
                  </div>

                  <div className="w-full flex ">
                    <div
                      className="w-1/2 mt-2 text-2xl"
                      style={{
                        fontFamily: "Protest Riot",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      <div className="text-2xl text-blue-400 mt-4">
                        Rules of Game
                      </div>
                      Budget :{" "}
                      <span className=" text-yellow-500">70 Crores</span>
                      <br />
                      Minimum :{" "}
                      <span className=" text-yellow-500">16 players</span>{" "}
                      <br />
                      Maximum :{" "}
                      <span className=" text-yellow-500">18 players </span>
                      <br />
                      Players are rated out of
                      <span className=" text-yellow-500"> 50</span>
                      <br />
                      No reauctioning of any player in any case.
                      <br />
                    </div>
                    <div
                      className="w-1/2 mt-2 text-2xl"
                      style={{
                        fontFamily: "Protest Riot",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      <div className="text-2xl text-blue-400 mt-4">
                        Qualifying Requirements
                      </div>
                      Batsman:
                      <span className=" text-yellow-500">3</span>
                      <br />
                      Bowlers: <span className=" text-yellow-500">4</span>{" "}
                      <br />
                      All-rounders: <span className=" text-yellow-500">
                        3
                      </span>{" "}
                      <br />
                      Wicket Keepers:{" "}
                      <span className=" text-yellow-500">2</span>
                      <br />
                      Maximum of <span className=" text-yellow-500">
                        7
                      </span>{" "}
                      foreign players <br />
                      <br />
                    </div>
                  </div>
                  <div className="text-2xl text-gray-400 mt-2">
                    teams will be judged based on their top 16 players
                  </div>
                </div>
                <div className="h-32 flex items-center justify-center">
                  <img
                    className="w-24 h-20"
                    src="https://res.cloudinary.com/drxezxie3/image/upload/v1709747422/icons8-arrow-100_1_wgofub.png"
                    alt=""
                  />
                </div>

                {/* Round 3  */}
                <div
                  className="w-1/2 border rounded-xl p-3 mx-auto"
                  style={{
                    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
                    borderRadius: "23px",
                  }}
                >
                  <div className="w-full text-orange-600">Round 3</div>
                  <div className="text-2xl text-gray-400">The Final Round</div>
                  <div
                    className="w-full mt-2 text-2xl"
                    style={{
                      fontFamily: "Protest Riot",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <div className="text-3xl text-blue-400 mt-4">
                      Make your Playing 11 as per below critera:
                    </div>
                    At most{" "}
                    <span className=" text-yellow-500">5 foreign players</span>
                    <br />
                    At least{" "}
                    <span className=" text-yellow-500">2 all-rounder</span>{" "}
                    <br />
                    At least
                    <span className=" text-yellow-500">
                      1 Wicket Keeper{" "}
                    </span>{" "}
                    <br />
                    At least <span className=" text-yellow-500">3 Bowlers</span>
                    <br />
                    At least <span className=" text-yellow-500">3 batsmen</span>
                    <br />
                    <div className="text-3xl text-blue-400 mt-4">
                      Evaluation criteria
                    </div>
                    <div className=" text-gray-400">
                      1. Sum of 11 players rating out will be considered <br />
                      2. In case of a tie, the remaining balance will be taken
                      into consideration
                    </div>
                  </div>
                </div>

                {/* Code of Conduct  */}
                <div
                  className="text-center text-6xl text-white w-screen mt-20"
                  style={{ fontFamily: "Protest Revolution" }}
                >
                  Code of Conduct
                </div>
                <div
                  className="w-screen text-xl text-center p-10 text-gray-400"
                  style={{
                    fontFamily: "Protest Strike",
                    // color: "orange",
                    // fontSize: "28px",
                  }}
                >
                  1. Failure to satisfy the rules will lead to disqualification
                  of the team. <br />
                  2. All participants must be present for the entire duration of
                  the event. <br />
                  3. In case of any discrepancy, the decision of the auctioneer
                  stands final. <br />
                  4. Bidding must be carried out in a disciplined manner, with
                  no unnecessary commotion or disruptions. <br />
                  5. Every participant must be a part of ONLY 1 team. Violation
                  of this rule will lead to the disqualification of both teams.
                  <br />
                </div>
              </div>
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
    </div>
  );
}

export default HomePage;

function Slides() {
  const images = [
    "https://res.cloudinary.com/drxezxie3/image/upload/v1709747757/ipl_image1_nvibwk.jpg",
    "https://res.cloudinary.com/drxezxie3/image/upload/v1709747771/ipl_image3_eaokk3.jpg",
    "https://res.cloudinary.com/drxezxie3/image/upload/v1709747765/ipl_image2_d2xbpl.jpg",
  ]; // Assuming images are in public/carousel

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
        <div key={index} className="w-[600px] h-[500px] overflow-hidden">
          <img
            src={`${imageName}`}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            style={{ borderRadius: "23px" }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export { Slides };
