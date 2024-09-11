import style from "./SidebarStyle.module.css";
import { CLIENT, EQUIPO, LOGOUT, TIPOEQUIPO } from "../../config/routes/paths";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={style.menu_container}>
      <div className={style.img_row}>
        <img className={style.img} src="/trinoilisologo2.png" alt="logo" />
      </div>
      <div className={style.menu_row}>
        <button className={style.bbtn}>Nueva OT</button>
        <ul className={style.list}>
          <div className={style.list_item_container}>
            <li className={style.list_item}>
              <Link to={CLIENT}>Clientes</Link>
            </li>
          </div>
          <div className={style.list_item_container}>
            <li className={style.list_item}>
              <Link to={EQUIPO}>Equipos</Link>
            </li>
          </div>
          <div className={style.list_item_container}>
            <li className={style.list_item}>
              <Link to={TIPOEQUIPO}>Tipos de Equipos</Link>
            </li>
          </div>
        </ul>
      </div>
      <div className={style.logout_row}>
        <Link to={LOGOUT}>Cerrar Sesión</Link>
      </div>
    </div>
  );
};

export default Sidebar;
