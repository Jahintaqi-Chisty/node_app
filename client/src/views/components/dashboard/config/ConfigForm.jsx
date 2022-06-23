import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useConfig } from "../../../../hooks/useConfig";
import { useAuth } from "../../../../hooks/useAuth";
import { toTitleCase } from "../../../../utils/helperFunctions";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { BiSend } from "react-icons/bi";

const filterKeys = [
  "_id",
  "__v",
  "userId",
  "createdAt",
  "updatedAt",
  "deviceLine",
];

const ConfigForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const { config, configLoading, getConfig } = useConfig();
  const { user, isAuthenticated } = useAuth();
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const state = watch("state");

  const onSubmit = async (formData) => {
    try {
      const { data } = await axiosPrivate.put(
        `/api/config/${config._id}`,
        formData
      );
      if (data) {
        getConfig();
        setEdit(false);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const testUrl = watch("testUrl");
    const prodUrl = watch("prodUrl");
    setValue("cloverServer", state === "Production" ? prodUrl : testUrl, {
      shouldValidate: true,
    });
  }, [state, setValue, watch]);
  useEffect(() => {
    if (isAuthenticated) {
      getConfig();
    }
  }, [getConfig, isAuthenticated, reset]);
  useEffect(() => {
    if (config) reset(config);
  }, [config, reset]);
  return (
    <>
      {!configLoading && !!config && (
        <form
          className="shadow-xl rounded border bg-gray-100 mt-6 p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {Object.keys(config)
            .filter((key) => !filterKeys.includes(key))
            .map((key) => (
              <div
                key={key}
                className="grid gap-4 grid-cols-2 place-items-stretch my-2"
              >
                <label className="block mb-2 text-indigo-500">
                  {toTitleCase(key.replace(/([A-Z])/g, " $1"))}
                </label>
                {key === "state" ? (
                  <select
                    className="p-2 text-indigo-700 border-b-2 border-indigo-500 focus:bg-gray-300 outline-none"
                    {...register(key, { required: true })}
                    style={{
                      touchAction: edit ? "auto" : "none",
                      pointerEvents: edit ? "auto" : "none",
                    }}
                  >
                    <option label="Production" value="Production" />
                    <option label="Sandbox" value="Sandbox" />
                  </select>
                ) : key === "isAccessTokenLoaded" ? (
                  <p>
                    {config[key] ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </p>
                ) : (
                  <input
                    className={`${
                      typeof config[key] === "boolean" ? "my-6" : ""
                    } p-2 text-indigo-700 border-b-2 border-indigo-500 focus:bg-gray-300 outline-none`}
                    placeholder={toTitleCase(key.replace(/([A-Z])/g, " $1"))}
                    {...register(key, { required: true })}
                    readOnly={key === "cloverServer" ? true : !edit}
                  />
                )}
              </div>
            ))}
          {user.isAdmin && (
            <>
              <button
                type="button"
                className={`${
                  edit
                    ? "border-red-500 text-red-500"
                    : "bg-slate-100 text-indigo-500 border-indigo-500"
                } border-2 rounded-lg p-3`}
                onClick={() => {
                  reset(config);
                  setEdit((e) => !e);
                }}
              >
                <span className="flex justify-center items-center">
                  {edit ? (
                    <FaTimes className="mr-2" />
                  ) : (
                    <FaEdit className="mr-2" />
                  )}
                  <p>{edit ? "Cancel" : "Edit"}</p>
                </span>
              </button>
              {edit && (
                <button className="bg-indigo-500 text-slate-100 border-2 border-indigo-500 p-3 rounded-lg ml-2">
                  <span className="flex justify-center items-center">
                    <BiSend className="mr-2" />
                    <p>Submit</p>
                  </span>
                </button>
              )}
            </>
          )}
        </form>
      )}
    </>
  );
};

export default ConfigForm;
