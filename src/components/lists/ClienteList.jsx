import React from "react";
import style from "./ListStyle.module.css";
import ClienteService from "../../services/ClienteService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await ClienteService.getAllClientes();
        setClientes(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("el error está en el useEffect, en este nuevo");
      }
    };
    fetchClientes();
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
        <div className={style.imagen_container}>
          <Link to="nuevo">
            <button className={style.mas_button}>+</button>
          </Link>
        </div>
        <table className="table-auto">
          <thead className={style.table_head}>
            <tr className={style.table_row}>
              <div className={style.row_box}>
                <th className={style.lists_tittles} scope="col">
                  Razón Social
                </th>
                <th className={style.lists_tittles} scope="col">
                  Fantasia
                </th>
                <th className={style.lists_tittles} scope="col">
                  Cuit
                </th>
              </div>
              <div className={style.row_box}>
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
              </div>
            </tr>
          </thead>
          <tbody className={style.table_body}>
            {results.map((cliente) => (
              <tr className={style.table_row} key={cliente.id}>
                <div className={style.row_box}>
                  <td className={style.list_content}>{cliente.razonSocial}</td>
                  <td className={style.list_content}>
                    {cliente.nombreFantasia}
                  </td>
                  <td className={style.list_content}>{cliente.cuit}</td>
                </div>
                <div className={style.row_box}>
                  <td className={style.list_content}>{cliente.area}</td>
                  <td className={style.list_content}>
                    {cliente.nombreContacto}
                  </td>
                  <td className={style.list_content}>{cliente.telefono}</td>
                  <td className={style.list_content}>{cliente.mail}</td>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClienteList;
