import React from "react";
import AuctioneerNavbar from "../Components/AuctioneerNavbar";
import { Box, Grid, TextField, Typography } from "@mui/material";
import ParticipantDashboard from "./ParticipantDashboard";
import ParticipantFooter from "../Components/ParticipantFooter";


const AuctioneerTeamsPage = () => {
  return (
    <>
      <AuctioneerNavbar />
      <Box>
        {/* Create Team Section */}
        <section className="my-10">
          <Box
            sx={{
              height: "100%",
              width: "90%", // Adjusted width to 90%
              border: "1px solid white",
              margin: "auto", // Centered along x-axis
              display: "flex-col",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
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
                height: "200px",
                width: "90%", // Adjusted width to 90%
                border: "1px solid white",
                margin: "auto", // Centered along x-axis
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                backgroundColor: "#020719",
              }}
            >
              <TextField
                // required
                id="outlined-required"
                label="Team Leader Name"
                placeholder="John Doe"
                variant="filled"
                sx={{
                  backgroundColor: "white",
                  "& label": {
                    color: "white", // Changes label color to white
                  },
                }}
              />
            </Box>
          </Box>
        </section>
        <ParticipantFooter/>
      </Box>
    </>
  );
};

export default AuctioneerTeamsPage;
