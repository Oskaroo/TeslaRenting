import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AddReservation, GetAllCars } from "./Api/apiCalls";

const Create = () => {
  const [carData, setCarData] = useState({
    TeslaCarId: 1,
    StartDate: new Date().toISOString().slice(0, 10),
    EndDate: new Date().toISOString().slice(0, 10),
    UserId: 1,
    AvailableAt: 0, // Domyślne miejsce to PalmaAirport (0)
  });

  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const [cars, setCars] = useState([]); // Lista dostępnych samochodów

  useEffect(() => {
    // Pobierz listę dostępnych samochodów po załadowaniu komponentu
    GetAllCars(carData.AvailableAt)
      .then((data) => {
        console.log("Dane z API:", data);
        setCars(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania samochodów:", error);
      });
  }, [carData.AvailableAt]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
    console.log("Zmiana wartości pola:", name, value, carData);
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
      <h2>Dodaj rezerwację</h2>
      <form onSubmit={handleSubmit}>
        <label>Miejsce:</label>
        <select
          name="AvailableAt"
          value={carData.AvailableAt}
          onChange={handleInputChange}
        >
          <option value={0}>Palma Airport</option>
          <option value={1}>Palma City Center</option>
          <option value={2}>Alcudia</option>
          <option value={3}>Manacor</option>
        </select>
        <label>Model samochodu:</label>
        <select
          name="TeslaCarId"
          value={carData.TeslaCarId}
          onChange={handleInputChange}
        >
          {cars
            .filter((car) => car.AvailableAt === carData.AvailableAt)
            .map((car) => (
              <option key={car.id} value={car.id}>
                {car.Name}
              </option>
            ))}
        </select>
        <label>Data rozpoczęcia:</label>
        <input
          type="date"
          name="StartDate"
          required
          value={carData.StartDate}
          onChange={handleInputChange}
        />
        <label>Data zakończenia:</label>
        <input
          type="date"
          name="EndDate"
          required
          value={carData.EndDate}
          onChange={handleInputChange}
        />
        <label>ID użytkownika:</label>
        <input
          type="number"
          name="UserId"
          required
          value={carData.UserId}
          onChange={handleInputChange}
        />
        {!isPending && <button>Dodaj rezerwację</button>}
        {isPending && <button disabled>Dodawanie samochodu...</button>}
      </form>
    </div>
  );
};

export default Create;
