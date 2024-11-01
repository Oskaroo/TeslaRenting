import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import navbarPhoto from "../photos/navbarPhoto.jpg";
import RegisterModal from "../Pages/Register";
import LoginModal from "../Pages/Login";

const Navbar = ({ isLoggedIn, handleLogout, handleLogin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundImage: `url(${navbarPhoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        color: "white",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 20px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
            }}
          >
            TeslaRenting
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          {[
            { to: "/", icon: <HomeIcon />, label: "Strona główna" },
            { to: "/about", icon: <InfoIcon />, label: "O nas" },
            { to: "/cars", icon: <DirectionsCarIcon />, label: "Samochody" },
            { to: "/places", icon: <LocationOnIcon />, label: "Miejsca" },
            { to: "/contact", icon: <ContactMailIcon />, label: "Kontakt" },
          ].map((item, index) => (
            <Box
              key={index}
              component={Link}
              to={item.to}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                padding: "8px 12px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                color: "black",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                },
              }}
            >
              {item.icon}
              <Typography
                variant="caption"
                sx={{ fontSize: "0.75rem", mt: 0.5 }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          {isLoggedIn ? (
            <Box
              onClick={handleLogout}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                padding: "8px 12px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                color: "black",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                },
                mr: 4,
              }}
            >
              <PersonIcon />
              <Typography variant="caption">Wyloguj</Typography>
            </Box>
          ) : (
            <>
              <Box
                onClick={() => setLoginModalOpen(true)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  padding: "8px 12px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  color: "black",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  },
                }}
              >
                <PersonIcon />
                <Typography variant="caption">Zaloguj</Typography>
              </Box>
              <Box
                onClick={() => setRegisterModalOpen(true)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  padding: "8px 12px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  color: "black",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  },
                  mr: 4,
                }}
              >
                <PersonAddIcon />
                <Typography variant="caption">Zarejestruj</Typography>
              </Box>
            </>
          )}
        </Box>
      </Toolbar>
      <RegisterModal open={registerModalOpen} setOpen={setRegisterModalOpen} />
      <LoginModal
        open={loginModalOpen}
        setOpen={setLoginModalOpen}
        handleLogin={handleLogin}
      />
    </AppBar>
  );
};

export default Navbar;
