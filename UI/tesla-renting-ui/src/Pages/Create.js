import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AddReservation, GetAllCars } from "../Api/apiCalls";

const Create = () => {
  const [carData, setCarData] = useState({
    TeslaCarId: 1,
    StartDate: new Date(),
    EndDate: new Date(),
    UserId: 1,
    Place: "PalmaAirport", // Domyślne miejsce
  });

  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const [cars, setCars] = useState([]); // Lista dostępnych samochodów

  useEffect(() => {
    // Pobierz listę dostępnych samochodów po załadowaniu komponentu
    GetAllCars(carData.Place)
      .then((data) => {
        setCars(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania samochodów:", error);
      });
  }, [carData.Place]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });

    // Pobierz nową listę samochodów na podstawie wybranego miejsca
    GetAllCars(value)
      .then((data) => {
        setCars(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania samochodów:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    AddReservation(carData)
      .then((reservation) => {
        console.log("Dodano nową rezerwację");
        setIsPending(false);
        history.push("/");
      })
      .catch((error) => {
        console.error("Błąd podczas dodawania rezerwacji: ", error);
        setIsPending(false);
      });
  };

  return (
    <div className="create">
      <h2>Create Reservation</h2>
      <form onSubmit={handleSubmit}>
        <label>Place:</label>
        <select name="Place" value={carData.Place} onChange={handleInputChange}>
          <option value="PalmaAirport">Palma Airport</option>
          <option value="PalmaCityCenter">Palma City Center</option>
          <option value="Alcudia">Alcudia</option>
          <option value="Manacor">Manacor</option>
        </select>
        <label>Car Model:</label>
        <select
          name="TeslaCarId"
          value={carData.TeslaCarId}
          onChange={handleInputChange}
        >
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
        <label>Start date:</label>
        <input
          type="date"
          name="StartDate"
          required
          value={carData.StartDate}
          onChange={handleInputChange}
        />
        <label>End date:</label>
        <input
          type="date"
          name="EndDate"
          required
          value={carData.EndDate}
          onChange={handleInputChange}
        />
        <label>UserID:</label>
        <input
          type="number"
          name="UserId"
          required
          value={carData.UserId}
          onChange={handleInputChange}
        />
        {!isPending && <button>Add Reservation</button>}
        {isPending && <button disabled>Adding reservation ...</button>}
      </form>
    </div>
  );
};

export default Create;
