import { useState } from "react";
import style from "./ListStyle.module.css";
import { useNavigate } from "react-router-dom";
import { IoIosCopy } from "react-icons/io";
import useOrdenData from "../../hooks/useOrdenData";

const OtList = () => {
  const [search, setSearch] = useState("");
  const [mostrarActivas, setMostrarActivas] = useState(true); // nueva lógica

  const { allOts, otActual, updateOt } = useOrdenData();
  const navigate = useNavigate();

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // Filtrado por búsqueda y por estado (activa o no)
  const results = allOts.filter((ot) => {
    const coincideBusqueda = ot.cliente.razonSocial
      .toLowerCase()
      .includes(search.toLowerCase());
    const coincideEstado = Boolean(ot.activa) === mostrarActivas;
    return coincideBusqueda && coincideEstado;
  });

  const verDetalle = (
    id,
    equipo,
    recepcion,
    inspeccionPcpVh60,
    inspeccionPcpCoguar,
    inspeccionPcpMiniG,
    inspeccionPcpDV1
  ) => {
    const ordenId = id;
    const tipoEquipo = equipo.tipoEquipo.tipo;
    const modeloEquipo = equipo.tipoEquipo.modelo;
    const recepcionId = recepcion?.id;
    const inspeccionVh60Id = inspeccionPcpVh60?.id;
    const inspeccionMiniGId = inspeccionPcpMiniG?.id;
    const inspeccionDv1Id = inspeccionPcpDV1?.id;
    const inspeccionCougarId = inspeccionPcpCoguar?.id;

    window.localStorage.setItem("ordenId", ordenId);
    window.localStorage.setItem("recepcionId", recepcionId);
    window.localStorage.setItem("tipoEquipo", tipoEquipo);
    window.localStorage.setItem("modeloEquipo", modeloEquipo);
    if (inspeccionVh60Id != null) {
      window.localStorage.setItem("inspeccionId", inspeccionVh60Id);
    } else if (inspeccionMiniGId != null) {
      window.localStorage.setItem("inspeccionId", inspeccionMiniGId);
    } else if (inspeccionDv1Id != null) {
      window.localStorage.setItem("inspeccionId", inspeccionDv1Id);
    } else if (inspeccionCougarId != null) {
      window.localStorage.setItem("inspeccionId", inspeccionCougarId);
    } else {
      window.localStorage.setItem("inspeccionId", null);
    }

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

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setMostrarActivas(true)}
          className={
            mostrarActivas
              ? `${style.button3} ${style.buttonSelected}`
              : style.button3
          }
        >
          Activas
        </button>
        <button
          onClick={() => setMostrarActivas(false)}
          className={
            !mostrarActivas
              ? `${style.button4} ${style.buttonSelected}`
              : style.button4
          }
        >
          Terminadas
        </button>
      </div>

      <div className={style.table_container}>
        <table className="table-auto">
          <thead className={style.table_head}>
            <tr className={style.table_row2}>
              <th className={style.lists_tittles2} scope="col">N° OT</th>
              <th className={style.lists_tittles_tittle2} scope="col">Tipo de Equipo</th>
              <th className={style.lists_tittles} scope="col">Etapa</th>
              <th className={style.lists_tittles} scope="col">Cliente</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody className={style.table_body}>
            {results.map(
              ({
                id,
                numeroOT,
                equipo,
                etapaActual,
                cliente,
                recepcion,
                inspeccionPcpVh60,
                inspeccionPcpCoguar,
                inspeccionPcpDV1,
                inspeccionPcpMiniG,
              }) => (
                <tr className={style.table_row} key={id}>
                  <td className={style.list_content2}>{numeroOT}</td>
                  <td className={style.list_content_content2}>
                    {equipo.tipoEquipo.tipo} - {equipo.tipoEquipo.modelo} - {equipo.marca}
                  </td>
                  <td className={style.list_content}>{etapaActual}</td>
                  <td className={style.list_content}>{cliente.razonSocial}</td>
                  <td>
                    <button
                      className={style.button2}
                      onClick={() =>
                        verDetalle(
                          id,
                          equipo,
                          recepcion,
                          inspeccionPcpVh60,
                          inspeccionPcpCoguar,
                          inspeccionPcpMiniG,
                          inspeccionPcpDV1
                        )
                      }
                    >
                      <IoIosCopy />
                    </button>
                  </td>
                </tr>
              )
            )}
            {results.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No se encontraron OTs
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OtList;

