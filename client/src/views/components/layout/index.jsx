import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import ErrorStack from "./ErrorStack";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto transition-all duration-200 delay-180 ease-in-out relative">
        <Outlet />
      </div>
      <ErrorStack />
    </>
  );
};

export default Layout;
