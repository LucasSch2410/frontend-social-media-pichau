import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { PageLoading } from "../PageLoading";
import { useEffect, useState } from "react";

export const ProtectedRoutes = () => {
  const { user, pageLoading } = useGlobalContext();

  if (pageLoading && user) {
    return <PageLoading />;
  } else if (pageLoading && !user) {
    return <PageLoading />
  } else if (user) {
    return <Outlet />;
  } else if (!pageLoading) {
    return <Navigate to={"/"}/>
  }
};