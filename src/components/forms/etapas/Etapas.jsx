import React from "react";
import "./Etapas.css";
import { Link, Outlet } from "react-router-dom";
import { ENSAYO, INGRESO, INSPECCION, RECEPCION, SALIDA } from "../../../config/routes/paths";

const Etapas = () => {
  return (
    <div className="etapas-container">
      <nav className="nav-container">

    <Link to={INGRESO}>
      <div className="round-button">
        <span className="etapa-name">I</span>
      </div>
    </Link>
    <Link to={RECEPCION}>
      <div className="round-button">
        <span className="etapa-name">R</span>
      </div>
    </Link>
    <Link to={INSPECCION}>
      <div className="round-button">
        <span className="etapa-name">I</span>
      </div>
    </Link>
    <Link to={ENSAYO}>
      <div className="round-button">
        <span className="etapa-name">E</span>
      </div>
    </Link>
    <Link to={SALIDA}>
      <div className="round-button">
        <span className="etapa-name">S</span>
      </div>
    </Link>
      
      </nav>

      <div className="etapas-forms">
        <Outlet />
      </div>
    </div>
  );
};

export default Etapas;
