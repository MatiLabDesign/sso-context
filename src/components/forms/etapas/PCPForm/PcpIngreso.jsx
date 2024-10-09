import React from "react";
import "./PcpFormStyle.css";
import { RECEPCIONPCP } from "../../../../config/routes/paths";
import { Link } from "react-router-dom";

const PcpIngreso = ({ numeroOT }) => {
  //GET getOtByNumeroOT

  return (
    <div>
      <h1>PCP INGRESO</h1>
      <label htmlFor="input-comentario">Fecha de ingreso:{numeroOT}</label>
      <label htmlFor="input-comentario">Tipo Equipo</label>
      <label htmlFor="input-comentario">Marca</label>
      <label htmlFor="input-comentario">Modelo</label>
      <Link to={RECEPCIONPCP}>
        <button className="btn">Comenzar</button>
      </Link>
    </div>
  );
};

export default PcpIngreso;
