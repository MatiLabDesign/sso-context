import React from "react";
import './PcpFormStyle.css';
import { RECEPCION } from "../../../../config/routes/paths";
import { Link } from "react-router-dom";

const PcpIngreso = () => {
  return (
    <div>
      <h1>PCP INGRESO</h1>
      
      <label htmlFor="input-comentario">Fecha de ingreso:</label>
      <label htmlFor="input-comentario">Tipo Equipo</label>
      <label htmlFor="input-comentario">Marca</label>
      <label htmlFor="input-comentario">Modelo</label>
      <Link to={RECEPCION}>

      <button  className="btn">Comenzar</button>
      </Link>
      {/* <textarea name="comentario" className="comentario" /> */}
    </div>
  );
};

export default PcpIngreso;
