import React from "react";
import style from "./ListStyle.module.css";
import OtService from "../../services/OtService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ETAPA } from "../../config/routes/paths";

const OtList = () => {
  const [ots, setOts] = useState([]);

  useEffect(() => {
    OtService.getAllOt()
      .then((response) => {
        setOts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("el error esta en el useEffect");
      });
  }, []);

  //Search con ternario
  const [search, setSearch] = useState("");

  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const results = !search
    ? ots
    : ots.filter((dato) =>
        // Hay que poner el atributo correcto
        dato.numeroOT.toLowerCase().includes(search.toLocaleLowerCase())
      );
  //----------------------------

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
            {results.map((ots) => (
              <tr className={style.table_row} key={ots.id}>
                <td className={style.list_content}>
                  <Link to={ETAPA}>{ots.numeroOT}</Link>
                </td>
                <td className={style.list_content}>
                  {ots.equipo.tipoEquipo.tipo}
                </td>
                <td className={style.list_content}>{ots.equipo.etapa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OtList;
