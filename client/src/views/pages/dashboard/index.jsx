import { NavLink } from "react-router-dom";

const Dashboard = () => (
  <div>
    <h1 className="my-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `m-1 transition-all duration-200 delay-180 ease-in-out ${
            isActive ? "text-indigo-500" : "font-bold text-white"
          }`
        }
      >
        Dashboard
      </NavLink>
      /
    </h1>
    <div>
      <button className="p-2 border-0 bg-indigo-500 font-light text-white">
        Get Access Token
      </button>
    </div>
  </div>
);

export default Dashboard;
