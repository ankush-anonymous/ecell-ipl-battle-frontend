import logo from "./logo.svg";

import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import SuperUserDashboard from "./Pages/SuperUserDashboard";
import ParticipantStatsPage from "./Pages/ParticipantStatsPage";
import ParticipantDashboard from "./Pages/ParticipantDashboard";
import RulesPage from "./Pages/RulesPage";
import AuctioneerTeamsPage from "./Pages/AuctioneerTeamsPage";
import AuctionerSingleTeamPage from "./Pages/AuctionerSingleTeamPage";
import AuctioneerBiddingPage from "./Pages/AuctioneerBiddingPage";
import AuctioneerParticipantsPlayersPage from "./Pages/AuctioneerParticipantsPlayersPage";
import LoginSuperUserPage from "./Pages/LoginSuperUserPage";
import LoginAuctioneerPage from "./Pages/LoginAuctioneerPage";
import LoginParticipantsPage from "./Pages/LoginParticipantsPage";
import HomePage from "./Pages/HomePage";

// axios.defaults.baseURL = "https://ecell-ipl-battle-backend.onrender.com";
axios.defaults.baseURL = " http://localhost:5000";

function App() {
  return (
    <div className="App bg-slate-950 ">
      <BrowserRouter>
        <Routes>
          {/* Homepage route  */}
          <Route path="/" element={<HomePage />} />

          {/* SuperUserRoutes */}
          <Route path="/Login/superUser" element={<LoginSuperUserPage />} />
          <Route path="/superuser/dashboard" element={<SuperUserDashboard />} />

          {/* AuctioneerRoutes  */}
          <Route path="/login/auctioneer" element={<LoginAuctioneerPage />} />
          <Route path="/auctioneer/teams" element={<AuctioneerTeamsPage />} />
          <Route
            path="/auctioneer/teams/stats/:participantId"
            element={<AuctionerSingleTeamPage />}
          />
          <Route
            path="/auctioneer/bidding"
            element={<AuctioneerBiddingPage />}
          />
          {/* <Route
            path="/auctioneer/participants/team"
            element={<AuctioneerParticipantsPlayersPage />}
          /> */}

          {/* ParticipantRoutes  */}
          <Route
            path="/login/participant"
            element={<LoginParticipantsPage />}
          />
          <Route
            path="/participant/dashboard"
            element={<ParticipantDashboard />}
          />

          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
