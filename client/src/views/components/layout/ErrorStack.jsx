import { useEffect, useState } from "react";
import { useConfig } from "../../../hooks/useConfig";
import { useDevice } from "../../../hooks/useDevice";
import { useUser } from "../../../hooks/useUser";
import Snackbar from "./Snackbar";

const ErrorStack = () => {
  const [allErrors, setAllErrors] = useState([]);
  const { configsError, clearConfigsError } = useConfig();
  const { usersError, clearUsersError } = useUser();
  const { devicesError, clearDevicesError } = useDevice();
  useEffect(() => {
    let id = Number(Date.now());
    if (configsError) {
      setAllErrors((errs) => [...errs, { id: id, error: configsError }]);
      setTimeout(() => {
        clearConfigsError();
        setAllErrors((errs) => errs.filter((err) => err.id !== id));
      }, 5000);
    } else if (usersError) {
      setAllErrors((errs) => [...errs, { id: id, error: usersError }]);
      setTimeout(() => {
        clearUsersError();
        setAllErrors((errs) => errs.filter((err) => err.id !== id));
      }, 5000);
    } else if (devicesError) {
      setAllErrors((errs) => [...errs, { id: id, error: devicesError }]);
      setTimeout(() => {
        clearDevicesError();
        setAllErrors((errs) => errs.filter((err) => err.id !== id));
      }, 5000);
    }
  }, [
    configsError,
    usersError,
    devicesError,
    setAllErrors,
    clearConfigsError,
    clearUsersError,
    clearDevicesError,
  ]);

  const removeError = (id) => {
    setAllErrors((errs) => errs.filter((err) => err.id !== id));
  };

  return (
    <div className="flex flex-col absolute bottom-3 left-3">
      {allErrors.map(({ error, id }) => (
        <Snackbar
          message={error}
          key={id}
          removeError={(idx) => removeError(idx)}
        />
      ))}
    </div>
  );
};

export default ErrorStack;
