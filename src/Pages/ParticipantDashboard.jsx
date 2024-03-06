import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ParticipantNavbar from "../Components/ParticipantNavbar";
import ParticipantFooter from "../Components/ParticipantFooter";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const ParticipantDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState({});

  const [iplTeamLogo, setIplTeamLogo] = useState("");
  const [auctioneerID, setAuctioneerID] = useState("");
  const [participantID, setParticipantID] = useState("");
  const [teamName, setTeamName] = useState("");
  const [playerCount, setPlayerCount] = useState();
  const [listOfPlayers, setListOfPlayers] = useState([]);

  const [balanceAmount, setBalanceAmount] = useState([]);
  const [keeperCount, setKeeperCount] = useState();
  const [batsManCount, setBatsManCount] = useState();
  const [bowlerCount, setBowlerCount] = useState();
  const [allRounderCount, setAllRounderCount] = useState();
  const [overSeasCount, setOverSeasCount] = useState();
  const [starCount, setStarCount] = useState();
  const [indianCount, setIndianCount] = useState();

  //fetch participant details on login
  const fetchParticipantDetails = async () => {
    try {
      setLoading(true);

      setIplTeamLogo(localStorage.getItem("iplTeamLogo"));
      setAuctioneerID(localStorage.getItem("auctioneerId"));
      setParticipantID(localStorage.getItem("_id"));
      setTeamName(localStorage.getItem("teamname"));

      setBalanceAmount(localStorage.getItem("balanceAmount"));
      setAllRounderCount(localStorage.getItem("AllRounderCount"));
      setBatsManCount(localStorage.getItem("BatsmanCount"));
      setBowlerCount(localStorage.getItem("BowlerCount"));
      setKeeperCount(localStorage.getItem("WicketKeeperCount"));
      setStarCount(localStorage.getItem("StarCount"));
      setIndianCount(localStorage.getItem("NonOverSeasCount"));
      setOverSeasCount(localStorage.getItem("OverseasCount"));
      fetchMyStats();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // to fetch player of my team
  const fetchMyPlayers = async () => {
    try {
      const partId = localStorage.getItem("_id");
      const result = await axios.get(
        `/api/v1/bid/getAllBiddingTransit?participantID=${partId}`
      );
      console.log("result:", result);
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
        // console.log(playerWithBiddingAmount);
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

  // to fetch current player in bid
  const fetchCurrentPlayer = async () => {
    const roomId = localStorage.getItem("auctioneerId");
    const room = await axios.get(
      `/api/v1/auctioneers/getAuctioneerById/${roomId}`
    );
    console.log("id:", room.data.data);
    const playerCount = room.data.data.currentPlayerCount;
    // setPlayerCount(playerCount);
    const currentPlayer = await axios.get(
      `/api/v1/players/getAllPlayers?playerNo=${playerCount}`
    );

    // console.log("current:", currentPlayer.data.players[0]);
    setCurrentPlayer(currentPlayer.data.players[0]);
  };

  const fetchMyStats = async () => {
    try {
      setLoading(true);
      const participantID = localStorage.getItem("_id");
      const myStats = await axios.get(
        `/api/v1/participants/getParticipantsById/${participantID}`
      );
      const stats = myStats.data.data;
      localStorage.setItem("balanceAmount", stats.balanceAmount);
      localStorage.setItem("BatsmanCount", stats.BatsmanCount);
      localStorage.setItem("NonOverSeasCount", stats.NonOverSeasCount);
      localStorage.setItem("StarCount", stats.StarCount);
      localStorage.setItem("OverseasCount", stats.OverseasCount);
      localStorage.setItem("AllRounderCount", stats.AllRounderCount);
      localStorage.setItem("WicketKeeperCount", stats.WicketKeeperCount);
      localStorage.setItem("BowlerCount", stats.BowlerCount);

      setLoading(false); // Set loading to false after successfully fetching the data
    } catch (error) {
      console.error("Error fetching player stats:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clean up function to clear the timeout when the component unmounts or when useEffect is run again
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    fetchParticipantDetails();
    fetchMyStats();
    fetchCurrentPlayer();
    fetchMyPlayers();
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="success" />
        </Box>
      ) : (
        <Box sx={{ maxWidth: "1280px", margin: "auto" }}>
          <ParticipantNavbar />
          {/* Account Status Bar */}
          <section className="my-10">
            <Box
              sx={{
                height: "200px",
                width: "95%", // Adjusted width to 90%
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
                <Grid item xs={4} md={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        height: "200px",
                        width: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src={iplTeamLogo} style={{ height: "150px" }} />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#B2AEFF",
                        fontFamily: "Protest Strike",
                        fontSize: "35px",
                      }}
                    >
                      {teamName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} md={4}>
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
                      : {balanceAmount}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </section>

          {/* Player Currently at the bid  */}
          <section className="mt-16">
            <Box
              sx={{
                height: "80px",
                width: "90%", // Adjusted width to 90%
                margin: "auto", // Centered along x-axis
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                // border: "1px solid white",
                // marginBottom: "20px",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontFamily: "Protest Revolution", color: "white" }}
              >
                Player Currently At Bid
              </Typography>
            </Box>
          </section>

          <section className="my-8">
            <Box
              sx={{
                height: "600px",
                width: "90%", // Adjusted width to 90%
                // border: "1px solid white",
                margin: "auto", // Centered along x-axis
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                padding: "20px",
                // backgroundColor: "#232329",
                overflow: "hidden",
                backgroundImage: `url('/background.jpeg')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              // className="border"
            >
              {/* Inner Box  */}
              <Box>
                <Grid
                  container
                  // spacing={1}
                  sx={{
                    // border: "2px solid white",
                    height: "550px",
                  }}
                >
                  {/* Image Box  */}
                  <Grid item xs={12} md={6}>
                    {/* Image  */}
                    <Box
                      sx={{
                        height: "500px",
                        width: "100%", // Adjusted width to 90%
                        // borderLeft: "10px solid white",
                        // borderBottom: "10px Solid white",Search yes it is
                        // border: "2px solid #F29F05",
                        margin: "auto", // Centered along x-axis
                        display: "flex-col",
                        justifyContent: "center",
                        alignItems: "center",
                        // borderRadius: "10px",
                      }}
                    >
                      {/* <Box className="w-72 h-72  border-r-8 border-t-8 ml-72 absolute"></Box> */}

                      {/* Image  */}
                      <Box
                        sx={{
                          height: "90%",
                          width: "90%", // Adjusted width to 90%
                          // border: "2px solid #F29F05",
                          boxShadow: "inset 0 0 0 3px #F29F05",
                          margin: "auto", // Centered along x-axis
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <img src={currentPlayer.image} />
                      </Box>

                      {/* Intro of player  */}
                      <Box
                        sx={{
                          height: "85px",
                          width: "100%", // Adjusted width to 90%
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
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: "Protest Riot",
                            color: "Orange",
                            textAlign: "center",
                          }}
                        >
                          {currentPlayer.BowlingStyle}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Portfolio Box  */}
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: "100%",
                        width: "90%", // Adjusted width to 90%
                        //  border: "1px solid white",
                        margin: "auto", // Centered along x-axis
                        // marginLeft: "30px",
                        display: "flex-col",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        // padding: "20px",
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
                          gap: "10px",
                        }}
                      >
                        {/* Player Rating  */}
                        <Box className="w-full flex items-center justify-center">
                          <Box
                            sx={{
                              border: "2px solid red",
                              borderRadius: "50%",
                              height: "100px",
                              width: "100px",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: "red",
                                // color: "yellow",
                                textAlign: "center",
                                fontSize: "60px",
                                fontFamily: "Protest Revolution",
                              }}
                            >
                              {currentPlayer.iplRating}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Other Icons  */}
                        <Box className="w-full flex items-center justify-evenly">
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
                              height: "60px",
                              width: "60px",
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
                        </Box>
                      </Box>

                      {/* Stats  */}
                      <Box
                        sx={{
                          height: "80%",
                          width: "90%",
                          // border: "0.5px solid white",
                          margin: "auto",
                          marginTop: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "10px",
                          padding: "20px",
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={6}>
                            <Box
                              sx={{ marginBottom: "0px", textAlign: "center" }}
                            >
                              <Typography
                                variant="body"
                                sx={{
                                  fontFamily: "Protest Guerrilla",
                                  color: "yellow",
                                  fontSize: "24px",
                                  textAlign: "center",
                                  // display: "inline",
                                }}
                              >
                                Country
                              </Typography>
                              <br />
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
                          </Grid>

                          {/* Country and Specialism  */}
                          <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: "center" }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontFamily: "Protest Guerrilla",
                                  color: "yellow",
                                  fontSize: "24px",
                                }}
                              >
                                Specialism
                              </Typography>
                              <Typography
                                variant="body"
                                sx={{
                                  fontFamily: "Protest Strike",
                                  // color: "#FC6736",
                                  color: "white",
                                  fontSize: "28px",
                                  // paddingLeft: "20px",
                                }}
                              >
                                {" "}
                                {currentPlayer.Specialism}
                              </Typography>
                            </Box>
                          </Grid>

                          {/* Bowling and Batting Styles  */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              marginTop: "20px",
                              // border: "1px solid white",
                            }}
                          >
                            <Box
                              variant={"span"}
                              sx={{ height: "50px", width: "50px" }}
                            >
                              <img
                                src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708635625/batt-removebg-preview_v2woyj.png"
                                alt="Batting Style"
                              />
                            </Box>
                            <br />
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
                              {currentPlayer.BattingStyle}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
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
                          <Box className="w-full mt-4 border-b-2"></Box>
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
                        fontSize: "19px",
                        color: "white",
                      }}
                    >
                      {keeperCount}
                    </Typography>
                  </Box>
                </Box>

                {/* Keeper  */}

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
                      {batsManCount}
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
                      {bowlerCount}
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
                      {allRounderCount}
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
                      {overSeasCount}
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
                      {starCount}
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
                      {indianCount}
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
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
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
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.firstname} {item.surname}
                        </Typography>
                      </Grid>
                      <Grid item md={1}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.country}
                        </Typography>
                      </Grid>
                      <Grid item md={1}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.Specialism}
                        </Typography>
                      </Grid>
                      <Grid item md={1}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.BattingStyle}
                        </Typography>
                      </Grid>
                      <Grid item md={2}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.BowlingStyle}
                        </Typography>
                      </Grid>
                      <Grid item md={1}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.iplRating}
                        </Typography>
                      </Grid>
                      <Grid item md={1}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.biddingAmount}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
            </Box>
          </section>
          <ParticipantFooter />
        </Box>
      )}
    </>
  );
};

export default ParticipantDashboard;
