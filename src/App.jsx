import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CLIENT, EQUIPO, LOGIN, LOGOUT, PRIVATE } from "./config/routes/paths";
import Home from "./views/Home";
import Login from "./views/Login";
import Private from "./views/Private";
import Logout from "./views/Logout";
import { AuthContextProvider } from "./contexts/authContext";
import PublicRoutes from "./components/router/PublicRoutes";
import PrivateRoutes from "./components/router/PrivateRoutes";
import Client from "./views/Client";
import Equipo from "./views/Equipo";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoutes />}>
            <Route index element={<Home />} />
            <Route path={LOGIN} element={<Login />} />
          </Route>
          <Route path={PRIVATE} element={<PrivateRoutes />}>
            <Route path={PRIVATE} element={<Private />}>
              <Route path={CLIENT} element={<Client />} />
              <Route path={EQUIPO} element={<Equipo />} />
            </Route>
            <Route path={LOGOUT} element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
