import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mapLocations from "../data/mapLocations";

// Custom Icons
const icons = {
    City: L.icon({ iconUrl: "/icons/city.png", iconSize: [32, 32] }),
    Fishing: L.icon({ iconUrl: "/icons/fish.png", iconSize: [32, 32] }),
    Mining: L.icon({ iconUrl: "/icons/pickaxe.png", iconSize: [32, 32] }),
    Bounty: L.icon({ iconUrl: "/icons/bounty.png", iconSize: [32, 32] }),
};

const MapComponent = () => {
    const position = [-62.0, 44.0]; // Map center

    // Filter state
    const [filters, setFilters] = useState({
        City: true,
        Fishing: true,
        Mining: true,
        Bounty: true,
    });

    // Toggle filter checkboxes
    const handleFilterChange = (type) => {
        setFilters({ ...filters, [type]: !filters[type] });
    };

    return (
        <div>
            {/* Filter Checkboxes */}
            <div className="mb-4">
                {Object.keys(filters).map((type) => (
                    <label key={type} className="mr-4">
                        <input
                            type="checkbox"
                            checked={filters[type]}
                            onChange={() => handleFilterChange(type)}
                            className="mr-1"
                        />
                        {type}
                    </label>
                ))}
            </div>

            {/* Map */}
            <MapContainer center={position} zoom={5} style={{ height: "500px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Markers with Custom Icons */}
                {mapLocations
                    .filter((location) => filters[location.type]) // Apply filters
                    .map((location) => (
                        <Marker key={location.id} position={location.coordinates} icon={icons[location.type]}>
                            <Popup>
                                <strong>{location.name}</strong> <br />
                                Type: {location.type}
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
