import style from './SidebarStyle.module.css'
// import { Outlet } from 'react-router-dom'

const Sidebar = () => {
  let estructura = <h2 className="esto">SIDEBAR</h2>

  return (
    <>
      <h1>{estructura}</h1>
      <div className="menu-container">
        <ul className="list">
          <li className="list-item">
            <a href="/login">Login</a>
          </li>
          {/* <li className="list-item">
            <a href="/ot">Consultar OT</a>
          </li> */}
          {/* <li className="list-item"><a href="/nuevo">Crear Cliente</a></li> */}
          {/* <li className="list-item">
            <a href="/listar-cliente">Clientes</a>
          </li> */}
        </ul>
      </div>

      {/* <Outlet/> */}
    </>
  );
};

export default Sidebar;
