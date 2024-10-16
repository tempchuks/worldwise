import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import { useContext } from "react";
import { AppContext } from "../src/contexts/AppContext";
function CityList() {
  const { cities } = useContext(AppContext);

  return (
    <ul className={styles.cityList}>
      {cities?.map((v, i) => (
        <CityItem key={`${v.id}${i}`} citydata={v} />
      ))}
    </ul>
  );
}

export default CityList;
