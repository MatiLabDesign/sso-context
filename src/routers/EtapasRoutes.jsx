import Etapas from "../components/forms/etapas/Etapas";
import PcpEnsayo from "../components/forms/etapas/PCPForm/PcpEnsayo";
import PcpIngreso from "../components/forms/etapas/PCPForm/PcpIngreso";
import PcpInspeccion from "../components/forms/etapas/PCPForm/PcpInspeccion";
import PcpRecepcion from "../components/forms/etapas/PCPForm/PcpRecepcion";
import PcpSalida from "../components/forms/etapas/PCPForm/PcpSalida";
import { ENSAYO, ETAPA, INGRESO, INSPECCION, RECEPCION, SALIDA } from "../config/routes/paths";
import { Route } from "react-router-dom";

const EtapasRoutes = () => {
  return (
    <>
      <Route path={ETAPA} element={<Etapas />}>
        <Route path={INGRESO} element={<PcpIngreso />} />
        <Route path={RECEPCION} element={<PcpRecepcion />} />
        <Route path={INSPECCION} element={<PcpInspeccion />} />
        <Route path={ENSAYO} element={<PcpEnsayo />} />
        <Route path={SALIDA} element={<PcpSalida />} />
      </Route>
    </>
  );
};

export default EtapasRoutes;
