import React from "react";
import style from "./ListStyle.module.css";
import EquipoService from "../../services/EquipoService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";



const EquiposList = () => {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    EquipoService.getAllEquipos()
      .then((response) => {
        setEquipos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("el error esta en el useEffect");
      });
  }, []);

  // Search con ternario
  const [search, setSearch] = useState("");

  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  
  const results = !search
    ? equipos
    : equipos.filter((dato) =>
        dato.numSerieEquipo.toLowerCase().includes(search.toLocaleLowerCase())
      );
  //----------------------------

  return (
    <div className={style.list_container}>
      <div className={style.search_container}>
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Filtrar por N° de serie"
          className={style.form_control}
        />
      </div>

      <div className={style.table_container}>
        <Link to="/dashboard/equipo/nuevo-equipo">
          <button className={style.form_control_s}>Crear Equipo</button>
        </Link>
        <table className={style.tabla}>
          <thead className={style.table_head}>
            <tr className={style.table_row}>
              <th className={style.lists_tittles} scope="col">
              N° de Serie
              </th>
              <th className={style.lists_tittles} scope="col">
                Tipo de equipo
              </th>
              {/* <th className={style.lists_tittles} scope="col">
                Remito transporte
              </th> */}
            </tr>
          </thead>
          <tbody className={style.table_body}>
            {results.map((equipo) => (
              <tr className={style.table_row} key={equipo.id}>
                <td className={style.list_content}>{equipo.numSerieEquipo}</td>
                <td className={style.list_content}>{equipo.tipoEquipo.tipo}</td>
                {/* <td className={style.list_content}>{equipo.tipoEquipo.marca}</td>
                <td className={style.list_content}>{equipo.tipoEquipo.modelo}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquiposList;
