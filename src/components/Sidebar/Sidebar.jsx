import style from "./SidebarStyle.module.css";
import { CLIENT, EQUIPO, LOGOUT } from "../../config/routes/paths";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={style.menu_container}>
      <span>Sidebar</span>
      <ul className="list">
        <li className="list-item">
          <Link to={CLIENT}>Clientes</Link>
        </li>
        <li className="list-item">
          <Link to={EQUIPO}>Equipos</Link>
        </li>
      </ul>
      <Link to={LOGOUT}>Cerrar Sesión</Link>
    </div>
  );
};

export default Sidebar;
