import { NavLink } from "react-router-dom";

const Navlink = ({ label, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `mx-2 p-3 rounded-full transition-all duration-200 delay-180 ease-in-out border-2 hover:bg-indigo-800 hover:text-white hover:border-indigo-800  ${
        isActive
          ? "text-indigo-800 border-indigo-800 "
          : "text-indigo-800 border-white"
      }`
    }
  >
    {label}
  </NavLink>
);

export default Navlink;
