import { useNavigate } from "react-router-dom";
import Navlink from "./Navlink";

const navlinks = [
  { label: "Home", path: "/" },
  { label: "Register", path: "/auth/register" },
  { label: "Login", path: "/auth/login" },
  // { label: "Forget", path: "/auth/forget" },
  // { label: "Reset", path: "/auth/reset" },
];

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-between p-3 bg-indigo-500">
      <h1
        className="cursor-pointer p-2 text-white font-bold"
        onClick={() => navigate("/")}
      >
        Clover Cloud
      </h1>
      <div className="flex flex-row justify-between">
        {navlinks.map(({ path, label }, key) => (
          <Navlink path={path} label={label} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
