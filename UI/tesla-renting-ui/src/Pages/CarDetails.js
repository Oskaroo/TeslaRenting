import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import { mapAvailabilityToName } from "../Utils/AvailabilityMapping";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Box,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCarImageUrl } from "../Components/CarList";
import CreateReservationModal from "../Components/CreateReservationModal";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:5001/api/teslaCar/${id}`)
      .then((response) => {
        setCar(response.data);
        setIsPending(false);
      })
      .catch((error) => {
        setError("Error fetching car details: " + error.message);
        setIsPending(false);
      });
  }, [id]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      {isPending && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {car && (
        <Card raised>
          <CardMedia
            component="img"
            height="260"
            image={getCarImageUrl(car.name)}
            alt={car.name}
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {car.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Dostępny w: {mapAvailabilityToName(car.availableAt)}
            </Typography>
            <Typography variant="body2" component="p" sx={{ my: 2 }}>
              {car.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
              sx={{ ml: 2 }}
              onClick={() => setOpenModal(true)}
            >
              Rezerwuj
            </Button>
          </CardContent>
        </Card>
      )}
      <CreateReservationModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default CarDetails;
