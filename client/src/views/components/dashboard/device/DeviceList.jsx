import { useEffect } from "react";
import { useDevice } from "../../../../hooks/useDevice";
import { useAuth } from "../../../../hooks/useAuth";
import { toTitleCase } from "../../../../utils/helperFunctions";
import { TableCell } from "../../table/TableCell";

const filterKeys = ["_id", "__v", "createdAt", "updatedAt", "userId"];

const DeviceList = () => {
  const { user, isAuthenticated } = useAuth();
  const { devices, devicesLoading, getDevices } = useDevice();
  useEffect(() => {
    if (isAuthenticated) {
      getDevices();
    }
  }, [getDevices, isAuthenticated]);
  return (
    <div className="w-fit mt-6">
      <div className="border-b border-gray-200 shadow">
        {!devicesLoading && !!devices && (
          <>
            {devices.length !== 0 ? (
              <table>
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(devices[0])
                      .filter((key) => !filterKeys.includes(key))
                      .map((key) => (
                        <th
                          key={key}
                          className="px-6 py-2 text-xs text-gray-500"
                        >
                          {toTitleCase(key.replace(/([A-Z])/g, " $1"))}
                        </th>
                      ))}
                    {user.isAdmin && (
                      <th className="px-6 py-2 text-xs text-gray-500">Users</th>
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
                            className="px-6 py-4 text-sm text-gray-500"
                            content={device[key]}
                          />
                        ))}

                      {user.isAdmin && (
                        <TableCell
                          className="px-6 py-4 text-sm text-gray-500"
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
    </div>
  );
};

export default DeviceList;
