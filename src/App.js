import logo from "./logo.svg";

import "./App.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import ParticipantStatsPage from "./Pages/ParticipantStatsPage";
import ParticipantDashboard from "./Pages/ParticipantDashboard";

function App() {
  return (
    <div className="App bg-slate-950">
      <BrowserRouter>
        <Routes>
          <Route
            path="/auctioneer/participant/stats"
            element={<ParticipantStatsPage />}
          />
          <Route
            path="/participant/dashboard"
            element={<ParticipantDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
