import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useContext } from "react";
import { AppContext } from "../src/contexts/AppContext";
function CountryList() {
  const { cities: country } = useContext(AppContext);
  if (country.length === 0) return;
  const countries = country.reduce((arr, cur) => {
    if (arr.map((el) => el.country).includes(cur.country)) return arr;
    else return [...arr, { country: cur.country, emoji: cur.emoji }];
  }, []);
  console.log(country);
  return (
    <ul className={styles.countryList}>
      {countries.map((v, i) => (
        <CountryItem country={v} key={`${v.country}${i}`} />
      ))}
    </ul>
  );
}

export default CountryList;
