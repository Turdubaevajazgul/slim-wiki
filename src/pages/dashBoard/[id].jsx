// import { Routes } from "react-router-dom";
import DashboardHeader from "../../components/dashboardHeader/DashboardHeader";
import UserSettings from "../AccountSetUser/UserSettings";
// import EditPage from "../EditPage/EditPage";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />,
      <UserSettings />,
      {/* <Routes>
        <Route path="/EditPage" element={<EditPage />} />
      </Routes> */}
    </>
  );
}
