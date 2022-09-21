import { useSelector } from "react-redux";

export function useAuth() {
  const { email, name, companyName } = useSelector((state) => state.user);

  return {
    isAuth: !!email,
    name: name,
    companyName: companyName
  };
}
