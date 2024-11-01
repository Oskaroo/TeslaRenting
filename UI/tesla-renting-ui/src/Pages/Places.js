import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { Availability } from "../Utils/Enums/Availability";

const getBackgroundImageUrl = (place) => {
  switch (place) {
    case Availability.PalmaAirport:
      return "https://airmundo.com/app/uploads/2021/06/Palma-de-Mallorca-Airport-PMI-400x300.jpg";
    case Availability.PalmaCityCenter:
      return "https://mldvwwasb8tu.i.optimole.com/w:1087/h:1500/q:90/ig:avif/f:best/https/veebrant.com/wp-content/uploads/2023/03/palma-plaza-mayor-entrance.jpg";
    case Availability.Alcudia:
      return "https://static.seetheworld.com/image_uploader/photos/49/original/puerto-alcudia-mallorca-port-d-alcudia.jpg";
    case Availability.Manacor:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/18-10-29-Mallorca-Manacor-RalfR-DJI_0268.jpg/640px-18-10-29-Mallorca-Manacor-RalfR-DJI_0268.jpg";
    default:
      return "#ccc";
  }
};

const Places = () => {
  const filteredAvailability = Object.values(Availability).filter(
    (place) => place !== Availability.NotAvailable
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: 2,
      }}
    >
      {filteredAvailability.map((place, index) => (
        <Card
          key={index}
          sx={{
            width: 220,
            height: 220,
            margin: 2,
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
            backgroundImage: `url(${getBackgroundImageUrl(place)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                textAlign: "center",
                padding: 1,
                textShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
              }}
            >
              {place}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default Places;
