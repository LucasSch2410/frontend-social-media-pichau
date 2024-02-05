import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { PageLoading } from "../PageLoading";
import Cookies from "js-cookie";

export const ProtectedRoutes = () => {
  const { user, pageLoading } = useGlobalContext();
  const user_id = Cookies.get('user_id')

  if (!user_id) {
    return <Navigate to="/" replace />;
  } else if (pageLoading && user_id) {
    return <PageLoading />;
  } else if (user) {
    return <Outlet />
  }
};