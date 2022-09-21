import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/loginPage/LoginPage";
import "./App.css";
import "./style/index.scss";
import PasswordRenew from "./pages/PasswordRenew/PasswordRenew";
import { PublicRoute, PrivateRoute } from "./components/Routes/Routes";
import Dashboard from "./pages/dashBoard/[id]";
import Sync from "./pages/sync/Sync";
import EditPage from "./pages/EditPage/EditPage";
import UserSettings from "./pages/AccountSetUser/UserSettings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoute Component={MainPage} />}></Route>
        <Route path="/login" element={<PublicRoute Component={LoginPage} />}></Route>
        <Route path="/password_renew" element={<PublicRoute Component={PasswordRenew} />} />
        <Route path="/:id" element={<PrivateRoute Component={Dashboard} />} />
        <Route path="/sync_with_account" element={<PublicRoute Component={Sync} />} />
        <Route path="/EditPage" element={<PrivateRoute Component={EditPage} />} />
        <Route path="/user" element={<PrivateRoute Component={UserSettings} />} />
      </Routes>
    </>
  );
}

export default App;
