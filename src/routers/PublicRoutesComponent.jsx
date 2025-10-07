// routes/PublicRoutes.js
import { Route } from "react-router-dom";
import { CLIENTE_EQUIPOS, CLIENTE_NUEVOSERVICIO, CLIENTE_VIEW, LOGIN } from "../config/routes/paths";
import PublicRoutes from "../components/router/PublicRoutes";
import Home from "../views/Home";
import Login from "../views/Login";
import ClienteDashboard from "../viewsCliente/ClienteDashboard";
import EquipoClienteList from "../viewsCliente/EquipoClienteList";
import ServicioClienteForm from "../viewsCliente/ServicioClienteForm";

export const PublicRoutesComponent = () => {
  return (
      <Route path="/" element={<PublicRoutes />}>
        <Route index element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={CLIENTE_VIEW} element={<ClienteDashboard/>}/>
        <Route path={CLIENTE_EQUIPOS} element={<EquipoClienteList/>}/>
        <Route path={CLIENTE_NUEVOSERVICIO} element={<ServicioClienteForm/>}/>
      </Route>
    
  );
};

