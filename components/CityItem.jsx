import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useState } from "react";
import Spinner from "./Spinner";
function CityItem({ citydata, setCities, cities }) {
  const [loading, setLoading] = useState(false);

  async function onDeletecity(e) {
    setLoading(true);
    e.preventDefault();
    await fetch(`http://localhost:9100/cities/${citydata.id}`, {
      method: "DELETE",
    });
    const newdata = cities.filter((v) => {
      return v.id !== citydata.id;
    });

    setCities(newdata);
    setLoading(false);
  }
  if (loading) return <Spinner />;
  return (
    <Link
      className={styles.cityItem}
      to={`${citydata.id}?lat=${citydata.position.lat}&lng=${citydata.position.lng}`}
    >
      <span className={styles.emoji}>{citydata.emoji}</span>
      <h3 className={styles.name}>{citydata.cityName}</h3>
      <time className={styles.date}>
        ({" "}
        {new Date(citydata.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        )
      </time>
      <button onClick={onDeletecity} className={styles.deleteBtn}>
        X
      </button>
    </Link>
  );
}

export default CityItem;
