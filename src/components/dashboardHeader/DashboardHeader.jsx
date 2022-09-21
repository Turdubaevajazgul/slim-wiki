import css from "./DashboardHeader.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../reduxToolkit/slices/userSlice";

export default function DashboardHeader() {
  const [isSearch, setIsSearch] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companyName = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    dispatch(removeUser());
    navigate("/");
  };
  return (
    <div className={css.sticky}>
      <div className={css.header}>
        <div className={css.header_body}>
          <Link to="/" className={css.logo}>
            <img src="/shared/img/logo.png" alt="logo" className={css.slim_logo} />
          </Link>
          <div className={css.icons_container}>
            <div className={isSearch ? css.search_box_active : css.search_box}>
              <img
                src="/images/dashboard_header/lupa.png"
                alt="logo"
                className={css.isSearch ? css.search_btn_active : css.search_btn}
                onClick={() => setIsSearch(!isSearch)}
              />
              <input
                type="text"
                className={isSearch ? css.search_txt_active : css.search_txt}
                placeholder="Type to search"
              />
            </div>
            <div className={css.settings_box}>
              <img
                src="/images/dashboard_header/settings.png"
                alt="logo"
                className={isSettings ? css.settings_icon : css.settings_icon_reverse}
                onClick={() => setIsSettings(!isSettings)}
              />
            </div>
          </div>
        </div>
        {isSettings ? (
          <div className={css.modal_container}>
            <div className={css.modal}>
              <ul>
                <li className={css.content_wrapper}>
                  <div className={css.active}>
                    <div className={css.active_hover}>
                      <Link
                        to={"/personal_area/" + companyName.companyName}
                        className={css.modal_text}
                      >
                        <img
                          src="/images/dashboard_modal_header/home.png"
                          className={css.modal_logo}
                          alt="logo"
                        />
                        <span>{companyName.companyName}</span>
                      </Link>
                    </div>
                  </div>
                </li>
                <hr className={css.bottom_hr}></hr>
                <li className={css.content_wrapper_other}>
                  <div className={css.settings_li_content}>
                    <Link to="/settings" className={css.modal_text}>
                      <img
                        src="/images/dashboard_header/settings.png"
                        className={css.modal_logo}
                        alt="logo"
                      />
                      <span>Account settings</span>
                    </Link>
                  </div>
                </li>
                <hr className={css.lower_hr}></hr>
                <div className={css.lower_li_container}>
                  <li className={css.content_wrapper}>
                    <div className={css.li_content}>
                      <Link to="/user_settings" className={css.modal_text}>
                        <img
                          src="/images/dashboard_modal_header/user.png"
                          className={css.modal_logo}
                          alt="logo"
                        />
                        <span>User settings</span>
                      </Link>
                    </div>
                  </li>
                  <li className={css.content_wrapper}>
                    <div className={css.li_content}>
                      <Link to="/help" className={css.modal_text}>
                        <img
                          src="/images/dashboard_modal_header/question.png"
                          className={css.modal_logo}
                          alt="logo"
                        />
                        <span>Help</span>
                      </Link>
                    </div>
                  </li>
                  <li className={css.content_wrapper}>
                    <div className={css.li_content}>
                      <Link to="/" className={css.modal_text}>
                        <img
                          src="/images/dashboard_modal_header/logout.png"
                          className={css.modal_logo}
                          alt="logo"
                        />
                        <span onClick={() => logout()}>Sign out</span>
                      </Link>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
