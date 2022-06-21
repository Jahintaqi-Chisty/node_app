import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ConfigProvider } from "./contexts/ConfigContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import { UserProvider } from "./contexts/UserContext";
import MainRoutes from "./routes";

const App = () => (
  <AuthProvider>
    <ConfigProvider>
      <DeviceProvider>
        <UserProvider>{MainRoutes()}</UserProvider>
      </DeviceProvider>
    </ConfigProvider>
  </AuthProvider>
);

export default App;
