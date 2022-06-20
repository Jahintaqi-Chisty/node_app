import { useState } from "react";
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
  const { config } = useConfig();
  const [edit, setEdit] = useState(false);
  return (
    <form>
      {Object.keys(config)
        .filter((key) => !filterKeys.includes(key))
        .map((key) => (
          <div key={key} className="grid gap-4 grid-cols-2 my-2">
            <label>{toTitleCase(key.replace(/([A-Z])/g, " $1"))}</label>
            <input defaultValue={config[key]} readOnly={!edit} />
          </div>
        ))}
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
  );
};

export default ConfigForm;
