import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

export const ProtectedRoutes = () => {
  const { user } = useGlobalContext();

  if (user){
    return <Outlet />
  } else {
    return <Navigate to="/" />
  }
};