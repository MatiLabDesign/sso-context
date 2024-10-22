import React from "react";
import "./PcpFormStyle.css";
import { RECEPCIONPCP } from "../../../../config/routes/paths";
import { Link } from "react-router-dom";
import TipoEquipo from './../../../../views/TipoEquipo';

const PcpIngreso = ({ numeroOT }) => {
  //GET getOtByNumeroOT
  const numeroOrden = window.localStorage.getItem('numeroOT');
  const tipoEquipo = window.localStorage.getItem('tipoEquipo');
  
  return (
    <div>
      <h1>INGRESO</h1>
      <h3>{numeroOrden} | {tipoEquipo}</h3>
      {/* <label htmlFor="input-comentario">Fecha de ingreso:{numeroOT}</label>
      <label htmlFor="input-comentario">Tipo Equipo</label>
      <label htmlFor="input-comentario">Marca</label>
      <label htmlFor="input-comentario">Modelo</label> */}
      <Link to={RECEPCIONPCP}>
        <button className="btn">Comenzar</button>
      </Link>
    </div>
  );
};

export default PcpIngreso;
