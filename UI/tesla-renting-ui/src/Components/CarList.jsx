import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAllCars } from "../Api/apiCalls";
import { mapAvailabilityToName } from "../Utils/AvailabilityMapping";
import {
  Box,
  Card,
  CardContent,
  Grid2,
  Slide,
  Typography,
} from "@mui/material";

export const getCarImageUrl = (model) => {
  switch (model) {
    case "Model 3":
      return "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-Performance-LHD.png";
    case "Model S":
      return "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png";
    case "Model X":
      return "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png";
    case "Model Y":
      return "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-Y.png";
    default:
      return "https://www.tesla.com/sites/default/files/images/homepage/tesla_hero_home.jpg";
  }
};

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    GetAllCars()
      .then((data) => {
        const mappedCars = data.map((car) => ({
          id: car.id,
          title: car.name,
          place: car.availableAt,
        }));
        setCars(mappedCars);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Slide direction="down" in={true} mountOnEnter timeout={700}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}
          >
            Wybierz samochód, i rozpocznij zwiedzanie
          </Typography>
        </Slide>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Odkryj piękno Majorki z komfortem i stylem, wybierając Teslę, która
          najlepiej pasuje do Twoich potrzeb podróżnych.
        </Typography>
      </Box>
      <Grid2 container spacing={4} justifyContent="center">
        {cars.map((car) => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={car.id}>
            <Link
              to={`/cars/${car.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  backgroundImage: `url(${getCarImageUrl(car.title)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 3,
                  boxShadow: 5,
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.9,
                    transform: "scale(1.02)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    color="white"
                    gutterBottom
                  >
                    {car.title}
                  </Typography>
                  <Typography variant="body2" color="white">
                    Dostępny w {mapAvailabilityToName(car.place)}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default CarList;
