import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

const Layout = () => (
  <>
    <Navbar />
    <div className="container mx-auto transition-all duration-200 delay-180 ease-in-out ">
      <Outlet />
    </div>
  </>
);

export default Layout;
