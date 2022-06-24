import { createContext, useCallback, useMemo, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  // call this function when you want to authenticate the user
  const getUsers = useCallback(async () => {
    try {
      const { data } = await axiosPrivate.get("/api/user/get-all");
      setUsers(data);
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [setUsers, axiosPrivate]);

  // call this function to sign out logged in user
  const clearUsers = useCallback(() => setUsers([]), [setUsers]);

  const clearUsersError = useCallback(() => setError(""), [setError]);

  const value = useMemo(
    () => ({
      users,
      getUsers,
      clearUsers,
      userLoading: loading,
      usersError: error,
      clearUsersError,
    }),
    [users, getUsers, clearUsers, loading, error, clearUsersError]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
