import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Button, Container, Grid2 } from "@mui/material";
import { useInView } from "react-intersection-observer";
import News from "../newsData.json";
import CreateReservationModal from "../Components/CreateReservationModal";

const Home = () => {
  const [data, setData] = useState(null);
  const [openReservationModal, setOpenReservationModal] = useState(false);

  useEffect(() => {
    setData(News);
  }, []);
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: featureRef, inView: featureInView } = useInView({
    triggerOnce: true,
  });
  const { ref: newsRef, inView: newsInView } = useInView({ triggerOnce: true });

  const handleOpenReservationModal = () => {
    setOpenReservationModal(true);
  };

  const handleCloseReservationModal = () => {
    setOpenReservationModal(false);
  };

  return (
    <Container>
      <Box
        ref={heroRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          opacity: heroInView ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" gutterBottom>
          Przemierzaj trasy z Tesla Renting
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Niesamowity komfort, ponad 50 stacji ładowania, podróżuj bez
          ograniczeń!
        </Typography>
        <Button
          onClick={handleOpenReservationModal}
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3 }}
        >
          Zarezerwuj Teslę już teraz
        </Button>
      </Box>

      <Box
        ref={featureRef}
        sx={{
          py: 8,
          textAlign: "center",
          opacity: featureInView ? 1 : 0,
          transform: featureInView ? "none" : "translateY(50px)",
          transition: "all 1s ease-in-out",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dlaczego warto wybrać nas?
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
        >
          Przekonaj się, co sprawia, że jazda Teslą to nie tylko podróż, ale i
          wyjątkowe doświadczenie. Oferujemy najwyższy komfort, łatwy dostęp do
          stacji ładowania i ekologiczne rozwiązania.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box p={3} sx={{ backgroundColor: "#e0f7fa", borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Komfort i Styl
              </Typography>
              <Typography color="textSecondary">
                Nasze Tesle oferują najwyższy komfort jazdy i najnowsze
                technologie.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box p={3} sx={{ backgroundColor: "#e0f7fa", borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Łatwy Dostęp
              </Typography>
              <Typography color="textSecondary">
                Ponad 50 stacji ładowania w całej Hiszpanii, podróżuj bez
                przeszkód.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box p={3} sx={{ backgroundColor: "#e0f7fa", borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Ekologiczna Jazda
              </Typography>
              <Typography color="textSecondary">
                Zmniejsz emisję CO₂ i dbaj o środowisko z każdym przejechanym
                kilometrem.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        ref={newsRef}
        sx={{
          py: 8,
          textAlign: "center",
          opacity: newsInView ? 1 : 0,
          transform: newsInView ? "none" : "translateY(50px)",
          transition: "all 1s ease-in-out",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Aktualności
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
        >
          Bądź na bieżąco z najnowszymi wydarzeniami i informacjami o naszej
          flocie Tesla, stacjach ładowania i promocjach.
        </Typography>
        <Grid2 container spacing={4} justifyContent="center">
          {data &&
            data.map((newsItem) => (
              <Grid2 item xs={12} sm={6} md={4} key={newsItem.id}>
                <Link
                  to={`/post/${newsItem.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    p={3}
                    sx={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 2,
                      boxShadow: 3,
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <Typography variant="h6" color="primary" gutterBottom>
                      {newsItem.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {newsItem.description ||
                        "Zobacz więcej na temat nowości i wydarzeń związanych z naszą firmą."}
                    </Typography>
                  </Box>
                </Link>
              </Grid2>
            ))}
        </Grid2>
        <CreateReservationModal
          open={openReservationModal}
          handleClose={handleCloseReservationModal}
        />
      </Box>
    </Container>
  );
};

export default Home;
