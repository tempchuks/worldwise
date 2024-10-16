import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "./PageNav.module.css";
import Button from "./Button";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">
        <Logo />
      </NavLink>

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <Button>Login</Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
