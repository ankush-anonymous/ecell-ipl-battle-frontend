import logo from "./logo.svg";

import "./App.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import RoomStats from "./Pages/RoomStats";
import ParticipantStatsPage from "./Pages/ParticipantStatsPage";
import ParticipantDashboard from "./Pages/ParticipantDashboard";
import RulesPage from "./Pages/RulesPage";
import AuctioneerTeamsPage from "./Pages/AuctioneerTeamsPage";
import AuctionerSingleTeamPage from "./Pages/AuctionerSingleTeamPage";
import AuctioneerBiddingPage from "./Pages/AuctioneerBiddingPage";
import AuctioneerParticipantsPlayersPage from "./Pages/AuctioneerParticipantsPlayersPage";
import LoginPage from "./Pages/LoginPage";
import LoginAuctioneerPage from "./Pages/LoginAuctioneerPage";
import LoginParticipantsPage from "./Pages/LoginParticipantsPage";

function App() {
  return (
    <div className="App bg-slate-950 ">
      <BrowserRouter>
        <Routes>
          <Route
            path="/participant/dashboard"
            element={<ParticipantDashboard />}
          />
          <Route path="/auctioneer/teams/" element={<AuctioneerTeamsPage />} />
          <Route
            path="/auctioneer/teams/stats"
            element={<AuctionerSingleTeamPage />}
          />
          <Route
            path="/auctioneer/bidding"
            element={<AuctioneerBiddingPage />}
          />
          <Route
            path="/auctioneer/participants/team"
            element={<AuctioneerParticipantsPlayersPage />}
          />
          <Route
            path="/superuser/rooms"
            element={<RoomStats/>}
          />
           <Route
            path="/Login"
            element={<LoginPage/>}
          />
          <Route
            path="/Login/Auctioneer"
            element={<LoginAuctioneerPage/>}
          />
          <Route
            path="/Login/Participants"
            element={<LoginParticipantsPage/>}
          />

          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
