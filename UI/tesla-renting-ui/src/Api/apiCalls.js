import Axios from "axios";

const api = `http://localhost:5001`;

export const apiAxiosInstance = Axios.create({ baseURL: api });

apiAxiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiT3NrYXIgTWljaGFsc2tpIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJEYXRlT2ZCaXJ0aCI6IjE5OTktMDYtMjEiLCJleHAiOjE2OTk3MzExODgsImlzcyI6Imh0dHA6Ly9yZXN0YXVyYW50YXBpLmNvbSIsImF1ZCI6Imh0dHA6Ly9yZXN0YXVyYW50YXBpLmNvbSJ9.-wpIuuSxo4JyAv4CDz6WKo3Os_DtsvlqT1jZ6W0GhWo`;

export const GetAllCars = () => {
  return fetch("http://localhost:5001/api/teslaCar", {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch cars - ${response.status}`);
    }
    return response.json();
  });
};
export const AddReservation = (carData) => {
  return apiAxiosInstance.post("/api/reservation", carData).then((response) => {
    if (response.status !== 201) {
      throw new Error(`Failed to add reservation - ${response.status}`);
    }
    return response.data;
  });
};
