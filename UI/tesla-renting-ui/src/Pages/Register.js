import React from "react";
import { useHistory } from "react-router-dom";
import { RegisterUser } from "../Api/apiCalls";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from "@mui/material";

const RegisterModal = ({ open, setOpen }) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await RegisterUser(data);
      console.log("Rejestracja pomyślna");
      setOpen(false);
      history.push("/");
      reset();
    } catch (error) {
      console.error("Rejestracja nieudana:", error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const watchPassword = watch("password");

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Rejestracja</DialogTitle>
      <DialogContent>
        <Container
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            margin="normal"
            fullWidth
            label="Imię"
            {...register("firstName", { required: "To pole jest wymagane" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Nazwisko"
            {...register("lastName", { required: "To pole jest wymagane" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            type="date"
            label="Data urodzenia"
            InputLabelProps={{ shrink: true }}
            {...register("dateOfBirth", { required: "To pole jest wymagane" })}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            type="email"
            label="Email"
            {...register("email", {
              required: "To pole jest wymagane",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Nieprawidłowy adres email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="Hasło"
            {...register("password", {
              required: "To pole jest wymagane",
              minLength: {
                value: 6,
                message: "Hasło musi mieć co najmniej 6 znaków",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="Potwierdź hasło"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watchPassword || "Hasła nie są takie same",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Telefon"
            {...register("phone", { required: "To pole jest wymagane" })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Kraj"
            {...register("country", { required: "To pole jest wymagane" })}
            error={!!errors.country}
            helperText={errors.country?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Miasto"
            {...register("city", { required: "To pole jest wymagane" })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Ulica"
            {...register("street", { required: "To pole jest wymagane" })}
            error={!!errors.street}
            helperText={errors.street?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Kod pocztowy"
            {...register("postalCode", { required: "To pole jest wymagane" })}
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
          />
          <DialogActions>
            <Button onClick={handleClose}>Anuluj</Button>
            <Button type="submit" color="primary">
              Zarejestruj się
            </Button>
          </DialogActions>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
