import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { AddReservation, GetAllCars } from "../Api/apiCalls";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

export const Availability = {
  PalmaAirport: "Lotnisko Palma",
  PalmaCityCenter: "Centrum Palma",
  Alcudia: "Alcudia",
  Manacor: "Manacor",
};

const CreateReservationModal = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      StartDate: new Date().toISOString().slice(0, 10),
      EndDate: new Date().toISOString().slice(0, 10),
      UserId: 1,
      Place: Availability.PalmaAirport,
    },
  });
  const [cars, setCars] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    GetAllCars()
      .then((data) => {
        setCars(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania samochodów:", error);
      });
  }, [watch("Place")]);

  const onSubmit = async (data) => {
    try {
      //await AddReservation(data);
      console.log("Rezerwacja dodana pomyślnie");
      handleClose();
    } catch (error) {
      console.error("Błąd podczas dodawania rezerwacji:", error.message);
    }
  };

  const placeWatch = watch("Place");
  const placeIndex = Object.keys(Availability).indexOf(placeWatch);
  const filteredCars = cars.filter((car) => car.availableAt === placeIndex);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Tworzenie rezerwacji</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="place-label">Miejsce</InputLabel>
            <Select
              labelId="place-label"
              {...register("Place", {
                required: "Pole 'Miejsce' jest wymagane",
              })}
              label="Miejsce"
              error={!!errors.Place}
            >
              {Object.entries(Availability).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {errors.Place && (
              <p style={{ color: "red" }}>{errors.Place.message}</p>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="car-model-label">Model samochodu</InputLabel>
            <Select
              labelId="car-model-label"
              {...register("TeslaCarId", {
                required: "Pole 'Model samochodu' jest wymagane",
              })}
              label="Model samochodu"
              error={!!errors.TeslaCarId}
            >
              {filteredCars.map((car) => (
                <MenuItem key={car.id} value={car.id}>
                  {car.name}
                </MenuItem>
              ))}
            </Select>
            {errors.TeslaCarId && (
              <p style={{ color: "red" }}>{errors.TeslaCarId.message}</p>
            )}
          </FormControl>
          <TextField
            margin="normal"
            label="Data rozpoczęcia"
            type="date"
            fullWidth
            {...register("StartDate", { required: true })}
            InputLabelProps={{ shrink: true }}
            error={!!errors.StartDate}
            helperText={
              errors.StartDate && "Pole 'Data rozpoczęcia' jest wymagane"
            }
          />
          <TextField
            margin="normal"
            label="Data zakończenia"
            type="date"
            fullWidth
            {...register("EndDate", { required: true })}
            InputLabelProps={{ shrink: true }}
            error={!!errors.EndDate}
            helperText={
              errors.EndDate && "Pole 'Data zakończenia' jest wymagane"
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button type="submit" variant="contained" color="primary">
            Dodaj rezerwację
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateReservationModal;
