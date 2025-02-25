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

  const verDetalle = (id, numeroOT ) => {
    
    const ordenId = id;
    // const tipoEquipo = equipo.tipoEquipo.tipo;
    // const modeloEquipo = equipo.tipoEquipo.modelo;
    // const marcaEquipo = equipo.tipoEquipo.marca;
    // const etapaActual = etapaActual;
    const OT = numeroOT;
    window.localStorage.setItem("ordenId", ordenId);
    // window.localStorage.setItem("tipoEquipo", tipoEquipo);
    // window.localStorage.setItem("modeloEquipo", modeloEquipo);
    // window.localStorage.setItem("marcaEquipo", marcaEquipo);
    // window.localStorage.setItem("etapaActual", etapaActual);
    window.localStorage.setItem("numeroOT", OT);

    // console.log(tipoEquipo);
    // console.log(modeloEquipo);
    // console.log(marcaEquipo);
    // console.log(etapaActual);
    console.log(numeroOT);
    console.log(ordenId);
    navigate(`/dashboard/etapa/ingresoPCP`);
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
              <th className={style.lists_tittles} scope="col">
                Cliente
              </th>
            </tr>
          </thead>
          <tbody className={style.table_body}>
            {results.map(({id, numeroOT, equipo, etapaActual, cliente}) => (
              <tr className={style.table_row} key={id}>
                <td className={style.list_content}>
                  
                  {numeroOT}
                </td>
                {/* <td className={style.list_content_content}>
                  {ots.cliente.cuit}
                </td> */}
                <td className={style.list_content_content}>
                  {equipo.tipoEquipo.tipo} - {equipo.tipoEquipo.modelo}{" "}
                  - {equipo.tipoEquipo.marca}
                </td>
                <td className={style.list_content}>{etapaActual}</td>
                <td className={style.list_content}>{cliente.razonSocial}</td>
                <button className={style.button2} onClick={() => verDetalle(id, numeroOT)}><IoIosCopy />
                </button>
                {/* <FaFileAlt /> */}
                 {/* <BsCardChecklist /> */}
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
      {/* <Outlet/> */}
    </div>
  );
};

export default OtList;
