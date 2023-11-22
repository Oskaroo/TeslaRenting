import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import { mapAvailabilityToName } from "../Utils/AvailabilityMapping";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const history = useHistory();

  useEffect(() => {
    // Axios GET request to fetch car details
    Axios.get(`http://localhost:5001/api/teslaCar/${id}`)
      .then((response) => {
        setCar(response.data); // Assuming the response contains the car details
        setIsPending(false);
      })
      .catch((error) => {
        setError("Error fetching car details: " + error.message);
        setIsPending(false);
      });
  }, [id]);

  const handleDelete = () => {
    Axios.delete(`http://localhost:5001/api/teslaCar/${id}`)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      });
  };

  return (
    <div className="car-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {car && (
        <article>
          <h2>{car.name}</h2>
          <p>Available at {mapAvailabilityToName(car.availableAt)}</p>{" "}
          {/* Use the mapping function */}
          <div>{car.description}</div>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default CarDetails;
