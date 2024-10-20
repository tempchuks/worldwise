import { useNavigate, useParams } from "react-router";
import styles from "./City.module.css";
import { useContext, useEffect, useState } from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import { AppContext } from "../src/contexts/AppContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { isLoading, setIsLoading } = useContext(AppContext);
  const [currentCity, setCurrentCity] = useState({});
  const { cityName, emoji, date, notes } = currentCity;
  const { id } = useParams();
  if (!id) return;
  const navigate = useNavigate();
  useEffect(
    function () {
      setIsLoading(true);
      async function getdata() {
        const res = await fetch(`http://localhost:9100/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
        setIsLoading(false);
      }
      getdata();
    },
    [setIsLoading, setCurrentCity, id]
  );
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <button onClick={() => navigate(-1)}>back</button>
    </div>
  );
}

export default City;
