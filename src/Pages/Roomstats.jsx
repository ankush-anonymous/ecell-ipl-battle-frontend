// import React, { useState } from "react";
// import AuctioneerNavbar from "../Components/AuctioneerNavbar";
// import ParticipantFooter from "../Components/ParticipantFooter";

// import {
//   Box,
//   Button,
//   Grid,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import InfoIcon from "@mui/icons-material/Info";

// const listOfTeams = [
//   {
//     auctionerID: 1,
//     teamLeaderName: "John Doe",
//     teamname: "rcb",
//     teamlogo:
//       "https://i.pinimg.com/originals/24/4f/99/244f99af4ce1b95c2dd5871a9a8161bc.png",
//     username: "abc",
//     password: "xyz",
//     score: 120,
//     balanceAmount: 125000,
//     PlayerCount: 18,
//     Batsmancount: 9,
//     Bowlercount: 5,
//     Wicketkeepercount: 1,
//     Allroundercount: 2,
//   },
//   {
//     auctionerID: 1,
//     teamLeaderName: "John Doe",
//     teamname: "rcb",
//     teamlogo:
//       "https://i.pinimg.com/originals/24/4f/99/244f99af4ce1b95c2dd5871a9a8161bc.png",
//     username: "abc",
//     password: "xyz",
//     score: 120,
//     balanceAmount: 125000,
//     PlayerCount: 18,
//     Batsmancount: 9,
//     Bowlercount: 5,
//     Wicketkeepercount: 1,
//     Allroundercount: 2,
//   },
//   {
//     auctionerID: 1,
//     teamLeaderName: "John Doe",
//     teamname: "rcb",
//     teamlogo:
//       "https://i.pinimg.com/originals/24/4f/99/244f99af4ce1b95c2dd5871a9a8161bc.png",
//     username: "abc",
//     password: "xyz",
//     score: 120,
//     balanceAmount: 125000,
//     PlayerCount: 18,
//     Batsmancount: 9,
//     Bowlercount: 5,
//     Wicketkeepercount: 1,
//     Allroundercount: 2,
//   },
//   {
//     auctionerID: 1,
//     teamLeaderName: "John Doe",
//     teamname: "rcb",
//     teamlogo:
//       "https://i.pinimg.com/originals/24/4f/99/244f99af4ce1b95c2dd5871a9a8161bc.png",
//     username: "abc",
//     password: "xyz",
//     score: 120,
//     balanceAmount: 125000,
//     PlayerCount: 18,
//     Batsmancount: 9,
//     Bowlercount: 5,
//     Wicketkeepercount: 1,
//     Allroundercount: 2,
//   },
// ];

// const AuctioneerTeamsPage = () => {
//   const [teamLeader, setTeamLeader] = useState("");
//   const [teamAssigned, setTeamAssigned] = useState("");

//   const handleCreateTeam = () => {
//     // Your logic to create the team
//     console.log("Team Leader:", teamLeader);
//     console.log("Team Assigned:", teamAssigned);
//   };
//   return (
//     <>
//       <AuctioneerNavbar />
//       <Box>
//         {/* Create Team Section */}
//         <section className="my-32">
//           <Box
//             sx={{
//               height: "100%",
//               width: "90%", // Adjusted width to 90%
//               // border: "1px solid white",
//               margin: "auto", // Centered along x-axis
//               display: "flex-col",
//               justifyContent: "center",
//               alignItems: "center",
//               borderRadius: "10px",
//               padding: "30px",
//               backgroundColor: "#070F2B",
//             }}
//           >
//             {/* section title  */}
//             <Box
//               sx={{
//                 height: "100px",
//                 width: "90%", // Adjusted width to 90%
//                 // border: "1px solid white",
//                 margin: "auto", // Centered along x-axis
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: "10px",
//                 marginBottom: "20px",
//               }}
//             >
//               <Typography
//                 variant="h3"
//                 sx={{ fontFamily: "Protest Revolution", color: "white" }}
//               >
//                 Auctioner Name
//               </Typography>
//             </Box>

//             {/* input section  */}
//             <Box
//               sx={{
//                 height: "100%",
//                 width: "90%",
//                 border: "1px solid white",
//                 margin: "auto",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: "10px",
//                 backgroundColor: "#11161B",
//                 padding: "20px",
//               }}
//             >
//               <Grid container spacing={5} alignItems={"center"}>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Auction Book"
//                     value={teamLeader}
//                     onChange={(e) => setTeamLeader(e.target.value)}
//                     variant="outlined"
//                     sx={{
//                       mb: 2,
//                       backgroundColor: "white",
//                       borderRadius: "5px",
//                       width: "100%",
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Select
//                     value={teamAssigned}
//                     onChange={(e) => setTeamAssigned(e.target.value)}
//                     displayEmpty
//                     variant="outlined"
//                     sx={{
//                       mb: 2,
//                       width: "100%",
//                       backgroundColor: "white",
//                       borderRadius: "5px",
//                     }}
//                     inputProps={{ style: { borderRadius: "5px" } }}
//                   >
//                     <MenuItem value="" disabled>
//                       Room Assigned
//                     </MenuItem>
//                     <MenuItem value="Team A">Team A</MenuItem>
//                     <MenuItem value="Team B">Team B</MenuItem>
//                     <MenuItem value="Team C">Team C</MenuItem>
//                   </Select>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Box
//                     sx={{
//                       border: "white 1px solid",
//                       borderColor: "white",
//                       height: "150px",
//                       width: "100%px",
//                     }}
//                   ></Box>
//                 </Grid>
//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                   sx={{ display: "flex", justifyContent: "flex-end" }}
//                 >
//                   <Button
//                     variant="contained"
//                     size="large" // Increase the button size
//                     onClick={handleCreateTeam}
//                   >
//                     Create Team
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </section>
//         </Box>
//         <ParticipantFooter/>
      
//    </>
//    );
//  };
 
//  export default AuctioneerTeamsPage;
 
import React, { useState } from "react";
import AuctioneerNavbar from "../Components/AuctioneerNavbar";
import ParticipantFooter from "../Components/ParticipantFooter";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const listOfTeams = [
  {
    auctionerID: 1,
    teamLeaderName: "John Doe",
    teamname: "rcb",
    teamlogo:
      "https://i.pinimg.com/originals/24/4f/99/244f99af4ce1b95c2dd5871a9a8161bc.png",
    username: "abc",
    password: "xyz",
    score: 120,
    balanceAmount: 125000,
    PlayerCount: 18,
    Batsmancount: 9,
    Bowlercount: 5,
    Wicketkeepercount: 1,
    Allroundercount: 2,
    Auctionername:"xyz",
    Auctionerphone:63922,
    Roomno:1,
    Currentplayercount:1,

  },
  {
    auctionerID: 1,
    teamLeaderName: "John Doe",
    teamname: "rcb",
    teamlogo:
      "https://i.pinimg.com/originals/24/4f/99/244f99af4ce1b95c2dd5871a9a8161bc.png",
    username: "abc",
    password: "xyz",
    score: 120,
    balanceAmount: 125000,
    PlayerCount: 18,
    Batsmancount: 9,
    Bowlercount: 5,
    Wicketkeepercount: 1,
    Allroundercount: 2,
    Auctionername:"xyz",
    Auctionerphone:63922,
    Roomno:1,
    Currentplayercount:1,
  },
  {
    auctionerID: 1,
    teamLeaderName: "John Doe",
    teamname: "rcb",
    teamlogo:
      "https://i.pinimg.com/originals/24/4f/99/244f99af4ce1b95c2dd5871a9a8161bc.png",
    username: "abc",
    password: "xyz",
    score: 120,
    balanceAmount: 125000,
    PlayerCount: 18,
    Batsmancount: 9,
    Bowlercount: 5,
    Wicketkeepercount: 1,
    Allroundercount: 2,
    Auctionername:"xyz",
    Auctionerphone:63922,
    Roomno:1,
    Currentplayercount:1,
  },
  {
    auctionerID: 1,
    teamLeaderName: "John Doe",
    teamname: "rcb",
    teamlogo:
      "https://i.pinimg.com/originals/24/4f/99/244f99af4ce1b95c2dd5871a9a8161bc.png",
    username: "abc",
    password: "xyz",
    score: 120,
    balanceAmount: 125000,
    PlayerCount: 18,
    Batsmancount: 9,
    Bowlercount: 5,
    Wicketkeepercount: 1,
    Allroundercount: 2,
    Auctionername:"xyz",
    Auctionerphone:63922,
    Roomno:1,
    Currentplayercount:1,
  },
];

const Roomstats= () => {
  const [teamLeader, setTeamLeader] = useState("");
  
  const [teamAssigned, setTeamAssigned] = useState("");

  const handleCreateTeam = () => {
    // Your logic to create the team
    console.log("Team Leader:", teamLeader);
    console.log("Team Assigned:", teamAssigned);
  };
  return (
    <>
      <AuctioneerNavbar />
      <Box>
        {/* Create Team Section */}
        <section className="my-32">
          <Box
            sx={{
              height: "100%",
              width: "90%", // Adjusted width to 90%
              // border: "1px solid white",
              margin: "auto", // Centered along x-axis
              display: "flex-col",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              padding: "30px",
              backgroundColor: "#070F2B",
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
                Create Team
              </Typography>
            </Box>

            {/* input section  */}
            <Box
              sx={{
                height: "100%",
                width: "90%",
                border: "1px solid white",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                backgroundColor: "#11161B",
                padding: "20px",
              }}
            >
              <Grid container spacing={5} alignItems={"center"}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Auctioner's name"
                    value={teamLeader}
                    onChange={(e) => setTeamLeader(e.target.value)}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    label="Auctioner's Phone Number"
                    value={teamAssigned}
                    onChange={(e) => setTeamAssigned(e.target.value)}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      border: "white 1px solid",
                      borderColor: "white",
                      height: "150px",
                      width: "100%px",
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    size="large" // Increase the button size
                    onClick={handleCreateTeam}
                  >
                    Generate
                  </Button>
                </Grid>
              </Grid>
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
               Room stats
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
                <Grid item md={3}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Auctioner Name
                  </Typography>
                </Grid>
                {/* <Grid item md={2}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Leader Name
                  </Typography>
                </Grid> */}
                <Grid item md={3}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Auctioneer's Phone Number
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
                    Room Number
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
                    Current PLayer Count
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
                    More Info
                  </Typography>
                </Grid>

                {/* Table Body - Map the array */}
                {listOfTeams.map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item md={1}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.slno}
                      </Typography>
                    </Grid>
                    {/* <Grid item md={2}>
                      <img src={item.teamlogo} alt={item.Name} />
                    </Grid> */}
                    <Grid item md={3}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.Auctionername}
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.Auctionerphone}
                      </Typography>
                    </Grid>
                    <Grid item md={2}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.Roomno}
                      </Typography>
                    </Grid>
                    <Grid item md={2}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        {item.Currentplayercount}
                      </Typography>
                    </Grid>
                    <Grid item md={1}>
                      <Typography
                        align="center"
                        sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                      >
                        <Button>
                          <InfoIcon />
                        </Button>
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </Box>
        </section>
        <ParticipantFooter/>
      </Box>
    </>
  );
};

export default Roomstats;
