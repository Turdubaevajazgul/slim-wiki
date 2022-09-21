import css from "./UserSettings.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const local = JSON.parse(localStorage.getItem("todos"));

export default function UserSettings({ img }) {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(local || []);
  const [select, setSelect] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      todo: todo,
      img: img,
      select: select
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };
  const deleteTodo = (id) => {
    const newList = todos.filter((todo) => todo.id !== id);
    setTodos(newList);
  };
  const submit = (event) => {
    event.preventDefault();
    setInputValue("");
    setSelect("");
  };
  return (
    <div className={css.container}>
      <h1>Account Settings</h1>
      <div className={css.navigate}>
        <div className={css.general}>
          <a href="">General</a>
        </div>
        <div className={css.users}>
          <a href="">Users</a>
        </div>
        <div className={css.teams}>
          <a href="">Teams</a>
        </div>
        <div className={css.subs}>
          <a href="">Subscription</a>
        </div>
        <div className={css.integrat}>
          <a href="">Integrations</a>
        </div>
      </div>
      <div className={css.register}>
        <h2>Invite New User</h2>
        <div className={css.form}>
          <form onSubmit={submit} className={css.signUp}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="email@example.com"
            />
            <select value={select} onChange={(e) => setSelect(e.target.value)}>
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
            </select>
          </form>
          <button onClick={() => addTodo(inputValue, select)}>Invite</button>
        </div>
      </div>
      <div className={css.footer}>
        <h2>Current Users</h2>
        <div className={css.curUsers}>
          <img className={css.avatar} src={img || "images/AccountSetUser/avataruser.png"} alt="" />
          <div className={css.todolist}>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.todo}
                {todo.img}
                <span>{todo.select}</span>
                <div className={css.BtnEdit}>
                  <Link to="/EditPage" className={css.btn}>
                    Edit
                  </Link>
                  <button className={css.btn} onClick={() => deleteTodo(todo.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
