import styles from "./Button.module.css";
function Button({ children, type, event }) {
  return (
    <button
      onClick={event}
      className={`${styles.btn} ${styles.primary} ${type && styles.position}`}
    >
      {children}
    </button>
  );
}

export default Button;
