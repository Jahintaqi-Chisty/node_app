import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Navbar from "../navbar";

const Layout = () => {
  const { user } = useAuth();
  // if (!user) {
  //   return <Navigate to="/auth/login" />;
  // }
  return (
    <>
      <Navbar />
      <div className="container mx-auto transition-all duration-200 delay-180 ease-in-out ">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
