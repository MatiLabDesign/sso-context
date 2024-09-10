import style from "./SidebarStyle.module.css";
import { CLIENT, LOGOUT } from "../../config/routes/paths";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={style.menu_container}>
      <span>Sidebar</span>
      <ul className="list">
        <li className="list-item">
          <Link to={CLIENT}>cliente</Link>
          {/* no dirije bien este código */}
        </li>
        {/* <li className="list-item">
            <a href="/ot">Consultar OT</a>
          </li> */}
        {/* <li className="list-item"><a href="/nuevo">Crear Cliente</a></li> */}
        {/* <li className="list-item">
            <a href="/listar-cliente">Clientes</a>
          </li> */}
      </ul>
      <Link to={LOGOUT}>Cerrar Sesión</Link>
    </div>
  );
};

export default Sidebar;
