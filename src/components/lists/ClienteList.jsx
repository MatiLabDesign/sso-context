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
                Nombre Fantasia
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
              <tr key={cliente.id}>
                <td className={style.list_content}>{cliente.razonSocial}</td>
                <td className={style.list_content}>{cliente.nombreFantasia}</td>
                <td className={style.list_content}>{cliente.cuit}</td>
                <td className={style.list_content}>{cliente.area}</td>
                <td className={style.list_content}>{cliente.nombreContacto}</td>
                <td className={style.list_content}>{cliente.telefono}</td>
                <td className={style.list_content}>{cliente.mail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClienteList;
