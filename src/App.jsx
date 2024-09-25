import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CLIENT,
  CREATECLIENTE,
  CREATEEQUIPO,
  CREATETIPOEQUIPO,
  ENSAYO,
  EQUIPO,
  ETAPA,
  INGRESO,
  INSPECCION,
  LOGIN,
  LOGOUT,
  OT,
  OTLIST,
  PRIVATE,
  RECEPCION,
  SALIDA,
  TIPOEQUIPO,
} from "./config/routes/paths";
import Home from "./views/Home";
import Login from "./views/Login";
import Private from "./views/Private";
import Logout from "./views/Logout";
import { AuthContextProvider } from "./contexts/authContext";
import PublicRoutes from "./components/router/PublicRoutes";
import PrivateRoutes from "./components/router/PrivateRoutes";
import Client from "./views/Client";
import TipoEquipo from "./views/TipoEquipo";
import Equipo from "./views/Equipo";
import CreateCliente from "./views/CreateCliente";
import CreateEquipo from "./views/CreateEquipo";
import CreateTipoEquipo from "./views/CreateTipoEquipo";
import OtForm from "./components/forms/OtForm";
import Ot from "./views/Ot";
import Etapas from "./components/forms/etapas/Etapas";
import PcpIngreso from "./components/forms/etapas/PCPForm/PcpIngreso";
import PcpRecepcion from "./components/forms/etapas/PCPForm/PcpRecepcion";
import PcpInspeccion from "./components/forms/etapas/PCPForm/PcpInspeccion";
import PcpEnsayo from "./components/forms/etapas/PCPForm/PcpEnsayo";
import PcpSalida from "./components/forms/etapas/PCPForm/PcpSalida";

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
              <Route path={TIPOEQUIPO} element={<TipoEquipo />} />
              <Route path={EQUIPO} element={<Equipo />} />
              <Route path={CREATECLIENTE} element={<CreateCliente />} />
              <Route path={CREATEEQUIPO} element={<CreateEquipo />} />
              <Route path={CREATETIPOEQUIPO} element={<CreateTipoEquipo />} />
              <Route path={OT} element={<OtForm />} />
              <Route path={OTLIST} element={<Ot />} />
              <Route path={ETAPA} element={<Etapas />}>
                <Route path={INGRESO} element={<PcpIngreso />} />
                <Route path={RECEPCION} element={<PcpRecepcion />} />
                <Route path={INSPECCION} element={<PcpInspeccion />} />
                <Route path={ENSAYO} element={<PcpEnsayo />} />
                <Route path={SALIDA} element={<PcpSalida />} />
              </Route>
            </Route>
            <Route path={LOGOUT} element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
