import React, { useState, useEffect } from "react";
import style from "./ListStyle.module.css";
import OtService from "../../services/OtService";
import { Link, useNavigate } from "react-router-dom";
import { ENSAYO, INGRESO, INSPECCION, RECEPCION, SALIDA } from "../../config/routes/paths";

const OtList = () => {
  const [ots, setOts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    OtService.getAllOt()
      .then((response) => {
        setOts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("El error está en el useEffect");
      });
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const results = !search
    ? ots
    : ots.filter((dato) =>
        dato.numeroOT.toLowerCase().includes(search.toLowerCase())
      );

  // Función para seleccionar el componente basado en la etapa y tipo de equipo actual
  const handleComponentRender = (ot) => {
    const { etapaAcual, tipoEquipo } = ot;
    

    if (ot.equipo.tipoEquipo.tipo === "PCP") {
      switch (ot.etapaAcual) {
        case "1":
          navigate(INGRESO); // Redirigir a componente PCP Etapa 1
          break;
        case "2":
          navigate(RECEPCION); // Redirigir a componente PCP Etapa 2
          break;
        case "3":
          navigate(INSPECCION); // Redirigir a componente PCP Etapa 3
          break;
        case "4":
          navigate(ENSAYO); // Redirigir a componente PCP Etapa 4
          break;
        case "5":
          navigate(SALIDA); // Redirigir a componente PCP Etapa 5
          break;
        default:
          break;
      }
    } else if (ot.equipo.tipoEquipo.tipo === "UCL") {
      switch (ot.etapaAcual) {
        case "1":
          navigate("/ucl/etapa1"); // Redirigir a componente UCL Etapa 1
          break;
        case "2":
          navigate("/ucl/etapa2"); // Redirigir a componente UCL Etapa 2
          break;
        case "3":
          navigate("/ucl/etapa3"); // Redirigir a componente UCL Etapa 3
          break;
        case "4":
          navigate("/ucl/etapa4"); // Redirigir a componente UCL Etapa 4
          break;
        case "5":
          navigate("/ucl/etapa5"); // Redirigir a componente UCL Etapa 5
          break;
        default:
          break;
      }
    } else if (ot.equipo.tipoEquipo.tipo === "BM") {
      switch (ot.etapaAcual) {
        case "1":
          navigate("/bm/etapa1"); // Redirigir a componente BM Etapa 1
          break;
        case "2":
          navigate("/bm/etapa2"); // Redirigir a componente BM Etapa 2
          break;
        case "3":
          navigate("/bm/etapa3"); // Redirigir a componente BM Etapa 3
          break;
        case "4":
          navigate("/bm/etapa4"); // Redirigir a componente BM Etapa 4
          break;
        case "5":
          navigate("/bm/etapa5"); // Redirigir a componente BM Etapa 5
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={style.list_container}>
      <div className={style.search_container}>
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Filtrar OT por N°"
          className={style.form_control}
        />
      </div>

      <div className={style.table_container}>
        <table className={style.tabla}>
          <thead>
            <tr className={style.table_row}>
              <th className={style.lists_tittles} scope="col">
                N° OT
              </th>
              <th className={style.lists_tittles} scope="col">
                Tipo de Equipo
              </th>
              <th className={style.lists_tittles} scope="col">
                Etapa
              </th>
            </tr>
          </thead>
          <tbody className="linea-lista">
            {results.map((ot) => (
              <tr className={style.table_row} key={ot.id}>
                <td className={style.list_content}>
                  <Link to={() => handleComponentRender(ot)}>
                    {ot.numeroOT}
                  </Link>
                </td>
                <td className={style.list_content}>
                  {ot.equipo.tipoEquipo.tipo}
                </td>
                <td className={style.list_content}>{ot.etapaAcual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OtList;
