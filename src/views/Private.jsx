import { Link } from "react-router-dom";
import { LOGOUT } from "../config/routes/paths";

const Private = () => {
  return (
    <div>
      <h1>Ruta privada</h1>
      <Link to={LOGOUT}>Cerrar Sesión</Link>
    </div>
  );
};

export default Private;
