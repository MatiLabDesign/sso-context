import "./ConsultarOt.css";
import { useNavigate } from "react-router-dom";
import useOrdenData from "../../../hooks/useOrdenData";

const ConsultarOt = () => {
  const navigate = useNavigate();

  const ordenId = window.localStorage.getItem("ordenId");

  const { otActual } = useOrdenData(ordenId);

  //REVISAR LAS ETAPAS PARA UTILIZAR LA CONST ETAPA_LIST
  const etapasMap = {
    1: `ingreso${otActual?.equipo.tipoEquipo.tipo || ""}`,
    2: `recepcion${otActual?.equipo.tipoEquipo.tipo || ""}`,
    3: `inspeccion${otActual?.equipo.tipoEquipo.tipo || ""}${
      otActual?.equipo.tipoEquipo.modelo || ""
    }A`,
    4: `ensayo${otActual?.equipo.tipoEquipo.tipo || ""}`,
    5: `salida${otActual?.equipo.tipoEquipo.tipo || ""}`,
  };

  const handleClick = () => {
    console.log("Evento antes de navegar...");
    navigate(`/dashboard/etapa/${etapasMap[otActual.etapaActual]}`);
  };

  return (
    <div className="consultar_container">
      <div className="title-container">
        <h3 className="titlle-tittle">Equipo</h3>
        <div className="cliente_element">
          <p className="cliente_title">
            {otActual ? otActual.equipo.tipoEquipo.tipo : "Cargando datos..."}
          </p>
        </div>
        <div className="cliente_element">
          <p className="cliente_title">
            {otActual ? otActual.equipo.tipoEquipo.modelo : "Cargando datos..."}
          </p>
        </div>
        <div className="cliente_element">
          <p className="cliente_title">
            {otActual ? otActual.equipo.marca : "Cargando datos..."}
          </p>
        </div>

        <div className="cliente_element">
          <button className="btn" onClick={handleClick}>
            Consultar
          </button>
        </div>
      </div>
      <div className="cliente_element">
        <p className="cliente_title">Número de Serie</p>
        <p>{otActual ? otActual.equipo.numSerieEquipo : "Cargando datos..."}</p>
      </div>

      <h3>Cliente</h3>

      <div className="cliente_container">
        <div className="cliente_divisor">
          <div className="cliente_element">
            <p className="cliente_title">
              {otActual ? otActual.cliente.razonSocial : "Cargando datos..."}
            </p>
          </div>
        </div>
      </div>
      <div className="fila-container">
        <div className="etapa-container">
          <h3 className="estapa-title">Ingreso</h3>
          <div className="cuadrado-rojo"></div>
        </div>
        <div className="etapa-container">
          <h3 className="estapa-title">Recepción</h3>
          {/* <p className="comentario-title">{otActual ? otActual.recepcion.comentario : "Cargando datos..."}</p> */}
          {/* <p className="comentario-title">{otActual ? otActual.inspeccionPcpVh60.comentario : "Cargando datos..."}</p> */}

          <div className="cuadrado-rojo"></div>
        </div>
        <div className="etapa-container">
          <h3 className="estapa-title">Inspección</h3>
          <div className="cuadrado-rojo"></div>
        </div>
        <div className="etapa-container">
          <h3 className="estapa-title">Ensayo</h3>
          <div className="cuadrado"></div>
        </div>
        <div className="etapa-container">
          <h3 className="estapa-title">Salida</h3>
        </div>
      </div>

      {/* <h3>Equipo</h3>
      <div className="equipo_container">
        <div className="equipo_divisor">
          <div className="cliente_element">
            <p className="cliente_title">Tipo</p>
            <p>
              {otActual
                ? otActual.equipo.tipoEquipo.tipo
                : "Cargando datos..."}
            </p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Modelo</p>
            <p>
              {otActual
                ? otActual.equipo.tipoEquipo.modelo
                : "Cargando datos..."}
            </p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Marca</p>
            <p>
              {otActual
                ? otActual.equipo.tipoEquipo.marca
                : "Cargando datos..."}
            </p>
          </div>
        </div>
        <div className="equipo_divisor">
          <div className="cliente_element">
            <p className="cliente_title">Número de Serie</p>
            <p>
              {otActual
                ? otActual.equipo.numSerieEquipo
                : "Cargando datos..."}
            </p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Etapa Actual</p>
            <p>
              {otActual
                ? etapasMap[otActual.etapaActual] || "Etapa desconocida"
                : "Cargando datos..."}
            </p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Estado</p>
            <p className="activa">Activa</p>
          </div>
        </div>
      </div> */}
      {/* <h3>{numeroOrden} | {tipoEquipo}</h3> */}
      {/* <label htmlFor="input-comentario">Fecha de ingreso:{numeroOT}</label>
      <label htmlFor="input-comentario">Tipo Equipo</label>
      <label htmlFor="input-comentario">Marca</label>
      <label htmlFor="input-comentario">Modelo</label> */}
      {/* <Link onClick={() => console.log("Botón clickeado")}> */}
      {/* <button className="btn" onClick={handleClick}>
        Revisar
      </button> */}
      {/* </Link> */}
    </div>
  );
};

export default ConsultarOt;
