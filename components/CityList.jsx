import styles from "./CityList.module.css";
import CityItem from "./CityItem";
function CityList({ cities, setCities }) {
  return (
    <ul className={styles.cityList}>
      {cities.map((v, i) => (
        <CityItem
          key={`${v.id}${i}`}
          citydata={v}
          cities={cities}
          setCities={setCities}
        />
      ))}
    </ul>
  );
}

export default CityList;
