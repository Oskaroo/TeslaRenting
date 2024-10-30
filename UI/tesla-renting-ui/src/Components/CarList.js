import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAllCars } from "../Api/apiCalls";
import { mapAvailabilityToName } from "../Utils/AvailabilityMapping";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    GetAllCars()
      .then((data) => {
        const mappedCars = data.map((car) => ({
          id: car.id,
          title: car.name,
          place: car.availableAt,
        }));
        setCars(mappedCars);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  return (
    <div className="car-list">
      {cars.map((car) => (
        <div className="car-preview" key={car.id}>
          <Link to={`/cars/${car.id}`}>
            <h2>{car.title}</h2>
            <p>Available in {mapAvailabilityToName(car.place)}</p>{" "}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default CarList;
