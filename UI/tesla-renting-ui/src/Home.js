import CarList from "./CarList";
import useFetch from "./UseFetch";

const Home = () => {
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

export default Home;
