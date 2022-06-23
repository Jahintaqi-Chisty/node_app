import { NavLink } from "react-router-dom";

const Navlink = ({ label, path, icon }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `mx-2 p-3 rounded-full transition-all duration-200 delay-180 ease-in-out border-2 hover:bg-syncoria-500 hover:text-white hover:border-syncoria-500  ${
        isActive
          ? "text-syncoria-500 border-syncoria-500 "
          : "text-syncoria-500 border-slate-100"
      }`
    }
  >
    <span className="flex justify-center items-center">
      {icon} {label}
    </span>
  </NavLink>
);

export default Navlink;
