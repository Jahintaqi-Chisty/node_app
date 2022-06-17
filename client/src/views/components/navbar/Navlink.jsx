import { NavLink } from "react-router-dom";

const Navlink = ({ label, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `p-2 rounded-full transition-all duration-200 delay-180 ease-in-out ${
        isActive ? "bg-white" : "font-bold text-white"
      }`
    }
  >
    <span className="p-1">{label}</span>
  </NavLink>
);

export default Navlink;
