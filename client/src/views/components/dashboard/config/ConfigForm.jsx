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
  return (
    <form>
      {Object.keys(config)
        .filter((key) => !filterKeys.includes(key))
        .map((key) => (
          <div key={key}>
            <label>{toTitleCase(key.replace(/([A-Z])/g, " $1"))}</label>
            <input defaultValue={config[key]} />
          </div>
        ))}
    </form>
  );
};

export default ConfigForm;
