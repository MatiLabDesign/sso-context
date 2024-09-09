import { Link } from "react-router-dom";
import { LOGOUT } from "../config/routes/paths";
import DashboardPage from "../pages/DashboardPage";

const Private = () => {
  return (
    <div>
      <DashboardPage/>
      <Link to={LOGOUT}>Cerrar Sesión</Link>
    </div>
  );
};

export default Private;
