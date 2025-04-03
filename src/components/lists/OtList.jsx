import React, { useState, useEffect } from "react";
import style from "./ListStyle.module.css";
import OtService from "../../services/OtService";
import { useNavigate } from "react-router-dom";
import Equipo from './../../views/Equipo';
import TipoEquipo from './../../views/TipoEquipo';
import { BsCardChecklist } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";


const OtList = () => {
  const [ots, setOts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
      const fetchOts = async () => {
        try {
          const response = await OtService.getAllOt();
          setOts(response.data);
          console.log(response.data);
        } catch (error) {
          console.log("el error está en el useEffect, en este nuevo");
        }
      };
      fetchOts();
    }, []);
  
  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const results = !search
    ? ots
    : ots.filter((dato) =>
        dato.cliente.razonSocial.toLowerCase().includes(search.toLowerCase())
      );

  const navigate = useNavigate();

  const verDetalle = (id, equipo) => {
    
    const ordenId = id;
    const tipoEquipo = equipo.tipoEquipo.tipo;
    
    window.localStorage.setItem("ordenId", ordenId);

    console.log(ordenId);
    console.log(tipoEquipo);

    // navigate(`/dashboard/etapa/ingreso${tipoEquipo}`);
    navigate(`/dashboard/etapa/consultarOt`);
  };

  return (
    <div className={style.list_container}>
      
      <div className={style.search_container}>
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Filtrar por Razón Social Cliente"
          className={style.form_control}
        />
      </div>

      <button className={style.button3}>Activas</button>
      <button className={style.button4}>Terminadas</button>
      
      <div className={style.table_container}>
        <table className="table-auto">
          <thead className={style.table_head}>
            <tr className={style.table_row}>
              <th className={style.lists_tittles2} scope="col">
                N° OT
              </th>
              <th className={style.lists_tittles_tittle} scope="col">
                Tipo de Equipo
              </th>
              <th className={style.lists_tittles} scope="col">
                Etapa
              </th>
              <th className={style.lists_tittles} scope="col">
                Cliente
              </th>
            </tr>
          </thead>
          <tbody className={style.table_body}>
            {results.map(({id, numeroOT, equipo, etapaActual, cliente}) => (
              <tr className={style.table_row} key={id}>
                <td className={style.list_content2}>
                  
                  {numeroOT}
                </td>
                <td className={style.list_content_content}>
                  {equipo.tipoEquipo.tipo} - {equipo.tipoEquipo.modelo}{" "}
                  - {equipo.marca}
                </td>
                <td className={style.list_content}>{etapaActual}</td>
                <td className={style.list_content}>{cliente.razonSocial}</td>
                <td>
                  <button className={style.button2} onClick={() => verDetalle(id, equipo)}><IoIosCopy />
                  </button>
                </td>
                {/* <FaFileAlt /> */}
                 {/* <BsCardChecklist /> */}
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default OtList;
