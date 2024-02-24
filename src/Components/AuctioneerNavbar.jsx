import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const AuctioneerNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);
  const location = useLocation(); // Get the current location from react-router-dom

  useEffect(() => {
    // Find the index of the tab whose link matches the current pathname
    const tabIndex = tabs.findIndex((tab) => tab.link === location.pathname);
    setValue(tabIndex !== -1 ? tabIndex : 0); // Set the value to the found index or 0 if not found
  }, [location.pathname]); // Update the effect when the pathname changes

  const tabs = [
    { label: "dashboard", link: "/participant/dashboard" },
    { label: "rules", link: "/rules" },

    { label: "Login", link: "/login" },
    { label: "Teams", link: "/teams" },
  ];

  const socialMediaLinks = [
    { icon: <XIcon />, link: "https://www.twitter.com" },
    { icon: <InstagramIcon />, link: "https://www.instagram.com" },
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      {/* Container to center content vertically */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Main AppBar with more height */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#020617",
            height: 100,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              // padding: "5px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708386085/happytails_orjwh4.png"
              alt="Logo"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
            />
          </Box>
        </AppBar>

        {/* SubBar with less height */}
        <AppBar
          position="static"
          sx={{ backgroundColor: "#B2AEFF", height: 40 }}
        >
          {/* All Options view in Larger Screen  */}
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              marginTop: "3px",
              flexGrow: 1,
              display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
            }}
          >
            {/* Tabs centered */}
            <Tabs value={value} onChange={handleTabsChange} textColor="inherit">
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label.toUpperCase()}
                  component="a"
                  href={tab.link}
                  sx={{ color: "black" }}
                />
              ))}
            </Tabs>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              marginTop: "3px",
              flexGrow: 1,
              display: { xs: "block", sm: "block", md: "none", lg: "none" },
              marginLeft: "5px",
              color: "black",
            }}
          >
            <MenuIcon onClick={toggleDrawer(true)} />
          </Box>
        </AppBar>
      </Box>

      {/* Drawer for xs screens */}
      <Drawer
        PaperProps={{
          sx: { width: "90%" },
        }}
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "auto", // Push the social media links to the bottom
            backgroundColor: "#020617",
            height: "200px",
          }}
        >
          <Typography variant="h5">Logo</Typography>
        </Box>
        <Box
          sx={{
            width: 200,
            display: "flex",
            flexDirection: "column",
            padding: 2,
            marginTop: "5px",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Set height to 100% to center vertically
            margin: "auto", // Add this to center horizontally
            backgroundColor: "#B2AEFF",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Tabs
            value={value}
            onChange={handleTabsChange}
            textColor="inherit"
            orientation="vertical"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label.toUpperCase()}
                component="a"
                href={tab.link}
              />
            ))}
          </Tabs>
        </Box>

        {/* Social media links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "auto", // Push the social media links to the bottom
            backgroundColor: "#020617",
            height: "70px",
          }}
        >
          {socialMediaLinks.map((link, index) => (
            <IconButton key={index} color="inherit" href={link.link}>
              {link.icon}
            </IconButton>
          ))}
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default AuctioneerNavbar;
