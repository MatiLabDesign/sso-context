import { Route } from "react-router-dom";
import {
  PRIVATE,
  CLIENT,
  TIPOEQUIPO,
  EQUIPO,
  CREATECLIENTE,
  CREATEEQUIPO,
  CREATETIPOEQUIPO,
  OT,
  OTLIST,
  IMAGEN,
  IMAGEN_INSPECCION,
  IMAGENUPDATE,
  CONSULTA,
  LOGOUT,
} from "../config/routes/paths";

import PrivateRoutes from "../components/router/PrivateRoutes";
import Private from "../views/Private";
import Client from "../views/Client";
import TipoEquipo from "../views/TipoEquipo";
import Equipo from "../views/Equipo";
import CreateCliente from "../views/CreateCliente";
import CreateEquipo from "../views/CreateEquipo";
import CreateTipoEquipo from "../views/CreateTipoEquipo";
import OtForm from "../components/forms/OtForm";
import Ot from "../views/Ot";
import ImagenForm from "../components/forms/ImagenForm";
import ImagenFormInspeccion from "../components/forms/ImagenFormInspeccion";
import ImagenUpdateForm from "../components/forms/ImagenUpdateForm";
import ConsultarOt from "../components/forms/etapas/ConsultarOt";
import Logout from "../views/Logout";

import { EtapasRoutes } from "./EtapasRoutes";

export const PrivateRoutesComponent = () => (
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
      <Route path={IMAGEN} element={<ImagenForm />} />
      <Route path={IMAGEN_INSPECCION} element={<ImagenFormInspeccion />} />
      <Route path={IMAGENUPDATE} element={<ImagenUpdateForm />} />
      <Route path={CONSULTA} element={<ConsultarOt />} />

      {EtapasRoutes()}
    </Route>
    <Route path={LOGOUT} element={<Logout />} />
  </Route>
);

