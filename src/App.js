import logo from "./logo.svg";

import "./App.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import ParticipantStatsPage from "./Pages/ParticipantStatsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes><Route path="/Participant/Stats" element={<ParticipantStatsPage/>} /></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;