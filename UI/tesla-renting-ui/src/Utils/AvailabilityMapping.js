export const mapAvailabilityToName = (availability) => {
  switch (availability) {
    case 0:
      return "PalmaAirport";
    case 1:
      return "PalmaCityCenter";
    case 2:
      return "Alcudia";
    case 3:
      return "Manacor";
    case 4:
      return "NotAvailable";
    default:
      return "Unknown";
  }
};
