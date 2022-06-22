import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useConfig } from "../../../../hooks/useConfig";
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
  const { config, configLoading } = useConfig();
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...config,
      cloverServer:
        config.state === "Production" ? config.prodUrl : config.testUrl,
    },
  });
  console.log(config);

  const testUrl = watch("testUrl");
  const prodUrl = watch("prodUrl");
  const cloverServer = watch("cloverServer");
  const onSubmit = async (formData) => {
    try {
      console.log(formData);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      {!configLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {Object.keys(config)
            .filter((key) => !filterKeys.includes(key))
            .map((key) => (
              <div key={key} className="grid gap-4 grid-cols-2 my-2">
                <label>{toTitleCase(key.replace(/([A-Z])/g, " $1"))}</label>
                {key === "state" ? (
                  <select {...register(key, { required: true })}>
                    <option label="Production" value="Production" />
                    <option label="Sandbox" value="Sandbox" />
                  </select>
                ) : (
                  <>
                    {key === "cloverServer" ? (
                      <input
                        {...register(key, { required: true })}
                        readOnly={!edit}
                      />
                    ) : (
                      <input
                        {...register(key, { required: true })}
                        readOnly={!edit}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          {console.log(errors)}
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
        </form>
      )}
    </>
  );
};

export default ConfigForm;
