import React, { useState, useEffect } from "react";
import "./Etapas.css";
import { Link, Outlet } from "react-router-dom";
import {
  PCP_ENSAYO,
  PCP_INGRESO,
  PCP_INSPECCION_MINIG_A,
  PCP_INSPECCION_VH60_A,
  PCP_RECEPCION,
  PCP_SALIDA,
} from "../../../config/routes/paths";
import OtService from "../../../services/OtService";


const Etapas = () => {

  const ordenId = window.localStorage.getItem("ordenId");

  // window.localStorage.setItem("numeroOT", numeroOT);
  // window.localStorage.setItem("equipo", equipo);

  const [equipo, setEquipo] = useState();
  const [numeroOT, setNumeroOT] = useState();

  useEffect(() => {
      const fetchEtapasData = async () => {
        try {
          const response = await OtService.getOtById(ordenId) 
          setEquipo(response.data.equipo.tipoEquipo.tipo);
          setNumeroOT(response.data.numeroOT);
          console.log("Datos recibidos:", response.data);
          console.log(equipo);
          
        } catch (error) {
          console.error("Error al obtener los datos de recepción:", error);
        }
      };
  
      fetchEtapasData();
    }, []); 
  
  

  return (
    <div className="etapas-container">
      <nav className="nav-container">
        <Link to={PCP_INGRESO}>
          <div className="round-button">
            <span className="etapa-name">I</span>
          </div>
        </Link>

        <Link to={PCP_RECEPCION}>
          <div className="round-button">
            <span className="etapa-name">R</span>
          </div>
        </Link>

        <Link to={PCP_INSPECCION_VH60_A}>
          <div className="round-button">
            <span className="etapa-name">I</span>
          </div>
        </Link>

        <Link to={PCP_ENSAYO}>
          <div className="round-button">
            <span className="etapa-name">E</span>
          </div>
        </Link>

        <Link to={PCP_SALIDA}>
          <div className="round-button">
            <span className="etapa-name">S</span>
          </div>
        </Link>
      </nav>
      <h2>{equipo} | OT N° {numeroOT}</h2>
      {/* <h1>Hola manoma {tipoEquipo} - {modeloEquipo} -{marcaEquipo} - {etapaActual}</h1> */}
      <div className="etapas-forms">
        <Outlet />
      </div>
    </div>
  );
};

export default Etapas;
