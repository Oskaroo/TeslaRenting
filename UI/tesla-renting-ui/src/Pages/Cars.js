import CarList from "../Components/CarList";
import useFetch from "../Utils/UseFetch";

const Cars = () => {
  const {
    isPending,
    error,
    data: cars,
  } = useFetch(`http://localhost:5001/api/teslaCar`); // Updated URL

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {cars && <CarList cars={cars} />}
    </div>
  );
};

export default Cars;
