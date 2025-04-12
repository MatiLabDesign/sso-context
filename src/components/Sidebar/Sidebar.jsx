import style from "./SidebarStyle.module.css";
import { LuServer } from "react-icons/lu";
import { RiUser4Line } from "react-icons/ri";
import { CgPlayPauseR } from "react-icons/cg";
import { LuUsers2 } from "react-icons/lu";
import { IoMdExit } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import {
  CLIENT,
  CLIENTE_VIEW,
  EQUIPO,
  LOGOUT,
  OS,
  OT,
  OTLIST,
  TIPOEQUIPO,
} from "../../config/routes/paths";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={style.menu_container}>
      <div className={style.img_row}>
        <img className={style.img} src="/trinoilisologo.png" alt="logo" />
      </div>
      <div className={style.menu_row}>
        <Link className={''} to={CLIENTE_VIEW}>
          <button className={style.bbtn2}>Cliente View</button>
        </Link>
        <Link className={''} to={OT}>
          <button className={style.bbtn}>Nueva OT</button>
        </Link>
        <ul className={style.list}>
          <div className={style.list_item_container}>
            <li className={style.list_item}>
              
              <Link to={OTLIST}><div className={style.icon}><CgPlayPauseR /> </div>Consultar OT</Link>
            </li>
          </div>
          <div className={style.list_item_container}>
            <li className={style.list_item}>
              <Link to={CLIENT}><div className={style.icon}><LuUsers2 /></div>Clientes</Link>
            </li>
          </div>
          <div className={style.list_item_container}>
            <li className={style.list_item}>
              <Link to={EQUIPO}><div className={style.icon}><LuServer  /></div>Equipos</Link>
            </li>
          </div>
          <div className={style.list_item_container}>
            <li className={style.list_item}>
              <Link className={style.icon} to={TIPOEQUIPO}><div className={style.icon}><RiUser4Line/></div>Tipos de Equipos</Link>
            </li>
          </div>
        </ul>
      </div>
      <div className={style.logout_row}>
        <Link to={LOGOUT}>Cerrar Sesión<div className={style.icon_exit}><RxExit /></div></Link>
      </div>
    </div>
  );
};

export default Sidebar;
