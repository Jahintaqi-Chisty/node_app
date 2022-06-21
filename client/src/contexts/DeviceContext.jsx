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
  const [loading, setLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate();
  // call this function when you want to authenticate the user
  const getDevices = useCallback(async () => {
    try {
      const { data } = await axiosPrivate.get("/api/device/get-all");
      setDevices(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setDevices, axiosPrivate]);

  // call this function to sign out logged in user
  const clearDevices = useCallback(() => setDevices(), [setDevices]);

  const value = useMemo(
    () => ({
      devices,
      getDevices,
      clearDevices,
      devicesLoading: loading,
    }),
    [devices, getDevices, clearDevices, loading]
  );

  useEffect(() => {
    getDevices();
  }, [getDevices]);

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};
