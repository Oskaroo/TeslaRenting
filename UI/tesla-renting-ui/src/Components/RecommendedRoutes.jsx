// RecommendedRoutes.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const recommendedRoutes = [
  {
    title: "Trasa górska Tramuntana",
    description: "Przepiękna trasa wzdłuż gór Tramuntana.",
    image:
      "https://www.rutasyrutinas.com/wp-content/uploads/2018/04/sa-calobra-tramuntana-7.jpg",
  },
  {
    title: "Jaskinie Drach",
    description: "Odwiedź słynne jaskinie Drach.",
    image:
      "https://www.posadaterrasanta.com/wp-content/uploads/2024/10/cuevas_del_drach_posada_terra_santa-2048x1010.jpg",
  },
  {
    title: "Alcudia i okolice",
    description:
      "Relaks na plażach Alcudii i odkrywanie piękna północnej Majorki.",
    image:
      "https://www.beachlike.com/thumbnail/aHR0cHM6Ly93d3cuYmVhY2hsaWtlLmNvbS9maWxlcy9waG90b3MvcGxhY2UvMTQzOC02NzA1OWNhNWFmM2E5OTI5NDVkYzIyMTdhZWE3ZTkyODI4NGM5ZTFjLmpwZw==/580/400/2/0/thumbnail.jpg", // Plaże Alcudii
  },
  {
    title: "Cap de Formentor",
    description: "Spektakularne widoki z klifów Cap de Formentor.",
    image: "https://www.cestee.pl/images/27/27/72727-920w.webp",
  },
];

const RecommendedRoutes = () => {
  const [open, setOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleOpen = (route) => {
    setSelectedRoute(route);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoute(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Polecane trasy na Majorce
      </Typography>
      {recommendedRoutes.map((route, index) => (
        <Card onClick={() => handleOpen(route)} sx={{ cursor: "pointer" }}>
          <CardMedia
            component="img"
            height="140"
            image={route.image}
            alt={route.title}
          />
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold">
              {route.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {route.description}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            maxWidth: 500,
            margin: "auto",
            mt: 10,
          }}
        >
          {selectedRoute && (
            <>
              <Typography variant="h5" gutterBottom>
                {selectedRoute.title}
              </Typography>
              <img
                src={selectedRoute.image}
                alt={selectedRoute.title}
                style={{ width: "100%", borderRadius: 8 }}
              />
              <Typography variant="body1" mt={2}>
                {selectedRoute.description}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default RecommendedRoutes;
