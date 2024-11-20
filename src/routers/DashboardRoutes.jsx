import { Routes, Route } from "react-router-dom";
import {
  CLIENT,
  CREATECLIENTE,
  CREATEEQUIPO,
  CREATETIPOEQUIPO,
  ENSAYOBM,
  ENSAYOPCP,
  ENSAYOUCL,
  EQUIPO,
  ETAPA,
  INGRESOBM,
  INGRESOPCP,
  INGRESOUCL,
  INSPECCIONBM,
  INSPECCIONPCP,
  INSPECCIONUCL,
  LOGIN,
  LOGOUT,
  OT,
  OTLIST,
  PRIVATE,
  RECEPCIONBM,
  RECEPCIONPCP,
  RECEPCIONUCL,
  SALIDABM,
  SALIDAPCP,
  SALIDAUCL,
  TIPOEQUIPO,
} from "../config/routes/paths";
import Home from "../views/Home";
import Login from "../views/Login";
import Private from "../views/Private";
import Logout from "../views/Logout";

import PublicRoutes from "../components/router/PublicRoutes";
import PrivateRoutes from "../components/router/PrivateRoutes";
import Client from "../views/Client";
import TipoEquipo from "../views/TipoEquipo";
import Equipo from "../views/Equipo";
import CreateCliente from "../views/CreateCliente";
import CreateEquipo from "../views/CreateEquipo";
import CreateTipoEquipo from "../views/CreateTipoEquipo";
import OtForm from "../components/forms/OtForm";
import Ot from "../views/Ot";
import Etapas from "../components/forms/etapas/Etapas";
import PcpIngreso from "../components/forms/etapas/PCPForm/PcpIngreso";
import PcpRecepcion from "../components/forms/etapas/PCPForm/PcpRecepcion2";
import PcpInspeccion from "../components/forms/etapas/PCPForm/PcpInspeccion";
import PcpEnsayo from "../components/forms/etapas/PCPForm/PcpEnsayo";
import PcpSalida from "../components/forms/etapas/PCPForm/PcpSalida";
import UclEnsayo from "../components/forms/etapas/UCLForm/UclEnsayo";
import UclInspeccion from "../components/forms/etapas/UCLForm/UclInspeccion";
import UclRecepcion from "../components/forms/etapas/UCLForm/UclRecepcion";
import UclIngreso from "../components/forms/etapas/UCLForm/UclIngreso";
import UclSalida from "../components/forms/etapas/UCLForm/UclSalida";
import BombaIngreso from "../components/forms/etapas/BombaForm/BombaIngreso";
import BombaRecepcion from "../components/forms/etapas/BombaForm/BombaRecepcion";
import BombaInspeccion from "../components/forms/etapas/BombaForm/BombaInspeccion";
import BombaEnsayo from "../components/forms/etapas/BombaForm/BombaEnsayo";
import BombaSalida from "../components/forms/etapas/BombaForm/BombaSalida";

const DashboardRoutes = () => {
  return (
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
                <Route path={INGRESOPCP} element={<PcpIngreso />} />
                <Route path={RECEPCIONPCP} element={<PcpRecepcion />} />
                <Route path={INSPECCIONPCP} element={<PcpInspeccion />} />
                <Route path={ENSAYOPCP} element={<PcpEnsayo />} />
                <Route path={SALIDAPCP} element={<PcpSalida />} />
                <Route path={INGRESOUCL} element={<UclIngreso />} />
                <Route path={RECEPCIONUCL} element={<UclRecepcion />} />
                <Route path={INSPECCIONUCL} element={<UclInspeccion />} />
                <Route path={ENSAYOUCL} element={<UclEnsayo />} />
                <Route path={SALIDAUCL} element={<UclSalida />} />
                <Route path={INGRESOBM} element={<BombaIngreso />} />
                <Route path={RECEPCIONBM} element={<BombaRecepcion />} />
                <Route path={INSPECCIONBM} element={<BombaInspeccion />} />
                <Route path={ENSAYOBM} element={<BombaEnsayo />} />
                <Route path={SALIDABM} element={<BombaSalida />} />
              </Route>
            </Route>
            <Route path={LOGOUT} element={<Logout />} />
          </Route>
        </Routes>
  );
};

export default DashboardRoutes;
