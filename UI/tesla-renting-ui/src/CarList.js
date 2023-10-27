import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAllCars } from "./Api/apiCalls";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    GetAllCars()
      .then((data) => {
        // Map the data from the API to match the expected structure
        const mappedCars = data.map((car) => ({
          id: car.id,
          title: car.name, // Map "name" to "title"
          place: car.availableAt, // Map "availableAt" to "place"
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
            <p>Available in {car.place}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CarList;
