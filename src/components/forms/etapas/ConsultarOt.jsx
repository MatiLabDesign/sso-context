import "./ConsultarOtNew.css";
import { useNavigate } from "react-router-dom";
import useOrdenData from "../../../hooks/useOrdenData";

const ConsultarOt = () => {
  const navigate = useNavigate();

  const ordenId = window.localStorage.getItem("ordenId");

  const { otActual } = useOrdenData(ordenId);

  const etapaActual = otActual?.etapaActual;
  console.log(etapaActual);

  //REVISAR LAS ETAPAS PARA UTILIZAR LA CONST ETAPA_LIST
  const etapasMap = {
    1: `ingreso${otActual?.equipo.tipoEquipo.tipo || ""}`,
    2: `recepcion${otActual?.equipo.tipoEquipo.tipo || ""}`,
    3: `inspeccion${otActual?.equipo.tipoEquipo.tipo || ""}${
      otActual?.equipo.tipoEquipo.modelo || ""
    }A`,
    4: `inspeccion${otActual?.equipo.tipoEquipo.tipo || ""}${
      otActual?.equipo.tipoEquipo.modelo || ""
    }B`,
    5: `inspeccion${otActual?.equipo.tipoEquipo.tipo || ""}${
      otActual?.equipo.tipoEquipo.modelo || ""
    }C`,
    6: `ensayo${otActual?.equipo.tipoEquipo.tipo || ""}`,
    7: `ensayo${otActual?.equipo.tipoEquipo.tipo || ""}${
      otActual?.equipo.tipoEquipo.modelo || ""
    }B`,
    8: `salida${otActual?.equipo.tipoEquipo.tipo || ""}`,
  };

  ///////////////////ACA TENGO QUE REVISAR LAS URL/////////////////
  const handleClick = () => {
    console.log("Evento antes de navegar...");
    navigate(`/dashboard/etapa/${etapasMap[otActual?.etapaActual]}`);
  };

  return (
    <div className="consultar_container">
      <div className="header">
        <div className="left_column">
          <h2>Consultar OT</h2>
        </div>
        <div className="right_column">
          <div className="header_row">
            <p className="cliente_title">
              {otActual ? otActual.equipo.numSerieEquipo : "Cargando datos..."}
            </p>
          </div>
          <div className="header_row">
            <p className="cliente_title">
              {otActual ? otActual.equipo.tipoEquipo.tipo : "Cargando datos..."}
              {otActual ? otActual.equipo.tipoEquipo.modelo : "Cargando datos..."}
            </p>
          </div>
        </div>
      </div>
      <div className="file">
        <div className="left_column_file">
          <h4>Cliente</h4>
          <p className="cliente_title">
            {otActual ? otActual.cliente.razonSocial : "Cargando datos..."}
          </p>
        </div>
        {/* <div className="right_column_file">
          <h4>Fecha de Ingreso</h4>
          fechaIngreso
        </div> */}
      </div>
      <div className="main_content">
        <table className="table_content">
          {/* <thead>
            <tr>
              <th>Etapas</th>
              <th>Comentarios</th>
              <th>Estado</th>
            </tr>
          </thead> */}
          <tbody>
            <td className="etapas_column">
              <tr className="table_rows">
                <p>Ingreso</p>
              </tr>
              <tr className="table_rows">
                <p>Recepción</p>
              </tr>
              <tr className="table_rows">
                <p>Inspección</p>
              </tr>
              <tr className="table_rows">
                <p>Ensayo</p>
              </tr>
              <tr className="table_rows">
                <p>Salida</p>
              </tr>
            </td>
            <td className="comentario_column">
              <tr className="table_rows">
                <p>Esta es al primera etapa</p>
              </tr>
              <tr className="table_rows">
                <p className="comentario-title">{otActual?.recepcion?.comentario ?? ""}</p>
              </tr>
              <tr className="table_rows">
                <p>comentario 2</p>
              </tr>
              <tr className="table_rows">
                <p>comentario 2</p>
              </tr>
              <tr className="table_rows">
                <p>comentario 2</p>
              </tr>
            </td>
            <td className="estado_column">
              <tr className="table_rows">
                <div
                  className={etapaActual <= 1 ? "cuadrado" : "cuadrado-rojo"}
                ></div>
              </tr>
              <tr className="table_rows">
                <div
                  className={etapaActual <= 2 ? "cuadrado" : "cuadrado-rojo"}
                ></div>
              </tr>
              <tr className="table_rows">
                <div
                  className={
                    etapaActual <= 3
                      ? "cuadrado"
                      : etapaActual == 4
                      ? "cuadrado33"
                      : etapaActual == 5
                      ? "cuadrado66"
                      : "cuadrado-rojo"
                  }
                ></div>
              </tr>
              <tr className="table_rows">
                <div
                  className={
                    etapaActual <= 6
                      ? "cuadrado"
                      : etapaActual == 7
                      ? "cuadrado50"
                      : "cuadrado-rojo"
                  }
                ></div>
              </tr>
              <tr className="table_rows">
                <div
                  className={etapaActual <= 8 ? "cuadrado" : "cuadrado-rojo"}
                ></div>
              </tr>
            </td>
          </tbody>
        </table>
      </div>
      <div className="under_content">
        <div className="cliente_element">
          <button className="btn" onClick={handleClick}>
            Consultar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultarOt;
