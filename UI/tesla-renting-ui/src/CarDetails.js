import { useHistory, useParams } from "react-router-dom";
import useFetch from "./UseFetch";
const CarDetails = () => {
  const { id } = useParams();
  const {
    data: car,
    error,
    isPending,
  } = useFetch("http://localhost:8001/cars/" + id);
  const history = useHistory();
  const handleClick = () => {
    fetch(`http://localhost:8001/cars/` + car.id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="car-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {car && (
        <article>
          <h2>{car.title}</h2>
          <p>Available at {car.place}</p>
          <div>{car.body}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default CarDetails;
