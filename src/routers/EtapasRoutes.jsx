import Etapas from "../components/forms/etapas/Etapas";
import PcpEnsayo from "../components/forms/etapas/PCPForm/PcpEnsayo";
import PcpIngreso from "../components/forms/etapas/PCPForm/PcpIngreso";
import PcpInspeccion from "../components/forms/etapas/PCPForm/PcpInspeccion";
import PcpRecepcion from "../components/forms/etapas/PCPForm/PcpRecepcion";
import PcpSalida from "../components/forms/etapas/PCPForm/PcpSalida";
import UclIngreso from "../components/forms/etapas/UCLForm/UclIngreso";
import UclInspeccion from "../components/forms/etapas/UCLForm/UclInspeccion";
import UclRecepcion from "../components/forms/etapas/UCLForm/UclRecepcion";
import {
  ENSAYOBM,
  ENSAYOPCP,
  ENSAYOUCL,
  ETAPA,
  INGRESOBM,
  INGRESOPCP,
  INGRESOUCL,
  INSPECCIONBM,
  INSPECCIONPCP,
  INSPECCIONUCL,
  RECEPCIONBM,
  RECEPCIONPCP,
  RECEPCIONUCL,
  SALIDABM,
  SALIDAPCP,
  SALIDAUCL,
} from "../config/routes/paths";
import { Route, Routes } from "react-router-dom";

const EtapasRoutes = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default EtapasRoutes;
