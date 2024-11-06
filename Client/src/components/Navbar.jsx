import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        Habituo
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/planCreatorPage" title="Create your plan here">Strategize</NavLink>
        </li>
        <li>
          <NavLink to="/dashboardPage" title="Track your progress and stats">InsightBoard</NavLink>
        </li>
        <li>
          <NavLink to="/challengePage" title="Track your 21/45/90 day challenges">PeakTrack</NavLink>
        </li>
        <li>
          <NavLink to="/userProfile" title="View and edit your profile">MyPath</NavLink>
        </li>
      </ul>
    </nav>
  );
};
