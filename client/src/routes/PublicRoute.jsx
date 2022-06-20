import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PublicRoute = () => {
  const { user } = useAuth();
  if (user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
