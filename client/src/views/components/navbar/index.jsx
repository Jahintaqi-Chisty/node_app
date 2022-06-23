import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useConfig } from "../../../hooks/useConfig";
import { useDevice } from "../../../hooks/useDevice";
import { useUser } from "../../../hooks/useUser";
import Navlink from "./Navlink";

const navlinks = [
  { label: "Home", path: "/", authenticate: true },
  { label: "Devices", path: "/devices", authenticate: true },
  { label: "Register", path: "/auth/register", authenticate: false },
  { label: "Login", path: "/auth/login", authenticate: false },
  // { label: "Forget", path: "/auth/forget", authenticate: false },
  // { label: "Reset", path: "/auth/reset", authenticate: false },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { clearUsers } = useUser();
  const { clearDevices } = useDevice();
  const { clearConfig } = useConfig();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    clearConfig();
    clearDevices();
    clearUsers();
    logout();
  };
  return (
    <div className="flex flex-row justify-between content-center p-3">
      <h1
        className="cursor-pointer px-2 text-indigo-800 font-bold text-3xl"
        onClick={() => navigate("/")}
      >
        Clover Cloud
      </h1>
      <div className="flex flex-row justify-between content-center">
        {navlinks
          .filter(({ authenticate }) => authenticate === !!user)
          .map(({ path, label }, key) => (
            <Navlink path={path} label={label} key={key} />
          ))}
        {user && (
          <button
            className="bg-indigo-800 text-white p-3 ml-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
