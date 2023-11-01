import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <h1>TeslaRenting</h1>
        </Link>
      </h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Reservation</Link>
        <Link to="/about">About</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/places">Places</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
