import { useEffect } from "react";
import { useDevice } from "../../../../hooks/useDevice";
import { useUser } from "../../../../hooks/useUser";
import { useAuth } from "../../../../hooks/useAuth";
import { toTitleCase } from "../../../../utils/helperFunctions";
import { TableCell } from "../../table/TableCell";

const filterKeys = ["_id", "__v", "createdAt", "updatedAt", "userId"];

const DeviceList = () => {
  const { user } = useAuth();
  const { devices, devicesLoading, getDevices } = useDevice();
  const { getUsers } = useUser();
  useEffect(() => {
    if (!!user) {
      getDevices();
      getUsers();
    }
  }, [getDevices, getUsers, user]);
  return (
    <div className="border-collapse table-fixed text-sm">
      {!devicesLoading && !!devices && (
        <>
          {devices.length !== 0 ? (
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
                  {user.isAdmin && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 text-left">
                      Users
                    </th>
                  )}
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

                    {user.isAdmin && (
                      <TableCell
                        className="border-b border-slate-100 dark:border-slate-700 p-4 "
                        type="user"
                        content={{
                          defaultUser: device.userId || null,
                          deviceId: device._id,
                        }}
                      />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data to show.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DeviceList;
