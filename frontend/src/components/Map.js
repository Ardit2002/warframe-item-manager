import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WarframeMap = () => {
  const defaultPosition = [0, 0]; // Default coordinates, update this later

  return (
    <MapContainer
      center={defaultPosition}
      zoom={3}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={defaultPosition}>
        <Popup>Default Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default WarframeMap;
