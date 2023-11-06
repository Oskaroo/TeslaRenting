import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <h1>TeslaRenting</h1>
        </Link>
      </h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/places">Places</Link>
        <Link to="/contact">Contact</Link>
        {isLoggedIn ? (
          <>
            <Link to="/create">Add Reservation</Link>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
