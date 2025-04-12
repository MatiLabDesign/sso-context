import { Routes, Route } from "react-router-dom";
import {
  ENSAYOBM,
  ENSAYOUCL,
  ETAPA,
  INGRESOBM,
  INGRESOUCL,
  INSPECCIONBM,
  INSPECCIONUCL,
  PCP_ENSAYO,
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
  RECEPCIONBM,
  RECEPCIONUCL,
  SALIDABM,
  SALIDAUCL,
} from "../config/routes/paths";

import Etapas from "../components/forms/etapas/Etapas";
import PcpIngreso from "../components/forms/etapas/PCPForm/PcpIngreso";
import PcpRecepcion from "../components/forms/etapas/PCPForm/PcpRecepcion";

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
import PcpEnsayoVH60A from "../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoVh60A";

const EtapasRoutes = () => {
  return (
    <React.Fragment>
    
      <Route path={PCP_INGRESO} element={<PcpIngreso />} />

      <Route path={PCP_INSPECCION_VH60_A} element={<PcpInspeccionVH60A />} />
      <Route path={PCP_INSPECCION_VH60_B} element={<PcpInspeccionVH60B />} />
      <Route path={PCP_INSPECCION_VH60_C} element={<PcpInspeccionVH60C />} />
      <Route path={PCP_INSPECCION_MINIG_A} element={<PcpInspeccionMiniGA />} />
      <Route path={PCP_INSPECCION_MINIG_B} element={<PcpInspeccionMiniGB />} />
      <Route path={PCP_INSPECCION_MINIG_C} element={<PcpInspeccionMiniGC />} />
      <Route path={PCP_INSPECCION_DV1_A} element={<PcpInspeccionDv1A />} />
      <Route path={PCP_INSPECCION_DV1_B} element={<PcpInspeccionDv1B />} />
      <Route path={PCP_INSPECCION_DV1_C} element={<PcpInspeccionDv1C />} />
      <Route path={PCP_INSPECCION_COUGAR_A} element={<PcpInspeccionCougarA />} />
      <Route path={PCP_INSPECCION_COUGAR_B} element={<PcpInspeccionCougarB />} />
      <Route path={PCP_INSPECCION_COUGAR_C} element={<PcpInspeccionCougarC />} />

      <Route path={PCP_RECEPCION} element={<PcpRecepcion />} />

      <Route path={PCP_ENSAYO} element={<PcpEnsayoVH60A />} />

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
      </React.Fragment>
  );
};

export default EtapasRoutes;
