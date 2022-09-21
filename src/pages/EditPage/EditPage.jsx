import css from "./EditPage.module.scss";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/dashboardHeader/DashboardHeader";
import { useState } from "react";
function EditPage() {
  const [select, setSelect] = useState(false);

  const onEdit = (select) => {
    setSelect(!select);
  };
  const saveSubmit = (e) => {
    e.preventDefault();
    setSelect(false);
  };

  return (
    <>
      <DashboardHeader />
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
          <div className={css.integrat}>
            <a href="">Integrations</a>
          </div>
        </div>
        <div className={css.register}>
          <h2>Edit User</h2>
          <form className={css.signUp}>
            <div className={css.formGroup}>
              <label className={css.label}>Full name</label>
              <input
                type="text"
                // onFocus="this.form.submit.disabled=0"
                placeholder="e.g. John Doe"
                disabled
              />
            </div>
            <div className={css.formGroup}>
              <form onSubmit={saveSubmit}>
                <label className={css.label}>Role</label>
                <select value={select} onChange={(e) => setSelect(e.target.value)}>
                  <option value="viewer">viewer</option>
                  <option value="editor">editor</option>
                </select>
              </form>
            </div>
            <Link to="/vhdbcsdcb" type="submit" onClick={onEdit} className={css.btnSave}>
              Save {select}
            </Link>
            <Link to="/vhdbcsdcb" className={css.btnBack}>
              Back
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default EditPage;
