import logo from "./logo.svg";

import "./App.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import ParticipantStatsPage from "./Pages/ParticipantStatsPage";
import ParticipantDashboard from "./Pages/ParticipantDashboard";
import RulesPage from "./Pages/RulesPage";
import AuctioneerTeamsPage from "./Pages/AuctioneerTeamsPage";

function App() {
  return (
    <div className="App bg-slate-950 ">
      <BrowserRouter>
        <Routes>
          <Route
            path="/participant/dashboard"
            element={<ParticipantDashboard />}
          />
          <Route
            path="/auctioneer/teams/stats"
            element={<AuctioneerTeamsPage />}
          />

          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
