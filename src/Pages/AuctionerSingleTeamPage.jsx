import React, { useEffect, useState } from "react";
import AuctioneerNavbar from "../Components/AuctioneerNavbar";
import ParticipantFooter from "../Components/ParticipantFooter";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  // Select,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { teams } from "../data/iplTeams";
import Select from "react-select";
import CircularProgress from "@mui/material/CircularProgress";

const AuctionerSingleTeamPage = () => {
  const { participantId } = useParams();
  const [loading, setLoading] = useState(true);
  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [assignedTeamLogo, setAssignedTeamLogo] = useState("");
  const [teamAssigned, setTeamAssigned] = useState("");
  const [listOfTeams, setListOfTeams] = useState([]);

  const [iplTeamLogo, setIplTeamLogo] = useState("");
  const [auctioneerID, setAuctioneerID] = useState("");
  const [participantID, setParticipantID] = useState("");
  const [teamName, setTeamName] = useState("");
  const [playerCount, setPlayerCount] = useState();

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
    setBalanceAmount(localStorage.getItem("balanceAmount"));
    setAllRounderCount(localStorage.getItem("AllRounderCount"));
    setBatsManCount(localStorage.getItem("BatsmanCount"));
    setBowlerCount(localStorage.getItem("BowlerCount"));
    setKeeperCount(localStorage.getItem("WicketKeeperCount"));
    setStarCount(localStorage.getItem("StarCount"));
    setIndianCount(localStorage.getItem("NonOverSeasCount"));
    setOverSeasCount(localStorage.getItem("OverseasCount"));
  };

  const fetchMyStats = async () => {
    try {
      console.log("participantID:", participantId);
      setLoading(true);
      const myStats = await axios.get(
        `/api/v1/participants/getParticipantsById/${participantId}`
      );
      const stats = myStats.data.data;
      console.log(stats);
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

  //to get players of a single team
  const fetchMyPlayers = async () => {
    try {
      const result = await axios.get(
        `/api/v1/bid/getAllBiddingTransit?participantID=${participantId}`
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
      setLoading(false);
      return listOfPlayers;
    } catch (error) {
      console.error("Error fetching players:", error.message);
      return []; // Return an empty array in case of an error
    }
  };

  const fetchTeamsOfRoom = async (auctioneerID) => {
    const result = await axios.get(
      `/api/v1/participants/getAllParticipants?auctioneerID=${auctioneerID}`
    );
    setListOfTeams(result.data.participants);
    console.log("part:", result.data.participants);
  };

  const handleTeamChange = (selectedOption) => {
    setTeamAssigned(selectedOption);
    console.log("Selected team:", selectedOption);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clean up function to clear the timeout when the component unmounts or when useEffect is run again
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const auctioneerID = localStorage.getItem("_id");
    fetchTeamsOfRoom(auctioneerID);
    fetchMyPlayers(participantId);
    fetchMyStats();
    fetchParticipantDetails();
  }, []);

  return (
    <>
      <AuctioneerNavbar />
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
        <Box>
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
                width: "98%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              {/* section title  */}
              <Box
                sx={{
                  height: "100px",
                  width: "90%",
                  margin: "auto",
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
                  Players of Team
                </Typography>
              </Box>
              <Grid container spacing={3} alignItems={"center"}>
                {listOfPlayers.map((item, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <Card
                      sx={{
                        backgroundColor: "#232329",
                        color: "white",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column", // Change to column layout
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "25px",
                      }}
                    >
                      {/* New section for buttons */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "20px",
                        }}
                      >
                        {/* Delete button */}
                        <Button
                          variant="contained"
                          color="error"
                          // onClick={() => handleDelete(item.id)}
                          sx={{ marginRight: "10px" }}
                        >
                          Delete
                        </Button>

                        {/* Transfer To  */}
                        <FormControl sx={{ m: 1, minWidth: "300px" }}>
                          <InputLabel>Transfer To</InputLabel>

                          <Select
                            value={teamAssigned}
                            onChange={handleTeamChange}
                            className="z-99"
                            options={listOfTeams.map((team) => ({
                              value: team.name,
                              label: (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={team.iplTeamLogo}
                                    alt={team.iplTeamName}
                                    style={{ width: 24, marginRight: 8 }}
                                  />
                                  {team.iplTeamName}
                                </div>
                              ),
                            }))}
                            placeholder="Select team..."
                          />
                        </FormControl>

                        {/* Transfer button */}
                        <Button
                          variant="contained"
                          color="primary"
                          // onClick={() => handleDelete(item.id)}
                          sx={{ marginRight: "10px" }}
                        >
                          Transfer
                        </Button>
                      </Box>
                      <Grid container alignItems={"center"}>
                        <Grid item xs={9} md={9}>
                          <CardContent>
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "yellow",
                              }}
                            >
                              {item.firstname} {item.surname}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "Protest Strike",
                                  color: "yellow",
                                  marginRight: "8px",
                                  fontSize: "15px",
                                }}
                              >
                                Country:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontFamily: "Protest Guerrilla",
                                  color: "orange",
                                  marginRight: "8px",
                                  fontSize: "20px",
                                }}
                              >
                                {item.country}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "Protest Strike",
                                  color: "yellow",
                                  marginRight: "8px",
                                  fontSize: "15px",
                                }}
                              >
                                Specialism:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontFamily: "Protest Guerrilla",
                                  color: "orange",
                                  marginRight: "8px",
                                  fontSize: "20px",
                                }}
                              >
                                {item.Specialism}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "Protest Strike",
                                  color: "yellow",
                                  marginRight: "8px",
                                  fontSize: "15px",
                                }}
                              >
                                Batting Style:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontFamily: "Protest Guerrilla",
                                  color: "orange",
                                  marginRight: "8px",
                                  fontSize: "20px",
                                }}
                              >
                                {item.BattingStyle}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "Protest Strike",
                                  color: "yellow",
                                  marginRight: "8px",
                                  fontSize: "15px",
                                }}
                              >
                                Bowling Style:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontFamily: "Protest Guerrilla",
                                  color: "orange",
                                  marginRight: "8px",
                                  fontSize: "20px",
                                }}
                              >
                                {item.BowlingStyle}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "Protest Strike",
                                  color: "yellow",
                                  marginRight: "8px",
                                  fontSize: "15px",
                                }}
                              >
                                IPL Points:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontFamily: "Protest Guerrilla",
                                  color: "orange",
                                  marginRight: "8px",
                                  fontSize: "20px",
                                }}
                              >
                                {item.iplRating}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "Protest Strike",
                                  color: "yellow",
                                  marginRight: "8px",
                                  fontSize: "15px",
                                }}
                              >
                                Sold Price:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontFamily: "Protest Guerrilla",
                                  color: "orange",
                                  marginRight: "8px",
                                  fontSize: "20px",
                                }}
                              >
                                {item.biddingAmount}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Grid>
                        <Grid item xs={3} md={3}>
                          <img
                            src={item.image}
                            alt={`${item.firstname} ${item.surname}`}
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                              marginLeft: "20px",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </section>
          <ParticipantFooter />
        </Box>
      )}
    </>
  );
};

export default AuctionerSingleTeamPage;
