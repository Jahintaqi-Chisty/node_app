import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import MainRoutes from "./routes";

const App = () => <AuthProvider>{MainRoutes()}</AuthProvider>;

export default App;
