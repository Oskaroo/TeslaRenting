const Places = () => {
  const places = ["PalmaAirport", "PalmaCityCenter", "Alcudia", "Manacor"];

  return (
    <div className="places-container">
      {places.map((place, index) => (
        <div className={`place-card ${place}`} key={index}>
          {place}
        </div>
      ))}
    </div>
  );
};

export default Places;
