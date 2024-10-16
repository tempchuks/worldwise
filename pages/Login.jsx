import { useNavigate } from "react-router";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { AuthContext } from "../src/contexts/AuthProvider";
import styles from "./Login.module.css";
import { useContext, useEffect, useState } from "react";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigator = useNavigate();
  useEffect(
    function () {
      if (isAuthenticated) navigator("/app");
    },
    [isAuthenticated, navigator]
  );
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button event={() => login(email, password)}>Login</Button>
        </div>
      </form>
    </main>
  );
}
