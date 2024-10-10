import React, { useState, useEffect } from "react";
import style from "./ListStyle.module.css";
import OtService from "../../services/OtService";
import { Link, useNavigate } from "react-router-dom";
import { ENSAYOPCP, ETAPA, INGRESOPCP, INSPECCIONPCP, RECEPCIONPCP, SALIDAPCP } from "../../config/routes/paths";
import { ENSAYOBM, INGRESOBM, INSPECCIONBM, RECEPCIONBM, SALIDABM } from "../../config/routes/paths";
import { ENSAYOUCL, INGRESOUCL, INSPECCIONUCL, RECEPCIONUCL, SALIDAUCL } from "../../config/routes/paths";
import Etapas from "../forms/etapas/Etapas";

const OrdenList = () => {
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
    const numOt = ot.numeroOT;
    const etapaAcual =ot.etapaAcual;
    const tipoEquipo = ot.equipo.tipoEquipo.tipo;
    console.log(ETAPA)
    console.log("este es etapa --" + etapaAcual);
    console.log("este es tipo de equipo --" + tipoEquipo);
    console.log("este es el numero de ot" + numOt);
    console.log(RECEPCIONPCP)
        

    if (tipoEquipo === "PCP") {
      console.log("PCP encontrado, etapa actual: " + etapaAcual);
      switch (etapaAcual) {
        case '1':
          console.log("Navegando a INGRESOPCP");
          navigate('/dashboard/etapa/ingresoPCP'); // Redirigir a componente PCP Etapa 1
          break;
        case '2':
          navigate(RECEPCIONPCP); // Redirigir a componente PCP Etapa 2
          break;
        case '3':
          navigate(INSPECCIONPCP); // Redirigir a componente PCP Etapa 3
          break;
        case '4':
          console.log("Navegando a ENSAYOCP");
          console.log(etapaAcual);
          navigate("/dashboard/etapa/ensayoPCP"); // Redirigir a componente PCP Etapa 4
          break;
        case '5':
          navigate(SALIDAPCP); // Redirigir a componente PCP Etapa 5
          break;
        default:
          break;
      }
    } else if (tipoEquipo === "UCL") {
      switch (etapaAcual) {
        case "1":
          navigate(INGRESOUCL); // Redirigir a componente UCL Etapa 1
          break;
        case "2":
          navigate(RECEPCIONUCL); // Redirigir a componente UCL Etapa 2
          break;
        case "3":
          navigate(INSPECCIONUCL); // Redirigir a componente UCL Etapa 3
          break;
        case "4":
          navigate(ENSAYOUCL); // Redirigir a componente UCL Etapa 4
          break;
        case "5":
          navigate(SALIDAUCL); // Redirigir a componente UCL Etapa 5
          break;
        default:
          break;
      }
    } else if (tipoEquipo === "BM") {
      switch (etapaAcual) {
        case "1":
          navigate(INGRESOBM); // Redirigir a componente BM Etapa 1
          break;
        case "2":
          navigate(RECEPCIONBM); // Redirigir a componente BM Etapa 2
          break;
        case "3":
          navigate(INSPECCIONBM); // Redirigir a componente BM Etapa 3
          break;
        case "4":
          navigate(ENSAYOBM); // Redirigir a componente BM Etapa 4
          break;
        case "5":
          navigate(SALIDABM); // Redirigir a componente BM Etapa 5
          break;
        default:
          break;
      }
    } else {
      console.log('no anduvo');
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
          <tbody>
            {results.map((ot) => (
              <tr className={style.table_row} key={ot.id}>
                <td className={style.list_content}>
                  
                    {ot.numeroOT}
                  
                </td>
                <td className={style.list_content}>
                  {ot.equipo.tipoEquipo.tipo}
                </td>
                <td className={style.list_content}>{ot.etapaAcual}</td>
                <td><Link onClick={() => handleComponentRender(ot)}>ver</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdenList;
