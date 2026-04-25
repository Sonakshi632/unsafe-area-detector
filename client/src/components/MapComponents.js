import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function LocationMarker({ setLocation, setAddress }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      setPosition(e.latlng);
      setLocation(e.latlng);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        if (data.display_name) {
          setAddress(data.display_name);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return position ? <Marker position={position} /> : null;
}

const MapComponents = ({ setLocation, setAddress }) => {
  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={10}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker setLocation={setLocation} setAddress={setAddress} />
    </MapContainer>
  );
};

export default MapComponents;