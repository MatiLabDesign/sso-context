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
        await updateRecepcion(recepcionId, data);
      } else {
        const nuevaRecepcion = await createRecepcion(data);
        const nuevaRecepcionId = nuevaRecepcion?.id;

        if (nuevaRecepcionId) {
          const updatedOt = {
            ...otActual,
            recepcion: { id: nuevaRecepcionId },
            etapaActual: etapaSiguiente,
          };

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

  return (
    <div className="view_container">
      <h3>Cliente</h3>
      <div className="cliente_container">
        <div className="cliente_divisor">
          <div className="cliente_element">
            <p className="cliente_title">Razón Social</p>
            <p>{ordenData ? ordenData.cliente.razonSocial : "Cargando datos..."}</p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Contacto</p>
            <p>{ordenData ? ordenData.cliente.nombreContacto : "Cargando datos..."}</p>
          </div>
        </div>
        <div className="cliente_divisor">
          <div className="cliente_element">
            <p className="cliente_title">E-mail</p>
            <p>{ordenData ? ordenData.cliente.mail : "Cargando datos..."}</p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">WhatsApp</p>
            <p>{ordenData ? ordenData.cliente.telefono : "Cargando datos..."}</p>
          </div>
        </div>
      </div>

      <h3>Equipo</h3>
      <div className="equipo_container">
        <div className="equipo_divisor">
          <div className="cliente_element">
            <p className="cliente_title">Tipo</p>
            <p>{ordenData ? ordenData.equipo.tipoEquipo.tipo : "Cargando datos..."}</p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Modelo</p>
            <p>{ordenData ? ordenData.equipo.tipoEquipo.modelo : "Cargando datos..."}</p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Marca</p>
            <p>{ordenData ? ordenData.equipo.tipoEquipo.marca : "Cargando datos..."}</p>
          </div>
        </div>
        <div className="equipo_divisor">
          <div className="cliente_element">
            <p className="cliente_title">Número de Serie</p>
            <p>{ordenData ? ordenData.equipo.numSerieEquipo : "Cargando datos..."}</p>
          </div>
          <div className="cliente_element">
            <p className="cliente_title">Etapa Actual</p>
            <p>
              {ordenData
                ? etapasMap[ordenData.etapaActual] || "Etapa desconocida"
                : "Cargando datos..."}
            </p>
          </div>
        </div>
      </div>

      {/* Formulario sin campos visibles, pero funcional */}
      <form onSubmit={handleSubmit(onSubmit)} className="form_recepcion">
        <button type="submit" className="btn">
          Comenzar
        </button>
      </form>
    </div>
  );
};

export default PcpIngreso;



