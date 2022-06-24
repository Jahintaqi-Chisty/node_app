import { createContext, useCallback, useMemo, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const axiosPrivate = useAxiosPrivate();
  // call this function when you want to authenticate the user
  const getConfig = useCallback(async () => {
    try {
      const { data } = await axiosPrivate.get("/api/config/get-all");
      setConfig(data[0]);
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [setConfig, axiosPrivate]);

  // call this function to sign out logged in user
  const clearConfig = useCallback(() => setConfig({}), [setConfig]);

  const getAccessToken = useCallback(
    async (configId) => {
      try {
        const { data } = await axiosPrivate.post(
          `/api/config/${configId}/get-access-token`
        );
        if (data) {
          getConfig();
        }
      } catch (err) {
        if (err.hasOwnProperty("response")) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      }
    },
    [axiosPrivate, getConfig]
  );

  const fetchDevices = useCallback(
    async (configId) => {
      try {
        const { data } = await axiosPrivate.post(
          `/api/config/${configId}/fetch_devices`
        );
        if (data) {
          getConfig();
        }
      } catch (err) {
        if (err.hasOwnProperty("response")) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      }
    },
    [axiosPrivate, getConfig]
  );

  const clearConfigsError = useCallback(() => setError(""), [setError]);

  const value = useMemo(
    () => ({
      config,
      getConfig,
      clearConfig,
      getAccessToken,
      configLoading: loading,
      fetchDevices,
      configsError: error,
      clearConfigsError,
    }),
    [
      config,
      getConfig,
      clearConfig,
      getAccessToken,
      fetchDevices,
      loading,
      error,
      clearConfigsError,
    ]
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
