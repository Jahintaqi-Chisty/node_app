import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Navlink from "./Navlink";

const navlinks = [
  { label: "Home", path: "/", authenticate: true },
  { label: "Register", path: "/auth/register", authenticate: false },
  { label: "Login", path: "/auth/login", authenticate: false },
  // { label: "Forget", path: "/auth/forget", authenticate: false },
  // { label: "Reset", path: "/auth/reset", authenticate: false },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="flex flex-row justify-between p-3 bg-indigo-500">
      <h1
        className="cursor-pointer p-2 text-white font-bold"
        onClick={() => navigate("/")}
      >
        Clover Cloud
      </h1>
      <div className="flex flex-row justify-between">
        {navlinks
          .filter(({ authenticate }) => authenticate === !!user)
          .map(({ path, label }, key) => (
            <Navlink path={path} label={label} key={key} />
          ))}
      </div>
    </div>
  );
};

export default Navbar;
