import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import CarDetails from "./CarDetails";
import NotFound from "./NotFound";
import Cars from "./Cars";
import Places from "./Places";
import PostDetails from "./PostDetails";
import About from "./About";
import Contact from "./Contact";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Początkowo użytkownik nie jest zalogowany

  const handleLogin = (token) => {
    // Funkcja do obsługi zalogowania użytkownika
    setIsLoggedIn(true);
    // Tutaj możesz przechować token lub inne informacje o zalogowanym użytkowniku
  };

  const handleLogout = () => {
    // Funkcja do obsługi wylogowania użytkownika
    setIsLoggedIn(false);
    // Tutaj możesz wyczyścić token lub inne informacje o użytkowniku
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/places">
              <Places />
            </Route>
            <Route path="/cars/:id">
              <CarDetails />
            </Route>
            <Route path="/cars">
              <Cars />
            </Route>
            <Route path="/post/:id">
              <PostDetails />
            </Route>
            <Route path="/About">
              <About />
            </Route>
            <Route path="/Contact">
              <Contact />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
