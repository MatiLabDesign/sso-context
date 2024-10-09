import React, { useState, useEffect, createContext } from "react";
import style from "./ListStyle.module.css";
import OtService from "../../services/OtService";
import { Link } from "react-router-dom";
import Renderizador from "../renderizador/Renderizador"; // Importamos el renderizador
import { ETAPA } from "../../config/routes/paths";

export const selectedContext = createContext();

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

  // Función para seleccionar el componente basado en la etapa actual
  const [selectedComponent, setSelectedComponent] = useState(null); // Estado para el componente seleccionado

  const handleComponentRender = (ots) => {
    const tipoEquipo = ots.equipo.tipoEquipo.tipo;
    const etapaActual = ots.etapaAcual;
    const numeroOT = ots.numeroOT;
    console.log(tipoEquipo);
    console.log(etapaActual);
    console.log(numeroOT);

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
          <selectedContext.Provider value={selectedComponent}>
            <tbody className="linea-lista">
              {results.map((ots) => (
                <tr key={ots.id}>
                  <td className={style.list_content}>
                    <Link onClick={() => handleComponentRender(ots)}>
                      {ots.numeroOT}
                    </Link>
                  </td>
                  <td className={style.list_content}>
                    {ots.equipo.tipoEquipo.tipo}
                  </td>
                  <td className={style.list_content}>{ots.etapaAcual}</td>
                </tr>
              ))}
            </tbody>
          </selectedContext.Provider>
        </table>
      </div>

      {/* Renderiza el componente adecuado según el estado */}
      <Renderizador selectedComponent={selectedComponent} />
    </div>
  );
};

export default OtList;
