import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
function AppLayout({ cities }) {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map cities={cities} />
    </div>
  );
}

export default AppLayout;
