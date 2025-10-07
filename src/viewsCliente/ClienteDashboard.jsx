import React from "react";
import useOrdenData from "../hooks/useOrdenData";
import "./ClienteDashboard.css";
import EquipoClienteList from "./EquipoClienteList";
import { CLIENTE_EQUIPOS, CLIENTE_NUEVOSERVICIO } from "../config/routes/paths";
import { Link } from "react-router-dom";

const ClienteDashboard = () => {
  //  const { allOts, otActual, updateOt, loading, error } = useOrdenData();
  return (
    <div className="grid-container">
      <div className="grid-element element1">Vista Cliente</div>
      <div className="grid-element element2">Bienvenido Matias,</div>
      <div className="buttons-container">
        <Link to="/cliente-equipos"><div className="grid-element element3">Mis Equipos</div></Link>
        <Link to="/cliente-servicio"><div className="grid-element element4">Solicitar Servicio</div></Link>
      </div>

      {/* <h2>Esta es la vista CLIENTE</h2>
      <p className='titulito'>todo lo que ponga aca sale en cliente</p> */}
    </div>
  );
};

export default ClienteDashboard;

