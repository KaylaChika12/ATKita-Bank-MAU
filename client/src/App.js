// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import InputBarang from "./components/InputBarang";
import PengeluaranBarang from "./components/PengeluaranBarang";
import BarangList from "./components/BarangList";
import LogHistory from "./components/LogHistory";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Ganti container jadi main-content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<InputBarang />} />
          <Route path="/pengeluaran" element={<PengeluaranBarang />} />
          <Route path="/barang" element={<BarangList />} />
          <Route path="/log" element={<LogHistory />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
