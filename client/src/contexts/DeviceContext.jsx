import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  // call this function when you want to authenticate the user
  const getDevices = useCallback(async () => {
    const { data } = await axiosPrivate.get("/api/device/get-all");
    setDevices(data);
  }, [setDevices, axiosPrivate]);

  // call this function to sign out logged in user
  const clearDevices = useCallback(() => setDevices(), [setDevices]);

  const value = useMemo(
    () => ({
      devices,
      getDevices,
      clearDevices,
    }),
    [devices, getDevices, clearDevices]
  );

  useEffect(() => {
    getDevices();
  }, [getDevices]);

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};
