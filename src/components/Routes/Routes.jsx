import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const PrivateRoute = ({ Component }) => {
  const { isAuth } = useAuth();
  return isAuth ? <Component /> : <Navigate to="/login" />;
};

export const PublicRoute = ({ Component }) => {
  const { isAuth, companyName } = useAuth();
  return isAuth ? <Navigate to={"/" + companyName} /> : <Component />;
};
