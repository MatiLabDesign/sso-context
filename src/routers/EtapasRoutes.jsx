import Etapas from "../components/forms/etapas/Etapas";
import PcpEnsayo from "../components/forms/etapas/PCPForm/PcpEnsayo";
import PcpIngreso from "../components/forms/etapas/PCPForm/PcpIngreso";
import PcpInspeccion from "../components/forms/etapas/PCPForm/PcpInspeccion";
import PcpRecepcion from "../components/forms/etapas/PCPForm/PcpRecepcion";
import PcpSalida from "../components/forms/etapas/PCPForm/PcpSalida";
import { ENSAYOPCP, ETAPA, INGRESOPCP, INSPECCIONPCP, RECEPCIONPCP, SALIDAPCP } from "../config/routes/paths";
import { Route } from "react-router-dom";

const EtapasRoutes = () => {
  return (
    <>
      <Route path={ETAPA} element={<Etapas />}>
        <Route path={INGRESOPCP} element={<PcpIngreso />} />
        <Route path={RECEPCIONPCP} element={<PcpRecepcion />} />
        <Route path={INSPECCIONPCP} element={<PcpInspeccion />} />
        <Route path={ENSAYOPCP} element={<PcpEnsayo />} />
        <Route path={SALIDAPCP} element={<PcpSalida />} />
      </Route>
    </>
  );
};

export default EtapasRoutes;
