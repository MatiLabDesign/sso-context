import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { AuthContextProvider } from "./contexts/authContext";
import DashboardRoutes from "./routers/DashboardRoutes";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <DashboardRoutes />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;


