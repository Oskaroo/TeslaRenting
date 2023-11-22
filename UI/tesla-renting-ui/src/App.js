import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Pages/Create";
import CarDetails from "./Pages/CarDetails";
import NotFound from "./Components/NotFound";
import Cars from "./Pages/Cars";
import Places from "./Pages/Places";
import PostDetails from "./Pages/PostDetails";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
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
              <Login />
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
