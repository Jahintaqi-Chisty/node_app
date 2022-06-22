import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useConfig } from "../../../../hooks/useConfig";
import { useAuth } from "../../../../hooks/useAuth";
import { toTitleCase } from "../../../../utils/helperFunctions";

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
  const { user } = useAuth();
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
      console.log(formData);
      const { data } = await axiosPrivate.put(
        `/api/config/${config._id}`,
        formData
      );
      console.log(data);
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
    if (!!user) {
      getConfig();
    }
  }, [getConfig, user, reset]);
  useEffect(() => {
    if (config) reset(config);
  }, [config, reset]);
  return (
    <>
      {!configLoading && !!config && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {Object.keys(config)
            .filter((key) => !filterKeys.includes(key))
            .map((key) => (
              <div key={key} className="grid gap-4 grid-cols-2 my-2">
                <label>{toTitleCase(key.replace(/([A-Z])/g, " $1"))}</label>
                {key === "state" ? (
                  <select
                    {...register(key, { required: true })}
                    style={{
                      touchAction: edit ? "auto" : "none",
                      pointerEvents: edit ? "auto" : "none",
                    }}
                  >
                    <option label="Production" value="Production" />
                    <option label="Sandbox" value="Sandbox" />
                  </select>
                ) : (
                  <input
                    {...register(key, { required: true })}
                    readOnly={key === "cloverServer" ? true : !edit}
                  />
                )}
              </div>
            ))}
          {console.log(errors)}
          {user.isAdmin && (
            <>
              <button
                type="button"
                className={`${edit ? "bg-red-500" : "bg-gray-100"}`}
                onClick={() => {
                  if (edit) {
                    console.log("reset");
                  }
                  setEdit((e) => !e);
                }}
              >
                {edit ? "Cancel" : "Edit"}
              </button>
              {edit && <button className="bg-indigo-500 ml-2">Submit</button>}
            </>
          )}
        </form>
      )}
    </>
  );
};

export default ConfigForm;
