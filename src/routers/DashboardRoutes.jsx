import { Route } from "react-router-dom";
import Client from "../views/Client";
import TipoEquipo from "../views/TipoEquipo";
import Equipo from "../views/Equipo";
import CreateCliente from "../views/CreateCliente";
import CreateEquipo from "../views/CreateEquipo";
import CreateTipoEquipo from "../views/CreateTipoEquipo";
import OtForm from "../components/forms/OtForm";
import Ot from "../views/Ot";
import { CLIENT, CREATECLIENTE, CREATEEQUIPO, CREATETIPOEQUIPO, EQUIPO, OT, OTLIST, TIPOEQUIPO } from "../config/routes/paths";

const EtapasRoutes = () => {
  return (
    <>
      <Route path={CLIENT} element={<Client />} />
      <Route path={TIPOEQUIPO} element={<TipoEquipo />} />
      <Route path={EQUIPO} element={<Equipo />} />
      <Route path={CREATECLIENTE} element={<CreateCliente />} />
      <Route path={CREATEEQUIPO} element={<CreateEquipo />} />
      <Route path={CREATETIPOEQUIPO} element={<CreateTipoEquipo />} />
      <Route path={OT} element={<OtForm />} />
      <Route path={OTLIST} element={<Ot />} />
    </>
  );
};

export default EtapasRoutes;
