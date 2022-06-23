import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaCalculator, FaHome } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useConfig } from "../../../hooks/useConfig";
import { useDevice } from "../../../hooks/useDevice";
import { useUser } from "../../../hooks/useUser";
import Navlink from "./Navlink";

const navlinks = [
  {
    label: "Home",
    path: "/",
    authenticate: true,
    icon: <FaHome className="mr-2" />,
  },
  {
    label: "Devices",
    path: "/devices",
    authenticate: true,
    icon: <FaCalculator className="mr-2" />,
  },
  {
    label: "Register",
    path: "/auth/register",
    authenticate: false,
    icon: <AiOutlineForm className="mr-2" />,
  },
  {
    label: "Login",
    path: "/auth/login",
    authenticate: false,
    icon: <BiLogIn className="mr-2" />,
  },
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
    <div className="flex flex-row justify-between items-center p-3 bg-slate-100 shadow-md">
      <div className="flex  justify-center items-center">
        <img className="h-10" src="/logo192.png" alt="syncoria-logo" />
        <h1
          className="cursor-pointer px-2 text-syncoria font-bold text-3xl my-auto"
          onClick={() => navigate("/")}
        >
          Clover Cloud
        </h1>
      </div>
      <div className="flex flex-row justify-between content-center">
        {navlinks
          .filter(({ authenticate }) => authenticate === !!user)
          .map(({ path, label, icon }, key) => (
            <Navlink path={path} label={label} icon={icon} key={key} />
          ))}
        {user && (
          <button
            className="bg-syncoria-500 text-white p-3 ml-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={handleLogout}
          >
            <span className="flex justify-center items-center">
              <BiLogOut className="mr-2" />
              Logout
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
