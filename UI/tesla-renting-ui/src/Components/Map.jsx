import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [41, 41],
});

const center = [39.5696, 2.6502];

const locations = [
  { position: [39.5696, 2.6502], title: "Palma Airport" },
  { position: [39.7101, 3.0176], title: "Alcudia" },
  { position: [39.5512, 2.6267], title: "Palma City Center" },
];

const Map = () => (
  <MapContainer
    center={center}
    zoom={10}
    style={{ width: "100%", height: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {locations.map((location, index) => (
      <Marker key={index} position={location.position} icon={customIcon}>
        <Popup>{location.title}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default Map;
