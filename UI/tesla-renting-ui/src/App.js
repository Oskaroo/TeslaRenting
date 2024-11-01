import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import CarDetails from "./Pages/CarDetails";
import NotFound from "./Components/NotFound";
import Cars from "./Pages/Cars";
import Places from "./Pages/Places";
import PostDetails from "./Pages/PostDetails";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import { Box, Container, Drawer, IconButton } from "@mui/material";
import Map from "./Components/Map";
import RecommendedRoutes from "./Components/RecommendedRoutes";
import MapIcon from "@mui/icons-material/Map";
import ChatIcon from "@mui/icons-material/Chat";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const buttonStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: 64,
    height: 64,
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  };

  return (
    <Router>
      <Box className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          handleLogin={handleLogin}
        />
        <Box
          sx={{
            width: "20%",
            height: "calc(100vh - 64px)",
            position: "fixed",
            left: 0,
            top: "64px",
            zIndex: 1,
            padding: 2,
            display: { xs: "none", md: "block" },
            overflow: "hidden",
          }}
        >
          <video
            src="/videos/redTesla.mp4"
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Box display="flex" sx={{ marginTop: "80px" }}>
          <Container
            sx={{
              flexGrow: 1,
              paddingX: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/places" component={Places} />
              <Route path="/cars/:id" component={CarDetails} />
              <Route path="/cars" component={Cars} />
              <Route path="/post/:id" component={PostDetails} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Container>
          <Box
            sx={{
              width: "20%",
              height: "calc(100vh - 64px)",
              position: "fixed",
              right: 0,
              top: "64px",
              zIndex: 1,
              padding: 2,
              display: { xs: "none", md: "block" },
              overflowY: "auto",
            }}
          >
            <RecommendedRoutes />
          </Box>
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            display: "flex",
            gap: 2,
            zIndex: 1200,
          }}
        >
          <IconButton
            color="primary"
            onClick={() => setIsMapOpen(!isMapOpen)}
            sx={buttonStyles}
          >
            <MapIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <IconButton color="primary" sx={buttonStyles}>
            <ChatIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
        <Drawer
          anchor="right"
          open={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          PaperProps={{
            sx: { width: "30vw", backgroundColor: "#f5f5f5", padding: 2 },
          }}
        >
          <Map />
        </Drawer>
      </Box>
    </Router>
  );
}

export default App;
