import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>{/* <Route path="/" element={</>} /> */}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
