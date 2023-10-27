import { Link } from "react-router-dom/cjs/react-router-dom";
const CarList = ({ cars }) => {
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
