import { Grid2, Typography } from "@mui/material";
import CarList from "../Components/CarList";
import useFetch from "../Utils/UseFetch";

const Cars = () => {
  const {
    isPending,
    error,
    data: cars,
  } = useFetch(`http://localhost:5001/api/teslaCar`);

  return (
    <Grid2 className="home">
      {error && <Typography>{error}</Typography>}
      {isPending && <Typography>Loading...</Typography>}
      {cars && <CarList cars={cars} />}
    </Grid2>
  );
};

export default Cars;
