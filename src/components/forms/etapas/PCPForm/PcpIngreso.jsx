import { useEffect, useState } from "react";
import "./PcpIngreso.css";
import { useNavigate } from "react-router-dom";
import OtService from "../../../../services/OtService";
import useOrdenData from "../../../../hooks/useOrdenData";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useRecepcionData from "../../../../hooks/useRecepcionData";

const recepcionPCP = {}; // Ya no contiene observaciones

const PcpIngreso = () => {
  const navigate = useNavigate();
  const ordenId = window.localStorage.getItem("ordenId");

  const [ordenData, setOrdenData] = useState(null);
  const [recepcionId, setRecepcionId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: recepcionPCP,
  });

  const { allOts, otActual, updateOt } = useOrdenData(ordenId);

  const {
    recepcionActual,
    loading: recepcionLoading,
    error: recepcionError,
    createRecepcion,
    updateRecepcion,
  } = useRecepcionData(recepcionId, reset);

  const etapaSiguiente = 2;

  useEffect(() => {
    const fetchIngresoOrdenData = async () => {
      if (!ordenId) return;
      try {
        const response = await OtService.getOtById(ordenId);
        if (response.data) {
          setOrdenData(response.data);
          if (response.data.recepcion?.id) {
            setRecepcionId(response.data.recepcion.id);
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos de recepción:", error);
      }
    };

    fetchIngresoOrdenData();
  }, [ordenId]);

  const etapasMap = {
    1: "Ingreso",
    2: "Recepción",
    3: "Inspección",
    4: "Ensayo",
    5: "Salida",
  };

  const onSubmit = async (data) => {
    try {
      if (!otActual) {
        console.error("❌ otActual aún no cargado.");
        return;
      }

      const modeloEquipoActual = otActual?.equipo?.tipoEquipo?.modelo;
      const tipoEquipoActual = otActual?.equipo?.tipoEquipo?.tipo;

      if (recepcionId) {
        return;
        // await updateRecepcion(recepcionId, data);
      } else {
        const nuevaRecepcion = await createRecepcion(data);
        const nuevaRecepcionId = nuevaRecepcion?.id;

        if (nuevaRecepcionId) {
          const updatedOt = {
            ...otActual,
            recepcion: { id: nuevaRecepcionId },
            etapaActual: etapaSiguiente,
          };

          localStorage.setItem("recepcionId", nuevaRecepcionId);

          await updateOt(ordenId, updatedOt);

          await Swal.fire({
            title: "Perfecto!",
            text: "Recepción creada con éxito",
            icon: "success",
            confirmButtonColor: "#059080",
          });
        }
      }

      if (modeloEquipoActual && tipoEquipoActual) {
        navigate(`/dashboard/etapa/recepcion${tipoEquipoActual}`);
      }
    } catch (error) {
      console.error("❌ Error al procesar la recepción:", error);
    }
  };

  const loading_text = "Cargando datos...";

  return (
    <div className="view_container">
      {/* ── Sección Cliente ── */}
      <div className="section-card">
        <div className="section-header">
          <span className="section-header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <h3>Cliente</h3>
        </div>
        <div className="fields-grid">
          <div className="field-card">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </span>
            <div className="field-content">
              <p className="field-label">Razón Social</p>
              <p className={`field-value ${!ordenData ? "loading" : ""}`}>
                {ordenData ? ordenData.cliente.razonSocial : loading_text}
              </p>
            </div>
          </div>
          <div className="field-card">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <div className="field-content">
              <p className="field-label">E-mail</p>
              <p className={`field-value ${!ordenData ? "loading" : ""}`}>
                {ordenData ? ordenData.cliente.mail : loading_text}
              </p>
            </div>
          </div>
          <div className="field-card">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <div className="field-content">
              <p className="field-label">Contacto</p>
              <p className={`field-value ${!ordenData ? "loading" : ""}`}>
                {ordenData ? ordenData.cliente.nombreContacto : loading_text}
              </p>
            </div>
          </div>
          <div className="field-card">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div className="field-content">
              <p className="field-label">WhatsApp</p>
              <p className={`field-value ${!ordenData ? "loading" : ""}`}>
                {ordenData ? ordenData.cliente.telefono : loading_text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sección Equipo ── */}
      <div className="section-card">
        <div className="section-header">
          <span className="section-header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M12 2v2" /><path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" /><path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </span>
          <h3>Equipo</h3>
        </div>
        <div className="fields-grid">
          <div className="field-card">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                <path d="M7 7h.01" />
              </svg>
            </span>
            <div className="field-content">
              <p className="field-label">Tipo</p>
              <p className={`field-value ${!ordenData ? "loading" : ""}`}>
                {ordenData ? ordenData.equipo.tipoEquipo.tipo : loading_text}
              </p>
            </div>
          </div>
          <div className="field-card">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" /><path d="M3 15h18" />
                <path d="M9 3v18" /><path d="M15 3v18" />
              </svg>
            </span>
            <div className="field-content">
              <p className="field-label">Número de Serie</p>
              <p className={`field-value ${!ordenData ? "loading" : ""}`}>
                {ordenData ? ordenData.equipo.numSerieEquipo : loading_text}
              </p>
            </div>
          </div>
          <div className="field-card">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h.01" /><path d="M7 20v-4" />
                <path d="M12 20v-8" /><path d="M17 20V8" />
              </svg>
            </span>
            <div className="field-content">
              <p className="field-label">Modelo</p>
              <p className={`field-value ${!ordenData ? "loading" : ""}`}>
                {ordenData ? ordenData.equipo.tipoEquipo.modelo : loading_text}
              </p>
            </div>
          </div>
          <div className="field-card">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <div className="field-content">
              <p className="field-label">Etapa Actual</p>
              {ordenData ? (
                <span className="etapa-badge">
                  <span className="etapa-badge-dot" />
                  {etapasMap[ordenData.etapaActual] || "Etapa desconocida"}
                </span>
              ) : (
                <p className="field-value loading">{loading_text}</p>
              )}
            </div>
          </div>
          <div className="field-card full-width">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
            <div className="field-content">
              <p className="field-label">Marca</p>
              <p className={`field-value ${!ordenData ? "loading" : ""}`}>
                {ordenData ? (ordenData.equipo.tipoEquipo.marca || "—") : loading_text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario sin campos visibles, pero funcional */}
      <form onSubmit={handleSubmit(onSubmit)} className="form_recepcion">
        <button type="submit" className="btn-comenzar">
          <span className="btn-icon">▶</span>
          Comenzar inspección
        </button>
      </form>
    </div>
  );
};

export default PcpIngreso;
