import { useState } from "react";
import style from "./ListStyle.module.css";
import { useNavigate } from "react-router-dom";
import { IoIosCopy, IoIosDownload } from "react-icons/io";
import useOrdenData from "../../hooks/useOrdenData";
import ETAPA_LIST from "../../constants/ETAPA_LIST";

const OtListCliente = () => {
  const clienteFiltro = "Matias"; // renombrada para evitar confusiones con cliente de cada OT
  const [search, setSearch] = useState("");
  const [mostrarActivas, setMostrarActivas] = useState(true);

  const { allOts = [], otActual, updateOt } = useOrdenData();
  const navigate = useNavigate();

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const setSearchToCliente = () => {
    setSearch(clienteFiltro);
  };

  // Filtrado defensivo: protege si ot o cliente o razonSocial no existen
  const results = (allOts || []).filter((ot) => {
    const razon = ot?.cliente?.razonSocial ?? "";
    return razon.toLowerCase().includes((search || "").toLowerCase());
  });

  const verDetalle = (
    id,
    equipo,
    recepcion,
    inspeccionPcpVh60,
    inspeccionPcpCoguar,
    inspeccionPcpMiniG,
    inspeccionPcpDV1,
    ensayoPcpVh60,
    ensayoPcpCoguar,
    ensayoPcpMiniG,
    ensayoPcpDV1
  ) => {
    const ordenId = id;
    const tipoEquipo = equipo.tipoEquipo.tipo;
    const modeloEquipo = equipo.tipoEquipo.modelo;
    const recepcionId = recepcion?.id;
    const inspeccionVh60Id = inspeccionPcpVh60?.id;
    const inspeccionMiniGId = inspeccionPcpMiniG?.id;
    const inspeccionDv1Id = inspeccionPcpDV1?.id;
    const inspeccionCougarId = inspeccionPcpCoguar?.id;
    const ensayoVh60Id = ensayoPcpVh60?.id;
    const ensayoMiniGId = ensayoPcpMiniG?.id;
    const ensayoDv1Id = ensayoPcpDV1?.id;
    const ensayoCougarId = ensayoPcpCoguar?.id;

    window.localStorage.setItem("ordenId", ordenId);
    window.localStorage.setItem("recepcionId", recepcionId);
    window.localStorage.setItem("tipoEquipo", tipoEquipo);
    window.localStorage.setItem("modeloEquipo", modeloEquipo);

    if (inspeccionVh60Id != null) {
      window.localStorage.setItem("inspeccionVh60Id", inspeccionVh60Id);
    } else if (inspeccionMiniGId != null) {
      window.localStorage.setItem("inspeccionMinigId", inspeccionMiniGId);
    } else if (inspeccionDv1Id != null) {
      window.localStorage.setItem("inspeccionDv1Id", inspeccionDv1Id);
    } else if (inspeccionCougarId != null) {
      window.localStorage.setItem("inspeccionCougarId", inspeccionCougarId);
    } else {
      window.localStorage.setItem("NOinspeccionId", null);
    }

    if (ensayoVh60Id != null) {
      window.localStorage.setItem("ensayoVh60Id", ensayoVh60Id);
    } else if (ensayoMiniGId != null) {
      window.localStorage.setItem("ensayoMinigId", ensayoMiniGId);
    } else if (ensayoDv1Id != null) {
      window.localStorage.setItem("ensayoDv1Id", ensayoDv1Id);
    } else if (ensayoCougarId != null) {
      window.localStorage.setItem("ensayoCougarId", ensayoCougarId);
    } else {
      window.localStorage.setItem("NOensayoId", null);
    }

    navigate(`/dashboard/etapa/consultarOt`);
  };

  return (
    <div className={style.list_container}>
      <h2>Este es Ot List del CLIENTE</h2>

      {/* Muestro la constante y botón para buscarla */}
      <div style={{ marginBottom: "0.5rem" }}>
        <strong>Cliente constante:</strong> {clienteFiltro}{" "}
        <button className={style.button3} onClick={setSearchToCliente}>
          Buscar {clienteFiltro}
        </button>
        <button
          className={style.button3}
          style={{ marginLeft: "0.5rem" }}
          onClick={() => setSearch("")}
        >
          Limpiar búsqueda
        </button>
      </div>

      <div className={style.search_container}>
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Filtrar por Razón Social Cliente"
          className={style.form_control}
        />
      </div>

      <div className={style.table_container_2}>
        <table className="table-auto">
          <thead className={style.table_head}>
            <tr className={style.table_row2}>
              <th className={style.lists_tittles2} scope="col">
                N° OT
              </th>
              <th className={style.lists_tittles_tittle2} scope="col">
                Tipo de Equipo
              </th>
              <th className={style.lists_tittles} scope="col">
                Etapa
              </th>
              <th className={style.lists_tittles} scope="col">
                Cliente
              </th>
              <th className={style.lists_tittles} scope="col">
                Acciones
              </th>
              <th className={style.lists_tittles} scope="col">
                Descarga
              </th>
            </tr>
          </thead>
          <tbody className={style.table_body}>
            {results.map(
              ({
                id,
                activa,
                numeroOT,
                equipo,
                etapaActual,
                cliente: clienteOt,
                recepcion,
                inspeccionPcpVh60,
                inspeccionPcpCoguar,
                inspeccionPcpDV1,
                inspeccionPcpMiniG,
              }) => (
                <tr className={style.table_row} key={id}>
                  <td className={style.list_content2}>{numeroOT}</td>
                  <td className={style.list_content_content2}>
                    {equipo?.tipoEquipo?.tipo} - {equipo?.tipoEquipo?.modelo} -{" "}
                    {equipo?.marca}
                  </td>
                  <td className={style.list_content}>
                    {ETAPA_LIST[etapaActual]}
                  </td>
                  <td className={style.list_content}>
                    {clienteOt?.razonSocial ?? "-"}
                  </td>
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
                  <td className={style.list_content_T}>
                    {!activa && (
                      <button
                        className={style.button2}
                        style={{ backgroundColor: "#eb7302" }}
                      >
                        <IoIosDownload />
                      </button>
                    )}
                  </td>
                </tr>
              )
            )}
            {results.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
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

export default OtListCliente;
