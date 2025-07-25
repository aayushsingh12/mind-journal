import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img
        src="project.png"
        alt="MindJournal Logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <nav className="navbar">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/journal" className="nav-link">Journal</NavLink>
        <NavLink to="/record-audio" className="nav-link">Record Audio</NavLink>
        <NavLink to="/saved-entries" className="nav-link">Saved Entries</NavLink>
      </nav>
    </header>
  );
}
