// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useContext, useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "./Spinner";
import Button from "./Button";
import { AppContext } from "../src/contexts/AppContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { setCities } = useContext(AppContext);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [emoji, setEmoji] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  useEffect(
    function () {
      try {
        setLoading(true);
        async function getdata() {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          setCityName(data.city || data.locality);
          setEmoji(() => convertToEmoji(data.countryCode));
          setCountry(data.countryName);

          setLoading(false);
        }
        getdata();
      } catch (error) {}
    },
    [lat, lng]
  );

  async function addCity() {
    setLoading(true);
    const cityData = {
      cityName,
      country,
      date,
      emoji,
      id: Date.now(),
      notes,
      position: { lat, lng },
    };

    try {
      const res = await fetch(`http://localhost:9100/cities`, {
        method: "POST",
        body: JSON.stringify(cityData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((c) => [...c, data]);
      setLoading(false);
    } catch (error) {}
    navigator(`/app`);
  }

  return loading ? (
    <Spinner />
  ) : (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button event={addCity}>Add</Button>
        <Button
          event={(e) => {
            e.preventDefault();
            navigator(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
