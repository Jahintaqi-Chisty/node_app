import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  // call this function when you want to authenticate the user
  const getUsers = useCallback(async () => {
    try {
      const { data } = await axiosPrivate.get("/api/user/get-all");
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setUsers, axiosPrivate]);

  // call this function to sign out logged in user
  const clearUsers = useCallback(() => setUsers([]), [setUsers]);

  const value = useMemo(
    () => ({
      users,
      getUsers,
      clearUsers,
      userLoading: loading,
    }),
    [users, getUsers, clearUsers, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
