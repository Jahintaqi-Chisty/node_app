import { useDevice } from "../../../../hooks/useDevice";

const DeviceList = () => {
  const { devices } = useDevice();
  console.log(typeof devices);
  return (
    <div className="border-collapse table-fixed text-sm">
      <table className="table-auto">
        <thead>
          <tr>
            {Object.keys(devices[0]).map((key) => (
              <th
                key={key}
                className="border-b dark:border-slate-600 font-medium p-4 text-left"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {devices.map((device, id) => (
            <tr key={id}>
              {Object.keys(device).map((key, idx) => (
                <td
                  key={idx}
                  className="border-b border-slate-100 dark:border-slate-700 p-4 "
                >
                  {device[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;
