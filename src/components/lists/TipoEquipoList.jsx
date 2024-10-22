import React from "react";
import style from "./ListStyle.module.css";
import TipoEquipoService from "../../services/TipoEquipoService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TipoEquipoList = () => {
  const [tipoEquipos, setTipoEquipos] = useState([]);

  useEffect(() => {
    TipoEquipoService.getAllTipos()
      .then((response) => {
        setTipoEquipos(response.data);
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
    ? tipoEquipos
    : tipoEquipos.filter((dato) =>
        dato.tipo.toLowerCase().includes(search.toLocaleLowerCase())
      );
  //----------------------------

  return (
    <div className={style.list_container}>
      <div className={style.search_container}>
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Filtrar por Tipo de equipo"
          className={style.form_control}
        />
      </div>

      <div className={style.table_container}>
        <Link to="/dashboard/tipoequipo/nuevo-tipo-equipo">
          <button className={style.form_control_s}>Crear Tipo</button>
        </Link>
        <table className={style.tabla}>
          <thead className={style.table_head}>
            <tr className={style.table_row}>
              <th className={style.lists_tittles} scope="col">
                Tipo
              </th>
              <th className={style.lists_tittles} scope="col">
                Marca
              </th>
              <th className={style.lists_tittles} scope="col">
                Modelo
              </th>
            </tr>
          </thead>
          <tbody className={style.table_body}>
            {results.map((tipoEquipo) => (
              <tr className={style.table_row} key={tipoEquipo.id}>
                <td className={style.list_content}>{tipoEquipo.tipo}</td>
                <td className={style.list_content}>{tipoEquipo.marca}</td>
                <td className={style.list_content}>{tipoEquipo.modelo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TipoEquipoList;
