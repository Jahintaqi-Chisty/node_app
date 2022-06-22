import { useContext, useEffect } from "react";
import { DeviceContext } from "../../../contexts/DeviceContext";
import DeviceList from "../../components/dashboard/device/DeviceList";

const Devices = () => {
  const { getDevices, devices } = useContext(DeviceContext);
  useEffect(() => {
    getDevices();
  }, [getDevices]);
  return !!devices && <DeviceList />;
};

export default Devices;
