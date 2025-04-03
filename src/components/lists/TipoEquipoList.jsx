import React from "react";
import style from "./ListStyle.module.css";
import TipoEquipoService from "../../services/TipoEquipoService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TipoEquipoList = () => {
  

  const [tipoEquipos, setTipoEquipos] = useState([]);

  useEffect(() => {
    const fetchTipoEquipos = async ()=>{
      try{
        const response = await TipoEquipoService.getAllTipos()
        setTipoEquipos(response.data);
        console.log(response.data);
      } catch(error){
        console.log('error useEffect');
      }
    
    };
    fetchTipoEquipos();
  },[]);

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
        <div className={style.imagen_container}>
                  <Link to="/dashboard/tipoequipo/nuevo-tipo-equipo">
                    <button className={style.mas_button}>+</button>
                  </Link>
                </div>
        <table className="table-auto">
          <thead className={style.table_head}>
            <tr className={style.table_row}>
              <th className={style.lists_tittles} scope="col">
                Tipo
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
