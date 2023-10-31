import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import CarDetails from "./CarDetails";
import NotFound from "./NotFound";
import Cars from "./Cars";
import Places from "./Places";
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
