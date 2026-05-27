import { useState, useEffect } from "react";
import "./Etapas.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import useOrdenData from "../../../hooks/useOrdenData";

const Etapas = () => {
  const ordenId = window.localStorage.getItem("ordenId");
  const location = useLocation();

  const { allOts, otActual, updateOt, loading, error } = useOrdenData(ordenId);

  const [tipoEquipo, setTipoEquipo] = useState();
  const [modeloEquipo, setModeloEquipo] = useState();
  const [numeroOT, setNumeroOT] = useState();

  useEffect(() => {
    const fetchEtapasData = async () => {
      try {
        if (otActual) {
          setTipoEquipo(otActual?.equipo?.tipoEquipo?.tipo || "N/A");
          setModeloEquipo(otActual?.equipo?.tipoEquipo?.modelo || "N/A");
          setNumeroOT(otActual?.numeroOT || "Sin número OT");

          console.log("✅ Datos recibidos:", otActual);
          console.log(tipoEquipo);
          console.log(modeloEquipo);
        } else {
          console.error("❌ Error: `otActual` no está definido.");
        }
      } catch (error) {
        console.error("Error al obtener los datos de recepción:", error);
      }
    };

    if (!loading) {
      fetchEtapasData();
    }
  }, [otActual, loading]);

  const etapasMap = {
    1: `ingreso${otActual?.equipo.tipoEquipo.tipo || ""}`,
    2: `recepcion${otActual?.equipo.tipoEquipo.tipo || ""}`,
    3: `inspeccion${otActual?.equipo.tipoEquipo.tipo || ""}${otActual?.equipo.tipoEquipo.modelo || ""}A`,
    4: `ensayo${otActual?.equipo.tipoEquipo.tipo || ""}${otActual?.equipo.tipoEquipo.modelo || ""}A`,
    5: `salida${otActual?.equipo.tipoEquipo.tipo || ""}`,
  };

  // Detectar el paso activo según la ruta actual
  const pathKeywords = ["ingreso", "recepcion", "inspeccion", "ensayo", "salida"];
  const currentPath = location.pathname.toLowerCase();
  const activeStep =
    pathKeywords.findIndex((keyword) => currentPath.includes(keyword)) + 1 || 1;

  const steps = [
    { id: 1, letter: "I", label: "Ingreso" },
    { id: 2, letter: "R", label: "Recepción" },
    { id: 3, letter: "I", label: "Inspección" },
    { id: 4, letter: "E", label: "Ensayo" },
    { id: 5, letter: "S", label: "Salida" },
  ];

  const getStepStatus = (stepId) => {
    if (stepId < activeStep) return "completed";
    if (stepId === activeStep) return "active";
    return "pending";
  };

  console.log(otActual);

  return (
    <div className="etapas-container">
      <nav className="nav-container">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          return (
            <div key={step.id} className="step-wrapper">
              <div className="step-item">
                <Link to={etapasMap[step.id]} className="step-link">
                  <div className={`step-circle ${status}`}>
                    {status === "completed" ? (
                      <span className="step-icon">✓</span>
                    ) : (
                      <span className="step-icon">{step.letter}</span>
                    )}
                  </div>
                </Link>
                <span className={`step-label ${status}`}>{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`step-connector ${
                    step.id < activeStep ? "completed" : ""
                  }`}
                />
              )}
            </div>
          );
        })}
      </nav>

      <div className="etapas-forms">
        <Outlet />
      </div>
    </div>
  );
};

export default Etapas;
