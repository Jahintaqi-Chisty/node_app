import { useDevice } from "../../../../hooks/useDevice";
import { toTitleCase } from "../../../../utils/helperFunctions";
import { TableCell } from "../../table/TableCell";

const filterKeys = ["_id", "__v", "createdAt", "updatedAt", "userId"];

const DeviceList = () => {
  const { devices, devicesLoading } = useDevice();
  return (
    <div className="border-collapse table-fixed text-sm">
      {!devicesLoading && (
        <table className="table-auto">
          <thead>
            <tr>
              {Object.keys(devices[0])
                .filter((key) => !filterKeys.includes(key))
                .map((key) => (
                  <th
                    key={key}
                    className="border-b dark:border-slate-600 font-medium p-4 text-left"
                  >
                    {toTitleCase(key.replace(/([A-Z])/g, " $1"))}
                  </th>
                ))}
              <th className="border-b dark:border-slate-600 font-medium p-4 text-left">
                Users
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {devices.map((device, id) => (
              <tr key={id}>
                {Object.keys(device)
                  .filter((key) => !filterKeys.includes(key))
                  .map((key, idx) => (
                    <TableCell
                      key={idx}
                      className="border-b border-slate-100 dark:border-slate-700 p-4 "
                      content={device[key]}
                    />
                  ))}

                <TableCell
                  className="border-b border-slate-100 dark:border-slate-700 p-4 "
                  type="user"
                  content={{ defaultUser: device.userId, deviceId: device._id }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeviceList;
