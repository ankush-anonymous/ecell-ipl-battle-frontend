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
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useLocation, useParams, withRouter } from "react-router-dom";
import axios from "axios";
// import Select from "react-select";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AuctionerSingleTeamPage = (props) => {
  const { auctioneerId, participantId } = useParams();

  const [loading, setLoading] = useState(true);
  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [assignedTeamLogo, setAssignedTeamLogo] = useState("");
  const [teamAssigned, setTeamAssigned] = useState("");
  const [listOfTeams, setListOfTeams] = useState([]);
  const [teams, setTeams] = useState([]);

  const [iplTeamLogo, setIplTeamLogo] = useState("");
  // const [auctioneerId, setAuctioneerID] = useState("");
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
  const [selectedTeams, setSelectedTeams] = useState({});
  const [checkedCardId, setCheckedCardId] = useState(null);
  const [assignedTeamId, setAssignedTeamId] = useState("");
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failure, setFailure] = React.useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const handleCheckboxChange = (cardId) => {
    if (checkedCardId === cardId) {
      setCheckedCardId(null); // Uncheck if already checked
    } else {
      setCheckedCardId(cardId); // Check the clicked card
      console.log(cardId);
    }
  };

  //fetch participant details on login
  const fetchParticipantDetails = async () => {
    try {
      setBalanceAmount(localStorage.getItem("balanceAmount"));
      setAllRounderCount(localStorage.getItem("AllRounderCount"));
      setBatsManCount(localStorage.getItem("BatsmanCount"));
      setBowlerCount(localStorage.getItem("BowlerCount"));
      setKeeperCount(localStorage.getItem("WicketKeeperCount"));
      setStarCount(localStorage.getItem("StarCount"));
      setIndianCount(localStorage.getItem("NonOverSeasCount"));
      setOverSeasCount(localStorage.getItem("OverseasCount"));
    } catch (error) {
      setFailure(true);
      setFailure("Error fetching participant details");
      console.log(error);
    }
  };

  const fetchMyStats = async () => {
    try {
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
      localStorage.setItem("score", stats.score);

      setLoading(false); // Set loading to false after successfully fetching the data
    } catch (error) {
      setFailure(true);
      setFailure("Error fetching stats");
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
        // Push the player details to the listOfPlayers array
        listOfPlayers.push(playerWithBiddingAmount);
      }
      setListOfPlayers(listOfPlayers);

      // Now listOfPlayers contains details of all players
      setLoading(false);
      return listOfPlayers;
    } catch (error) {
      console.error("Error fetching players:", error.message);
      setFailure(true);
      setFailure("Error fetching players");
      return []; // Return an empty array in case of an error
    }
  };

  //to get list of player to transfer
  const fetchTeamsOfRoom = async (auctioneerId) => {
    try {
      console.log("part:", auctioneerId);
      const result = await axios.get(
        `/api/v1/participants/getAllParticipants?auctioneerID=${auctioneerId}`
      );
      console.log(result);
      const filteredTeams = result.data.participants.filter(
        (participant) => participant._id !== participantId
      );
      setTeams(filteredTeams);
      // console.log("part:", filteredTeams);
    } catch (error) {
      console.log(error);
      setFailure(true);
      setFailureMessage("error in fetching players of rooms");
    }
  };

  //to transfer the player to new participant
  const upgradeParticipant = async (partId, bidAmount, iplPlayerId) => {
    try {
      setLoading(true);

      const participant = await axios.get(
        `/api/v1/participants/getParticipantsById/${partId}`
      );

      const balanceAmount = participant.data.data.balanceAmount;
      const AllRounderCount = participant.data.data.AllRounderCount;
      const BatsmanCount = participant.data.data.BatsmanCount;
      const BowlerCount = participant.data.data.BowlerCount;
      const NonOverSeasCount = participant.data.data.NonOverSeasCount;
      const OverseasCount = participant.data.data.OverseasCount;
      const PlayerCount = participant.data.data.PlayerCount;
      const WicketKeeperCount = participant.data.data.WicketKeeperCount;
      const StarCount = participant.data.data.StarCount;
      const score = participant.data.data.score;

      console.log(balanceAmount);
      console.log(AllRounderCount);
      console.log(BatsmanCount);
      console.log(BowlerCount);
      console.log(NonOverSeasCount);
      console.log(OverseasCount);
      console.log(PlayerCount);
      console.log(WicketKeeperCount);
      console.log(StarCount);
      console.log(score);

      // get ipl player info
      const playerInfo = await axios.get(
        `/api/v1/players/getPlayerById/${iplPlayerId}`
      );
      const currentPlayer = playerInfo.data.data;
      const updatePlayerStats = {};

      if (currentPlayer.Specialism.toLowerCase() === "batsman") {
        updatePlayerStats.BatsmanCount = BatsmanCount + 1;
      }
      if (currentPlayer.Specialism.toLowerCase() === "bowler") {
        updatePlayerStats.BowlerCount = BowlerCount + 1;
      }
      if (currentPlayer.Specialism.toLowerCase() === "all-rounder") {
        updatePlayerStats.AllRounderCount = AllRounderCount + 1;
      }

      if (currentPlayer.Specialism.toLowerCase() === "wicketkeeper") {
        updatePlayerStats.WicketKeeperCount = WicketKeeperCount + 1;
      }
      if (currentPlayer.overSeasFlag === false) {
        updatePlayerStats.NonOverSeasCount = NonOverSeasCount + 1;
      }
      if (currentPlayer.overSeasFlag === true) {
        updatePlayerStats.OverseasCount = OverseasCount + 1;
      }
      if (currentPlayer.isStarPlayer === true) {
        updatePlayerStats.StarCount = StarCount + 1;
        const points = currentPlayer.iplRating;
        updatePlayerStats.score = parseInt(score) + parseInt(points) + 5;
      } else {
        const points = currentPlayer.iplRating;
        updatePlayerStats.score = parseInt(score) + parseInt(points);
      }

      updatePlayerStats.PlayerCount = PlayerCount + 1;
      updatePlayerStats.balanceAmount = balanceAmount - parseInt(bidAmount);
      console.log(updatePlayerStats);
      const updateParticipant = await axios.patch(
        `/api/v1/participants/updateParticipantsById/${partId}`,
        updatePlayerStats
      );

      if (updateParticipant) {
        console.log("participant  upgraded");
        setSuccess(true);
        setSuccessMessage("Player Upgraded Successfully");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setFailure(true);
      setFailure("Player Not Upgraded Successfully");
    }
  };

  const downgradeParticipant = async (partId, bidAmount, iplPlayerId) => {
    try {
      setLoading(true);

      const participant = await axios.get(
        `/api/v1/participants/getParticipantsById/${partId}`
      );
      const balanceAmount = participant.data.data.balanceAmount;
      const AllRounderCount = participant.data.data.AllRounderCount;
      const BatsmanCount = participant.data.data.BatsmanCount;
      const BowlerCount = participant.data.data.BowlerCount;
      const NonOverSeasCount = participant.data.data.NonOverSeasCount;
      const OverSeasCount = participant.data.data.OverseasCount;
      const PlayerCount = participant.data.data.PlayerCount;
      const WicketKeeperCount = participant.data.data.WicketKeeperCount;
      const StarCount = participant.data.data.StarCount;
      const score = participant.data.data.score;

      console.log(balanceAmount);
      console.log(AllRounderCount);
      console.log(BatsmanCount);
      console.log(BowlerCount);
      console.log(NonOverSeasCount);
      console.log(OverSeasCount);
      console.log(PlayerCount);
      console.log(WicketKeeperCount);
      console.log(StarCount);
      console.log(score);

      const playerInfo = await axios.get(
        `/api/v1/players/getPlayerById/${iplPlayerId}`
      );
      const currentPlayer = playerInfo.data.data;
      const updatePlayerStats = {};

      if (currentPlayer.Specialism.toLowerCase() === "batsman") {
        updatePlayerStats.BatsmanCount = BatsmanCount - 1;
      }
      if (currentPlayer.Specialism.toLowerCase() === "bowler") {
        updatePlayerStats.BowlerCount = BowlerCount - 1;
      }
      if (currentPlayer.Specialism.toLowerCase() === "all-rounder") {
        updatePlayerStats.AllRounderCount = AllRounderCount - 1;
      }

      if (currentPlayer.Specialism.toLowerCase() === "wicketkeeper") {
        updatePlayerStats.WicketKeeperCount = WicketKeeperCount - 1;
      }
      if (currentPlayer.overSeasFlag === false) {
        updatePlayerStats.NonOverSeasCount = NonOverSeasCount - 1;
      }
      if (currentPlayer.overSeasFlag === true) {
        updatePlayerStats.OverseasCount = OverSeasCount - 1;
      }
      if (currentPlayer.isStarPlayer === true) {
        updatePlayerStats.StarCount = StarCount - 1;
        const points = currentPlayer.iplRating;
        updatePlayerStats.score = parseInt(score) - parseInt(points) - 5;
      } else {
        const points = currentPlayer.iplRating;
        updatePlayerStats.score = parseInt(score) - parseInt(points);
      }

      updatePlayerStats.PlayerCount = PlayerCount - 1;
      updatePlayerStats.balanceAmount = balanceAmount + parseInt(bidAmount);

      console.log(updatePlayerStats);

      const updateParticipant = await axios.patch(
        `/api/v1/participants/updateParticipantsById/${partId}`,
        updatePlayerStats
      );
      console.log("updated:", updateParticipant);
      if (updateParticipant) {
        console.log("participant  downgraded");
        setSuccess(true);
        setSuccessMessage("Player Downgraded Successfully");
      }
    } catch (error) {
      console.log(error);
      setFailure(true);
      setFailure("Player Not Downgraded Successfully");
    }
  };

  const handleTransfer = async () => {
    try {
      //transaction id
      const transaction = await axios.get(
        `/api/v1/bid/getAllBiddingTransit?auctioneerId=${auctioneerId}&iplPlayerID=${checkedCardId}`
      );
      const bidAmount = transaction.data.result[0].biddingAmount;
      const transactionId = transaction.data.result[0]._id;

      // new participant
      upgradeParticipant(assignedTeamId, bidAmount, checkedCardId);

      downgradeParticipant(participantId, bidAmount, checkedCardId);

      const updateTransactionData = {
        participantID: assignedTeamId,
      };
      const updateTransaction = await axios.patch(
        `/api/v1/bid/updateBiddingTransit/${transactionId}`,
        updateTransactionData
      );
      if (updateTransaction) {
        setSuccess(true);
        setSuccessMessage("Player Transferred Successfully");
      }
      fetchMyPlayers();
    } catch (error) {
      console.log(error);
      setFailure(true);
      setFailure("Player Not Transferred Successfully");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setFailure(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clean up function to clear the timeout when the component unmounts or when useEffect is run again
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const auctioneerId = localStorage.getItem("auctioneerId");
    fetchTeamsOfRoom(auctioneerId);
    fetchMyPlayers(participantId);
    fetchMyStats();
    fetchParticipantDetails();
  }, []);

  return (
    <>
      <AuctioneerNavbar />
      {console.log(auctioneerId)}
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
                <Grid item xs={12} md={12}>
                  <Box>
                    <Select
                      value={teamAssigned}
                      onChange={(e) => {
                        const selectedTeam = teams.find(
                          (team) => team.teamname === e.target.value
                        );
                        setTeamAssigned(e.target.value);
                        setAssignedTeamLogo(
                          selectedTeam ? selectedTeam.iplTeamLogo : ""
                        );
                        setAssignedTeamId(selectedTeam ? selectedTeam._id : "");
                        console.log(selectedTeam); // Log the selected team here
                      }}
                      displayEmpty
                      variant="outlined"
                      sx={{
                        mb: 2,
                        width: "100%",
                        backgroundColor: "white",
                        borderRadius: "5px",
                      }}
                      inputProps={{ style: { borderRadius: "5px" } }}
                    >
                      <MenuItem value="" disabled>
                        Select Team Assigned
                      </MenuItem>
                      {teams.map((team, key) => (
                        <MenuItem key={key} value={team.teamname}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={team.iplTeamLogo}
                              alt={team.teamname}
                              style={{ width: 24, marginRight: 8 }}
                            />
                            {team.teamname}
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="large" // Increase the button size
                      onClick={handleTransfer}
                      sx={{ backgroundColor: "#E8AA42" }}
                    >
                      Transfer
                    </Button>
                  </Box>
                </Grid>
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
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkedCardId === item._id}
                              onChange={() => handleCheckboxChange(item._id)}
                              color="primary"
                            />
                          }
                          label="Select"
                        />
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
      {/* Toast  */}
      <Box>
        {/* success Toast */}
        <Box>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {successMessage}
            </Alert>
          </Snackbar>
        </Box>
        {/* failure Toast */}
        <Box>
          <Snackbar
            open={failure}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {failureMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

export default AuctionerSingleTeamPage;
