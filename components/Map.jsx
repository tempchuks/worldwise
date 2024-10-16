import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  useMapEvents,
  TileLayer,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";

import { useSearchParams } from "react-router-dom";
import User from "./User";

function Map({ cities, loading }) {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { isLoading, error, position, getPosition } = useGeolocation();
  const [markerPosition, setMarkerPosition] = useState([50.44, -1.86]); // Initial marker position
  const [post, setPos] = useState(false);
  const navigate = useNavigate();
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return null;
  };
  useEffect(
    function () {
      if (!(position.lng && position.lat)) return;

      setMarkerPosition(() => [position.lat, position.lng]);
      setPos(true);
    },
    [position]
  );
  useEffect(
    function () {
      if (!(lng && lat)) return;
      setMarkerPosition(() => [lat, lng]);
    },
    [lat, lng]
  );
  return (
    <div className={styles.mapContainer}>
      <User />
      {!post && (
        <Button event={getPosition} type="position">
          {isLoading ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer center={markerPosition} zoom={13} className={styles.map}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {cities?.map((v, i) => (
          <Marker
            key={`marker${i}`}
            position={[v.position.lat, v.position.lng]}
          >
            <Popup>
              <span>{v.emoji}</span>
              <h3>{v.cityName}</h3>
            </Popup>
          </Marker>
        ))}
        <MapClickHandler />
        <ChangeCenter position={markerPosition} />
      </MapContainer>
    </div>
  );
}

function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);

  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, error, position, getPosition };
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
export default Map;
