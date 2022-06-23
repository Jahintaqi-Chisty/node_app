import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate();
  // call this function when you want to authenticate the user
  const getConfig = useCallback(async () => {
    try {
      const { data } = await axiosPrivate.get("/api/config/get-all");
      setConfig(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setConfig, axiosPrivate]);

  // call this function to sign out logged in user
  const clearConfig = useCallback(() => setConfig({}), [setConfig]);

  const getAccessToken = useCallback(
    async (configId) => {
      const { data } = await axiosPrivate.post(
        `/api/config/${configId}/get-access-token`
      );
      if (data) {
        getConfig();
      }
    },
    [axiosPrivate, getConfig]
  );

  const value = useMemo(
    () => ({
      config,
      getConfig,
      clearConfig,
      getAccessToken,
      configLoading: loading,
    }),
    [config, getConfig, clearConfig, getAccessToken, loading]
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
