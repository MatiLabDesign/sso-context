import React, { useEffect, useState } from "react";
import "./ConsultarOt.css";
import { PCP_RECEPCION } from "../../../config/routes/paths";
import { useNavigate } from "react-router-dom";
import TipoEquipo from "./../../../views/TipoEquipo";
import OtService from "../../../services/OtService";

const ConsultarOt = () => {
  const navigate = useNavigate();
  



  //GET getOtByNumeroOT
//   const numeroOrden = window.localStorage.getItem("numeroOT");
  // const ordenID = window.localStorage.getItem('ordenId');
//   const tipoEquipo = window.localStorage.getItem("tipoEquipo");

  const [ordenData, setOrdenData] = useState(null); // Estado para almacenar los datos de la orden

  const ordenId = window.localStorage.getItem("ordenId");

  useEffect(() => {
    const fetchIngresoOrdenData = async () => {
      if (!ordenId) return; // Si no hay ordenId, no hace nada

      try {
        const response = await OtService.getOtById(ordenId);
        if (response.data) {
          setOrdenData(response.data); // Guardamos los datos en el estado
        }
      } catch (error) {
        console.error("Error al obtener los datos de recepción:", error);
      }
    };

    fetchIngresoOrdenData();
  }, [ordenId]);

  const etapasMap = {
    1: `ingreso${ordenData?.equipo.tipoEquipo.tipo || ""}`,
    2: `recepcion${ordenData?.equipo.tipoEquipo.tipo || ""}`,
    3: `inspeccion${ordenData?.equipo.tipoEquipo.tipo || ""}${ordenData?.equipo.tipoEquipo.modelo || ""}A`,
    4: `ensayo${ordenData?.equipo.tipoEquipo.tipo || ""}`,
    5: `salida${ordenData?.equipo.tipoEquipo.tipo || ""}`
  };

  const handleClick = () => {
    console.log("Evento antes de navegar...");
    // Aquí puedes hacer validaciones, guardar datos, etc.
    // navigate(PCP_RECEPCION);
    // navigate(
    //   `/dashboard/etapa/${etapasMap[ordenData.etapaActual]}${ordenData?.equipo.tipoEquipo.modelo}A`
    // );
    navigate(
      `/dashboard/etapa/${etapasMap[ordenData.etapaActual]}`
    );
  };

  return (
    <div className="consultar_container">
      <h3>Cliente</h3>
      <div className="cliente_container">
        <div className="cliente_divisor">
          <div className="cliente_element">
            <p className="cliente_title">Razón Social</p>
            <p>
              {ordenData ? ordenData.cliente.razonSocial : "Cargando datos..."}
            </p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Contacto</p>
            <p>
              {ordenData
                ? ordenData.cliente.nombreContacto
                : "Cargando datos..."}
            </p>
          </div>
        </div>
        <div className="cliente_divisor">
          <div className="cliente_element">
            <p className="cliente_title">E-mail</p>
            <p>{ordenData ? ordenData.cliente.mail : "Cargando datos..."}</p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">WhatsApp</p>
            <p>
              {ordenData ? ordenData.cliente.telefono : "Cargando datos..."}
            </p>
          </div>
        </div>
      </div>
      <h3>Equipo</h3>
      <div className="equipo_container">
        <div className="equipo_divisor">
          <div className="cliente_element">
            <p className="cliente_title">Tipo</p>
            <p>
              {ordenData
                ? ordenData.equipo.tipoEquipo.tipo
                : "Cargando datos..."}
            </p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Modelo</p>
            <p>
              {ordenData
                ? ordenData.equipo.tipoEquipo.modelo
                : "Cargando datos..."}
            </p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Marca</p>
            <p>
              {ordenData
                ? ordenData.equipo.tipoEquipo.marca
                : "Cargando datos..."}
            </p>
          </div>
        </div>
        <div className="equipo_divisor">
          <div className="cliente_element">
            <p className="cliente_title">Número de Serie</p>
            <p>
              {ordenData
                ? ordenData.equipo.numSerieEquipo
                : "Cargando datos..."}
            </p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Etapa Actual</p>
            <p>
              {ordenData
                ? etapasMap[ordenData.etapaActual] || "Etapa desconocida"
                : "Cargando datos..."}
            </p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Estado</p>
            <p className="activa">
              Activa
            </p>
          </div>
        </div>
      </div>
      {/* <h3>{numeroOrden} | {tipoEquipo}</h3> */}
      {/* <label htmlFor="input-comentario">Fecha de ingreso:{numeroOT}</label>
      <label htmlFor="input-comentario">Tipo Equipo</label>
      <label htmlFor="input-comentario">Marca</label>
      <label htmlFor="input-comentario">Modelo</label> */}
      {/* <Link onClick={() => console.log("Botón clickeado")}> */}
      <button className="btn" onClick={handleClick}>
        Revisar
      </button>
      {/* </Link> */}
    </div>
  );
};

export default ConsultarOt;
