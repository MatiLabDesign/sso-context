import React from "react";
import "./BombaFormStyle.css";
import { RECEPCIONBM } from "../../../../config/routes/paths";
import { Link } from "react-router-dom";

const BombaIngreso = () => {
  return (
    <div>
      <h1>BOMBA INGRESO</h1>

      {/* <label htmlFor="input-comentario">Fecha de ingreso:</label>
      <label htmlFor="input-comentario">Tipo Equipo</label>
      <label htmlFor="input-comentario">Marca</label>
      <label htmlFor="input-comentario">Modelo</label> */}
      <Link to={RECEPCIONBM}>
        <button className="btn">Comenzar</button>
      </Link>
    </div>
  );
};

export default BombaIngreso;
