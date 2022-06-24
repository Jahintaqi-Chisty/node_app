import { createContext, useCallback, useMemo, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const axiosPrivate = useAxiosPrivate();
  // call this function when you want to authenticate the user
  const getDevices = useCallback(async () => {
    try {
      const { data } = await axiosPrivate.get("/api/device/get-all");
      setDevices(data);
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [setDevices, axiosPrivate]);

  // call this function to sign out logged in user
  const clearDevices = useCallback(() => setDevices([]), [setDevices]);

  const clearDevicesError = useCallback(() => setError(""), [setError]);

  const value = useMemo(
    () => ({
      devices,
      getDevices,
      clearDevices,
      devicesLoading: loading,
      devicesError: error,
      clearDevicesError,
    }),
    [devices, getDevices, clearDevices, loading, error, clearDevicesError]
  );

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};
