import style from "./SidebarStyle.module.css";
import { RiFilePaper2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { LuServer } from "react-icons/lu";
import { RiUser4Line } from "react-icons/ri";
import { CgPlayPauseR } from "react-icons/cg";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuUsers2 } from "react-icons/lu";
import {
  CLIENT,
  EQUIPO,
  LOGOUT,
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
        <Link className={style.bbtn} to={OT}>
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
        <Link to={LOGOUT}>Cerrar Sesión</Link>
      </div>
    </div>
  );
};

export default Sidebar;
