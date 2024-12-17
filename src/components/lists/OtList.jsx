import React, { useState, useEffect } from "react";
import style from "./ListStyle.module.css";
import OtService from "../../services/OtService";
import {Link} from "react-router-dom";
import Renderizador from "../renderizador/Renderizador";
// import { ETAPA } from "../../config/routes/paths";
// import Etapas from "../forms/etapas/Etapas";

const OtList = () => {
  const [ots, setOts] = useState([]);
  const [search, setSearch] = useState("");

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

  const [selectedComponent, setSelectedComponent] = useState(null);
  window.localStorage.setItem("selectedComponent", selectedComponent);

  const handleComponentRender = (ots) => {
    const ordenId = ots.id;
    const tipoEquipo = ots.equipo.tipoEquipo.tipo;
    const modeloEquipo = ots.equipo.tipoEquipo.modelo;
    const marcaEquipo = ots.equipo.tipoEquipo.marca;
    const etapaActual = ots.etapaActual;
    const numeroOT = ots.numeroOT;
    window.localStorage.setItem("ordenId", ordenId);
    window.localStorage.setItem("tipoEquipo", tipoEquipo);
    window.localStorage.setItem("modeloEquipo", modeloEquipo);
    window.localStorage.setItem("marcaEquipo", marcaEquipo);
    window.localStorage.setItem("etapaActual", etapaActual);
    window.localStorage.setItem("numeroOT", numeroOT);
    
    console.log(tipoEquipo);
    console.log(modeloEquipo);
    console.log(marcaEquipo);
    console.log(etapaActual);
    console.log(numeroOT);
    console.log(ordenId);
    console.log(selectedComponent);

    if (tipoEquipo === "PCP") {
      switch (etapaActual) {
        case "1":
          setSelectedComponent("Component1");
          break;
        case "2":
          setSelectedComponent("Component2");
          break;
        case "3":
          setSelectedComponent("Component3");
          break;
        case "4":
          setSelectedComponent("Component4");
          break;
        case "5":
          setSelectedComponent("Component5");
          break;
        default:
          setSelectedComponent(null);
      }
    } else if (tipoEquipo === "UCL") {
      switch (etapaActual) {
        case "1":
          setSelectedComponent("Component6");
          // navigate('/dashboard/etapa');
          break;
        case "2":
          setSelectedComponent("Component7");
          break;
        case "3":
          setSelectedComponent("Component8");
          break;
        case "4":
          setSelectedComponent("Component9");
          break;
        case "5":
          setSelectedComponent("Component10");
          break;
        default:
          setSelectedComponent(null);
      }
    } else if (tipoEquipo === "BM") {
      switch (etapaActual) {
        case "1":
          setSelectedComponent("Component11");
          break;
        case "2":
          setSelectedComponent("Component12");
          break;
        case "3":
          setSelectedComponent("Component13");
          break;
        case "4":
          setSelectedComponent("Component14");
          break;
        case "5":
          setSelectedComponent("Component15");
          break;
        default:
          setSelectedComponent(null);
      }
    } else {
      console.log("no anduvo");
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
            <thead className={style.table_head}>
              <tr className={style.table_row}>
                <th className={style.lists_tittles} scope="col">
                  N° OT
                </th>
                <th className={style.lists_tittles_tittle} scope="col">
                  Tipo de Equipo
                </th>
                <th className={style.lists_tittles} scope="col">
                  Etapa
                </th>
              </tr>
            </thead>
            <tbody className={style.table_body}>
              {results.map((ots) => (
                <tr className={style.table_row} key={ots.id}>
                  <td className={style.list_content}>
                    <Link className={style.link_list}  onClick={() => handleComponentRender(ots)} >
                      {ots.numeroOT}
                    </Link>
                  </td>
                  <td className={style.list_content_content}>
                    {ots.equipo.tipoEquipo.tipo} - {ots.equipo.tipoEquipo.modelo} - {ots.equipo.tipoEquipo.marca}
                  </td>
                  <td className={style.list_content}>{ots.etapaActual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Renderiza el componente adecuado según el estado */}
        <Renderizador selectedComponent={selectedComponent} />
      </div>
  );
};

export default OtList;
