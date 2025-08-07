import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import {
  FaHome,
  FaBoxOpen,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar starts closed

  return (
    <>
      {/* Button to toggle the sidebar */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2 className="sidebar-title">ATKita</h2>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink
                end
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaHome className="icon" />
                <span>Input Barang</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/barang"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaBoxOpen className="icon" />
                <span>Daftar Barang</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pengeluaran"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaSignOutAlt className="icon" />
                <span>Pengeluaran</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/log"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaClipboardList className="icon" />
                <span>Riwayat</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
