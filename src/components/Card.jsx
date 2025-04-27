import styles from "../css/card.module.css";
import { useState } from "react";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
const Card = ({ title, description, severity }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={`${styles.severity} ${styles[severity.toLowerCase()]}`}>
          {severity}
        </div>
        {isOpen ? (
          <img
            src={minus}
            alt="minus"
            className={styles.toggleIcon}
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <img
            src={plus}
            alt="plus"
            className={styles.toggleIcon}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
      <div className={styles.cardTitle}>{title}</div>
      {isOpen && <div className={styles.description}>{description}</div>}
    </div>
  );
};

export default Card;
