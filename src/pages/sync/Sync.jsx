import Header from "../../components/header/Header";
import css from "./Sync.module.scss";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../reduxToolkit/slices/userSlice";
import { useDispatch } from "react-redux/es/exports";
const Sync = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState(user.displayName);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const email = user.email;
  const data = {
    name: name,
    email: email,
    companyName: companyName
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userFind = users.some((user) => user.companyName === companyName);
    if (userFind) {
      setError("has already been taken");
      setCompanyName("");
    } else {
      db.collection("users")
        .doc()
        .set({ ...data, userId: user.uid });
      dispatch(
        setUser({
          id: user.uid,
          name: data.name,
          email: data.email,
          companyName: data.companyName
        })
      );
      navigate("/" + companyName);
      setCompanyName("");
      setName("");
    }
  };
  return (
    <>
      <Header />
      <div className={css.container}>
        <h2>ALMOST THERE...</h2>
        <form onSubmit={handleSubmit}>
          <div className={css.control}>
            <label htmlFor="text">Company Name</label>
            <input
              type="text"
              className={css.control__input}
              onChange={(e) => setCompanyName(e.target.value)}
              setCompanyName={companyName}
            />
          </div>
          <div className={css.control}>
            <label htmlFor="text">Your Name</label>
            <input
              type="text"
              className={css.control__input}
              onChange={(e) => setName(e.target.value)}
              placeholder={user.displayName}
              value={name}
            />
          </div>
          <div className={css.control}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className={css.control__input}
              placeholder={email}
              readonly="readonly"
            />
          </div>
          {error && <p className={css.error}>{error}</p>}
          <div className={css.control_button}>
            <button className={css.control__sign}>OK, LET'S GO!</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Sync;
