import { Routes, Route } from "react-router-dom";
import {
  CLIENT,
  CLIENTE_VIEW,
  CONSULTA,
  CREATECLIENTE,
  CREATEEQUIPO,
  CREATETIPOEQUIPO,
  ENSAYOBM,
  ENSAYOUCL,
  EQUIPO,
  ETAPA,
  IMAGEN,
  INGRESOBM,
  INGRESOUCL,
  INSPECCIONBM,
  INSPECCIONUCL,
  LOGIN,
  LOGOUT,
  OT,
  OTLIST,
  PCP_ENSAYO,
  PCP_ENSAYO_VH60_B,
  PCP_INGRESO,
  PCP_INSPECCION_COUGAR_A,
  PCP_INSPECCION_COUGAR_B,
  PCP_INSPECCION_COUGAR_C,
  PCP_INSPECCION_DV1_A,
  PCP_INSPECCION_DV1_B,
  PCP_INSPECCION_DV1_C,
  PCP_INSPECCION_MINIG_A,
  PCP_INSPECCION_MINIG_B,
  PCP_INSPECCION_MINIG_C,
  PCP_INSPECCION_VH60_A,
  PCP_INSPECCION_VH60_B,
  PCP_INSPECCION_VH60_C,
  PCP_RECEPCION,
  PCP_SALIDA,
  PRIVATE,
  RECEPCIONBM,
  RECEPCIONUCL,
  SALIDABM,
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
import PcpRecepcion from "../components/forms/etapas/PCPForm/PcpRecepcion";

import PcpEnsayo from "../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoMiniGA";
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
import PcpInspeccionVH60B from "../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionVH60B";
import PcpInspeccionVH60C from "../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionVH60C";
import PcpInspeccionMiniGA from "./../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionMiniGA";
import PcpInspeccionMiniGB from "./../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionMiniGB";
import PcpInspeccionMiniGC from "./../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionMiniGC";
import PcpInspeccionDv1A from "./../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionDv1A";
import PcpInspeccionDv1B from "./../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionDv1B";
import PcpInspeccionDv1C from "./../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionDv1C";
import PcpInspeccionCougarA from "./../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionCougarA";
import PcpInspeccionCougarB from "./../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionCougarB";
import PcpInspeccionCougarC from "./../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionCougarC";
import PcpInspeccionVH60A from "../components/forms/etapas/PCPForm/PcpInspeccion/PcpInspeccionVH60A";
import EtapasRoutes from "./EtapasRoutes";
import ConsultarOt from "../components/forms/etapas/ConsultarOt";
import PcpEnsayoVH60A from "../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoVh60A";
import PcpEnsayoVH60B from "../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoVH60B";
import ClienteDashboard from "../viewsCliente/ClienteDashboard";
import ImagenForm from "../components/forms/ImagenForm";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoutes />}>
        <Route index element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={CLIENTE_VIEW} element={<ClienteDashboard/>}/>
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
          <Route path={IMAGEN} element={<ImagenForm/>} />

          {/* <Route>
              <EtapasRoutes/>
            </Route> */}
          <Route path={CONSULTA} element={<ConsultarOt />} />
          <Route path={ETAPA} element={<Etapas />}>
            <Route path={PCP_INGRESO} element={<PcpIngreso />} />

            <Route
              path={PCP_INSPECCION_VH60_A}
              element={<PcpInspeccionVH60A />}
            />
            <Route
              path={PCP_INSPECCION_VH60_B}
              element={<PcpInspeccionVH60B />}
            />
            <Route
              path={PCP_INSPECCION_VH60_C}
              element={<PcpInspeccionVH60C />}
            />
            <Route
              path={PCP_INSPECCION_MINIG_A}
              element={<PcpInspeccionMiniGA />}
            />
            <Route
              path={PCP_INSPECCION_MINIG_B}
              element={<PcpInspeccionMiniGB />}
            />
            <Route
              path={PCP_INSPECCION_MINIG_C}
              element={<PcpInspeccionMiniGC />}
            />
            <Route
              path={PCP_INSPECCION_DV1_A}
              element={<PcpInspeccionDv1A />}
            />
            <Route
              path={PCP_INSPECCION_DV1_B}
              element={<PcpInspeccionDv1B />}
            />
            <Route
              path={PCP_INSPECCION_DV1_C}
              element={<PcpInspeccionDv1C />}
            />
            <Route
              path={PCP_INSPECCION_COUGAR_A}
              element={<PcpInspeccionCougarA />}
            />
            <Route
              path={PCP_INSPECCION_COUGAR_B}
              element={<PcpInspeccionCougarB />}
            />
            <Route
              path={PCP_INSPECCION_COUGAR_C}
              element={<PcpInspeccionCougarC />}
            />

            <Route path={PCP_RECEPCION} element={<PcpRecepcion />} />

            <Route path={PCP_ENSAYO} element={<PcpEnsayoVH60A />} />
            <Route path={PCP_ENSAYO_VH60_B} element={<PcpEnsayoVH60B />} />

            <Route path={PCP_SALIDA} element={<PcpSalida />} />

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
