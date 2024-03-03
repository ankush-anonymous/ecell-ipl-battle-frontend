import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ParticipantNavbar from "../Components/ParticipantNavbar";
import ParticipantFooter from "../Components/ParticipantFooter";
import axios from "axios";
const currentPlayer = {
  image:
    "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/57.png",
  firstname: "Mahendra Singh ",
  surname: "Dhoni ",
  country: "India",
  DOB: "1981-07-07",
  Age: 35,
  Specialism: "cover drive",
  BattingStyle: "RHB",
  BowlingStyle: "right arm medium",
  testcaps: 269,
  odicaps: 175,
  t20caps: 31,
  iplrating: 1,
  overseasflag: "false",
  soldby: "rcb",
  bidwonby: "rcb",
};

const listOfPlayers = [
  {
    image:
      "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/57.png",
    firstname: "Mahendra Singh ",
    surname: "Dhoni ",
    country: "India",
    DOB: "1981-07-07",
    Age: 35,
    Specialism: "cover drive",
    BattingStyle: "RHB",
    BowlingStyle: "right arm medium",
    testcaps: 269,
    odicaps: 175,
    t20caps: 31,
    iplrating: 1,
    overseasflag: "false",
    soldby: "rcb",
    bidwonby: "rcb",
  },
  {
    image:
      "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/57.png",
    firstname: "Mahendra Singh ",
    surname: "Dhoni ",
    country: "India",
    DOB: "1981-07-07",
    Age: 35,
    Specialism: "cover drive",
    BattingStyle: "RHB",
    BowlingStyle: "right arm medium",
    testcaps: 269,
    odicaps: 175,
    t20caps: 31,
    iplrating: 1,
    overseasflag: "false",
    soldby: "rcb",
    bidwonby: "rcb",
  },
  {
    image:
      "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/57.png",
    firstname: "Mahendra Singh ",
    surname: "Dhoni ",
    country: "India",
    DOB: "1981-07-07",
    Age: 35,
    Specialism: "cover drive",
    BattingStyle: "RHB",
    BowlingStyle: "right arm medium",
    testcaps: 269,
    odicaps: 175,
    t20caps: 31,
    iplrating: 1,
    overseasflag: "false",
    soldby: "rcb",
    bidwonby: "rcb",
  },
  {
    image:
      "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/57.png",
    firstname: "Mahendra Singh ",
    surname: "Dhoni ",
    country: "India",
    DOB: "1981-07-07",
    Age: 35,
    Specialism: "cover drive",
    BattingStyle: "RHB",
    BowlingStyle: "right arm medium",
    testcaps: 269,
    odicaps: 175,
    t20caps: 31,
    iplrating: 1,
    overseasflag: "false",
    soldby: "rcb",
    bidwonby: "rcb",
  },
  {
    image:
      "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/57.png",
    firstname: "Mahendra Singh ",
    surname: "Dhoni ",
    country: "India",
    DOB: "1981-07-07",
    Age: 35,
    Specialism: "cover drive",
    BattingStyle: "RHB",
    BowlingStyle: "right arm medium",
    testcaps: 269,
    odicaps: 175,
    t20caps: 31,
    iplrating: 1,
    overseasflag: "false",
    soldby: "rcb",
    bidwonby: "rcb",
  },
];

const ParticipantDashboard = () => {
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [iplTeamLogo, setIplTeamLogo] = useState("");
  const [auctioneerID, setAuctioneerID] = useState("");
  const [participantID, setParticipantID] = useState("");
  const [teamName, setTeamName] = useState("");
  const [playerCount, setPlayerCount] = useState();
  const [listOfPlayers, setListOfPlayers] = useState([]);

  const fetchParticipantDetails = async () => {
    setIplTeamLogo(localStorage.getItem("iplTeamLogo"));
    setAuctioneerID(localStorage.getItem("auctioneerId"));
    setParticipantID(localStorage.getItem("_id"));
    setTeamName(localStorage.getItem("teamname"));
  };

  const fetchMyPlayers = async () => {
    try {
      const result = await axios.get(
        `/api/v1/bid/getAllBiddingTransit?participantID=${participantID}`
      );

      const listOfPlayers = [];

      // Iterate over each object in the result array
      for (const item of result.data.result) {
        // Extract the iplPlayerID from the current object
        const { iplPlayerID, biddingAmount } = item;

        // Make a request to fetch player details by ID
        const playerDetails = await axios.get(
          `/api/v1/players/getPlayerById/${iplPlayerID}`
        );

        const playerWithBiddingAmount = {
          ...playerDetails.data.data,
          biddingAmount: biddingAmount,
        };
        console.log(playerWithBiddingAmount);
        // Push the player details to the listOfPlayers array
        listOfPlayers.push(playerWithBiddingAmount);
      }
      setListOfPlayers(listOfPlayers);

      // Now listOfPlayers contains details of all players
      console.log(listOfPlayers);
      return listOfPlayers;
    } catch (error) {
      console.error("Error fetching players:", error.message);
      return []; // Return an empty array in case of an error
    }
  };

  const fetchCurrentPlayer = async () => {
    const roomId = localStorage.getItem("auctioneerId");
    const room = await axios.get(
      `/api/v1/auctioneers/getAuctioneerById/${roomId}`
    );
    const playerCount = room.data.data.currentPlayerCount;
    // setPlayerCount(playerCount);
    const currentPlayer = await axios.get(
      `/api/v1/players/getAllPlayers?playerNo=${playerCount}`
    );

    // console.log("current:", currentPlayer.data.players[0]);
    setCurrentPlayer(currentPlayer.data.players[0]);
  };

  useEffect(() => {
    fetchParticipantDetails();
    fetchCurrentPlayer();
    fetchMyPlayers();
  }, []);

  return (
    <>
      <Box sx={{ maxWidth: "1280px", margin: "auto" }}>
        <ParticipantNavbar />
        {/* Account Status Bar */}
        <section className="my-10">
          <Box
            sx={{
              height: "200px",
              width: "90%", // Adjusted width to 90%
              border: "1px solid white",
              margin: "auto", // Centered along x-axis
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "#070F2B",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={6} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ height: "200px", width: "200px" }}>
                    <img src={iplTeamLogo} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "orange",
                      fontSize: "30px",
                      fontFamily: "Protest Strike",
                    }}
                  ></Typography>
                  <Typography variant="body1">500000 </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ height: "130px", width: "130px" }}>
                    <img src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708642808/coin-removebg-preview_xlhzae.png" />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "orange",
                      fontSize: "30px",
                      fontFamily: "Protest Strike",
                    }}
                  >
                    Balance
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "yellow",
                      fontFamily: "Protest Strike",
                      fontSize: "35px",
                    }}
                  >
                    {" "}
                    : 500000{" "}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </section>

        {/* Player Current in Bid  */}
        <section className="my-32">
          <Box
            sx={{
              height: "100%",
              width: "90%", // Adjusted width to 90%
              //   border: "1px solid white",
              margin: "auto", // Centered along x-axis
              display: "flex-col",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              padding: "20px",
              backgroundColor: "#232329",
              overflow: "hidden",
            }}
          >
            {/* section title  */}
            <Box
              sx={{
                height: "100px",
                width: "90%", // Adjusted width to 90%
                // border: "1px solid white",
                margin: "auto", // Centered along x-axis
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontFamily: "Protest Revolution", color: "white" }}
              >
                Player Currently At Bid
              </Typography>
            </Box>

            <Box>
              <Grid container spacing={1}>
                {/* Image Box  */}
                <Grid item xs={12} md={4}>
                  {/* Image  */}
                  <Box
                    sx={{
                      height: "100%",
                      width: "90%", // Adjusted width to 90%
                      //   border: "1px solid white",
                      margin: "auto", // Centered along x-axis
                      display: "flex-col",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        height: "300px",
                        width: "90%", // Adjusted width to 90%
                        // border: "1px solid white",
                        margin: "auto", // Centered along x-axis
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                      }}
                    >
                      <img src={currentPlayer.image} />
                    </Box>
                    <Box
                      sx={{
                        height: "100px",
                        width: "90%", // Adjusted width to 90%
                        // border: "1px solid white",
                        margin: "auto", // Centered along x-axis
                        display: "flex-col",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: "Protest Riot",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {currentPlayer.firstname} {currentPlayer.surname}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Portfolio Box  */}
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      height: "100%",
                      width: "90%", // Adjusted width to 90%
                      //   border: "1px solid white",
                      margin: "auto", // Centered along x-axis
                      marginLeft: "30px",
                      display: "flex-col",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    {/* Tag Box  */}
                    <Box
                      sx={{
                        // border: "1px solid white",
                        height: "100px",
                        width: "90%",
                        margin: "auto",
                        borderRadius: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        alignItems: "center", // Align items vertically
                        alignContent: "stretch",
                        padding: "10px",
                        gap: "20px",
                      }}
                    >
                      <Box
                        sx={{
                          //   border: "1px solid white",
                          height: "50px",
                          width: "50px",
                        }}
                      >
                        <img
                          src="https://www.freepnglogos.com/uploads/star-png/star-alt-icon-small-flat-iconset-paomedia-13.png"
                          alt="Star Icon"
                        />
                      </Box>
                      <Box
                        sx={{
                          //   border: "1px solid white",
                          height: "50px",
                          width: "50px",
                        }}
                      >
                        <img
                          src="https://images.vexels.com/media/users/3/242810/isolated/preview/faf4f5ad02d6d68cfeafa44e1b57649a-plane-semi-flat.png"
                          alt="Plane Icon"
                        />
                      </Box>
                      <Box
                        sx={{
                          //   border: "1px solid white",
                          height: "50px",
                          width: "50px",
                          display: "flex",
                          alignItems: "center", // Center items along the y-axis
                          justifyContent: "center", // Center items along the x-axis
                        }}
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Indian_flag.png"
                          alt="Indian flag Icon"
                        />
                      </Box>
                      <Box
                        sx={{
                          border: "1px solid red",
                          borderRadius: "50%",
                          height: "80px",
                          width: "80px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "red",
                            textAlign: "center",
                            fontSize: "50px",
                            fontFamily: "Protest Revolution",
                          }}
                        >
                          {currentPlayer.iplRating}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        height: "100%",
                        width: "90%",
                        // border: "0.5px solid white",
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "-60px",
                        borderRadius: "10px",
                        // padding: "20px",
                      }}
                    >
                      <Grid container spacing={5} alignItems="flex-start">
                        <Grid item xs={12} md={6}>
                          <Box sx={{ marginBottom: "0px" }}>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "yellow",
                                fontSize: "24px",
                                // display: "inline",
                              }}
                            >
                              Country :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                                margin: 0, // Remove margin
                                padding: 0, // Remove padding
                              }}
                            >
                              {" "}
                              {currentPlayer.country}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              variant={"span"}
                              sx={{ height: "50px", width: "50px" }}
                            >
                              <img
                                src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708635625/batt-removebg-preview_v2woyj.png"
                                alt=""
                              />
                            </Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "orange",
                                fontSize: "28px",
                                margin: 0, // Remove margin
                                padding: 0, // Remove padding
                              }}
                            >
                              : {currentPlayer.BattingStyle}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              variant={"span"}
                              sx={{ height: "50px", width: "50px" }}
                            >
                              <img
                                src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708636258/ball_wzyum5.png"
                                alt=""
                              />
                            </Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "orange",
                                fontSize: "28px",
                              }}
                            >
                              : {currentPlayer.BowlingStyle}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "yellow",
                                fontSize: "25px",
                              }}
                            >
                              Age :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                              }}
                            >
                              {" "}
                              {currentPlayer.Age}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "#836FFF",
                                fontSize: "24px",
                              }}
                            >
                              Test :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                              }}
                            >
                              {" "}
                              {currentPlayer.testcaps}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "#836FFF",
                                fontSize: "24px",
                              }}
                            >
                              ODI :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                              }}
                            >
                              {" "}
                              {currentPlayer.odicaps}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "#836FFF",
                                fontSize: "24px",
                              }}
                            >
                              T20 :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                              }}
                            >
                              {" "}
                              {currentPlayer.t20caps}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "#836FFF",
                                fontSize: "24px",
                              }}
                            >
                              Specialism :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "#FC6736",
                                fontSize: "28px",
                                paddingLeft: "20px",
                              }}
                            >
                              {" "}
                              {currentPlayer.Specialism}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </section>

        {/* Team Stats  */}
        <section className="my-32">
          <Box
            sx={{
              height: "100%",
              width: "90%", // Adjusted width to 90%
              //   border: "1px solid white",
              margin: "auto", // Centered along x-axis
              display: "flex-col",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              padding: "30px",
            }}
          >
            {/* section title  */}
            <Box
              sx={{
                height: "100px",
                width: "90%", // Adjusted width to 90%
                // border: "1px solid white",
                margin: "auto", // Centered along x-axis
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontFamily: "Protest Revolution", color: "white" }}
              >
                Team Stats
              </Typography>
            </Box>
            <Box
              sx={{
                border: "1px solid white",
                backgroundColor: "#070F2B",
                height: "300px",
                width: "90%",
                margin: "auto",
                borderRadius: "10px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "stretch",
                alignContent: "stretch",
                padding: "20px",
                gap: "20px",
              }}
            >
              {/* Keeper  */}
              <Box
                sx={{
                  //   border: "1px solid white",
                  height: "100%",
                  width: "100px",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "orange",
                      fontFamily: "Protest Guerrilla",
                      marginBottom: "15px",
                    }}
                  >
                    Keeper
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: "5px", marginBottom: "15px" }}>
                  <img src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708760000/keeper-removebg-preview_zhx5jk.png" />
                </Box>
                <Box
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid red",
                    height: "50px",
                    width: "50px",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    2
                  </Typography>
                </Box>
              </Box>
              {/* Batsman  */}
              <Box
                sx={{
                  //   border: "1px solid white",
                  height: "100%",
                  width: "100px",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "orange",
                      fontFamily: "Protest Guerrilla",
                      marginBottom: "15px",
                    }}
                  >
                    Batsman
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "70px",
                    width: "70px",
                    margin: "auto",
                    marginBottom: "15px",
                  }}
                >
                  <img src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708635625/batt-removebg-preview_v2woyj.png" />
                </Box>
                <Box
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid red",
                    height: "50px",
                    width: "50px",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    2
                  </Typography>
                </Box>
              </Box>
              {/* Bowler  */}
              <Box
                sx={{
                  //   border: "1px solid white",
                  height: "100%",
                  width: "100px",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "orange",
                      fontFamily: "Protest Guerrilla",
                      marginBottom: "15px",
                    }}
                  >
                    Bowler
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "70px",
                    width: "70px",
                    margin: "auto",
                    marginBottom: "15px",
                  }}
                >
                  <img src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708636258/ball_wzyum5.png" />
                </Box>
                <Box
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid red",
                    height: "50px",
                    width: "50px",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    2
                  </Typography>
                </Box>
              </Box>
              {/* AllRounder  */}
              <Box
                sx={{
                  //   border: "1px solid white",
                  height: "100%",
                  width: "100px",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "orange",
                      fontFamily: "Protest Guerrilla",
                      marginBottom: "15px",
                    }}
                  >
                    All-Rounder
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "70px",
                    width: "70px",
                    margin: "auto",
                    // backgroundColor: "lightblue",
                    // borderRadius: "20%",
                    marginBottom: "15px",
                  }}
                >
                  <img src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708776917/allrounder-removebg-preview_sp9hhl.png" />
                </Box>
                <Box
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid red",
                    height: "50px",
                    width: "50px",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    2
                  </Typography>
                </Box>
              </Box>
              {/* FoeignPlayers */}
              <Box
                sx={{
                  //   border: "1px solid white",
                  height: "100%",
                  width: "100px",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "orange",
                      fontFamily: "Protest Guerrilla",
                      marginBottom: "15px",
                    }}
                  >
                    Overseas
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "70px",
                    width: "70px",
                    margin: "auto",
                    // backgroundColor: "lightblue",
                    // borderRadius: "20%",
                    marginBottom: "15px",
                  }}
                >
                  <img src="https://images.vexels.com/media/users/3/242810/isolated/preview/faf4f5ad02d6d68cfeafa44e1b57649a-plane-semi-flat.png" />
                </Box>
                <Box
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid red",
                    height: "50px",
                    width: "50px",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    2
                  </Typography>
                </Box>
              </Box>
              {/* StarPlayers */}
              <Box
                sx={{
                  //   border: "1px solid white",
                  height: "100%",
                  width: "100px",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "orange",
                      fontFamily: "Protest Guerrilla",
                      marginBottom: "15px",
                    }}
                  >
                    Star
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "70px",
                    width: "70px",
                    margin: "auto",
                    marginBottom: "15px",

                    // backgroundColor: "lightblue",
                    // borderRadius: "20%",
                  }}
                >
                  <img
                    src="https://www.freepnglogos.com/uploads/star-png/star-alt-icon-small-flat-iconset-paomedia-13.png"
                    alt="Star Icon"
                  />{" "}
                </Box>
                <Box
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid red",
                    height: "50px",
                    width: "50px",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    2
                  </Typography>
                </Box>
              </Box>
              {/* Indian  */}
              <Box
                sx={{
                  //   border: "1px solid white",
                  height: "100%",
                  width: "100px",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "orange",
                      fontFamily: "Protest Guerrilla",
                      marginBottom: "15px",
                    }}
                  >
                    Indian
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "70px",
                    width: "70px",
                    margin: "auto",
                    // backgroundColor: "lightblue",
                    borderRadius: "50%",
                    marginBottom: "15px",
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Indian_flag.png"
                    alt="Indian flag Icon"
                  />{" "}
                </Box>
                <Box
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid red",
                    height: "50px",
                    width: "50px",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    2
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </section>

        {/* List of Owned Players  */}
        <section className="my-20">
          <Box
            sx={{
              height: "100%",
              width: "98%", // Adjusted width to 90%
              //   border: "1px solid white",
              margin: "auto", // Centered along x-axis
              display: "flex-col",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            {/* section title  */}
            <Box
              sx={{
                height: "100px",
                width: "90%", // Adjusted width to 90%
                // border: "1px solid white",
                margin: "auto", // Centered along x-axis
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontFamily: "Protest Revolution", color: "white" }}
              >
                Players of your Team
              </Typography>
            </Box>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                margin: "auto",
                borderRadius: "10px",
                marginTop: "40px",
                padding: "20px",
                color: "white",
                backgroundColor: "#232329",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center", // Center contents horizontally
              }}
            >
              <Grid container spacing={3} alignItems={"center"}>
                {/* Table Header */}
                {/* Table Header */}
                <Grid item md={1}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    SlNo.
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Photo
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Name
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Country
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Specialism
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Batting Style
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Bowling Style
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    IplPoints
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    SoldPrice
                  </Typography>
                </Grid>

                {/* Table Body - Map the array */}
                {listOfPlayers.map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item md={1}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {index + 1}
                      </Typography>
                    </Grid>
                    <Grid item md={2}>
                      <img src={item.image} alt={item.Name} />
                    </Grid>
                    <Grid item md={2}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.firstname} {item.surname}
                      </Typography>
                    </Grid>
                    <Grid item md={1}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.country}
                      </Typography>
                    </Grid>
                    <Grid item md={1}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.Specialism}
                      </Typography>
                    </Grid>
                    <Grid item md={1}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.BattingStyle}
                      </Typography>
                    </Grid>
                    <Grid item md={2}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.BowlingStyle}
                      </Typography>
                    </Grid>
                    <Grid item md={1}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.iplRating}
                      </Typography>
                    </Grid>
                    <Grid item md={1}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.biddingAmount}
                      </Typography>
                      k
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </Box>
        </section>
        <ParticipantFooter />
      </Box>
    </>
  );
};

export default ParticipantDashboard;
