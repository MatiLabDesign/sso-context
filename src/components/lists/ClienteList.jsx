import React from "react";
import style from "./ListStyle.module.css";
import ClienteService from "../../services/ClienteService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    ClienteService.getAllClientes()
      .then((response) => {
        setClientes(response.data);
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
    ? clientes
    : clientes.filter((dato) =>
        dato.razonSocial.toLowerCase().includes(search.toLocaleLowerCase())
      );

  //----------------------------
  return (
    <div className={style.list_container}>
      <div className={style.search_container}>
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Filtrar Cliente por Razón Social"
          className={style.form_control}
        />
      </div>

      <div className={style.table_container}>
        <Link to="nuevo">
          <button className={style.form_control_s}>Crear Cliente</button>
        </Link>
        <table className={style.tabla}>
          <thead>
            <tr className={style.table_row}>
              <th className={style.lists_tittles} scope="col">
                Razón Social
              </th>
              <th className={style.lists_tittles} scope="col">
                Cuit
              </th>
              <th className={style.lists_tittles} scope="col">
                Area
              </th>
              <th className={style.lists_tittles} scope="col">
                Nombre
              </th>
              <th className={style.lists_tittles} scope="col">
                Telefono
              </th>
              <th className={style.lists_tittles} scope="col">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="linea-lista">
            {results.map((cliente) => (
              <tr className={style.table_row} key={cliente.id}>
                {/* <td id="contenido-lista">{cliente.id}</td> */}
                <td className={style.list_content}>{cliente.razonSocial}</td>
                <td className={style.list_content}>{cliente.cuit}</td>
                <td className={style.list_content}>{cliente.area}</td>
                <td className={style.list_content}>{cliente.nombreContacto}</td>
                <td className={style.list_content}>{cliente.telefono}</td>
                <td className={style.list_content}>{cliente.mail}</td>
                {/* <td>
                <Link className="btn-enlace" to={`/editar-sede/${sede.id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="blue"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
                </Link>
              </td>
              <td>
                <Link className="btn-enlace" to={`/editar-sede/${sede.id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="red"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
                </Link>
              </td>               */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClienteList;
