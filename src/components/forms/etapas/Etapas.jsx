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
import useOrdenData from "../../../hooks/useOrdenData";


const Etapas = () => {

  const ordenId = window.localStorage.getItem("ordenId");

  const { allOts, otActual, updateOt, loading, error } = useOrdenData(ordenId);


  // window.localStorage.setItem("numeroOT", numeroOT);
  // window.localStorage.setItem("equipo", equipo);

  const [tipoEquipo, setTipoEquipo] = useState();
  const [modeloEquipo, setModeloEquipo] = useState();
  const [numeroOT, setNumeroOT] = useState();

  useEffect(() => {
    const fetchEtapasData = async () => {
        try {
            if (otActual) {
                setTipoEquipo(otActual?.equipo?.tipoEquipo?.tipo || "N/A");
                setModeloEquipo(otActual?.equipo?.tipoEquipo?.modelo || "N/A");
                setNumeroOT(otActual?.numeroOT || "Sin número OT");

                console.log("✅ Datos recibidos:", otActual);
                console.log(tipoEquipo);
                console.log(modeloEquipo);
            } else {
                console.error("❌ Error: `otActual` no está definido.");
            }
        } catch (error) {
            console.error("Error al obtener los datos de recepción:", error);
        }
    };

    if (!loading) {
        fetchEtapasData();
    }
}, [otActual, loading]); // <-- Se agrega `otActual` y `loading` a las dependencias
  
const etapasMap = {
  1: `ingreso${otActual?.equipo.tipoEquipo.tipo || ""}`,
  2: `recepcion${otActual?.equipo.tipoEquipo.tipo || ""}`,
  3: `inspeccion${otActual?.equipo.tipoEquipo.tipo || ""}${otActual?.equipo.tipoEquipo.modelo || ""}A`,
  4: `ensayo${otActual?.equipo.tipoEquipo.tipo || ""}`,
  5: `salida${otActual?.equipo.tipoEquipo.tipo || ""}`
};

console.log(otActual);
  

  return (
    <div className="etapas-container">
      <nav className="nav-container">
        <Link to={etapasMap[1]}>
          <div className="round-button">
            <span className="etapa-name">I</span>
          </div>
        </Link>

        <Link to={etapasMap[2]}>
          <div className="round-button">
            <span className="etapa-name">R</span>
          </div>
        </Link>

        <Link to={etapasMap[3]}>
          <div className="round-button">
            <span className="etapa-name">I</span>
          </div>
        </Link>

        <Link to={etapasMap[4]}>
          <div className="round-button">
            <span className="etapa-name">E</span>
          </div>
        </Link>

        <Link to={etapasMap[5]}>
          <div className="round-button">
            <span className="etapa-name">S</span>
          </div>
        </Link>
      </nav>
      {/* <h2>{equipo} | OT N° {numeroOT}</h2> */}
      {/* <h1>Hola manoma {tipoEquipo} - {modeloEquipo} -{marcaEquipo} - {etapaActual}</h1> */}
      <div className="etapas-forms">
        <Outlet />
      </div>
    </div>
  );
};

export default Etapas;
