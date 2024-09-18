import React from "react";
import "./ClienteList.css";
import OtService from "../../services/OtService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
        // Ahi que poner el atributo correcto
        dato.numot.toLowerCase().includes(search.toLocaleLowerCase())
      );

  //----------------------------
  return (
    <div className="list-container">
      <div className="search-container">
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Filtrar OT por N°"
          className="form-control"
        />
      </div>

      <div className="table-container">
        {/* <Link to="nuevo">
          <button className="form-control-s">Crear Cliente</button>
        </Link> */}
        <table className="tabla">
          <thead>
            <tr className="table-ro">
              <th id="titulos-listas" scope="col">
                N° OT
              </th>
              <th id="titulos-listas" scope="col">
                Cliente
              </th>
              <th id="titulos-listas" scope="col">
                Equipo
              </th>
              <th id="titulos-listas" scope="col">
                Etapa
              </th>
            </tr>
          </thead>
          <tbody className="linea-lista">
            {results.map((ots) => (
              <tr key={ot.id}>
                {/* <td id="contenido-lista">{cliente.id}</td> */}
                <td id="contenido-lista">{ot.numero}</td>
                <td id="contenido-lista">{ot.cliente}</td>
                <td id="contenido-lista">{ot.equipo}</td>
                <td id="contenido-lista">{ot.etapa}</td>

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

export default OtList;