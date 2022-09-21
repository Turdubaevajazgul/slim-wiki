import { t } from "i18next";
import Header from "../../components/header/Header";
import styles from "./PasswordRenew.module.scss";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function PasswordRenew() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setNotification("Please check your email");
        if (error) {
          setError(false);
        }
        setEmail("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>{t("forgotpassword.FORGOT_PASSWORD")}</h2>
        <form onSubmit={resetPassword}>
          <div className={styles.control}>
            <label htmlFor="email">{t("loginPage.Email")}</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              className={styles.control__input}
              value={email}
            />
            {notification && <p className={styles.notification}>{notification}</p>}
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <div className={styles.control_button}>
            <button className={styles.control__sign}>{t("forgotpassword.RESET_PASSWORD")}</button>
          </div>
        </form>
      </div>
    </>
  );
}
