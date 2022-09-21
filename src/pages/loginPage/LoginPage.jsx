import { Link, useNavigate } from "react-router-dom";
import css from "./LoginPage.module.scss";
import { useTranslation } from "react-i18next";
import "../../i18next";
import Header from "../../components/header/Header";
import { useState } from "react";
import { setUser } from "../../reduxToolkit/slices/userSlice";
import { useDispatch } from "react-redux/es/exports";
import { db } from "../../firebase/firebase-config";
import { useEffect } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  GithubAuthProvider
} from "firebase/auth";

function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    db.collection("users")
      .get()
      .then((snapshot) => {
        const usersArr = [];
        snapshot.forEach((doc) => {
          usersArr.push({ ...doc.data(), id: doc.id });
        });
        setUsers(usersArr);
      });
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    setEmail("");
    setPass("");
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        const userFind = users.find((el) => el.userId === user.uid);
        dispatch(
          setUser({
            id: user.uid,
            name: userFind.name,
            email: user.email,
            companyName: userFind.companyName
          })
        );
        users.forEach((user) =>
          user.userId !== user.uid ? navigate("/sync") : navigate("/sync_with_account")
        );
        if (checkBox) {
          const userFind = users.find((el) => el.userId === user.uid);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, name: userFind.name, companyName: userFind.companyName })
          );
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const facebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then(({ user }) => {
        const findUser = users.find((info) => info.userId === user.uid);
        dispatch(
          setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            companyName: findUser.companyName
          })
        );
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, name: user.displayName, companyName: findUser.companyName })
        );
        console.log(findUser);
        navigate("/" + findUser.companyName);
      })
      .catch((error) => {
        setEmail("");
        setPass("");
        setError(error.message);
      });
  };

  const githubLogin = async () => {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider)
      .then(({ user }) => {
        const findUser = users.find((info) => info.userId === user.uid);
        dispatch(
          setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            companyName: findUser.companyName
          })
        );
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, name: user.displayName, companyName: findUser.companyName })
        );
        console.log(findUser);
        navigate("/" + findUser.companyName);
      })
      .catch((error) => {
        setEmail("");
        setPass("");
        setError(error.message);
      });
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(({ user }) => {
        const findUser = users.find((info) => info.userId === user.uid);
        dispatch(
          setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            companyName: findUser.companyName
          })
        );
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, name: user.displayName, companyName: findUser.companyName })
        );
        console.log(findUser);
        navigate("/" + findUser.companyName);
      })
      .catch((error) => {
        setEmail("");
        setPass("");
        setError(error.message);
      });
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className={css.login__forms}>
          <h2>{t("loginPage.SIGN_IN")}</h2>
          <div className={css.login__links}>
            <div className={css.link__facebook} onClick={facebookLogin}>
              <img src="./shared/img/facebook.svg" alt="facebook" />
              <span>{t("loginPage.facebook")}</span>
            </div>
            <div className={css.link__github} onClick={githubLogin}>
              <img src="./shared/img/git.svg" alt="github" />
              <span>{t("loginPage.github")}</span>
            </div>
            <div className={css.link__google} onClick={googleLogin}>
              <img src="./shared/img/google.svg" alt="google" />
              <span>{t("loginPage.google")}</span>
            </div>
          </div>
          <div className={css.line}>
            <span>{t("loginPage.OR")}</span>
          </div>
          <form onSubmit={handleLogin} action="#">
            <div className={css.control}>
              <label htmlFor="email">{t("loginPage.Email")}</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={css.control__input}
              />
            </div>
            <div className={css.control}>
              <label htmlFor="psw">{t("loginPage.password")}</label>
              <input
                type="password"
                name="psw"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className={css.control__input}
              />
            </div>
            {error && <p className={css.error}>{error}</p>}
            <div className={css.login__submit}>
              <div>
                <input type="checkbox" onClick={() => setCheckBox(!checkBox)} />
                <span className={css.login__text}>{t("loginPage.Remember_me")}</span>
              </div>
              <Link to="/password_renew" className={css.login__text}>
                {t("loginPage.forgot_psw")}
              </Link>
            </div>
            <div className={css.control}>
              <button className={css.control__sign}>{t("loginPage.SIGN_IN")}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
