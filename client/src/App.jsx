import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ConfigProvider } from "./contexts/ConfigContext";
import MainRoutes from "./routes";

const App = () => (
  <AuthProvider>
    <ConfigProvider>{MainRoutes()}</ConfigProvider>
  </AuthProvider>
);

export default App;
