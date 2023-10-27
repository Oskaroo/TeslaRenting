import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>TeslaRenting</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">New Car</Link>
        <Link to="/create">About</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/places">Places</Link>
        <Link to="/loggin">Loggin</Link>
        <Link to="/register">Register</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
