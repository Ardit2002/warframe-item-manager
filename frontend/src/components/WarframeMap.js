import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS for styling
import L from 'leaflet';

const WarframeMap = () => {
    useEffect(() => {
        // This is to fix the default Leaflet marker icon issue in React apps
        const defaultIcon = new L.Icon({
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        L.Marker.prototype.options.icon = defaultIcon; // Set default marker
    }, []);

    return (
        <MapContainer
            center={[0, 0]} // Default center of the map (can adjust later)
            zoom={2} // Default zoom level
            style={{ height: "500px", width: "100%" }}
        >
            {/* TileLayer can be any map tiles (OpenStreetMap, etc.) */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Example of adding a marker with a popup */}
            <Marker position={[0, 0]}>
                <Popup>Warframe Farm Location</Popup>
            </Marker>

            {/* Add more markers as needed */}
            <Marker position={[1, 1]}>
                <Popup>Another Farm Location</Popup>
            </Marker>

        </MapContainer>
    );
};

export default WarframeMap;
