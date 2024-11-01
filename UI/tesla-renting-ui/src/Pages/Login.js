import React from "react";
import { useHistory } from "react-router-dom";
import { LoginUser } from "../Api/apiCalls";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

function LoginModal({ open, setOpen, handleLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const onFormSubmit = async (data) => {
    try {
      await LoginUser(data);
      handleLogin();
      history.push("/");
      setOpen(false);
    } catch (error) {
      console.error("Logowanie nieudane:", error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Logowanie</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            {...register("Email", {
              required: "Email jest wymagany",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Nieprawidłowy adres email",
              },
            })}
            error={!!errors.Email}
            helperText={errors.Email?.message}
          />
          <TextField
            margin="dense"
            label="Hasło"
            type="password"
            fullWidth
            variant="outlined"
            {...register("Password", {
              required: "Hasło jest wymagane",
              minLength: {
                value: 5,
                message: "Hasło musi mieć co najmniej 5 znaków",
              },
            })}
            error={!!errors.Password}
            helperText={errors.Password?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button type="submit" color="primary">
            Zaloguj
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default LoginModal;
