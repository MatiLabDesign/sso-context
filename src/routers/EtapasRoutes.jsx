import { Routes, Route } from "react-router-dom";
import {
  ENSAYOBM,
  ETAPA,
  GENERICO_ENSAYO,
  GENERICO_INGRESO,
  GENERICO_INSPECCION,
  GENERICO_RECEPCION,
  GENERICO_SALIDA,
  INGRESOBM,
  INGRESOUCL,
  INSPECCIONBM,
  PCP_ENSAYO_COUGAR_A,
  PCP_ENSAYO_COUGAR_B,
  PCP_ENSAYO_DV1_A,
  PCP_ENSAYO_DV1_B,
  PCP_ENSAYO_MINIG_A,
  PCP_ENSAYO_MINIG_B,
  PCP_ENSAYO_VH60_A,
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
  RECEPCIONBM,
  SALIDABM,
  SALIDAUCL,
  UCL_ENSAYO_A,
  UCL_ENSAYO_B,
  UCL_INSPECCION_A,
  UCL_INSPECCION_B,
  UCL_INSPECCION_C,
  UCL_RECEPCION,
} from "../config/routes/paths";

import Etapas from "../components/forms/etapas/Etapas";
import PcpIngreso from "../components/forms/etapas/PCPForm/PcpIngreso";
import PcpRecepcion from "../components/forms/etapas/PCPForm/PcpRecepcion";

import PcpEnsayo from "../components/forms/etapas/PCPForm/PcpEnsayo";
import PcpSalida from "../components/forms/etapas/PCPForm/PcpSalida";
import UclEnsayo from "../components/forms/etapas/UCLForm/UCLEnsayo/UclEnsayo";
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
import PcpEnsayoVH60B from "../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoVH60B";
import PcpEnsayoVH60A from "../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoVH60A";
import UclInspeccionA from "../components/forms/etapas/UCLForm/UCLInspeccion/UclInspeccionA";
import PcpEnsayoDv1A from "../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoDv1A";
import PcpEnsayoMiniGA from "./../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoMiniGA";
import PcpEnsayoMiniGB from "./../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoMiniGB";
import PcpEnsayoCougarA from "../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoCougarA";
import PcpEnsayoDv1B from "../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoDv1B";
import PcpEnsayoCougarB from "../components/forms/etapas/PCPForm/PcpEnsayo/PcpEnsayoCougarB";
import UclInspeccionB from "../components/forms/etapas/UCLForm/UCLInspeccion/UclInspeccionB";
import UclInspeccionC from "../components/forms/etapas/UCLForm/UCLInspeccion/UclInspeccionC";
import UclEnsayoA from "../components/forms/etapas/UCLForm/UCLEnsayo/UclEnsayoA";
import UclEnsayoB from "../components/forms/etapas/UCLForm/UCLEnsayo/UclEnsayoB";
import GenericoIngreso from "../components/forms/etapas/GenericoForm/GenericoIngreso";
import GenericoRecepcion from "../components/forms/etapas/GenericoForm/GenericoRecepcion";
import GenericoInspeccion from "../components/forms/etapas/GenericoForm/GenericoInspeccion";
import GenericoEnsayo from "../components/forms/etapas/GenericoForm/GenericoEnsayo";
import GenericoSalida from "../components/forms/etapas/GenericoForm/GenericoSalida";

export const EtapasRoutes = () => {
  return (
    <Route path="etapa" element={<Etapas />}>
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

      {/* <Route path={PCP_ENSAYO} element={<PcpEnsayoVH60A />} /> */}
      <Route path={PCP_ENSAYO_VH60_A} element={<PcpEnsayoVH60A />} />
      <Route path={PCP_ENSAYO_VH60_B} element={<PcpEnsayoVH60B />} />
      <Route path={PCP_ENSAYO_DV1_A} element={<PcpEnsayoDv1A />} />
      <Route path={PCP_ENSAYO_DV1_B} element={<PcpEnsayoDv1B />} />
      <Route path={PCP_ENSAYO_MINIG_A} element={<PcpEnsayoMiniGA />} />
      <Route path={PCP_ENSAYO_MINIG_B} element={<PcpEnsayoMiniGB />} />
      <Route path={PCP_ENSAYO_COUGAR_A} element={<PcpEnsayoCougarA />} />
      <Route path={PCP_ENSAYO_COUGAR_B} element={<PcpEnsayoCougarB />} />

      <Route path={PCP_SALIDA} element={<PcpSalida />} />

      <Route path={INGRESOUCL} element={<UclIngreso />} />
      <Route path={UCL_RECEPCION} element={<UclRecepcion />} />

      <Route path={UCL_INSPECCION_A} element={<UclInspeccionA />} />
      <Route path={UCL_INSPECCION_B} element={<UclInspeccionB />} />
      <Route path={UCL_INSPECCION_C} element={<UclInspeccionC />} />

      <Route path={UCL_ENSAYO_A} element={<UclEnsayoA />} />
      <Route path={UCL_ENSAYO_B} element={<UclEnsayoB />} />
      <Route path={SALIDAUCL} element={<UclSalida />} />
      <Route path={INGRESOBM} element={<BombaIngreso />} />
      <Route path={RECEPCIONBM} element={<BombaRecepcion />} />
      <Route path={INSPECCIONBM} element={<BombaInspeccion />} />
      <Route path={ENSAYOBM} element={<BombaEnsayo />} />
      <Route path={SALIDABM} element={<BombaSalida />} />
      <Route path={GENERICO_INGRESO} element={<GenericoIngreso/>} />
      <Route path={GENERICO_RECEPCION} element={<GenericoRecepcion />} />
      <Route path={GENERICO_INSPECCION} element={<GenericoInspeccion />} />
      <Route path={GENERICO_ENSAYO} element={<GenericoEnsayo />} />
      <Route path={GENERICO_SALIDA} element={<GenericoSalida />} />
    </Route>
  );
};
