import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

export const ProtectedRoutes = () => {
  const { user } = useGlobalContext();

  return user ? <Outlet /> : <Navigate to="/" replace />;
};