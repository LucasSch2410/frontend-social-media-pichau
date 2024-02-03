import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { PageLoading } from "../PageLoading";

export const ProtectedRoutes = () => {
  const { user, pageLoading } = useGlobalContext();

  if (pageLoading) {
    return <PageLoading />;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};