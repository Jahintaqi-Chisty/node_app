import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useConfig } from "../../../hooks/useConfig";
import ConfigForm from "../../components/dashboard/config/ConfigForm";
import { RiFileList3Fill } from "react-icons/ri";
import { FaKey } from "react-icons/fa";

const Dashboard = () => {
  const { config, getAccessToken, fetchDevices } = useConfig();
  const { user } = useAuth();
  return (
    <div>
      <h1 className="my-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `m-1 transition-all duration-200 delay-180 ease-in-out text-slate-100 ${
              isActive ? "font-medium" : "font-bold"
            }`
          }
        >
          Dashboard
        </NavLink>
        /
      </h1>
      {user?.isAdmin && (
        <div>
          <button
            className="bg-slate-200 font-medium text-syncoria transition rounded-md ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={() => getAccessToken(config._id)}
          >
            <span className="flex justify-center items-center">
              <FaKey className="mr-2" />
              Get Access Token
            </span>
          </button>
          <button
            className="bg-slate-200 font-medium text-syncoria transition rounded-md ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 ml-3"
            onClick={() => fetchDevices(config._id)}
          >
            <span className="flex justify-center items-center">
              <RiFileList3Fill className="mr-2" />
              Get Device List
            </span>
          </button>
        </div>
      )}
      <ConfigForm />
    </div>
  );
};

export default Dashboard;
