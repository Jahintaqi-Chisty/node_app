import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ConfigProvider } from "./contexts/ConfigContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import MainRoutes from "./routes";

const App = () => (
  <AuthProvider>
    <ConfigProvider>
      <DeviceProvider>{MainRoutes()}</DeviceProvider>
    </ConfigProvider>
  </AuthProvider>
);

export default App;
